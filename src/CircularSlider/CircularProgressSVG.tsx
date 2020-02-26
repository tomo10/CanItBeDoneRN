import React from "react";
import { StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";

const { PI } = Math;

interface CircularProgressSVGProps {
  theta: number;
  r: number;
  bg: string;
  fg: string;
  strokeWidth: number;
}

export default ({ theta, r, bg, fg, strokeWidth }: CircularProgressSVGProps) => {
  const radius = r - strokeWidth / 2;
  return (
    <Svg style={StyleSheet.absoluteFill}>
      <Circle
        cx={r}
        cy={r}
        fill="transparent"
        stroke={bg}
        r={radius}
        {...{ strokeWidth }}
      />
    </Svg>
  );
};
