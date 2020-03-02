import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import {
  onGestureEvent,
  useTransition,
  bInterpolate,
  withTransition
} from "react-native-redash";
import { State, TapGestureHandler } from "react-native-gesture-handler";

import { tiles, Tile, Button, StyleGuide } from "../components";

const { multiply, interpolate, not, cond, eq, add, useCode, set, Value, } = Animated;
const { width } = Dimensions.get("window");


const withOffset = (
  value: Animated.Value<number>,
  state: Animated.Value<number>,
  offset: Animated.Value<number>
  ) => {
      return cond(
          eq(state, State.END), 
          [set(offset, add(offset, value)), offset] // set offset to current value and return offset
          
      )
  }


export default () => {
    // const [toggled, setToggled] = useState<0 | 1>(0);

    // const transition = useTransition(toggled, not(toggled), toggled);
    // const transition = (
    //   <Transition.Change durationMs={500} interpolation="easeInOut"  />
    //   );
    const open = new Value<0 | 1>(0);

    const transition = withTransition(open);

    const state = new Value(State.UNDETERMINED);
    const translationY = new Value(0);

    const gestureHandler = onGestureEvent(
        {
            state,
            translationY
        }
    );

  //   const height = bInterpolate(
  //     transition,
  //     0,
  //     240
  // );

    const transY = bInterpolate(transition, 0, 80);

    // const addY = add(offsetY, translationX);
    // const addX = add(offsetX, translationY);

    // const translateX = withOffset(addX, state, offsetX);
    // const translateY = cond(eq(state, State.ACTIVE), addY, set(offsetY, addY));
    // const translateX = cond(eq(state, State.ACTIVE), addY, set(offsetY, addY));

    useCode(() => cond(eq(state, State.END), set(open, not(open))), [
      open, state
    ]);

    return (
        <View style={styles.container}>
            {tiles.map((tile, index) => {
                let direction = 0;
                if (index === 0) direction = -1;
                else if (index === 2) direction = 1;

                const newb = multiply(direction, transY);
                

                return (
                  <TapGestureHandler {...gestureHandler}>
                      <Animated.View
                        key={tile.id}
                        style={[
                          styles.overlay,
                          {
                          transform: [{ translateY: newb }]
                          }]}
                      >
                        <Tile {...{ tile }} />            
                      </Animated.View>
                  </TapGestureHandler>
                )
            })}
            {/* <Button label={toggled ? "Reset" : "Start"} primary onPress={() => setToggled(toggled ^ 1)} /> */}
        </View>
    )
}

//--------------STYLE------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end"
  },
  overlay: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center'
  }
})