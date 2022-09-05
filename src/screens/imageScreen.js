import { View, StyleSheet, FlatList, Animated } from "react-native";
import { createSharedElementStackNavigator, SharedElement } from "react-navigation-shared-element";
import { NavigationContainer } from "@react-navigation/native";
import { Card } from "react-native-paper";
import { useEffect, useRef, useState} from "react";
import { Ionicons } from '@expo/vector-icons'; 
import { useFonts } from "expo-font";

export default function ImageScreen(){

    const [fontsLoaded] = useFonts({
        'RobotoRegular': require('../fonts/RobotoRegular.ttf'),
        'LatoRegular': require('../fonts/LatoRegular.ttf')
    })
    if (fontsLoaded){
        console.log('A')
    }

    const [images, setImages] = useState([

        {   id: '0',
        },
        {   id: '1',
        },
        {   id: '2',
        },
        {   id: '3',
        },
        {   id: '4',
        },
        {   id: '5',
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

        route.imageId = Math.round(Math.random() * 500)
        
        return(
            <View style = {{flex: 0.5, margin: 10}}>
                <SharedElement id={route.id}>
                    <Card onPress={() => navigation.push('ImagesDetails', route)}>
                        <Card.Cover 
                        source={{uri: `https://picsum.photos/id/${route.imageId}/500/700`}}/>
                    </Card>
                </SharedElement>
            </View>
        )
    }

    function ImagesDetails({navigation, route}){
        
        const [author, setAuthor] = useState('')
        const opacity = useRef(new Animated.Value(0)).current;

        useEffect(() => {
            Animated.timing(
                opacity,
                {
                    toValue: 0.8, 
                    duration: 500,
                    delay: 600,
                    useNativeDriver: true
                }
            ).start();

        fetch(`https://picsum.photos/id/${route.params.id}/info`)
        .then((response) => response.json())
        .then((json) => setAuthor(json.author))
        .catch((e) => console.log(e))
        }, [])

        return(
            <View style = {styles.container}>
                <SharedElement id = {route.params.id}>
                    <Card style = {{width: 500, height: 700}}>
                        <Card.Cover resizeMode="cover" style = {{width: 500, height: 700}}
                        source={{uri: `https://picsum.photos/id/${route.params.imageId}/500/700`}}/>
                    </Card>
                </SharedElement>
                <View style = {styles.viewGrouper}>
                    <Animated.View style = {{opacity: opacity}}>
                        <Ionicons name="arrow-back" size={24} color="white" onPress={() => navigation.goBack()}/>
                    </Animated.View>
                    <Animated.Text style = {{...styles.textImage, opacity: opacity}}>{author}</Animated.Text>
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
                sharedElements = {({params}) => [{
                    id: params.id,
                    animation: 'fade',
                    resize: "auto",
                    }]}/>
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
        fontSize: 40, 
        fontWeight: '800',
        fontFamily: 'RobotoRegular'
    },
    viewGrouper: {
        position: 'absolute', 
        top: 50, 
        left: 20, 
        width: '50%'
    }
})