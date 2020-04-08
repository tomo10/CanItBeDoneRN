import React, {useEffect} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { MONTH_HEIGHT, months } from './Model';
import DaysInMonth from './DaysInMonth';


export interface MonthProps {
    monthIndex: number
}

export default ({monthIndex}: MonthProps) => {

useEffect(() => (
    console.log('Month To Display useEffect')
))

    return (
        <View style={styles.container}>
            <Text style={{fontSize: 20}}>{months[monthIndex]}</Text>
            <DaysInMonth />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        height: MONTH_HEIGHT
    }
})