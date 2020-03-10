  
import * as React from "react";
import {
  Image, StyleSheet
} from "react-native";
import Animated from "react-native-reanimated";
import { Event, MAX_HEADER_HEIGHT, HEADER_DELTA } from "./Model";
import { BUTTON_HEIGHT } from "./Reply";


const { interpolate, Extrapolate } = Animated;

interface ImageProps {
    event: Event;
    y: Animated.Value<number>;
}

export default ({ event: {image}, y}: ImageProps) => {
console.log('M_H_H:', MAX_HEADER_HEIGHT)

    // const height: any = interpolate(y, {
    //     inputRange: [0, 300],
    //     outputRange: [MAX_HEADER_HEIGHT + 100, 300],
    //     extrapolate: Extrapolate.CLAMP
    // });

    const scale: any = interpolate(y, {
        inputRange: [-MAX_HEADER_HEIGHT, 0],
        outputRange: [2, 1],
        extrapolateRight: Extrapolate.CLAMP,
      });

    const opacity = interpolate(y, {
        inputRange: [-64, 0, HEADER_DELTA],
        outputRange: [0, 0.2, 1],
        extrapolate: Extrapolate.CLAMP
    })

    return (
        <Animated.View style={[styles.container, {transform: [{ scale }] }]}>
            <Animated.View
                style={{ ...StyleSheet.absoluteFillObject, backgroundColor: "black", opacity }}
            />
        </Animated.View>
    )
}


const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: MAX_HEADER_HEIGHT + BUTTON_HEIGHT * 2,
      backgroundColor: 'white'
    }
  });