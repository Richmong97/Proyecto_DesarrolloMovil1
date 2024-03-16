import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Searchbar, Button, Title } from 'react-native-paper';
import RestaurantList from '../Components/RestaurantList';
import axios from 'axios';
import * as Location from 'expo-location';

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [restaurantes, setRestaurantes] = useState([]);
  const [filteredRestaurantes, setFilteredRestaurantes] = useState([]); // Lista de restaurantes filtrados
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    obtenerUbicacion();
  }, []);

  useEffect(() => {
    // Filtrar restaurantes cuando cambia la consulta de búsqueda
    filtrarRestaurantes();
  }, [searchQuery, restaurantes]);

  const obtenerUbicacion = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permiso de ubicación no otorgado');
        setError('Permiso de ubicación no otorgado');
        setLoading(false);
        return;
      }

      let ubicacionUsuario = await Location.getCurrentPositionAsync({});
      setCurrentLocation(ubicacionUsuario.coords);

      obtenerRestaurantesCercanos(ubicacionUsuario.coords.latitude, ubicacionUsuario.coords.longitude);
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  const obtenerRestaurantesCercanos = async (latitude, longitude) => {
    try {
      const apiKey = 'AIzaSyCU8zZPCTDhyDQG_hJBQzrrzyViiPyAa5M';
      const radius = 1000;
      const tipo = 'restaurant';
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${tipo}&key=${apiKey}`;
      
      const response = await axios.get(url);
      setRestaurantes(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los restaurantes cercanos:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  const filtrarRestaurantes = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = restaurantes.filter(restaurante => {
      return restaurante.name.toLowerCase().includes(lowerCaseQuery);
    });
    setFilteredRestaurantes(filtered);
  };

  const handleSearch = () => {
    filtrarRestaurantes(); // Llamar a la función de filtro al hacer clic en el botón de búsqueda
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Searchbar
          placeholder="Buscar restaurantes"
          onChangeText={(query) => setSearchQuery(query)}
          value={searchQuery}
          style={styles.searchbar}
        />
        <Button mode="contained" onPress={handleSearch} style={styles.button}>
          Buscar
        </Button>
      </View>
      <Title style={styles.title}>Restaurantes cercanos</Title>
      {loading ? (
        <Text style={styles.loadingText}>Cargando...</Text>
      ) : error ? (
        <Text style={styles.errorText}>Error: {error}</Text>
      ) : (
        <RestaurantList data={filteredRestaurantes} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 40,
    padding: 10,
  },
  searchbar: {
    flex: 1,
    marginRight: 8,
  },
  button: {
    marginLeft: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
    paddingTop: 50,
    padding: 5,
    paddingBottom: 30,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default HomeScreen;
