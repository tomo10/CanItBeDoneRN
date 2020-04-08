import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { MONTH_HEIGHT, months } from './Model';


export interface MonthProps {
    monthIndex: number
}

export default ({monthIndex}: MonthProps) => {

    return (
        <View style={styles.row}>
            <Text style={{fontSize: 20}}>{months[monthIndex]}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    row: {
        height: MONTH_HEIGHT,
        borderColor: 'black',
        borderWidth: 2,
        alignItems: 'center'
    }
})