import React, {useState, useEffect} from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { MONTH_HEIGHT, months } from './Model';
import MonthToDisplay from './MonthToDisplay';
let currentDate = new Date();

const listItem = ( item: number, index: number ) => {    
    // console.log(mi)
    return (
        <MonthToDisplay 
            monthIndex={item}
        />
    )
};


export default () => {
    const [MI, setMI] = useState(currentDate.getMonth() );
    
    const chooseDifferentMonth = ( index: number ) => {
        if (index !== MI) setMI(index);
    };

    console.log('mi:', MI)
    return (
        <View style={styles.container}>
            <FlatList 
                data={[ MI - 1, MI, MI + 1 ]}
                extraData={MI}
                renderItem={({item, index}) => listItem(item, index)}
                decelerationRate={'fast'}
                snapToAlignment={'start'}
                snapToInterval={MONTH_HEIGHT}
                getItemLayout={(data, index) => (
                    {length: MONTH_HEIGHT, offset: MONTH_HEIGHT * index, index}
                )}
                initialScrollIndex={1}
                initialNumToRender={1}
                windowSize={3}
                pagingEnabled={true}
                onEndReached={(info: {distanceFromEnd: number}) => chooseDifferentMonth(MI + 1)}
                onEndReachedThreshold={0.5}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderColor: 'black',
        borderWidth: 2,
        height: MONTH_HEIGHT
    }
})