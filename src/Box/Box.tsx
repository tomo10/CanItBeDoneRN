import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated from "react-native-reanimated";
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import { onGestureEvent } from "react-native-redash";

const { event, cond, eq, Value } = Animated;

export default () => {

    const state = new Value(-1);
    const gestureHandler = onGestureEvent({
        state
    });
    const opacity = cond(eq(state, State.BEGAN), 0.2, 1);

    return (
        <View style={styles.container}>
            <TapGestureHandler {...gestureHandler}>
                <Animated.View style={[styles.box, {opacity: opacity}]} />
            </TapGestureHandler>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    box: {
      backgroundColor: "tomato",
      width: 200,
      height: 200,
    },
  });