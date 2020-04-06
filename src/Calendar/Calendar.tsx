import React, { useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, StatusBar } from "react-native";
import Animated from 'react-native-reanimated';

export default () => {

    return (
        <SafeAreaView>
            <StatusBar barStyle="light-content" hidden={false} backgroundColor="#6a51ae" />
        </SafeAreaView>
    )
}