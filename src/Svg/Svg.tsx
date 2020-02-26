import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import Constants from "expo-constants";

import { StyleGuide } from "../components";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { onGestureEvent } from "react-native-redash";

const { Value, sub, multiply } = Animated;

const { width, height } = Dimensions.get("window");
const AnimatedEllipse = Animated.createAnimatedComponent(Ellipse);
const containerWidth = width;
const containerHeight = height - Constants.statusBarHeight - 44;
const center = {
  x: containerWidth / 2,
  y: containerHeight / 2
};
const radius = 100;
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const canvas2Euclidean = (x: Animated.Value<number>, y: Animated.Value<number>) => {
  return {
    rx: sub(x, center.y),
    ry: multiply(sub(y, center.y), -1)
  }
}

export default () => {
    const x = new Value(0);
    const y = new Value(0);
    const state = new Value(State.UNDETERMINED);
    const gestureHandler = onGestureEvent({
        x,
        y,
        state
    });
    const {rx, ry} = canvas2Euclidean(x, y);
  return (
    <View style={styles.container}>
      <Svg style={StyleSheet.absoluteFill}>
        <AnimatedEllipse
          cx={center.x}
          cy={center.y}
          rx={rx}
          ry={ry}
          fill={StyleGuide.palette.primary}
        />
      </Svg>
      <PanGestureHandler {...gestureHandler}>
          <Animated.View style={StyleSheet.absoluteFill} />
      </PanGestureHandler>
    </View>
  );
};