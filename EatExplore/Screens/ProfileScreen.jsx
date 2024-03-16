import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Avatar, Title, Caption, IconButton } from 'react-native-paper';
import RestaurantesPendientes from '../Components/RestaurantesPendientes';
import { useNavigation } from '@react-navigation/native'; // Importa el hook de navegación

const ProfileScreen = () => {
  const navigation = useNavigation(); // Obtiene el objeto de navegación
  const tiposCocina = ["Mexicana", "Asiática", "Comida rápida", "Comida rápida", "Comida rápida", "Comida rápida"];

  const rangoPrecio = {
    min: 150,
    max: 475,
  };

  const distanciaRestaurantes = 5;

  const pendingRestaurants = [
    {
      id: 1,
      imagen: 'https://resizer.otstatic.com/v2/photos/wide-large/2/50220121.jpg',
      nombre: 'Restaurante 1',
      precioPromedio: 25,
      calificacion: 4.5,
    },
    {
      id: 2,
      imagen: 'https://images.adsttc.com/media/images/61e4/f0d1/ebe2/ef01/66a4/f9c2/newsletter/enotokio-nodotaller01-ok.jpg?1642393951',
      nombre: 'Restaurante 2',
      precioPromedio: 30,
      calificacion: 4.0,
    },
    {
      id: 3,
      imagen: 'https://images.adsttc.com/media/images/61e4/f0d1/ebe2/ef01/66a4/f9c2/newsletter/enotokio-nodotaller01-ok.jpg?1642393951',
      nombre: 'Restaurante 2',
      precioPromedio: 30,
      calificacion: 4.0,
    },
    {
      id: 4,
      imagen: 'https://images.adsttc.com/media/images/61e4/f0d1/ebe2/ef01/66a4/f9c2/newsletter/enotokio-nodotaller01-ok.jpg?1642393951',
      nombre: 'Restaurante 2',
      precioPromedio: 30,
      calificacion: 4.0,
    },
  ];

  // Función para manejar el evento de presionar el botón de ajustes
  const handleSettingsPress = () => {
    navigation.navigate('ProfileEditor');
    console.log('Botón de ajustes presionado');
  };

  const avatarImageSource = require('../assets/Icon/Darthvader.png');

  const renderTipoCocina = ({ item }) => (
    <View style={styles.tipoCocinaItem}>
      <Text style={styles.tipoCocinaTexto}>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Agrega el IconButton en la esquina superior derecha */}
        <IconButton
          icon="cog"
          color="#000"
          size={30}
          mode="contained-tonal"
          onPress={handleSettingsPress}
          style={styles.settingsButton}
        />

        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Avatar.Image
              source={avatarImageSource}
              style={styles.avatarImage}
              size={110}
            />
            <View style={{ marginLeft: 20 }}>
              <Title style={styles.title}>Nombre del Usuario</Title>
              <Caption style={styles.caption}>correo@example.com</Caption>
            </View>
          </View>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Tipos de cocina:</Text>
          </View>
          <FlatList
            data={tiposCocina}
            renderItem={renderTipoCocina}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
          <View style={styles.rangoPrecios}>
            <Text style={styles.rangoPreciosTitulo}>Rango de precio:</Text>
            <Text style={styles.rangoPreciosTexto}>
              L.{rangoPrecio.min} a L.{rangoPrecio.max}
            </Text>
          </View>
          <View style={styles.distancia}>
            <Text style={styles.distanciaTitulo}>Distancia de restaurantes:</Text>
            <Text style={styles.distanciaTexto}>{distanciaRestaurantes} Km</Text>
          </View>
          <RestaurantesPendientes restaurants={pendingRestaurants} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Ajusta el color de fondo según sea necesario
    paddingTop: 60,
  },
  scrollContent: {
    flexGrow: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    paddingBottom: 30, // Ajusta el espacio inferior para evitar que el contenido se corte
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    color: '#999',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarImage: {
    borderRadius: 50,
  },
  tipoCocinaItem: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f7f7f7',
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginRight: 15,
    margin: 10,
  },
  labelContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  rangoPrecios: {
    marginTop: 20,
  },
  rangoPreciosTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  },
  rangoPreciosTexto: {
    fontSize: 16,
    padding: 10,
  },
  distancia: {
    marginTop: 20,
  },
  distanciaTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  },
  distanciaTexto: {
    fontSize: 16,
    padding: 10,
  },
  settingsButton: {
    position: 'absolute', // Posición absoluta para superponer en la esquina superior derecha
    top: 10, // Distancia desde la parte superior
    right: 10, // Distancia desde la derecha
  },
});

export default ProfileScreen;