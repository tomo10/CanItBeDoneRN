import React, {useState, useEffect} from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { MONTH_HEIGHT, months } from './Model';
import MonthToDisplay from './MonthToDisplay';
let currentDate = new Date();
let year = currentDate.getFullYear();
let month = currentDate.getMonth()

const listItem = ( item: number, index: number ) => {    

    return (
        <MonthToDisplay 
            monthIndex={item}
            daysInMonth={new Date(year, (item + 1), 0).getDate()}
            // daysInPrevMonth={new Date(year, (item), 0).getDate()}
            // daysInNextMonth={new Date(year, (item + 2), 0).getDate()}
        />
    )
};


export default () => {
    const [MI, setMI] = useState( month );
    
    const chooseDifferentMonth = ( index: number ) => {
        if (index !== MI) setMI(index);
    };


    return (
        <View style={styles.container}>
            <FlatList 
                data={[MI -2, MI - 1, MI, MI + 1, MI + 2 ]}
                // extraData={MI}
                renderItem={({item, index}) => listItem(item, index)}
                decelerationRate={'fast'}
                snapToAlignment={'start'}
                snapToInterval={MONTH_HEIGHT}
                getItemLayout={(data, index) => (
                    {length: MONTH_HEIGHT, offset: MONTH_HEIGHT * index, index}
                )}
                initialScrollIndex={2}
                initialNumToRender={1}
                maxToRenderPerBatch={1}
                windowSize={3}
                pagingEnabled={true}
                // onEndReached={(info: {distanceFromEnd: number}) => chooseDifferentMonth(MI + 1)}
                // onEndReachedThreshold={0.1}
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