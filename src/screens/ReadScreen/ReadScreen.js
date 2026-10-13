import React, {memo, useMemo} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ScreenHeader from '../../components/ScreenHeader';
import ScreenWrapper from '../../components/ScreenWrapper';
import {useLanguage} from '../../context/LanguageContext';
import {useTheme} from '../../context/ThemeContext';
import {moderateScale, moderateVerticalScale, scale} from '../../utils/scale';
import {useReadScreen} from './useReadScreen';

const LanguageTabs = memo(({tabs, active, onSelect, styles, colors}) => (
  <View style={styles.tabsWrap}>
    {tabs.map((tab, index) => {
      const isActive = active === tab.key;
      return (
        <React.Fragment key={tab.key}>
          {index > 0 ? <View style={styles.tabDivider} /> : null}
          <Pressable
            style={[
              styles.tab,
              isActive && {backgroundColor: colors.primary},
            ]}
            onPress={() => onSelect(tab.key)}>
            <Text
              style={[
                styles.tabLabel,
                {color: isActive ? colors.onPrimary : colors.text},
              ]}>
              {tab.label}
            </Text>
          </Pressable>
        </React.Fragment>
      );
    })}
  </View>
));

LanguageTabs.displayName = 'LanguageTabs';

const VerseDivider = memo(({styles}) => (
  <View style={styles.dividerRow}>
    <View style={styles.dividerLine} />
    <Text style={styles.lotus}>✦</Text>
    <View style={styles.dividerLine} />
  </View>
));

VerseDivider.displayName = 'VerseDivider';

const ReadScreen = ({navigation, route}) => {
  const content = route.params?.content;
  const {colors} = useTheme();
  const {t} = useLanguage();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const {
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
  } = useReadScreen(content);

  return (
    <ScreenWrapper>
      <View style={styles.root}>
        <ScreenHeader
          title={headerTitle}
          onBack={() => navigation.goBack()}
          onRightPress={cycleFontSize}
          rightAccessibilityLabel={t.changeFontSize}
        />

        <LanguageTabs
          tabs={languageTabs}
          active={language}
          onSelect={onSelectLanguage}
          styles={styles}
          colors={colors}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          scrollEventThrottle={16}
          onScroll={onScroll}>
          <VerseDivider styles={styles} />

          {verses.map((verse, index) => (
            <View key={verse.id}>
              <Pressable
                style={[
                  styles.verseBlock,
                  activeVerseIndex === index && {
                    backgroundColor: colors.primarySoft,
                  },
                ]}
                onPress={() => onVersePress(index)}>
                <Text style={[styles.verseText, {fontSize}]}>{verse.text}</Text>
              </Pressable>
              {verse.showDividerAfter ? <VerseDivider styles={styles} /> : null}
            </View>
          ))}

          <View style={styles.devotionCard}>
            <View style={styles.devotionIcon}>
              <Text style={styles.devotionIconText}>🙏</Text>
            </View>
            <Text style={styles.devotionText}>{t.readDevotion}</Text>
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default memo(ReadScreen);

const createStyles = colors =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: colors.background,
    },
    tabsWrap: {
      marginHorizontal: scale(20),
      marginBottom: moderateVerticalScale(8),
      flexDirection: 'row',
      borderRadius: moderateScale(22),
      backgroundColor: colors.card,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      overflow: 'hidden',
    },
    tab: {
      flex: 1,
      paddingVertical: moderateVerticalScale(10),
      alignItems: 'center',
      justifyContent: 'center',
    },
    tabLabel: {
      fontSize: moderateScale(13),
      fontWeight: '600',
    },
    tabDivider: {
      width: StyleSheet.hairlineWidth,
      backgroundColor: colors.border,
    },
    scrollContent: {
      paddingHorizontal: scale(20),
      paddingBottom: moderateVerticalScale(28),
    },
    dividerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: moderateVerticalScale(12),
      gap: scale(8),
    },
    dividerLine: {
      flex: 1,
      height: StyleSheet.hairlineWidth,
      backgroundColor: colors.primarySoft,
    },
    lotus: {
      fontSize: moderateScale(12),
      color: colors.primary,
    },
    verseBlock: {
      paddingVertical: moderateVerticalScale(10),
      paddingHorizontal: scale(12),
      borderRadius: moderateScale(14),
      marginBottom: moderateVerticalScale(4),
    },
    verseText: {
      color: colors.darkBrown,
      textAlign: 'center',
      lineHeight: moderateScale(34),
    },
    devotionCard: {
      marginTop: moderateVerticalScale(16),
      flexDirection: 'row',
      alignItems: 'center',
      gap: scale(12),
      backgroundColor: colors.primarySoft,
      borderRadius: moderateScale(18),
      paddingVertical: moderateVerticalScale(14),
      paddingHorizontal: scale(14),
    },
    devotionIcon: {
      width: moderateScale(44),
      height: moderateScale(44),
      borderRadius: moderateScale(22),
      backgroundColor: colors.card,
      alignItems: 'center',
      justifyContent: 'center',
    },
    devotionIconText: {
      fontSize: moderateScale(20),
    },
    devotionText: {
      flex: 1,
      fontSize: moderateScale(13),
      lineHeight: moderateScale(20),
      color: colors.primaryDark,
    },
  });
