import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView } from 'react-native';
import Header from './Header'
import StyleGuide from './components/StyleGuide';
import Animated from "react-native-reanimated";

import List, { List as ListModel } from "./List";

const list: ListModel = [
        {title: "Clock Values and Identities", navigate: 'Clock'},
        {title: "Transitions", navigate: 'Transitions'},
        {title: "Transitions Overlay", navigate: 'TransitionsOverlay'},
        {title: "Tiles", navigate: 'EventTransition'},
        {title: "Box", navigate: 'Box'},
        {title: "Callback", navigate: 'Callback'},
        {title: "Timings", navigate: 'Timings'},
        {title: "Pan Gesture", navigate: 'Pan'},
        {title: "Decay", navigate: 'Decay'},
        {title: "Spring", navigate: 'Spring'},
        {title: "Tinder", navigate: 'Tinder'},
        {title: "SVG", navigate: 'SVG'},
        {title: "Trigonometry", navigate: 'Trigonometry'},
        {title: "CircularSlider", navigate: 'CircularSlider'}
    ]

const dinoList: ListModel = [
        {title: "T-Rex"},
        {title: "Velociraptor"},
        {title: "Btrrachiosaurus"},
        {title: "Tricerotops"},
        {title: "Allosaurus"},
        {title: "Diplodocus"}
    ]

 
const HomeScreen = ({ navigation }) => {
     
    return (
        <>
        <Header/>
        <Animated.ScrollView
            scrollEventThrottle={16}
            contentContainerStyle={ { paddingTop: 50 } }
        >
            <List {...{ list, navigation, name: 'Animations' }} />
            <List {...{ navigation, list: dinoList, name: 'Dinosaurs' } } />
        </Animated.ScrollView>
      </>
    )
}

export default HomeScreen;