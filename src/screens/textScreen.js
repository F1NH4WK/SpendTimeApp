import { Text, Card, Avatar, ActivityIndicator, Divider } from "react-native-paper";
import { StyleSheet, View, FlatList } from "react-native";
import { useState, useEffect } from "react";

// ICONS

export default function TextScreen(){

    const [data, setData] = useState([
        {nome: 'Yoda', height: '2', gender: 'male', corPele: 'green'},
        {nome: 'Jesus', height: '24', gender: 'male', corPele: 'yellow'},
        {nome: 'Darth Vader', height: '54', gender: 'male', corPele: 'black'},
        {nome: 'Michael Jackson', height: '32', gender: 'male', corPele: 'pink'},
        {nome: 'Julius', height: '70', gender: 'male', corPele: 'yellow'},

    ])


    const [loading, setLoading] = useState(false)

    useEffect( () => {
    if (loading){
    fetch(`https://swapi.dev/api/people/${Math.floor(Math.random() * 83)}/?format=json`)
    .then(response => response.json())
    .then(infoPerson => setData([...data, {nome: infoPerson.name, height: infoPerson.height, gender: infoPerson.gender, corPele: infoPerson.skin_color}]))
    .catch(error => console.log(error))
    .finally(() => {setLoading(false)})
    }
    console.log('Renderizou')
    }, [loading])

    const renderCard = (val, index) =>
        <Card key={index}>
            <Card.Title title = {val.nome} 
            titleStyle = {{fontWeight: 'bold'}}

            right = {() => 
            val.gender == 'male'
            ?<Avatar.Icon icon='gender-male' size={30}/>
            :<Avatar.Icon icon='gender-female' size={30}/>}
                
            rightStyle = {{paddingHorizontal: 10}} />
                
            <Card.Content >
                <Text>{`Altura:  ${val.height}cm\n`}</Text>
                <View style = {{flexDirection: 'row'}}>
                    <Text>Cor da pele: </Text>
                    <View style = {{width: 20, height: 20, backgroundColor: val.corPele, borderRadius: 15}}/>
                </View>
             </Card.Content> 
        </Card>

    return(
        <View style = {styles.viewContainer}>
            <FlatList
            data={data}
            renderItem ={({item, index}) => renderCard(item, index) }
            ListFooterComponent = {() => loading
            ? <ActivityIndicator color="deeppink" size={30}/>
            : null}
            ItemSeparatorComponent = {() => <Divider/>}
            onScrollEndDrag= {() => {setLoading(true)}}
            showsVerticalScrollIndicator = {false}
            onEndReachedThreshold = {0.5}
            ListFooterComponentStyle = {{marginVertical: 80}}/>
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