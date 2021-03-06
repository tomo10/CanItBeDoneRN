import * as React from "react";
import { StyleSheet, Text } from "react-native";
import Animated from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { canvas2Polar, polar2Canvas } from "./Coordinates";
import { withOffset, StyleGuide } from "../components";

const { Value, block, event, set, useCode, cond, eq, call } = Animated;

interface CursorProps {
  r: number;
  theta: Animated.Value<number>;
  strokeWidth: number;
  backgroundColor?: Animated.Node<number>;
  renderCoords?: JSX.Element;  
  title: string;
}

export default ({ r, theta, strokeWidth, backgroundColor, renderCoords, title }: CursorProps) => {
  const center = { x: r, y: r };
  console.log('center', center)
  const translationX = new Value(0);
  const translationY = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const x = withOffset({ value: translationX, state });
  const y = withOffset({ value: translationY, state });

  const onGestureEvent = event([
    {
      nativeEvent: {
        translationX,
        translationY,
        state
      }
    }
  ]);
  useCode(() => block([
      set(theta, canvas2Polar({ x, y }, center).theta),
      cond(
        eq(
          state, State.END), 
          call([x, y], ([x, y]) => renderCoords( x, y ))
      )
      ]), 
      [state, center, theta, x, y]
    );

  const { x: translateX, y: translateY } = polar2Canvas(
    { theta, radius: r },
    center
  );

  return (
    <PanGestureHandler
      onHandlerStateChange={onGestureEvent}
      {...{ onGestureEvent }}
    >
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: StyleGuide.palette.primary,
          width: strokeWidth,
          height: strokeWidth,
          borderRadius: strokeWidth / 2,
          transform: [{ translateX }, { translateY }],
          borderColor: "white",
          borderWidth: 5,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text>{title}</Text>
      </Animated.View>
    </PanGestureHandler>
  );
};