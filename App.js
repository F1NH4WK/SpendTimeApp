import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { BottomNavigation, Text } from 'react-native-paper';

// SCREENS
import GifScreen from './src/screens/gifScreens';
import ImageScreen from './src/screens/imageScreen';




export default function App() {

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'images'},
    {key: 'gif'}
  ])

  const renderScene = BottomNavigation.SceneMap({
    images: ImageScreen,
    gif: GifScreen
  })

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange = {setIndex}  
      renderScene = {renderScene}
        />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
