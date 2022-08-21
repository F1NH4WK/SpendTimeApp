import { View, StyleSheet, FlatList, Pressable, Text } from "react-native";
import { Card, Divider} from "react-native-paper";
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


    

    return(
        <View style = {styles.viewContainer}>
            
            <FlatList
            columnWrapperStyle = {{}}
            numColumns = {2}
            data = {images}
            renderItem = {({item, index}) => renderImage(item.uri, index)}
            showsVerticalScrollIndicator = {false}
            onScrollEndDrag= {() => setImages([
                ...images, 
                {
                    uri: `https://picsum.photos/700?random=${Math.random() * 500}`
                }
            ])}/>

        </View>
    )
}

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 25,
        
    }
})