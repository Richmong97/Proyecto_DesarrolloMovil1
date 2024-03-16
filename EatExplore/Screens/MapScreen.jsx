import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker, Circle, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';

const MapScreen = () => {
  const [ubicacion, setUbicacion] = useState(null);
  const [restaurantes, setRestaurantes] = useState([]);
  const [error, setError] = useState(null);
  const [radio, setRadio] = useState(500); // Radio inicial de 5000 metros (5 km)

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permiso de ubicación no otorgado');
        return;
      }

      let ubicacionUsuario = await Location.getCurrentPositionAsync({});
      setUbicacion(ubicacionUsuario);

      // Llama a la función para buscar restaurantes
      buscarRestaurantes(ubicacionUsuario.coords.latitude, ubicacionUsuario.coords.longitude);
    })();
  }, []);

  const buscarRestaurantes = async (latitude, longitude) => {
    try {
      if (!latitude || !longitude) {
        console.error('Ubicación no disponible');
        return;
      }

      const apiKey = 'AIzaSyCU8zZPCTDhyDQG_hJBQzrrzyViiPyAa5M'; // Reemplaza con tu propia clave de API de Google Maps
      const tipo = 'restaurant';

      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radio}&type=${tipo}&key=${apiKey}`;

      const response = await axios.get(url);
      setRestaurantes(response.data.results);
    } catch (error) {
      console.error('Error al obtener los restaurantes:', error);
      setError(error.message);
    }
  };

  const manejarPresionMapa = async (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    // Aquí puedes realizar alguna acción con las coordenadas tocadas, si es necesario
  };

  return (
    <View style={styles.container}>
      {ubicacion && (
        <MapView
          style={styles.mapa}
          initialRegion={{
            latitude: ubicacion.coords.latitude,
            longitude: ubicacion.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={manejarPresionMapa}
        >
          {/* Marcador para la ubicación actual del usuario */}
          <Marker
            coordinate={{
              latitude: ubicacion.coords.latitude,
              longitude: ubicacion.coords.longitude,
            }}
            title="Mi ubicación"
            pinColor="blue"
          >
            <Callout>
              <View>
                <Text style={styles.tituloCallout}>Tu Ubicación</Text>
                <Text style={styles.textoCallout}>
                  Latitud: {ubicacion.coords.latitude.toFixed(6)}
                </Text>
                <Text style={styles.textoCallout}>
                  Longitud: {ubicacion.coords.longitude.toFixed(6)}
                </Text>
              </View>
            </Callout>
          </Marker>

          {/* Marcadores para los restaurantes */}
          {restaurantes.map((restaurante, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: restaurante.geometry.location.lat,
                longitude: restaurante.geometry.location.lng,
              }}
              title={restaurante.name}
              description={restaurante.vicinity}
              pinColor="red"
            />
          ))}

          {/* Círculo alrededor de la ubicación actual */}
          <Circle
            center={{
              latitude: ubicacion.coords.latitude,
              longitude: ubicacion.coords.longitude,
            }}
            radius={radio} // Usar el radio definido por el estado
            fillColor="rgba(255, 0, 0, 0.2)"
            strokeColor="rgba(255, 0, 0, 0.5)"
          />
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapa: {
    flex: 1,
  },
  tituloCallout: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textoCallout: {
    fontSize: 14,
  },
});

export default MapScreen;
