// App.jsx
import React, { useState } from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomNavigation from './Components/BottomNav';
import LoginScreen from './Screens/LoginScreen';
import ProfileEditorScreen from './Screens/ProfileEditorScreen';

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
  },
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Lógica de autenticación simulada
    setIsLoggedIn(true);
  };

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!isLoggedIn ? (
            <Stack.Screen name="Login" component={() => <LoginScreen onLogin={handleLogin} />} />
          ) : (
            <Stack.Screen name="Main" component={BottomNavigation} />
          )}
          {/* Agrega la pantalla ProfileEditor aquí */}
          <Stack.Screen name="ProfileEditor" component={ProfileEditorScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
