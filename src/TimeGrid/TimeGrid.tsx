import React, { useState } from "react";
import { Dimensions, StyleSheet, View, PixelRatio, Text } from "react-native";
import Animated from 'react-native-reanimated';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white"
    }
  });

const {Value, sub, cond, concat, lessThan, add} = Animated
import { ReText } from "react-native-redash";

export default () => {

    return (
        <View style={styles.container}>
            {/* <ReText text={'time'} />
            <ReText text={12} /> */}
            <Text>Test</Text>
        </View>
    )
}