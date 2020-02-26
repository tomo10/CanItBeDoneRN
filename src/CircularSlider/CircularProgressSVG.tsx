import React from "react";
import { StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";
import Animated from 'react-native-reanimated';

const {multiply} = Animated;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const { PI } = Math;

interface CircularProgressSVGProps {
  theta: Animated.Node<number>;
  r: number;
  bg: string;
  fg: string;
  strokeWidth: number;
}

export default ({ theta, r, bg, fg, strokeWidth }: CircularProgressSVGProps) => {
  const radius = r - strokeWidth / 2;
  const strokeDashoffset = multiply(theta, radius);
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${circumference}, ${circumference}`;

  return (
    <Svg style={StyleSheet.absoluteFill}>
      <Circle
        cx={r}
        cy={r} 
        stroke={bg}
        r={radius} 
        fill="transparent" 
        {...{strokeWidth}} />
      <AnimatedCircle
        cx={r}
        cy={r}
        fill="transparent"
        stroke={fg}
        r={radius}
        strokeDasharray={strokeDasharray}
        {...{ strokeWidth, strokeDashoffset }}
      />
    </Svg>
  );
};
