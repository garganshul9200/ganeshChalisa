import {useCallback, useMemo, useRef, useState} from 'react';
import {useAudio} from '../../context/AudioContext';
import {useLanguage} from '../../context/LanguageContext';
import {checkAndTriggerInAppReview} from '../../services/reviewService';
import {getChalisaTitle} from '../../utils/chalisaAudio';
import {buildReadVerses} from '../../utils/verseHelpers';

const MAX_FONT_SIZE = 30;
const READING_BOTTOM_THRESHOLD = 48;
const DEFAULT_FONT_SIZE = {
  hindi: 18,
  hinglish: 16,
};

export function useReadScreen(content) {
  const {isPlaying} = useAudio();
  const {t, contentLanguage} = useLanguage();
  const [language, setLanguage] = useState(contentLanguage);
  const [fontSize, setFontSize] = useState(
    DEFAULT_FONT_SIZE[contentLanguage] ?? DEFAULT_FONT_SIZE.hindi,
  );
  const [activeVerseIndex, setActiveVerseIndex] = useState(0);
  const readCompletedRef = useRef(false);
  const isPlayingRef = useRef(isPlaying);
  isPlayingRef.current = isPlaying;

  const languageTabs = useMemo(
    () => [
      {key: 'hindi', label: t.languageHindi},
      {key: 'hinglish', label: t.languageEnglish},
    ],
    [t.languageEnglish, t.languageHindi],
  );

  const headerTitle = useMemo(
    () => getChalisaTitle(content, language),
    [content, language],
  );

  const verses = useMemo(
    () => buildReadVerses(content, language),
    [content, language],
  );

  const onSelectLanguage = useCallback(lang => {
    setLanguage(lang);
    setFontSize(DEFAULT_FONT_SIZE[lang] ?? DEFAULT_FONT_SIZE.hinglish);
    setActiveVerseIndex(0);
  }, []);

  const cycleFontSize = useCallback(() => {
    setFontSize(prev => {
      if (prev >= MAX_FONT_SIZE) {
        return DEFAULT_FONT_SIZE[language] ?? DEFAULT_FONT_SIZE.hinglish;
      }
      return Math.min(MAX_FONT_SIZE, prev + 2);
    });
  }, [language]);

  const onVersePress = useCallback(index => {
    setActiveVerseIndex(index);
  }, []);

  const onScroll = useCallback(event => {
    if (readCompletedRef.current) {
      return;
    }

    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    if (layoutMeasurement.height <= 0 || contentSize.height <= 0) {
      return;
    }

    const atBottom =
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - READING_BOTTOM_THRESHOLD;
    if (!atBottom) {
      return;
    }

    readCompletedRef.current = true;
    checkAndTriggerInAppReview({prompt: !isPlayingRef.current});
  }, []);

  return {
    language,
    languageTabs,
    fontSize,
    activeVerseIndex,
    headerTitle,
    verses,
    onSelectLanguage,
    cycleFontSize,
    onVersePress,
    onScroll,
  };
}
