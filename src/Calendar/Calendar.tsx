import React, { useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, StatusBar } from "react-native";
import Animated from 'react-native-reanimated';
import NovaCalendar from './NovaCalendar';
export default () => {

    return (
        <SafeAreaView>
            <StatusBar barStyle="light-content" hidden={false} backgroundColor="#6a51ae" />
            <NovaCalendar  />
        </SafeAreaView>
    )
}