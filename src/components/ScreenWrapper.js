import React, {memo, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '../context/ThemeContext';

const getStyles = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      flex: 1,
    },
  });

const ScreenWrapper = memo(
  ({children, style, isSafeArea = true, edges = ['top', 'bottom']}) => {
    const {colors} = useTheme();
    const styles = useMemo(() => getStyles(colors), [colors]);

    if (!isSafeArea) {
      return (
        <View style={[styles.container, style]}>
          <View style={styles.content}>{children}</View>
        </View>
      );
    }

    return (
      <SafeAreaView style={[styles.container, style]} edges={edges}>
        <View style={styles.content}>{children}</View>
      </SafeAreaView>
    );
  },
);

ScreenWrapper.displayName = 'ScreenWrapper';

export default ScreenWrapper;
