import React from 'react'

import {
    SafeAreaView,
    TextInput,
    Button,
    TouchableOpacity,
    Text
} from "react-native";
import Styles from './componentesForm'


function Formulario(props) {
    return (
        <SafeAreaView>
            <TextInput
                style={Styles.input}
                placeholder="Nombre del experimento"
                keyboardType="default"
                onChangeText={props.onChangeText}
            />
            <TouchableOpacity onPress={props.onPress} style={Styles.appButtonContainer}>
                <Text style={Styles.appButtonText}>Guardar experimeto</Text>
            </TouchableOpacity>
            {/* <Button
                style={Styles.button}
                buttonStyle={{
                    height: 50,
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: 220,
                    borderRadius: 20,
                }}
                title="Guardar experimento"
                onPress={props.onPress}
            /> */}
        </SafeAreaView>
    )
}
export default Formulario;