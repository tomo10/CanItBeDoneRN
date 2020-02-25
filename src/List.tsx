import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView } from 'react-native';
import Item, { LIST_ITEM_HEIGHT } from "./ListItem";
import Animated from "react-native-reanimated";
import Chevron from "./Chevron";
import { bInterpolate, useTransition } from "react-native-redash";


const { interpolate } = Animated;

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
    array: Array<Object>;
    navigation: Object;
}

export default ({ list, navigation }: ListProps) => {
    
    const [open, setOpen] = useState(false);
    const transition = useTransition(open);
    const height = bInterpolate(
        transition,
        0,
        LIST_ITEM_HEIGHT * list.length
    );
    const bottomRadius = interpolate(transition, {
        inputRange: [0, 16 / 400],
        outputRange: [8, 0]
    });
    return (
            <>
             <TouchableOpacity onPress={() => setOpen(prev => !prev)}>
                <Animated.View
                style={[
                    styles.container,
                    {
                        borderBottomLeftRadius: bottomRadius,
                        borderBottomRightRadius: bottomRadius
                    }
                ]}
                >
                <Text style={styles.title}>List of animations</Text>
                <Chevron {...{ transition }} />
                </Animated.View>
             </TouchableOpacity>
             <Animated.View style={[styles.items, { height }]}>
                {list.map((item, key) => (
                    <Item {...{ item, key, navigation }} isLast={key === list.length - 1} />
                ))}
            </Animated.View>
        </>
    )

}