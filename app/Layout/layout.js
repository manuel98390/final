import React from 'react'
import {
    View,
    Text
} from 'react-native'
import styles from './componentesLayout'

function BluetoothListLayout(props) {
    return (
        <View
            style={styles.container}>
            <Text style={styles.title}>
                {props.title}
            </Text>
            {props.children}
        </View>
    )
}
export default BluetoothListLayout;