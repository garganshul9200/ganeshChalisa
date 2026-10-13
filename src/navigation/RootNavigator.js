import React, {useMemo} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTheme} from '../context/ThemeContext';
import AudioPlayerScreen from '../screens/AudioPlayerScreen/AudioPlayerScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ReadScreen from '../screens/ReadScreen/ReadScreen';

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const {colors} = useTheme();
  const contentStyle = useMemo(
    () => ({backgroundColor: colors.background}),
    [colors.background],
  );

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          contentStyle,
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ReadContent" component={ReadScreen} />
        <Stack.Screen name="AudioPlayer" component={AudioPlayerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
