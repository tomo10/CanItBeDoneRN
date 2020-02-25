import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export const LIST_ITEM_HEIGHT = 54;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#f4f4f6",
    height: LIST_ITEM_HEIGHT
  },
  title: {
    fontSize: 16
  }
});

export interface ListItem {
  title: string;
  navigate: string;
}

interface ListItemProps {
  item: ListItem;
  isLast: boolean;
  navigation: object;
}

export default ({ item, isLast, navigation }: ListItemProps) => {
debugger

  const bottomRadius = isLast ? 8 : 0;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(item.navigate)}
      style={[
        styles.container,
        {
          borderBottomLeftRadius: bottomRadius,
          borderBottomRightRadius: bottomRadius
        }
      ]}
    >
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );
};