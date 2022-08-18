import { Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import { TouchableRipple } from 'react-native-paper';

export default function TextScreen(props){
    return(
        <TouchableRipple rippleColor="red" onPress={() => console.log('Apertado')} style = {{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
            <Text>Text Screen</Text>
        </TouchableRipple>
    )
}