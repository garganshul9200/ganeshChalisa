/**
 * Ganesh Chalisa
 *
 * @format
 */

import React, {useCallback, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AudioProvider} from './src/context/AudioContext';
import {LanguageProvider} from './src/context/LanguageContext';
import {ThemeProvider} from './src/context/ThemeContext';
import RootNavigator from './src/navigation/RootNavigator';
import SplashScreen from './src/screens/SplashScreen/SplashScreen';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <LanguageProvider>
          <AudioProvider>
            {showSplash ? (
              <SplashScreen onFinish={handleSplashFinish} />
            ) : (
              <RootNavigator />
            )}
          </AudioProvider>
        </LanguageProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
