import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView } from 'react-native';
import Header from './Header'
import StyleGuide from './components/StyleGuide';
import Animated from "react-native-reanimated";

const dataArr: Array<object> = [
        {title: "Clock Values and Identities", navigate: 'Clock'},
        {title: "Transitions", navigate: 'Transitions'},
        {title: "Transitions Overlay", navigate: 'TransitionsOverlay'},
        {title: "Timings", navigate: 'Timings'},
        {title: "Pan Gesture", navigate: 'Pan'},
        {title: "Decay", navigate: 'Decay'}
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
        <Animated.ScrollView
            scrollEventThrottle={16}
            contentContainerStyle={ { paddingTop: 50 } }
        >
            <List 
                array={dataArr} 
                navigation={navigation}
                />
        </Animated.ScrollView>
      </>
    )
}

export default HomeScreen;