import React, {memo, useMemo} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import imagePath from '../constants/imagePath';
import {useTheme} from '../context/ThemeContext';
import {moderateScale, moderateVerticalScale, scale} from '../utils/scale';

const ScreenHeader = ({
  title,
  onBack,
  onRightPress,
  rightAccessibilityLabel,
}) => {
  const {colors} = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.header}>
      <Pressable
        style={styles.headerSide}
        onPress={onBack}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel="Go back">
        <Image
          source={imagePath.backButton}
          style={styles.icon}
          resizeMode="contain"
          tintColor={colors.darkBrown}
        />
      </Pressable>
      <Text style={styles.headerTitle} numberOfLines={1}>
        {title || ''}
      </Text>
      {onRightPress ? (
        <Pressable
          style={styles.headerSide}
          onPress={onRightPress}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={rightAccessibilityLabel}>
          <Image
            source={imagePath.fontIcon}
            style={styles.icon}
            resizeMode="contain"
            tintColor={colors.darkBrown}
          />
        </Pressable>
      ) : (
        <View style={styles.headerSide} />
      )}
    </View>
  );
};

ScreenHeader.displayName = 'ScreenHeader';

export default memo(ScreenHeader);

const createStyles = colors =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: scale(16),
      paddingBottom: moderateVerticalScale(10),
    },
    headerSide: {
      width: moderateScale(40),
      height: moderateScale(40),
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      width: moderateScale(24),
      height: moderateScale(24),
    },
    headerTitle: {
      flex: 1,
      textAlign: 'center',
      fontSize: moderateScale(20),
      fontWeight: '700',
      color: colors.darkBrown,
    },
  });
