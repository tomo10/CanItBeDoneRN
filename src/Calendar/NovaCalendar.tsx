import * as React from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { MONTH_HEIGHT, monthIndex, months } from './Model';
import MonthToDisplay from './MonthToDisplay';

const listItem = ( item: number, index: number ) => {    
    console.log(item)
    return (
        <MonthToDisplay 
            monthIndex={index}
        />
    )
};

export default () => {

    return (
        <View style={{height: MONTH_HEIGHT}}>
            <FlatList 
                data={[1,2,3,4,5,6,7,8,9,10,11,12]}
                renderItem={({item, index}) => listItem(item, index)}
                decelerationRate={'fast'}
                snapToAlignment={'start'}
                snapToInterval={MONTH_HEIGHT}
                getItemLayout={(data, index) => (
                    {length: MONTH_HEIGHT, offset: MONTH_HEIGHT * index, index}
                )}
                initialScrollIndex={new Date().getMonth()}
                initialNumToRender={1}
                windowSize={3}
                pagingEnabled={true}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderColor: 'black',
        borderWidth: 2,
        height: MONTH_HEIGHT,
        alignItems: 'center'
    }
})