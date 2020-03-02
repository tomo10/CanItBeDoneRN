import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import {
  useTransition,
  transformOrigin
} from "react-native-redash";

import { tiles, Tile, Button, StyleGuide } from "../components";

const { multiply, interpolate, not } = Animated;
const { width } = Dimensions.get("window");

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
  });

// want this bottom left of card rather than center. 
const newOrigin = -(width / 2 - StyleGuide.spacing * 2);

export default () => {
    const [toggled, setToggled] = useState<0 | 1>(0);

    const transition = useTransition(toggled, not(toggled), toggled);

    return (
        <View style={styles.container}>
            {tiles.map((tile, index) => {
                let direction = 0;
                if (index === 0) direction = -1;
                else if (index === 2) direction = 1;

                const rotate = multiply(direction, interpolate(transition, {
                    inputRange: [0, 1],
                    outputRange: [0, Math.PI / 6]
                  }))

                return (
                    <Animated.View
                      key={tile.id}
                      style={[
                        styles.overlay,
                        {
                            transform: transformOrigin({ x: newOrigin, y: 0 }, 
                                { rotate })
                        }
                    ]}
                    >
                      <Tile {...{ tile }} />            
                    </Animated.View>
                )
            })}
            <Button label={toggled ? "Reset" : "Start"} primary onPress={() => setToggled(toggled ^ 1)} />
        </View>
    )
}