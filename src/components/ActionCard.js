import React, {memo, useMemo} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {useTheme} from '../context/ThemeContext';
import {moderateScale, moderateVerticalScale, scale} from '../utils/scale';

const ActionCard = memo(({label, Icon, onPress}) => {
  const {colors} = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Icon size={moderateScale(28)} color={colors.primary} />
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
});

ActionCard.displayName = 'ActionCard';

export default ActionCard;

const createStyles = colors =>
  StyleSheet.create({
    card: {
      flex: 1,
      borderRadius: moderateScale(20),
      paddingVertical: moderateVerticalScale(18),
      paddingHorizontal: scale(12),
      alignItems: 'center',
      justifyContent: 'center',
      gap: moderateVerticalScale(8),
      minHeight: moderateVerticalScale(96),
      backgroundColor: colors.card,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      shadowColor: colors.shadow,
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 1,
      shadowRadius: 10,
      elevation: 3,
    },
    label: {
      fontSize: moderateScale(16),
      fontWeight: '700',
      color: colors.darkBrown,
    },
  });
