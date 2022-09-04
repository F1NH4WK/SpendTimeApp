import { View, StyleSheet, FlatList, Text, Image, Animated, Pressable } from "react-native";
import { createSharedElementStackNavigator, SharedElement } from "react-navigation-shared-element";
import { NavigationContainer } from "@react-navigation/native";
import { Card} from "react-native-paper";
import { useEffect, useRef, useState } from "react";
import { Ionicons } from '@expo/vector-icons'; 

export default function ImageScreen(){

    const [images, setImages] = useState([

        {   id: '0',
            uri: `https://picsum.photos/id/${Math.round(Math.random() * 500)}/500/700`
        },
        {   id: '1',
            uri: `https://picsum.photos/id/${Math.round(Math.random() * 500)}/500/700`,
        },
        {   id: '2',
            uri: `https://picsum.photos/id/${Math.round(Math.random() * 500)}/500/700`
        },
        {   id: '3',
            uri: `https://picsum.photos/id/${Math.round(Math.random() * 500)}/500/700`,
        },
        {   id: '4',
            uri: `https://picsum.photos/id/${Math.round(Math.random() * 500)}/500/700`
        },
        {   id: '5',
            uri: `https://picsum.photos/id/${Math.round(Math.random() * 400)}/500/700`,
        },

    ])

    function ImagesView({navigation}){

        return(
            <View style = {styles.viewContainer}>
            <FlatList
            numColumns = {2}
            data = {images}
            renderItem = {({item}) => <ImageView route={item} navigation = {navigation}/>}
            showsVerticalScrollIndicator = {false}
            // onScrollEndDrag= {() => setImages([
            //     ...images, 
            //     {
            //         uri: `https://picsum.photos/700?random=${Math.random() * 500}`
            //     }
            // ])}
            />
        </View>
        )
    }

    function ImageView({navigation, route}){
        return(
            <View style = {{flex: 0.5, margin: 10}}>
                <SharedElement id={route.id}>
                    <Card onPress={() => navigation.push('ImagesDetails', route)}>
                        <Card.Cover source={{uri: route.uri}}/>
                    </Card>
                </SharedElement>
                <Text>{route.id}</Text>
            </View>
        )

    }

    function ImagesDetails({navigation, route}){

        const opacity = useRef(new Animated.Value(0)).current;

        useEffect(() => {
            Animated.timing(
                opacity,
                {
                    toValue: 1, 
                    duration: 500,
                    delay: 600,
                    useNativeDriver: true
                }
            ).start();
        }, [])

        return(
            <View style = {styles.container}>
                <SharedElement id = {route.params.id}>
                    <Card style = {{width: 500, height: 700}}>
                        <Card.Cover resizeMode="cover"style = {{width: 500, height: 700}}source={{uri: route.params.uri}}/>
                    </Card>
                </SharedElement>
                <View style = {{position: 'absolute', top: 50, left: 20}}>
                    <Ionicons name="arrow-back" size={24} color="white" onPress={() => navigation.goBack()} style = {{opacity: opacity}}/>
                    <Animated.Text style = {{...styles.textImage, opacity: opacity}}>EXEMPLO</Animated.Text>
                </View>
            </View>
        )
    }

    const Stack = createSharedElementStackNavigator();

    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Images" screenOptions={{headerShown: false}}>
                <Stack.Screen name="Images" component={ImagesView}/>
                <Stack.Screen name = "ImagesDetails" component={ImagesDetails}
                sharedElements = {({params}) => [params.id]}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 25,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textImage:{
        fontSize: 50, 
        fontWeight: 'bold',
        textShadowColor: 'green',
        textShadowOffset: {width: 3, height: 2},
        textShadowRadius: 5
    }
})