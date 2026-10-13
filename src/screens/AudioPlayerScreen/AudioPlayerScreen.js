import React, { memo, useCallback, useEffect, useMemo } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ScreenHeader from '../../components/ScreenHeader';
import ScreenWrapper from '../../components/ScreenWrapper';
import { useAudio } from '../../context/AudioContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import {
  formatTime,
  getChalisaTitle,
  getDeityImageSource,
} from '../../utils/chalisaAudio';
import { moderateScale, moderateVerticalScale, scale } from '../../utils/scale';
import SeekBar from './SeekBar';

const AudioPlayerScreen = ({ route, navigation }) => {
  const routeChalisa = route.params?.content ?? route.params?.chalisa;
  const { t, contentLanguage } = useLanguage();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const {
    currentChalisa,
    isPlaying,
    isBuffering,
    progress,
    duration,
    playChalisa,
    togglePlayPause,
    seekTo,
    skipBy,
  } = useAudio();

  const activeChalisa = currentChalisa ?? routeChalisa;
  const title = getChalisaTitle(activeChalisa, contentLanguage);
  const artworkSource = useMemo(
    () => getDeityImageSource(activeChalisa?.image),
    [activeChalisa?.image],
  );

  useEffect(() => {
    if (routeChalisa) {
      playChalisa(routeChalisa);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeChalisa?.id]);

  const handleSeek = useCallback(seconds => seekTo(seconds), [seekTo]);
  const skipBack = useCallback(() => skipBy(-10), [skipBy]);
  const skipForward = useCallback(() => skipBy(10), [skipBy]);

  return (
    <ScreenWrapper>
      <View style={styles.root}>
        <ScreenHeader onBack={() => navigation.goBack()} />

        <View style={styles.content}>
          <View style={styles.nowPlayingBadge}>
            <Text style={styles.nowPlayingText}>
              {isBuffering
                ? t.loadingBadge
                : isPlaying
                  ? t.nowPlayingBadge
                  : t.pausedBadge}
            </Text>
          </View>
          {artworkSource ? (
            <Image
              source={artworkSource}
              style={styles.artwork}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.artwork} />
          )}
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.artist}>{t.appArtist}</Text>

          <SeekBar
            position={progress}
            duration={duration}
            onSeek={handleSeek}
            colors={colors}
          />

          <View style={styles.timeRow}>
            <Text style={styles.timeText}>{formatTime(progress)}</Text>
            <Text style={styles.timeText}>{formatTime(duration)}</Text>
          </View>

          <View style={styles.controlsRow}>
            <TouchableOpacity
              style={styles.skipButton}
              onPress={skipBack}
              activeOpacity={0.85}>
              <Text style={styles.skipButtonText}>-10</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.playButton}
              onPress={togglePlayPause}
              activeOpacity={0.85}>
              {isBuffering ? (
                <ActivityIndicator color={colors.onPrimary} />
              ) : (
                <Text style={styles.playButtonText}>
                  {isPlaying ? '❚❚' : '▶'}
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.skipButton}
              onPress={skipForward}
              activeOpacity={0.85}>
              <Text style={styles.skipButtonText}>+10</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default memo(AudioPlayerScreen);

const createStyles = colors =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      flex: 1,
      paddingHorizontal: moderateScale(24),
      paddingBottom: moderateVerticalScale(32),
      alignItems: 'center',
      justifyContent: 'center',
    },
    artwork: {
      width: '100%',
      height: '50%',
      borderRadius: moderateScale(20),
      marginBottom: moderateVerticalScale(28),
      backgroundColor: colors.primarySoft,
    },
    nowPlayingBadge: {
      backgroundColor: colors.primary,
      paddingHorizontal: moderateScale(14),
      paddingVertical: moderateVerticalScale(6),
      borderRadius: moderateScale(20),
      marginBottom: moderateVerticalScale(12),
    },
    nowPlayingText: {
      color: colors.onPrimary,
      fontSize: scale(12),
      fontWeight: '700',
      letterSpacing: 0.5,
    },
    title: {
      fontSize: scale(22),
      fontWeight: '700',
      color: colors.darkBrown,
      textAlign: 'center',
      marginBottom: moderateVerticalScale(8),
    },
    artist: {
      fontSize: scale(14),
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: moderateVerticalScale(32),
    },
    timeRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: moderateVerticalScale(24),
    },
    timeText: {
      fontSize: scale(12),
      color: colors.textSecondary,
    },
    controlsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: moderateScale(20),
    },
    skipButton: {
      width: moderateScale(52),
      height: moderateScale(52),
      borderRadius: moderateScale(26),
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    skipButtonText: {
      fontSize: scale(14),
      fontWeight: '700',
      color: colors.darkBrown,
    },
    playButton: {
      width: moderateScale(72),
      height: moderateScale(72),
      borderRadius: moderateScale(36),
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    playButtonText: {
      fontSize: scale(28),
      color: colors.onPrimary,
    },
  });
