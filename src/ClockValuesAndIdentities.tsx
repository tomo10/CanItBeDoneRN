import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import Animated from "react-native-reanimated";

import { useMemoOne } from 'use-memo-one';
import { Button, Card, cards } from "./components";

const {
    useCode,
    set,
    Value,
    Clock,
    block,
    not,
    cond,
    clockRunning,
    startClock,
    interpolate,
    Extrapolate,
    add,
    eq,
    stopClock
  } = Animated;

const duration = 2000;
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    card: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const ClockValuesAndIdentities = () => {
    console.log('Comp Mounts')
    const [show, setShow] = useState(true);
    const {time, clock, progress} = useMemoOne(
        () => ({
            time: new Value(0),
            clock: new Clock(),
            progress: new Value(0)
        }), 
        []
    );
    const opacity = interpolate(progress, {
        inputRange: [0, 1],
        outputRange: show ? [0, 1] : [1 ,0],
        extrapolate: Extrapolate.CLAMP
    });
    // useCode is a hook. Block allows us to run instructions in a certain order acc to []. Runs declatively only when component mounts
    useCode(
      () =>
      block([
        // 1. If the clock is not running, start the clock and save the original clock value in time.
        cond(not(clockRunning(clock)), [startClock(clock), set(time, clock)]),
        // 2. Calculate the progress of the animation
        set(
            progress, 
            interpolate(clock, {
                inputRange: [time, add(time, duration)],
                outputRange: [0, 1],
                extrapolate: Extrapolate.CLAMP
            })
        ),
        // 3. If the animation is over
        cond(eq(progress, 1), stopClock(clock))
      ]), 
    [show]
    );

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Animated.View style={{ opacity }}>
                    <Card card={cards[0]} />
                </Animated.View>
            </View>
            <Button 
                label={show ? "Hide" : "Show"}
                primary
                onPress={() => setShow(prev => !prev)}
            />
        </View>
    );
};

export default ClockValuesAndIdentities

