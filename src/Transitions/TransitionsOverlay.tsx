import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import {
  bInterpolate,
  transformOrigin,
  useTransition
} from "react-native-redash";

import { Button, Card, StyleGuide, cards } from "../components";



const { multiply, interpolate, not } = Animated;
const { width } = Dimensions.get("window");

// ...StyleSheet.absoluteFillObject
// position: 'absolute',
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,

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

export default () => {

  // in Animation dont really use true false for state. Its on a spectrum of 0 to 1. Anything not zero is effectively true  
  const [toggled, setToggled] = useState<0 | 1>(0);

  return (
    <View style={styles.container}>
      {cards.map((card, index) => {
          const rotate = toggled ? Math.PI / 6 : 0;
        return (
          <Animated.View 
            key={card.id} 
            style={[
                styles.overlay,
                {
                    transform: [{ rotate: `${rotate}rad`}]
                }
            ]}>
            <Card {...{ card }} />
          </Animated.View>
        );
      })}
      <Button label={toggled ? "Reset" : "Start"} primary onPress={() => setToggled(toggled ^ 1)} />
    </View>
  );
};