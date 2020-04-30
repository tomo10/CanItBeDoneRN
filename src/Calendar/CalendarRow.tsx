import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DayHolder from './DayHolder';


export default () => {

    return (
        <View style={{flexDirection: 'row'}}>
            <DayHolder />
            <DayHolder />
            <DayHolder />
            <DayHolder />
            <DayHolder />
            <DayHolder />
            <DayHolder />
        </View>
    )
}


const styles = StyleSheet.create({

})