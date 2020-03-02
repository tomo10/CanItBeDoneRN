import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { onGestureEvent } from "react-native-redash";
const { width, height } = Dimensions.get("window");

const { cond, eq, add, call, set, Value, event, interpolate, Extrapolate, block } = Animated;

const withOffset = (
    value: Animated.Node<number>,
    state: Animated.Value<number>,
    offset: Animated.Value<number>
    ) => {
        return cond(
            eq(state, State.ACTIVE), value, set(offset, value)
        )
    }

// const onDrop = () => {

// }

// const saveDropZone = (e) => {
//     const {width, height, x, y} = event.nativeEvent.layout;
//     const top = y;
//     const bottom = y + height;
//     const left = x;
//     const right = x + width;

// }

const Callback = () => {

    const dragX = new Value(0)
    const dragY = new Value(0);
    const offsetX = new Value( width / 2);
    const offsetY = new Value(100);
    const state = new Value(-1);
    const gestureHandler = onGestureEvent({
        translationX: dragX,
        translationY: dragY, 
        state
    });

    const addY = add(offsetY, dragY);
    const addX = add(offsetX, dragX);
    // two different ways of doing it below. one with function one without
    const transX = withOffset(addX, state, offsetX);
    const transY = cond(eq(state, State.ACTIVE), addY, set(offsetY, addY));


    // const translateX = withOffset(addX, state, offsetX)
    
    
    return (
        <View style={styles.container}>
          <View style={styles.dropZone} />
          <PanGestureHandler 
            maxPointers={1}
            {...gestureHandler}
          >
            <Animated.View style={[styles.box, {
                transform: [
                    {
                        translateX: transX
                    },
                    {
                        translateY: transY
                    }
                ]
            }]} />
          </PanGestureHandler>
        </View>
      );
}

export default Callback;

const CIRCLE_SIZE = 70;


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    dropZone: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "rgba(0,0,0,.2)",
      height: "50%",
    },
    box: {
      backgroundColor: "tomato",
      position: "absolute",
      marginLeft: -(CIRCLE_SIZE / 2),
      marginTop: -(CIRCLE_SIZE / 2),
      width: CIRCLE_SIZE,
      height: CIRCLE_SIZE,
      borderRadius: CIRCLE_SIZE / 2,
      borderColor: "#000",
    },
  });