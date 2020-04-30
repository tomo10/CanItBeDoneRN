import React from 'react'

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native';

const width = Dimensions.get('screen').width;

export default () => {

    return (
        <TouchableOpacity style={styles.container}>
            <Text>d{}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5,
        borderColor: 'gray',
        borderWidth: 1,
        width: width / 7
    }
})