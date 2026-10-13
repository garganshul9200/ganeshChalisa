import React, {memo, useMemo} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {MenuDotsIcon} from '../../components/icons';
import {useLanguage} from '../../context/LanguageContext';
import {useTheme} from '../../context/ThemeContext';
import {moderateScale, scale} from '../../utils/scale';
import {HEADER_TITLE} from './homeConstants';

const HomeHeader = memo(({onMenuPress}) => {
  const {colors} = useTheme();
  const {t} = useLanguage();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{HEADER_TITLE}</Text>
      <Pressable
        style={styles.menuButton}
        hitSlop={8}
        onPress={onMenuPress}
        accessibilityRole="button"
        accessibilityLabel={t.openMenu}>
        <MenuDotsIcon size={moderateScale(32)} color={colors.text} />
      </Pressable>
    </View>
  );
});

HomeHeader.displayName = 'HomeHeader';

export default HomeHeader;

const createStyles = colors =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerTitle: {
      fontSize: scale(22),
      color: colors.darkBrown,
      letterSpacing: 0.3,
    },
    menuButton: {
      position: 'absolute',
      right: 0,
    },
  });
