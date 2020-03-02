import * as React from "react"
import { View, Text, StyleSheet, Platform, StatusBar } from "react-native"
import Animated from "react-native-reanimated";

const HEADER_HEIGHT = Platform.OS == 'ios' ? 75 : 70;

export default (props) => {

    const {scrollY} = props;
    const diffClampScrollY = Animated.diffClamp(
        scrollY,
        0,
        HEADER_HEIGHT
    )
    // this clamps the scrollY value at 0 and HH. Therefore header reappears immediately when you scroll up rather than waiting to get back to HH

    const headerY = Animated.interpolate(diffClampScrollY, {
        inputRange: [0, HEADER_HEIGHT],
        outputRange: [0, -HEADER_HEIGHT]
    })

    return (
        <Animated.View
            style={{
                height: HEADER_HEIGHT,
                top: 0,
                left: 0,
                right: 0,
                backgroundColor: "pink",
                zIndex: 10,
                transform: [{ translateY: headerY }]
          }}
        >
        </Animated.View>
    )
}