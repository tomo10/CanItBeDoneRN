import * as React from "react";
import { View, StyleSheet, Text, StatusBar, SafeAreaView } from "react-native";
import { Event as EventModel } from "./Model";
import Image from "./Image";
import Animated from "react-native-reanimated";
import Content from "./Content";


const event: EventModel = {
    title: "Rave",
    startDate: "Tomorrow",
    notes: "Will be epic",
    location: "Boom",
    guests: [
        {name: "Thomas"},
        {name: "Tim"}
    ]
}


interface EventProps {
    event: Event;
}

export default () => {
    const y = new Animated.Value(0);
 
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" hidden={false} backgroundColor="#6a51ae" />
            <Image {...{event, y}} />
            <Content {...{event, y}} />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "black",
    },
    text: {
        color: 'white'
    }
  });