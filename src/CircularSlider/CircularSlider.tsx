import React from "react";
import { Dimensions, StyleSheet, View, PixelRatio } from "react-native";
import Animated from 'react-native-reanimated';
import { StyleGuide } from "../components";
import CircularProgress from "./CircularProgress";
import CircularProgressSVG from "./CircularProgressSVG";
import Cursor from './Cursor'

const {Value, sub, cond, lessThan, add} = Animated

const { PI } = Math;
const { width } = Dimensions.get("window");
const size = width - 32;
const STROKE_WIDTH = 40;
const r = PixelRatio.roundToNearestPixel(size / 2);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  content: {
    width: r * 2,
    height: r * 2
  }
});

export default () => {
  const start = new Value(0);
  const end = new Value(0);
  const theta = sub(
    cond(lessThan(start, end), end, add(2 * PI, end)), 
    start); // if start < end. subtract start from end. If not add 2PI to end value
  const rotate = sub(2 * PI, start);
  // const rotate = sub(PI, end);
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animated.View style={{...StyleSheet.absoluteFillObject, transform: [{ rotate }]}}>
          <CircularProgressSVG
            bg={StyleGuide.palette.background}
            fg={StyleGuide.palette.primary}
            strokeWidth={STROKE_WIDTH}
            // theta={PI}
            {...{ r, theta }}
          />
        </Animated.View>
        <Cursor theta={start} strokeWidth={STROKE_WIDTH} r={r - STROKE_WIDTH / 2}  />
        <Cursor theta={end} strokeWidth={STROKE_WIDTH} r={r - STROKE_WIDTH / 2} />
      </View>
    </View>
  );
};
