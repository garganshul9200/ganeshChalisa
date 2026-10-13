import React, {memo, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '../context/ThemeContext';

const ScreenWrapper = memo(({children, style, edges = ['top', 'bottom']}) => {
  const {colors} = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <SafeAreaView style={[styles.container, style]} edges={edges}>
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
});

ScreenWrapper.displayName = 'ScreenWrapper';

export default ScreenWrapper;

const createStyles = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      flex: 1,
    },
  });
