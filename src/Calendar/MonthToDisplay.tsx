import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { MONTH_HEIGHT, months } from './Model';
import DaysInMonth from './DaysInMonth';


export interface MonthProps {
    monthIndex: number;
    daysInMonth: number;
    daysInPrevMonth: number;
    daysInNextMonth: number;
}

export default ({monthIndex, daysInMonth}: MonthProps) => {


    const [rowNumber, setRowNumber] = useState(daysInMonth / 7);
    
    useEffect(() => {
        initCal();
    })
    
    const initCal = () => {
        const row_days_array = [new Array(7), new Array(7), new Array(7), new Array(7), new Array(7), new Array(7)]
    
        for (let i = 0; i < daysInMonth; i++) {
            row_days_array[i / 7].push({
                dayData: i,
                calendarDayIndex: i
            })
        }
    }



    return (
        <View style={styles.container}>
            <Text style={{fontSize: 20}}>{months[monthIndex]}</Text>
            <DaysInMonth {...{ monthIndex, daysInMonth }} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        height: MONTH_HEIGHT
    }
})