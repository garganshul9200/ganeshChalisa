import React, {memo, useMemo} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useLanguage} from '../../context/LanguageContext';
import {useTheme} from '../../context/ThemeContext';
import {moderateScale, moderateVerticalScale, scale} from '../../utils/scale';
import {EXPLORE_ITEMS} from './homeConstants';

const ExploreCard = memo(({item, title, subtitle, styles, colors, onPress}) => (
  <Pressable style={styles.exploreCard} onPress={onPress}>
    <View style={styles.exploreIconWrap}>
      <item.Icon size={moderateScale(26)} color={colors.primary} />
    </View>
    <Text style={styles.exploreTitle}>{title}</Text>
    <Text style={styles.exploreSubtitle}>{subtitle}</Text>
  </Pressable>
));

ExploreCard.displayName = 'ExploreCard';

const ExploreSection = memo(({onItemPress}) => {
  const {colors} = useTheme();
  const {t} = useLanguage();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View>
      <Text style={styles.sectionTitle}>{t.explore}</Text>
      <View style={styles.exploreGrid}>
        {EXPLORE_ITEMS.map(item => {
          const title = t[item.titleKey];
          return (
            <ExploreCard
              key={item.key}
              item={item}
              title={title}
              subtitle={t[item.subtitleKey]}
              styles={styles}
              colors={colors}
              onPress={() => onItemPress(title, item.key)}
            />
          );
        })}
      </View>
    </View>
  );
});

ExploreSection.displayName = 'ExploreSection';

export default ExploreSection;

const createStyles = colors =>
  StyleSheet.create({
    sectionTitle: {
      fontSize: moderateScale(22),
      fontWeight: '700',
      color: colors.darkBrown,
      marginBottom: moderateVerticalScale(12),
    },
    exploreGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      rowGap: scale(12),
      marginBottom: moderateVerticalScale(18),
    },
    exploreCard: {
      width: '48%',
      backgroundColor: colors.card,
      borderRadius: moderateScale(18),
      paddingVertical: moderateVerticalScale(16),
      paddingHorizontal: scale(14),
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      shadowColor: colors.shadow,
      shadowOffset: {width: 0, height: 3},
      shadowOpacity: 1,
      shadowRadius: 8,
      elevation: 2,
      minHeight: moderateVerticalScale(108),
    },
    exploreIconWrap: {
      marginBottom: moderateVerticalScale(10),
    },
    exploreTitle: {
      fontSize: moderateScale(14),
      fontWeight: '700',
      color: colors.darkBrown,
      marginBottom: moderateVerticalScale(4),
    },
    exploreSubtitle: {
      fontSize: moderateScale(11),
      color: colors.textSecondary,
      lineHeight: moderateScale(15),
    },
  });
