import {Share} from 'react-native';

const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.ganeshChalisa.app';
const APP_NAME = 'Shri Ganesh Chalisa';

const GENERIC_SHARE_MESSAGE =
  `🕉️ Read and listen to Shri Ganesh Chalisa offline with audio and lyrics. Download ${APP_NAME} app: ${PLAY_STORE_URL}`;

function buildShareMessage(chalisaTitle?: string): string {
  const title = chalisaTitle?.trim();
  if (!title) {
    return GENERIC_SHARE_MESSAGE;
  }

  return `🕉️ Read & listen to ${title} with audio and lyrics on ${APP_NAME}. Download here: ${PLAY_STORE_URL}`;
}

function isShareCancellation(error: unknown): boolean {
  const {message = '', code = ''} = (error ?? {}) as {
    message?: string;
    code?: string;
  };

  return code === 'E_SHARE_CANCELLED' || /cancel|did not share/i.test(message);
}

/** Opens the system share sheet. Failures/cancels are swallowed. */
export async function shareApp(chalisaTitle?: string): Promise<void> {
  try {
    await Share.share({
      message: buildShareMessage(chalisaTitle),
      title: APP_NAME,
    });
  } catch (error) {
    if (!isShareCancellation(error)) {
      console.warn('shareApp failed:', error);
    }
  }
}
