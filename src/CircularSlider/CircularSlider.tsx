import React from "react";
import { Dimensions, StyleSheet, View, PixelRatio } from "react-native";
import Animated from 'react-native-reanimated';
import { StyleGuide } from "../components";
import CircularProgress from "./CircularProgress";
import Cursor from './Cursor'

const {Value} = Animated;

const { PI } = Math;
const { width } = Dimensions.get("window");
const size = width - 32;
const STROKE_WIDTH = 40;
const r = PixelRatio.roundToNearestPixel(size / 2);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    width: r * 2,
    height: r * 2
  }
});

export default () => {
  const start = new Value(0);
  const end = new Value(0);
  
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View>
          <CircularProgress
            bg={StyleGuide.palette.background}
            fg={StyleGuide.palette.primary}
            strokeWidth={STROKE_WIDTH}
            theta={PI}
            {...{ r }}
          />
        </View>
        <Cursor theta={start} size={STROKE_WIDTH} r={r - STROKE_WIDTH / 2}  />
        <Cursor theta={end} size={STROKE_WIDTH} r={r - STROKE_WIDTH / 2} />
      </View>
    </View>
  );
};
