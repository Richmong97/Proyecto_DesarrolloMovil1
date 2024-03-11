// BottomNavigation.jsx
import React from 'react';
import { BottomNavigation as PaperBottomNavigation } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import MapScreen from '../Screens/MapScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();

const BottomNavigation = ({ navigation, state }) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Inicio', icon: 'home' },
    { key: 'map', title: 'Mapa', icon: 'map' },
    { key: 'profile', title: 'Perfil', icon: 'person' },
  ]);

  const renderScene = PaperBottomNavigation.SceneMap({
    home: HomeScreen,
    map: MapScreen,
    profile: ProfileScreen,
  });

  return (
    <PaperBottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={(index) => setIndex(index)}
      renderScene={renderScene}
      renderIcon={({ route, focused, color }) => (
        <Ionicons
          name={route.icon}
          size={20}
          color={color}
        />
      )}
    />
  );
};

export default BottomNavigation;
