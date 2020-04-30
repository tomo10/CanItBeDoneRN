import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ClockValuesAndIdentities from './src/ClockValue/ClockValuesAndIdentities';
import HomeScreen from './src/HomeScreen';
import Transitions from './src/Transitions/Transitions';
import TransitionsOverlay from './src/Transitions/TransitionsOverlay';
import EventTransition from './src/Transitions/EventTransition';
import Timings from './src/Timing/Timings';
import PanGesture from './src/PanGesture/PanGesture';
import Decay from './src/Decay/Decay';
import Box from './src/Box/Box';
import Callback from './src/Box/Callback';
import CalX from './src/Box/CalX';
import SVG from './src/Svg/Svg';
import Trigonometry from './src/Trigonometry/Trigonometry';
import CircularSlider from './src/CircularSlider/CircularSlider';
import TimeGrid from './src/TimeGrid/TimeGrid';
import Calendar from './src/Calendar/Calendar';
import SimpleSlider from './src/SimpleSlider/Slider';
import Swipe from './src/Swipe';
import Event from './src/EventDetailsPage/Event';
import Header from './src/EventDetailsPage/Header';
// import Spotify from './src/Spotify/Spotify';
import Spring from './src/Spring/Spring';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='HomeScreen' headerMode='screen'>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Clock" component={ClockValuesAndIdentities} />
        <Stack.Screen name="Transitions" component={Transitions} />
        <Stack.Screen name="TransitionsOverlay" component={TransitionsOverlay} />
        <Stack.Screen name="EventTransition" component={EventTransition} />
        <Stack.Screen name="Timings" component={Timings} />
        <Stack.Screen name="Pan" component={PanGesture} />
        <Stack.Screen name="Decay" component={Decay} />
        <Stack.Screen name="Spring" component={Spring} />
        <Stack.Screen name="Swipe" component={Swipe} />
        <Stack.Screen name="SVG" component={SVG} />
        <Stack.Screen name="Trigonometry" component={Trigonometry} />
        <Stack.Screen name="Box" component={Box} />
        <Stack.Screen name="CalX" component={CalX} />
        <Stack.Screen name="CircularSlider" component={CircularSlider} />
        <Stack.Screen name="TimeGrid" component={TimeGrid} />
        <Stack.Screen name="Calendar" component={Calendar} />
        <Stack.Screen name="SimpleSlider" component={SimpleSlider} />
        <Stack.Screen name="Callback" component={Callback} />
        <Stack.Screen 
          name="Event" 
          component={Event}
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: 'black',
              // height: 80
            },
            headerTintColor: "white",
            // headerTitle: <Header />,
            headerBackTitleVisible: false
          }}
        />
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
