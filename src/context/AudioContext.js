import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import {Alert, Image, View} from 'react-native';
import Video from 'react-native-video';
import {checkAndTriggerInAppReview} from '../services/reviewService';
import {getChalisaAudioSource, getChalisaTitle} from '../utils/chalisaAudio';
import {useLanguage} from './LanguageContext';

const AudioContext = createContext(null);

const HIDDEN_VIDEO_STYLE = {width: 0, height: 0, opacity: 0};

export function AudioProvider({children}) {
  const {t, contentLanguage} = useLanguage();

  const videoRef = useRef(null);
  const isPlayingRef = useRef(false);
  const progressRef = useRef(0);
  const durationRef = useRef(0);

  const [currentChalisa, setCurrentChalisa] = useState(null);
  const [isPlaying, setIsPlayingState] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [progress, setProgressState] = useState(0);
  const [duration, setDurationState] = useState(0);

  const setIsPlaying = useCallback(playing => {
    isPlayingRef.current = playing;
    setIsPlayingState(playing);
  }, []);

  const setProgress = useCallback(value => {
    progressRef.current = value;
    setProgressState(value);
  }, []);

  const setDuration = useCallback(value => {
    durationRef.current = value;
    setDurationState(value);
  }, []);

  const playChalisa = useCallback(
    chalisa => {
      if (!getChalisaAudioSource(chalisa)) {
        Alert.alert(t.audioUnavailable, t.audioUnavailableMessage);
        return false;
      }

      if (currentChalisa?.id === chalisa.id) {
        setIsPlaying(true);
        return true;
      }

      setCurrentChalisa(chalisa);
      setProgress(0);
      setDuration(0);
      setIsBuffering(true);
      setIsPlaying(true);
      return true;
    },
    [currentChalisa?.id, setIsPlaying, t],
  );

  const togglePlayPause = useCallback(() => {
    if (!currentChalisa) {
      return;
    }
    setIsPlaying(!isPlayingRef.current);
  }, [currentChalisa, setIsPlaying]);

  const seekTo = useCallback(
    seconds => {
      if (!Number.isFinite(seconds)) {
        return;
      }
      const max = durationRef.current > 0 ? durationRef.current : seconds;
      const clamped = Math.min(Math.max(seconds, 0), max);
      videoRef.current?.seek(clamped);
      setProgress(clamped);
    },
    [setProgress],
  );

  const skipBy = useCallback(
    deltaSeconds => {
      seekTo(progressRef.current + deltaSeconds);
    },
    [seekTo],
  );

  const handleEnd = useCallback(() => {
    const finishedFullTrack = durationRef.current > 0;
    setIsPlaying(false);
    if (finishedFullTrack) {
      checkAndTriggerInAppReview();
    }
  }, [setIsPlaying]);

  const audioSource = useMemo(() => {
    const asset = getChalisaAudioSource(currentChalisa);
    if (!asset) {
      return null;
    }
    const resolved = Image.resolveAssetSource(asset);
    if (!resolved?.uri) {
      return null;
    }
    return {
      uri: resolved.uri,
      metadata: {
        title: getChalisaTitle(currentChalisa, contentLanguage),
        artist: t.appArtist,
      },
    };
  }, [contentLanguage, currentChalisa, t.appArtist]);

  const value = useMemo(
    () => ({
      currentChalisa,
      isPlaying,
      isBuffering,
      progress,
      duration,
      playChalisa,
      togglePlayPause,
      seekTo,
      skipBy,
    }),
    [
      currentChalisa,
      isPlaying,
      isBuffering,
      progress,
      duration,
      playChalisa,
      togglePlayPause,
      seekTo,
      skipBy,
    ],
  );

  return (
    <AudioContext.Provider value={value}>
      {children}
      {audioSource ? (
        <View style={HIDDEN_VIDEO_STYLE} pointerEvents="none">
          <Video
            key={currentChalisa.id}
            ref={videoRef}
            source={audioSource}
            style={HIDDEN_VIDEO_STYLE}
            paused={!isPlaying}
            playInBackground
            playWhenInactive
            ignoreSilentSwitch="ignore"
            showNotificationControls
            progressUpdateInterval={500}
            onLoadStart={() => setIsBuffering(true)}
            onProgress={data => setProgress(data.currentTime)}
            onLoad={data => {
              setDuration(data.duration);
              setProgress(data.currentTime);
              setIsBuffering(false);
            }}
            onBuffer={data => setIsBuffering(data.isBuffering)}
            onSeek={data => {
              setProgress(data.currentTime);
              setIsBuffering(false);
            }}
            onEnd={handleEnd}
            onError={error => {
              console.warn('Audio playback error:', error);
              setIsPlaying(false);
              setIsBuffering(false);
              Alert.alert(t.playbackError, t.playbackErrorMessage);
            }}
          />
        </View>
      ) : null}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return ctx;
}
