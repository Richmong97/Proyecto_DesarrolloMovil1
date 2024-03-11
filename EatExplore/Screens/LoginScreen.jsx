// LoginScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native'; // Agregamos Alert
import { TextInput, Button, Title } from 'react-native-paper';
import { credentials } from '../Components/Auth';

const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Verifica las credenciales ingresadas
    if (username === credentials.username && password === credentials.password) {
      // Muestra un mensaje de alerta para indicar que ha iniciado sesión
      Alert.alert('Éxito', 'Sesión iniciada correctamente', [
        {
          text: 'OK',
          onPress: () => {
            // Llama a la función proporcionada para indicar que ha iniciado sesión
            onLogin();
          },
        },
      ]);
    } else {
      // Maneja la lógica para credenciales incorrectas
      Alert.alert('Error', 'Credenciales incorrectas. Inténtalo de nuevo.');
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>EatExplore</Title>
      <Title style={styles.loginText}>Login</Title>
      <TextInput
        label="Nombre de usuario"
        value={username}
        onChangeText={text => setUsername(text)}
        style={styles.input}
      />
      <TextInput
        label="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Iniciar sesión
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 28,
    marginBottom: 16,
    textAlign: 'center',
    paddingBottom: 20,
  },
  loginText: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 24,
  },
});

export default LoginScreen;
