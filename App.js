import { useState } from 'react';
import { BottomNavigation} from 'react-native-paper';

// SCREENS
import ImageScreen from './src/screens/imageScreen';
import TextScreen from './src/screens/textScreen';



export default function App() {

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'images', title: 'Images', focusedIcon: 'image', unfocusedIcon: 'image-outline'},
    {key: 'text', title: 'Texts', focusedIcon: 'tooltip-text',  unfocusedIcon: 'tooltip-text-outline'}
  ])

  const renderScene = BottomNavigation.SceneMap({
    images: ImageScreen,
    text: TextScreen
  })

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange = {setIndex}  
      renderScene = {renderScene}
      shifting = {true}
      sceneAnimationEnabled = {true}
      sceneAnimationType = {'opacity'}
      barStyle = {{height: '10%', backgroundColor: 'rgba(52, 52, 52, 0.2)'}}      
        />
  );
}