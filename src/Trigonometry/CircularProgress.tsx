import React from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import Color from "color";
import { Feather as Icon } from "@expo/vector-icons";
import Animated from 'react-native-reanimated';
import { bInterpolate } from "react-native-redash";

const { multiply, sub } = Animated;

export const STROKE_WIDTH = 40;
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center'
  },
  svg: {
    transform: [{ rotate: "-90deg"}]
  }
});

interface CircularProgressProps {
  icon: string;
  color: string;
  size: number;
  progress: Animated.Node<number>;
}

export default ({ color, size, progress, icon }: CircularProgressProps) => {
  const r = (size - STROKE_WIDTH) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumferencce = r * 2 * Math.PI;
  const a = bInterpolate(sub(1, progress), 0, Math.PI * 2);
  const strokeDashoffset = multiply(a, r);
  const backgroundColor = new Color(color).darken(0.75).string();
  return (
    <View style={styles.container}>
      <Svg style={styles.svg} width={size} height={size}>
        <Circle 
          stroke={backgroundColor} 
          strokeWidth={STROKE_WIDTH}
          {...{cx, cy, r}}  
        />
        <AnimatedCircle
          stroke={color}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${circumferencce}, ${circumferencce}`}
          strokeWidth={STROKE_WIDTH}
          {...{
            strokeDashoffset,
            cx,
            cy,
            r
          }}
        />
      </Svg>
      <View style={styles.container}>
          <Icon name={icon} size={STROKE_WIDTH} color='black' style={{top: -r}} />
      </View>
    </View>
  );
};