import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";

import { Guest } from "./Model";

interface RowProps {
  guest: Guest;
}

export default ({ guest }: RowProps) => (
  <View style={styles.row}>
    {/* <View style={styles.cell}>
      <Text style={styles.index}>{index}</Text>
    </View> */}
    <View style={[styles.cell, { flex: 1 }]}>
      {/* <Text style={styles.name}>{track.name}</Text> */}
      <Text style={styles.artist}>{guest.name}</Text>
    </View>
    <View style={styles.cell}>
      <Icon name="more-horizontal" color="#b2b3b4" size={24} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    backgroundColor: "black",
  },
  cell: {
    padding: 16,
    justifyContent: "center",
  },
  index: {
    color: "#b2b3b4",
  },
  artist: {
    color: "#b2b3b4",
  },
  name: {
    color: "white",
  },
});