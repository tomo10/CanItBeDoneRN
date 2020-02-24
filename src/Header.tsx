import * as React from "react"
import { View, Text } from "react-native"

const HEADER_HEIGHT = 60;

export default () => {
    return (
        <View
        style={{
            height: HEADER_HEIGHT,
            position: "absolute",
            top: 0,
            width: "100%",
            zIndex: 2,
            backgroundColor: "pink",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
            
        </View>
    )
}