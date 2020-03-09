  
import * as React from "react";
import {
  StyleSheet, View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated from "react-native-reanimated";
import { onScroll } from "react-native-redash";
const BUTTON_HEIGHT = 48;
import Header from "./Header";
import { Event, MAX_HEADER_HEIGHT, MIN_HEADER_HEIGHT } from "./Model";

interface ContentProps {
    event: Event;
    y: Animated.Value<number>
}

const { interpolate, Extrapolate } = Animated;


export default ({ event, y }: ContentProps) => {

    return (
        <Animated.ScrollView
            onScroll={onScroll({ y })}
            style={styles.container}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={1}
            stickyHeaderIndices={[1]}
        >
            <View style={styles.cover}>
                <View style={styles.artistContainer}>
                    <Animated.Text style={[styles.artist, { opacity: 1 }]}>{event.title}</Animated.Text>
                </View>
            </View>
            <View style={styles.header}>
                <Header {...{event, y}} />
            </View>
        </Animated.ScrollView>
    )
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: MIN_HEADER_HEIGHT - BUTTON_HEIGHT / 2,
    },
    cover: {
      height: MAX_HEADER_HEIGHT - BUTTON_HEIGHT,
    },
    gradient: {
      position: "absolute",
      left: 0,
      bottom: 0,
      right: 0,
      alignItems: "center",
    },
    artistContainer: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: "center",
      alignItems: "center",
    },
    artist: {
      textAlign: "center",
      color: "white",
      fontSize: 48,
      fontWeight: "bold",
    },
    header: {
      marginTop: -BUTTON_HEIGHT,
    },
    tracks: {
      paddingTop: 32,
      backgroundColor: "black",
    },
  });