import { Text, Card, Avatar, ActivityIndicator } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";

// ICONS

export default function TextScreen(){

    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)

    
        fetch('https://swapi.dev/api/people/83/?format=json')
        .then(response => response.json())
        .then(json => setData({nome: json.name, height: json.height, gender: json.gender, corPele: json.skin_color}))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))


    return(
        <View style = {styles.viewContainer}>
            {loading
            ? 
            <Card>
                <ActivityIndicator size={30} animating = {true} color = {'deeppink'}/>
            </Card>
            : 
            <Card>
                <Card.Title title = {data.nome} 
                right = {() => data.gender == 'male'
                ?<Avatar.Icon icon='gender-male' size={30}/>
                :<Avatar.Icon icon='gender-female' size={30}/>}
                
                rightStyle = {{paddingHorizontal: 10}} />
                
                <Card.Content>
                    <Text>{`Altura: ${data.height}\n`}</Text>
                    <View style = {{flexDirection: 'row'}}>
                        <Text>Cor da pele: </Text>
                        <View style = {{width: 20, height: 20, backgroundColor: data.corPele, borderRadius: 15}}/>
                    </View>
                </Card.Content>
            </Card>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 40,
        
    }
})