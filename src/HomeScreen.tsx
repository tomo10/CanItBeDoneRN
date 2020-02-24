import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


const HomeScreen = ({navigation}) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
            title="Clock Values and Identities"
            onPress={() => navigation.navigate('Clock')}
            />
            <Button
            title="Transitions"
            onPress={() => navigation.navigate('Transitions')}
            />
      </View>
    )
}

export default HomeScreen;