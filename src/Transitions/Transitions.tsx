import React, {useState} from "react";
import {
  Dimensions,
  ImageStyle,
  StyleSheet,
  View,
  ViewStyle
} from "react-native";

import { FlexibleCard as Card, StyleGuide, cards } from "../components";
import { Selection } from '../components'
import { set } from "react-native-reanimated";

interface Layout {
  id: string;
  name: string;
  layout: {
    container: ViewStyle;
    child?: ImageStyle;
  };
}
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background
  }
});

const column: Layout = {
    id: "column",
    name: "Column",
    layout: {
        container: {
            alignItems: 'center'
        }
    }
};

const row: Layout = {
    id: "row",
    name: "Row",
    layout: {
        container: {
            flexDirection: "row",
            alignItems: "center"
        }
    }
};

const wrap: Layout = {
    id: "wrap",
    name: "Wrap",
    layout: {
        container: {
            flexDirection: "row",
            alignItems: "center",
            flexWrap: 'wrap'
        },
        child: {
            flex: 0,
            width: width / 2 - StyleGuide.spacing * 2
        }
    }
};

const layouts = [column, row, wrap];

const Transitions = () => {

    const [currentLayout, setCurrentLayout] = useState(layouts[0].layout)

  return (
      <>
        <View style={[styles.container, currentLayout.container]}>
            {cards.map(card => (
            <Card key={card.id} style={currentLayout.child} {...{ card }} />
            ))}
        </View>
        {
            layouts.map(layout => (
                <Selection key={layout.id} name={layout.name} isSelected={layout.layout === currentLayout} onPress={() => setCurrentLayout(layout.layout)} />
                ))
        }
      </>
  );
};

export default Transitions
