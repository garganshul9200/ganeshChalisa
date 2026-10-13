import React, {memo, useMemo} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import imagePath from '../../constants/imagePath';
import {useLanguage} from '../../context/LanguageContext';
import {useTheme} from '../../context/ThemeContext';
import {moderateScale, moderateVerticalScale, scale} from '../../utils/scale';

const HomeHero = memo(() => {
  const {colors} = useTheme();
  const {t} = useLanguage();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View>
      <View style={styles.heroWrap}>
        <Image
          source={imagePath.hero}
          style={styles.heroImage}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.title}>{t.heroTitle}</Text>
      <Text style={styles.tagline}>{t.heroTagline}</Text>
    </View>
  );
});

HomeHero.displayName = 'HomeHero';

export default HomeHero;

const createStyles = colors =>
  StyleSheet.create({
    heroWrap: {
      alignItems: 'center',
      marginTop: moderateVerticalScale(4),
      marginBottom: moderateVerticalScale(8),
    },
    heroImage: {
      width: scale(260),
      height: scale(280),
    },
    title: {
      fontSize: moderateScale(28),
      fontWeight: '700',
      color: colors.darkBrown,
      textAlign: 'center',
      marginTop: moderateVerticalScale(4),
    },
    tagline: {
      fontSize: moderateScale(13),
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: moderateVerticalScale(6),
      marginBottom: moderateVerticalScale(20),
      lineHeight: moderateScale(18),
      paddingHorizontal: scale(8),
    },
  });
