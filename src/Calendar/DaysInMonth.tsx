import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import CalendarRow from './CalendarRow';


export default ({ daysInMonth }) => {

    return (
        <>
            <Text>{daysInMonth} days</Text>
           
        </>
    )
}