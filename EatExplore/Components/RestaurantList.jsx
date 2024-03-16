import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, Image, StyleSheet } from 'react-native';
import axios from 'axios';

const RestaurantList = ({ data }) => {
  if (!data || !Array.isArray(data)) {
    return null; // O cualquier otro componente o mensaje de error que desees mostrar
  }
  const [restaurantes, setRestaurantes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerRestaurantesCercanos();
  }, []);

  const obtenerRestaurantesCercanos = async () => {
    try {
      // Clave de la API de Google Maps
      const apiKey = 'TU_API_KEY';

      // Coordenadas de ubicación (ejemplo: New York)
      const latitude = 40.7128;
      const longitude = -74.0060;

      // Radio de búsqueda en metros (ejemplo: 5000 metros)
      const radius = 5000;

      // Tipo de lugar (restaurantes)
      const tipo = 'restaurant';

      // URL de la API de Google Maps
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${tipo}&key=${apiKey}`;

      // Realizamos la llamada a la API
      const response = await axios.get(url);

      // Actualizamos el estado con los datos de los restaurantes
      setRestaurantes(response.data.results);
    } catch (error) {
      // Manejamos los errores
      console.error('Error al obtener los restaurantes cercanos:', error);
      setError(error.message);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.icon }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.detailsText}>{`Dirección: ${item.vicinity}`}</Text>
        <Text style={styles.detailsText}>{`Rating: ${item.rating}`}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {error ? (
        <Text style={styles.errorText}>Error: {error}</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 1,
    elevation: 2, // Para Android
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 4,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  detailsText: {
    fontSize: 14,
    color: '#666',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default RestaurantList;
