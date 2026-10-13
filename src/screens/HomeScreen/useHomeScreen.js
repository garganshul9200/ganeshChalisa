import {useCallback, useState} from 'react';
import {Alert} from 'react-native';
import {useAudio} from '../../context/AudioContext';
import {useLanguage} from '../../context/LanguageContext';
import {useTheme} from '../../context/ThemeContext';
import {requestManualInAppReview} from '../../services/reviewService';
import {shareApp} from '../../services/shareService';
import {
  getContentById,
  getContentByType,
  hasChalisaAudio,
} from '../../utils/chalisaAudio';

function resolveContent(type, fallbackId) {
  return getContentByType(type) || getContentById(fallbackId);
}

export function useHomeScreen(navigation) {
  const {toggleTheme} = useTheme();
  const {changeLanguage, t} = useLanguage();
  const {playChalisa} = useAudio();
  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const onComingSoon = useCallback(
    label => {
      Alert.alert(label, t.comingSoon);
    },
    [t.comingSoon],
  );

  const onShare = useCallback(() => {
    shareApp(t.shareTitle);
  }, [t.shareTitle]);

  const onReadPress = useCallback(() => {
    const content = resolveContent('chalisa', 'ganesh-chalisa');
    if (!content) {
      onComingSoon(t.readChalisa);
      return;
    }
    navigation.navigate('ReadContent', {content});
  }, [navigation, onComingSoon, t.readChalisa]);

  const onListenPress = useCallback(() => {
    const content = resolveContent('chalisa', 'ganesh-chalisa');
    if (!content || !hasChalisaAudio(content)) {
      onComingSoon(t.listenNow);
      return;
    }
    if (playChalisa(content)) {
      navigation.navigate('AudioPlayer', {content});
    }
  }, [navigation, onComingSoon, playChalisa, t.listenNow]);

  const onExplorePress = useCallback(
    (title, key) => {
      if (key === 'aarti') {
        const content = resolveContent('aarti', 'ganesh-aarti');
        if (!content) {
          onComingSoon(title);
          return;
        }
        navigation.navigate('ReadContent', {content});
        return;
      }
      onComingSoon(title);
    },
    [navigation, onComingSoon],
  );

  const onLanguagePress = useCallback(() => {
    Alert.alert(t.changeLanguage, undefined, [
      {text: t.languageHindi, onPress: () => changeLanguage('hindi')},
      {text: t.languageEnglish, onPress: () => changeLanguage('english')},
      {text: t.cancel, style: 'cancel'},
    ]);
  }, [changeLanguage, t]);

  const onRatePress = useCallback(() => {
    requestManualInAppReview({
      title: t.rateAppTitle,
      unavailableMessage: t.rateAppUnavailable,
    });
  }, [t.rateAppTitle, t.rateAppUnavailable]);

  const onMenuSelect = useCallback(
    key => {
      closeMenu();
      switch (key) {
        case 'theme':
          toggleTheme();
          break;
        case 'share':
          onShare();
          break;
        case 'language':
          onLanguagePress();
          break;
        case 'rate':
          onRatePress();
          break;
        default:
          break;
      }
    },
    [closeMenu, onLanguagePress, onRatePress, onShare, toggleTheme],
  );

  return {
    menuOpen,
    openMenu,
    closeMenu,
    onReadPress,
    onListenPress,
    onExplorePress,
    onMenuSelect,
    t,
  };
}
