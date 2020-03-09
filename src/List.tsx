import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView } from 'react-native';
import Item, { LIST_ITEM_HEIGHT } from "./ListItem";
import Animated from "react-native-reanimated";
import Chevron from "./Chevron";
import { bInterpolate, withTransition, withTimingTransition, onGestureEvent } from "react-native-redash";
import { TapGestureHandler, State } from 'react-native-gesture-handler';


const { interpolate, Value, cond, eq, not, set, useCode } = Animated;

const styles = StyleSheet.create({
    container: {
      marginTop: 16,
      backgroundColor: "white",
      padding: 16,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
    },
    title: {
      fontSize: 16,
      fontWeight: "bold"
    },
    items: {
      overflow: "hidden"
    }
  });


type ListProps = {
    list: Array<Object>;
    navigation: Object;
    name: string;
}

export default ({ list, navigation, name }: ListProps) => {


    const open = new Value<0 | 1>(0);
    // const dur = list.length * 25;
    const dur = 300;
    // const transition = withTransition(open);
    const transition = withTimingTransition(open, {duration: dur});

    const state = new Value(State.UNDETERMINED);
    const gestureHandler = onGestureEvent({ state });

    const height = bInterpolate(
        transition,
        0,
        LIST_ITEM_HEIGHT * list.length
    );
    const bottomRadius = interpolate(transition, {
        inputRange: [0, 16 / 400],
        outputRange: [8, 0]
    });

    // if state equals end, set open to not open. ie reset state
    useCode(() => cond(eq(state, State.END), set(open, not(open))), [
        open,
        state
    ]);

    return (
            <>
              <TapGestureHandler {...gestureHandler}>
                <Animated.View
                    style={[
                        styles.container,
                        {
                            borderBottomLeftRadius: bottomRadius,
                            borderBottomRightRadius: bottomRadius
                        }
                    ]}
                    >
                    <Text style={styles.title}>List of {name}</Text>
                    <Chevron {...{ transition }} />
                </Animated.View>
                </TapGestureHandler>
             <Animated.View style={[styles.items, { height }]}>
                {list.map((item, key) => (
                    <Item {...{ item, key, navigation }} isLast={key === list.length - 1} />
                ))}
            </Animated.View>
        </>
    )

}