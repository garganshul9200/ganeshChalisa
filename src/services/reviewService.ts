import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert, NativeModules, Platform} from 'react-native';
import InAppReview from 'react-native-in-app-review';

/** Completed listening or reading sessions required before the first prompt. */
const MIN_COMPLETED_SESSIONS = 2;
const COOLDOWN_MS = 10 * 24 * 60 * 60 * 1000;

const COMPLETED_SESSIONS_KEY = '@review_completed_sessions';
const LAST_REVIEW_REQUESTED_AT_KEY = '@last_review_requested_at';

export type ReviewTriggerOptions = {
  /**
   * When false, the session is recorded but the review dialog is not
   * requested. Callers pass false while audio is still playing.
   */
  prompt?: boolean;
};

let reviewQueue: Promise<void> = Promise.resolve();

function canRequestInAppReview(): boolean {
  if (Platform.OS === 'android' && !NativeModules.InAppReviewModule) {
    return false;
  }

  try {
    return InAppReview.isAvailable() === true;
  } catch {
    return false;
  }
}

async function incrementCompletedSessions(): Promise<number> {
  const raw = await AsyncStorage.getItem(COMPLETED_SESSIONS_KEY);
  const current = Number.parseInt(raw ?? '', 10);
  const next = Number.isFinite(current) && current >= 0 ? current + 1 : 1;
  await AsyncStorage.setItem(COMPLETED_SESSIONS_KEY, String(next));
  return next;
}

async function isWithinCooldown(): Promise<boolean> {
  const raw = await AsyncStorage.getItem(LAST_REVIEW_REQUESTED_AT_KEY);
  if (!raw) {
    return false;
  }

  const lastRequestedAt = Number(raw);
  if (!Number.isFinite(lastRequestedAt) || lastRequestedAt <= 0) {
    return false;
  }

  return Date.now() - lastRequestedAt < COOLDOWN_MS;
}

async function rememberReviewRequest(): Promise<void> {
  try {
    await AsyncStorage.setItem(LAST_REVIEW_REQUESTED_AT_KEY, String(Date.now()));
  } catch {
    // A missed timestamp only risks an extra attempt later.
  }
}

async function runReviewCheck(allowPrompt: boolean): Promise<void> {
  try {
    const sessions = await incrementCompletedSessions();
    if (!allowPrompt || sessions < MIN_COMPLETED_SESSIONS) {
      return;
    }

    if (await isWithinCooldown()) {
      return;
    }

    if (!canRequestInAppReview()) {
      return;
    }

    try {
      await InAppReview.RequestInAppReview();
    } catch {
      // Store quota, missing Play services, or no foreground activity.
    }

    await rememberReviewRequest();
  } catch {
    // Storage or native failures must not interrupt playback or reading.
  }
}

/**
 * Records one completed listening or reading session, then asks for an
 * in-app review after at least two sessions and a 10-day cooldown.
 * Never throws.
 */
export function checkAndTriggerInAppReview(
  options?: ReviewTriggerOptions,
): Promise<void> {
  const allowPrompt = options?.prompt !== false;
  const task = reviewQueue.then(() => runReviewCheck(allowPrompt));
  reviewQueue = task.then(
    () => undefined,
    () => undefined,
  );
  return task;
}

type ManualReviewCopy = {
  title?: string;
  unavailableMessage?: string;
};

/**
 * Opens the native in-app review flow from an explicit Rate App action.
 * Falls back to an alert when the API is unavailable.
 */
export async function requestManualInAppReview(
  copy?: ManualReviewCopy,
): Promise<void> {
  try {
    if (InAppReview.isAvailable()) {
      await InAppReview.RequestInAppReview();
      await rememberReviewRequest();
      return;
    }

    Alert.alert(
      copy?.title ?? 'Rate Ganesh Chalisa',
      copy?.unavailableMessage ??
        'Please visit our app store page to leave a review.',
    );
  } catch (error) {
    console.warn('Unable to open review prompt', error);
  }
}
