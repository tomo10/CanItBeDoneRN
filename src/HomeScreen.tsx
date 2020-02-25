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
        {title: "Timings", navigate: 'Timings'},
        {title: "Pan Gesture", navigate: 'Pan'},
        {title: "Decay", navigate: 'Decay'}
    ]



const HomeScreen = ({ navigation }) => {

    return (
        <>
        <Header/>
        <Animated.ScrollView
            scrollEventThrottle={16}
            contentContainerStyle={ { paddingTop: 50 } }
        >
            <List {...{ list, navigation }} />
        </Animated.ScrollView>
      </>
    )
}

export default HomeScreen;