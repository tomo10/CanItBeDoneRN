import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

const {
    Extrapolate,
    Value,
    call,
    concat,
    cond,
    diffClamp,
    divide,
    eq,
    interpolate,
    multiply,
    round,
    sub,
    useCode
  } = Animated;
import { ReText, onGestureEvent, withOffset } from "react-native-redash";

import Knob, { KNOB_SIZE } from "./Knob";
const { width } = Dimensions.get("window");
const SLIDER_WIDTH = width - 150;
const RULER_HEIGHT = 20;


export default () => {
  
    const state = new Value(State.UNDETERMINED);
    const translationX = new Value(0);
    const gestureHandler = onGestureEvent({ state, translationX })
    const x = diffClamp(withOffset(translationX, state), 0, SLIDER_WIDTH); // with offset needed so we can remember once gesture is realeased where new transX value is for next time. ie with offeset. 
    // diffClamp means the translateX value has min of 0 and max SLIDER_WIDTH. ie cant come of slider!
    const translateX = sub(x, KNOB_SIZE / 2);

  
  const scaleX = interpolate(x, {
    inputRange: [0, SLIDER_WIDTH],
    // https://github.com/facebook/react-native/issues/6278
    outputRange: [0.0001, 1]
  });
  const value = round(multiply(divide(x, SLIDER_WIDTH), 100));
  const label = concat(value);
  useCode(() => 
        cond(
        eq(
            state, State.END), 
            call([value], ([v]) => console.log({ v }))
        ), [state, value]
    )

    return (
        <View style={styles.container}>
            <View style={styles.slider}>
                <View>
                <View style={styles.backgroundSlider} />
                <View style={styles.sides}>
                    <View style={styles.left} />
                    <View style={styles.right} />
                </View>
                <Animated.View
                    style={[
                    styles.backgroundSlider,
                    {
                        ...StyleSheet.absoluteFillObject,
                        backgroundColor: 'pink',
                        transform: [
                        { translateX: -SLIDER_WIDTH / 2 }, // set origin to left edge of bar
                        { scaleX },
                        { translateX: SLIDER_WIDTH / 2 } // set it back to original at end. ie reverse above.
                        ]
                    }
                    ]}
                />
                </View>
                <PanGestureHandler minDist={0} {...gestureHandler}>
                <Animated.View
                    style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: KNOB_SIZE,
                    height: KNOB_SIZE,
                    transform: [{ translateX }]
                    }}
                >
                    <Knob {...{ state }} />
                </Animated.View>
                </PanGestureHandler>
            </View>
            <ReText text={label} />
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#a9cbee",
      justifyContent: "center",
      alignItems: "center"
    },
    slider: {
      width: SLIDER_WIDTH,
      height: 50,
      justifyContent: "center"
    },
    backgroundSlider: {
      height: RULER_HEIGHT,
      backgroundColor: "white"
    },
    sides: {
      ...StyleSheet.absoluteFillObject,
      flexDirection: "row",
      justifyContent: "space-between"
    },
    left: {
      height: RULER_HEIGHT,
      width: RULER_HEIGHT,
      borderRadius: RULER_HEIGHT / 2,
      backgroundColor: "white",
      left: -RULER_HEIGHT / 2
    },
    right: {
      left: RULER_HEIGHT / 2,
      height: RULER_HEIGHT,
      width: RULER_HEIGHT,
      borderRadius: RULER_HEIGHT / 2,
      backgroundColor: "white"
    }
  });