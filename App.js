import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';

// SCREENS
import GifScreen from './src/screens/gifScreens';
import ImageScreen from './src/screens/imageScreen';
import TextScreen from './src/screens/textScreen';



export default function App() {

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'images', title: 'Images', focusedIcon: 'image', unfocusedIcon: 'image-outline', color: 'red'},
    {key: 'gif', title: 'Gifs',   focusedIcon: 'file-video', unfocusedIcon: 'file-video-outline', color: 'blue'},
    {key: 'text', title: 'Texts', focusedIcon: 'tooltip-text',  unfocusedIcon: 'tooltip-text-outline', color: 'deeppink'}
  ])

  const renderScene = BottomNavigation.SceneMap({
    images: ImageScreen,
    gif: GifScreen,
    text: TextScreen
  })

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange = {setIndex}  
      renderScene = {renderScene}
      shifting = {true}
      sceneAnimationEnabled = {true}
      sceneAnimationType = {'shifting'}
      barStyle = {{backgroundColor: routes[index].color, height: '10%'}}
      
        />
  );
}