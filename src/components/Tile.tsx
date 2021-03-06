import * as React from "react";
import { Dimensions, Image, ImageStyle, StyleSheet, View, Text } from "react-native";
import Animated from "react-native-reanimated";
import StyleGuide from "./StyleGuide";

type TileId = number;

interface Tile {
  id: TileId;
  name: string;
  color: string;
}

export const tiles: Tile[] = [
    {
      id: 0,
      name: 'Rave',
      color: 'blue'
    },
    {
      id: 1,
      name: 'Thomas Birthday',
      color: 'red'
    },
    {
      id: 2,
      name: 'Glasto',
      color: 'green'
    }
  ];



  const { width } = Dimensions.get("window");
  const TILE_ASPECT_RATIO = 1324 / 863;
  export const TILE_WIDTH = width - StyleGuide.spacing * 8;
  export const TILE_HEIGHT = TILE_WIDTH / TILE_ASPECT_RATIO;
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#3D4F5E',
      padding: 2,
      marginVertical: 1,
      width: 80, 
      height: 80,
      shadowColor: 'black',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 1
    },
    flexibleContainer: {
      flex: 1,
      maxWidth: "100%",
      aspectRatio: TILE_ASPECT_RATIO,
      margin: StyleGuide.spacing,
      borderRadius: 18,
      resizeMode: "contain",
      borderWidth: 1,
      borderColor: 'blue'
    },
    tileText: {
      color: '#FBFBFB',
      fontWeight: '300',
      fontSize: 12
    }
  });


export interface TileProps {
    tile: Tile;
  }

// interface FlexibleTileProps extends TileProps {
// style?: Animated.AnimateStyle<ImageStyle>;
// }

// export const FlexibleTile = ({ tile, style }: FlexibleTileProps) => (
// <Animated.View
//     style={[styles.flexibleContainer, style]}
// />
// );



export default ({ tile }: TileProps) => {
    return (
    <View style={styles.container}>
      <Text style={styles.tileText}>
        {tile.name}
      </Text>
    </View>
    )
  };
  

