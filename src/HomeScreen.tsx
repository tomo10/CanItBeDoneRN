import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import Header from './Header'
import StyleGuide from './components/StyleGuide';
import Animated from "react-native-reanimated";

const dataArr = [
        {title: "Clock Values and Identities", navigate: 'Clock'},
        {title: "Transitions", navigate: 'Transitions'},
        {title: "Transitions Overlay", navigate: 'TransitionsOverlay'},
        {title: "Timings", navigate: 'Timings'},
        {title: "Pan Gesture", navigate: 'Pan'},
        {title: "Next lad", navigate: 'Next'}
    ]

type ListProps = {
    array: Array<Object>,
    navigation: Object
}

const List = ({array, navigation}: ListProps) => {
    
    return array.map(button => {
         return (
             <TouchableOpacity style={StyleGuide.typography.row}>
                <View>
                    <Button
                        title={button.title}
                        onPress={() => navigation.navigate(button.navigate)}
                    />        
                </View>
             </TouchableOpacity>
         )
    })
}

const HomeScreen = ({navigation}) => {


    return (
        <>
        <Header/>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <List 
                array={dataArr} 
                navigation={navigation}
                />
        </View>
      </>
    )
}

export default HomeScreen;