import * as React from 'react';
import Animated from 'react-native-reanimated';
import { View, StyleSheet } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { withOffset } from 'react-native-redash';
import { canvas2Polar, polar2Canvas } from "./Coordinates";

const { event, Value, useCode, set, block } = Animated;

interface CursorProps {
    theta: Animated.Value<number>;
    r: number;
    size: number;
}

export default ({theta, r, size}: CursorProps) => {
    const translationX = new Value(0)
    const translationY = new Value(0)
    const state = new Value(State.UNDETERMINED);
    const onGestureEvent = event([{
        nativeEvent: {
            state,
            translationX,
            translationY
        }
    }]);

    const center = {x: r, y: r};
    const x = withOffset({ value: translationX, state });
    const y = withOffset({ value: translationY, state });
    const alpha = canvas2Polar({x, y}, center).theta;
    const polar = canvas2Polar({ x: translationX, y: translationY}, {x: r, y: r});
    const {x: translateX, y: translateY} = polar2Canvas(
        { theta: polar.theta, radius: r}, 
        center
    );
    // useCode(() => set(theta, alpha), [alpha, theta]);
    
    
    return (
        <PanGestureHandler onHandlerStateChange={onGestureEvent} {...{onGestureEvent}}>
            <Animated.View 
             style={{
                ...StyleSheet.absoluteFillObject,
                width: size, 
                height: size, 
                borderRadius: size / 2, 
                backgroundColor: "red",
                transform: [{ translateX }, { translateY }]
                }} />
        </PanGestureHandler>
    )
}