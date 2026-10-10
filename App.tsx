/**
 * Ganesh Chalisa
 *
 * @format
 */

import React, {useCallback, useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from './src/screens/SplashScreen/SplashScreen';

function HomePlaceholder() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={styles.title}>Ganesh Chalisa</Text>
      </View>
    </SafeAreaView>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <SafeAreaProvider>
      {showSplash ? (
        <SplashScreen onFinish={handleSplashFinish} />
      ) : (
        <HomePlaceholder />
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#111111',
  },
});

export default App;
