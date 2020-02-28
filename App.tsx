import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ClockValuesAndIdentities from './src/ClockValue/ClockValuesAndIdentities';
import HomeScreen from './src/HomeScreen';
import Transitions from './src/Transitions/Transitions';
import TransitionsOverlay from './src/Transitions/TransitionsOverlay';
import Timings from './src/Timing/Timings';
import PanGesture from './src/PanGesture/PanGesture';
import Decay from './src/Decay/Decay';
import SVG from './src/Svg/Svg';
import Trigonometry from './src/Trigonometry/Trigonometry';
import CircularSlider from './src/CircularSlider/CircularSlider';
import Tinder from './src/Tinder/Events';
import Spring from './src/Spring/Spring';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='HomeScreen'>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Clock" component={ClockValuesAndIdentities} />
        <Stack.Screen name="Transitions" component={Transitions} />
        <Stack.Screen name="TransitionsOverlay" component={TransitionsOverlay} />
        <Stack.Screen name="Timings" component={Timings} />
        <Stack.Screen name="Pan" component={PanGesture} />
        <Stack.Screen name="Decay" component={Decay} />
        <Stack.Screen name="Spring" component={Spring} />
        <Stack.Screen name="Tinder" component={Tinder} />
        <Stack.Screen name="SVG" component={SVG} />
        <Stack.Screen name="Trigonometry" component={Trigonometry} />
        <Stack.Screen name="CircularSlider" component={CircularSlider} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
