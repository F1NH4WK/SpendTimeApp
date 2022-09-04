import { View, StyleSheet, FlatList, Text } from "react-native";
import { createSharedElementStackNavigator, SharedElement } from "react-navigation-shared-element";
import { NavigationContainer } from "@react-navigation/native";
import { Card} from "react-native-paper";
import { useState } from "react";

export default function ImageScreen(){

    const [images, setImages] = useState([
        {   
            uri: `https://picsum.photos/700?random=${Math.random() * 500}`
        },
        {
            uri: `https://picsum.photos/700?random=${Math.random() * 500}`,
        },
        {
            uri: `https://picsum.photos/700?random=${Math.random() * 500}`
        },
        {
            uri: `https://picsum.photos/700?random=${Math.random() * 500}`,
        },
        {
            uri: `https://picsum.photos/700?random=${Math.random() * 500}`
        },
        {
            uri: `https://picsum.photos/700?random=${Math.random() * 500}`,
        },
        {
            uri: `https://picsum.photos/700?random=${Math.random() * 500}`
        },
        {
            uri: `https://picsum.photos/700?random=${Math.random() * 500}`,
        },

    ])

    const renderImage = (image, index) => 
            <Card  key = {index} style = {{flex: 0.5, margin: 5}}>
                <Card.Cover source={{uri: image}}/>
            </Card>

    function ImagesView({navigation}){
        return(
            <View style = {styles.viewContainer}>
            <FlatList
            
            numColumns = {2}
            data = {images}
            renderItem = {({item, index}) => renderImage(item.uri, index)}
            showsVerticalScrollIndicator = {false}
            onScrollEndDrag= {() => setImages([
                ...images, 
                {
                    uri: `https://picsum.photos/700?random=${Math.random() * 500}`
                }
            ])}
            />
        </View>
        )
    }

    function ImagesDetails(){
        return(
            <View/>
        )
    }

    const Stack = createSharedElementStackNavigator();

    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Images" screenOptions={{headerShown: false}}>
                <Stack.Screen name="Images" component={ImagesView}/>
                <Stack.Screen name = "ImagesDetails" component={ImagesDetails}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 25,
    }
})