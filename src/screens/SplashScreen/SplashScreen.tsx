import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Image,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import imagePath from '../../constants/imagePath';

const SPLASH_DURATION_MS = 3000;
const BG_COLOR = '#B8860B';

type SplashScreenProps = {
  onFinish: () => void;
};

function SplashScreen({onFinish}: SplashScreenProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1.06)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(onFinish, SPLASH_DURATION_MS);
    return () => clearTimeout(timer);
  }, [onFinish, opacity, scale]);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Animated.View
        style={[styles.imageWrap, {opacity, transform: [{scale}]}]}>
        <Image
          source={imagePath.splash}
          style={styles.image}
          resizeMode="cover"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  imageWrap: {
    ...StyleSheet.absoluteFill,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default SplashScreen;
