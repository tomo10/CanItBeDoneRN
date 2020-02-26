// import * as React from 'react';
// import Animated from 'react-native-reanimated';
// import { View, StyleSheet } from 'react-native';
// import { PanGestureHandler, State } from 'react-native-gesture-handler';
// import { withOffset } from 'react-native-redash';
// import { canvas2Polar, polar2Canvas } from "./Coordinates";

// const { event, Value, useCode, set, block } = Animated;

// interface CursorProps {
//     theta: Animated.Value<number>;
//     r: number;
//     size: number;
// }

// export default ({theta, r, size}: CursorProps) => {
//     const translationX = new Value(0)
//     const translationY = new Value(0)
//     const state = new Value(State.UNDETERMINED);
//     const onGestureEvent = event([{
//         nativeEvent: {
//             state,
//             translationX,
//             translationY
//         }
//     }]);

//     const center = {x: r, y: r};
//     const x = withOffset({ value: translationX, state });
//     const y = withOffset({ value: translationY, state });
//     const alpha = canvas2Polar({x, y}, center).theta;
//     const polar = canvas2Polar({ x: translationX, y: translationY}, {x: r, y: r});
//     const {x: translateX, y: translateY} = polar2Canvas(
//         { theta: polar.theta, radius: r}, 
//         center
//     );
//     // useCode(() => set(theta, alpha), [alpha, theta]);
    
    
//     return (
//         <PanGestureHandler onHandlerStateChange={onGestureEvent} {...{onGestureEvent}}>
//             <Animated.View 
//              style={{
//                 ...StyleSheet.absoluteFillObject,
//                 width: size, 
//                 height: size, 
//                 borderRadius: size / 2, 
//                 backgroundColor: "red",
//                 transform: [{ translateX }, { translateY }]
//                 }} />
//         </PanGestureHandler>
//     )
// }

import * as React from "react";
import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { canvas2Polar, polar2Canvas } from "./Coordinates";
import { withOffset, StyleGuide } from "../components";

const { Value, block, event, set, useCode } = Animated;

interface CursorProps {
  r: number;
  theta: Animated.Value<number>;
  strokeWidth: number;
  backgroundColor?: Animated.Node<number>;
}

export default ({ r, theta, strokeWidth, backgroundColor }: CursorProps) => {
  const center = { x: r, y: r };
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
  useCode(() => block([set(theta, canvas2Polar({ x, y }, center).theta)]), [
    center,
    theta,
    x,
    y
  ]);
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
          
        }}
      />
    </PanGestureHandler>
  );
};