  
import * as React from "react";
import {
  StyleSheet, View, Text
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated from "react-native-reanimated";
import { onScroll } from "react-native-redash";
import Header from "./Header";
import Reply, {BUTTON_HEIGHT} from './Reply';
import { Event, MAX_HEADER_HEIGHT, MIN_HEADER_HEIGHT } from "./Model";
import Row from "./Row";

interface ContentProps {
    event: Event;
    y: Animated.Value<number>
}

const { interpolate, Extrapolate } = Animated;


export default ({ event, y }: ContentProps) => {
    // console.log('y:', y)
    const height = interpolate(y, {
        inputRange: [-MAX_HEADER_HEIGHT, -BUTTON_HEIGHT / 2],
        outputRange: [0, MAX_HEADER_HEIGHT + BUTTON_HEIGHT],
        extrapolate: Extrapolate.CLAMP,
      });

    const opacity = interpolate(y, {
        inputRange: [-MAX_HEADER_HEIGHT / 2, 0, MAX_HEADER_HEIGHT / 2],
        outputRange: [0, 1, 0],
        extrapolate: Extrapolate.CLAMP
    })

    return (
        <Animated.ScrollView
            onScroll={onScroll({ y })}
            style={styles.container}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={1}
            stickyHeaderIndices={[1]}
        >
            <View style={styles.image}>
                <Animated.View style={[styles.gradient, {height}]}>
                <LinearGradient
                    style={StyleSheet.absoluteFill}
                    start={[0, 0.3]}
                    end={[0, 1]}
                    colors={["transparent", "rgba(0, 0, 0, 0.2)", "black"]}
                />
                </Animated.View>
                <View style={styles.artistContainer}>
                    <Animated.Text style={[styles.artist, { opacity }]}>{event.title}</Animated.Text>
                </View>
            </View>
            <View style={styles.header}>
                <Header {...{event, y}} />
                <Reply />
            </View>
            <View style={[styles.tracks, {alignItems: 'center'}]}>
                <Text style={{color: "#b2b3b4", fontSize: 20}}>{event.location}</Text>
            </View>
            <View style={styles.tracks}>
                {
                event.guests.map((guest, key) => (
                    <Row
                    // index={key + 1}
                    {...{ guest, key }}
                    />
                ))
                }
            </View>
        </Animated.ScrollView>
    )
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: MIN_HEADER_HEIGHT,
    },
    image: {
      height: MAX_HEADER_HEIGHT,
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
    //   flex: 1
    },
  });