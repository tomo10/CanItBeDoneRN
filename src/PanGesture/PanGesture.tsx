import * as React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, { block } from "react-native-reanimated";
import Constants from "expo-constants";

import { onGestureEvent, clamp } from "react-native-redash";
import { Card, StyleGuide, cards } from "../components";
import { CARD_HEIGHT, CARD_WIDTH } from "../components/Card";

const { Value, diffClamp, cond, set, eq, add } = Animated;
const { width, height } = Dimensions.get("window");
const containerWidth = width;
const containerHeight = height - Constants.statusBarHeight - 44;

// const containerHeight = height - Constants.statusBarHeight - (Platform.OS === "ios" ? 44 : 52);

const offsetX = new Value((containerWidth - CARD_WIDTH) / 2);
const offsetY = new Value((containerHeight - CARD_HEIGHT) / 2);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background
  }
});
const [card] = cards;




const withOffset = (value: Animated.Value<number>, state: Animated.Value<State>, offset: Animated.Value<number>) => {
    return cond(
        eq(state, State.END), // if state of gesture ends. ie state === state.END.  1 === 1
        [set(offset, add(offset, value)), offset], // set offset to current value and return offset. 
        add(offset, value)) // if not, return sum of the current offset plus translation value 
};

export default () => {
    const state = new Value(State.UNDETERMINED);
    const translationX = new Value(0);
    const translationY = new Value(0);

    const gestureHandler = onGestureEvent(
        {
            state,
            translationX,
            translationY
        }
    );
    //clamp just gives min max values to restrict to within screen on this occasion
    const translateX = clamp(
        withOffset(translationX, state, offsetX),
        0,
        containerWidth - CARD_WIDTH
        );
    const translateY = clamp(
        withOffset(translationY, state, offsetY),
        0,
        containerHeight - CARD_HEIGHT
        );

  return (
    <View style={styles.container}>
        <PanGestureHandler {...gestureHandler}>
            <Animated.View style={{ transform: [{ translateX }, {translateY}]}}>
                <Card {...{ card }} />
            </Animated.View>
        </PanGestureHandler>
    </View>
  );
};

