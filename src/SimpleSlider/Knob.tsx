import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { eq, not } from "react-native-reanimated";
import { State } from "react-native-gesture-handler";

interface KbobProps {
    state: Animated.Node<State>;
}

export const KNOB_SIZE = 40;


const styles = StyleSheet.create({
    container: {
        width: 50,
        height: 50
    }, 
    image: {
        ...StyleSheet.absoluteFillObject,
        width: 40,
        height: 40,
        backgroundColor: 'black'
    }
})


export default ({ state }: KbobProps) => {

    return (
        <View style={styles.container}>
            <Animated.View style={styles.image} />
        </View>
    )
}