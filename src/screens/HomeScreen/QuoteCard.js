import React, {memo, useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {QuoteIcon} from '../../components/icons';
import {useLanguage} from '../../context/LanguageContext';
import {useTheme} from '../../context/ThemeContext';
import {moderateScale, moderateVerticalScale, scale} from '../../utils/scale';
import {SHLOKA} from './homeConstants';

const QuoteCard = memo(() => {
  const {colors} = useTheme();
  const {t} = useLanguage();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.quoteCard}>
      <View style={styles.quoteMark}>
        <QuoteIcon size={moderateScale(20)} color={colors.quoteMark} />
      </View>
      <Text style={styles.quoteSanskrit}>{SHLOKA}</Text>
      <Text style={styles.quoteEnglish}>{t.shlokaTranslation}</Text>
    </View>
  );
});

QuoteCard.displayName = 'QuoteCard';

export default QuoteCard;

const createStyles = colors =>
  StyleSheet.create({
    quoteCard: {
      backgroundColor: colors.card,
      borderRadius: moderateScale(18),
      padding: scale(16),
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      shadowColor: colors.shadow,
      shadowOffset: {width: 0, height: 3},
      shadowOpacity: 1,
      shadowRadius: 8,
      elevation: 2,
    },
    quoteMark: {
      marginBottom: moderateVerticalScale(8),
    },
    quoteSanskrit: {
      fontSize: moderateScale(14),
      lineHeight: moderateScale(22),
      color: colors.darkBrown,
      fontWeight: '600',
      marginBottom: moderateVerticalScale(8),
    },
    quoteEnglish: {
      fontSize: moderateScale(12),
      lineHeight: moderateScale(18),
      color: colors.textSecondary,
    },
  });
