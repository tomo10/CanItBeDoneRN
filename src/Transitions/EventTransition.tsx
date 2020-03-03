import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import {
  onGestureEvent,
  useTransition,
  bInterpolate,
  withTransition
} from "react-native-redash";
import { State, TapGestureHandler, LongPressGestureHandler } from "react-native-gesture-handler";

import { tiles, Tile, Button, StyleGuide } from "../components";

const { multiply, block, not, cond, eq, add, useCode, set, Value, } = Animated;
const { width } = Dimensions.get("window");


const withFan = (
  open: Animated.Value<number>,
  value: Animated.Value<number>,
  state: Animated.Value<number>,
  // offset: Animated.Value<number>
  ) => {
      return cond(
          eq(state, State.ACTIVE), 
          set(open, not(open)) 
      )
  }


export default () => {

    const open = new Value<0 | 1>(0);
    const state = new Value(State.UNDETERMINED);
    const translationY = new Value(0);
    const transition = withTransition(open);

    const gestureHandler = onGestureEvent(
        {
            state,
            translationY
        }
    );

    const transY = bInterpolate(transition, 0, 80);

    // useCode(() => cond(eq(state, State.END), set(open, not(open))), [
    //   open, 
    //   state
    // ]);

    
    // this block fans tiles when held > 0.5s and then released. 
    useCode(() => block([
      cond(eq(state, State.BEGAN), set(open, 1)),
      cond(eq(state, State.END), set(open, 0))
    ]), [
      open,
      state
    ])

    return (
        <View style={styles.container}>
            {/* {tiles.map((tile, index) => {
                let direction = 0;
                if (index === 0) direction = -1;
                else if (index === 2) direction = 1;

                const fanY = multiply(direction, transY);
                
                return (
                  <TapGestureHandler {...gestureHandler}>
                      <Animated.View
                        key={tile.id}
                        style={[
                          styles.overlay,
                          {
                          transform: [{ translateY: fanY }]
                          }]}
                      >
                        <Tile {...{ tile }} />            
                      </Animated.View>
                  </TapGestureHandler>
  
                )
            })} */}
            {tiles.map((tile, index) => {
                let direction = 0;
                if (index === 0) direction = -1;
                else if (index === 2) direction = 1;

                const fanY = multiply(direction, transY);
                
                return (
                  <TapGestureHandler {...gestureHandler}>
                      <Animated.View
                        key={tile.id}
                        style={[
                          styles.overlay,
                          {
                          transform: [{ translateY: fanY }]
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