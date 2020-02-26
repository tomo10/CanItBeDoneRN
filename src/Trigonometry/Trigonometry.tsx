import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { timing, bInterpolate } from "react-native-redash";

import Animated from 'react-native-reanimated';
import CircularProgress, { STROKE_WIDTH } from "./CircularProgress";

const { Value, useCode, set } = Animated;
const { width } = Dimensions.get("window");
const s1 = width - 64;
const s2 = s1 - STROKE_WIDTH * 2;
const s3 = s2 - STROKE_WIDTH * 2;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000001"
  }
});

export default () => {
    const progress = new Value(0);
    const p1 = bInterpolate(progress, 0, 0.33); // bInterpolate means binary interpolate. means if going from 0 to 1 (or 0.33 here) dont need write input range 0 to 1 like you do with interpolate
    const p2 = bInterpolate(progress, 0, 0.5);
    const p3 = bInterpolate(progress, 0, 0.8);
    useCode(() => set(progress, timing({ duration: 5000 })), [])
  return (
    <View style={styles.container}>
      <CircularProgress
        size={s1}
        color="#DF0B18"
        progress={p1}
        icon="chevron-right"
      />
      <CircularProgress
        size={s2}
        color="#48E101"
        progress={p2}
        icon="chevrons-right"
      />
      <CircularProgress
        size={s3}
        color="#00C3DD"
        progress={p3}
        icon="chevron-up"
      />
    </View>
  );
};
