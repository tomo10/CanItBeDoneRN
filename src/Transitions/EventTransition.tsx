import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import {
  onGestureEvent,
  withTransition,
  bInterpolate
} from "react-native-redash";
import { State, TapGestureHandler } from "react-native-gesture-handler";

import { tiles, Tile, Button, StyleGuide } from "../components";

const { multiply, interpolate, not, cond, eq, add, useCode, set, Value, } = Animated;
const { width } = Dimensions.get("window");


const withOffset = (
  value: Animated.Node<number>,
  state: Animated.Value<number>,
  offset: Animated.Value<number>
  ) => {
      return cond(
          eq(state, State.ACTIVE), value, set(offset, value)
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
    // const translationX = new Value(0);
    // const translationY = new Value(0);
    // const offsetX = new Value(0);
    // const offsetY = new Value(0);
    const gestureHandler = onGestureEvent(
        {
            state
        }
    );

    const height = bInterpolate(
      transition,
      0,
      240
  );

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

                // const rotate = multiply(direction, interpolate(transition, {
                //     inputRange: [0, 1],
                //     outputRange: [0, 1]
                //   }))
                

                return (
                  <TapGestureHandler {...gestureHandler}>
                      <Animated.View
                        key={tile.id}
                        style={[
                          styles.overlay,
                          {
                            height
                          }
                      ]}
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