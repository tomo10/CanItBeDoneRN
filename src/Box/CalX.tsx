import React, {useState, useMemo} from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import { months, MONTH_HEIGHT, MONTH_WIDTH } from './../components';
import Months from './../components/Months'
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get("window");

const { cond, eq, add, set, Value, event } = Animated;

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
    const dragX = new Value(0)
    const dragY = new Value(0);
    const offsetX = new Value( width / 2);
    const offsetY = new Value(100);
    const state = new Value(-1);

    const gestureHandler = event([
        {
        nativeEvent: { 
            translationX: dragX,
            translationY: dragY, 
            state
        }}
    ])

    const addY = add(offsetY, dragY)
    const addX = add(offsetX, dragX)

    // if gesture state === active, then add offset to dragY 
    // if not active, set offset Y to (offset Y + drag Y) 
    // both ways do same thing, one without function one with 
    const transY = cond(
        eq(state, State.ACTIVE),
        addY,
        [set(offsetY, addY)]
    );
    const transX = withOffset(addX, state, offsetX); 

    return (
        <View style={{flex: 1}}>
            {/* <View style={{height: MONTH_HEIGHT, width: MONTH_WIDTH, borderColor: 'pink', borderWidth: 2}}> */}
                <PanGestureHandler
                    maxPointers={1}
                    onGestureEvent={gestureHandler}
                    onHandlerStateChange={gestureHandler}
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
                    }]} >
                        <Text style={{fontSize: 30}}>MONTH</Text>
                    </Animated.View>
                </PanGestureHandler>
            {/* </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        backgroundColor: 'pink',
        position: 'absolute',
        width: 75,
        height: 75
    }
})
