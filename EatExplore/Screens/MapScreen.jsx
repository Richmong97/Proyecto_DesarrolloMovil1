import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker, Circle, Callout } from 'react-native-maps';
import * as Location from 'expo-location';

const PantallaMapa = () => {
  const [ubicacion, setUbicacion] = React.useState(null);
  const [ubicacionTocada, setUbicacionTocada] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permiso de ubicación no otorgado');
        return;
      }

      let ubicacionUsuario = await Location.getCurrentPositionAsync({});
      setUbicacion(ubicacionUsuario);
    })();
  }, []);

  const manejarPresionMapa = async (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setUbicacionTocada({ latitude, longitude });
  };

  return (
    <View style={styles.contenedor}>
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

          {/* Círculo alrededor de mi ubicación actual */}
          <Circle
            center={{
              latitude: ubicacion.coords.latitude,
              longitude: ubicacion.coords.longitude,
            }}
            radius={3000} // Radio en metros (3 km)
            fillColor="rgba(255, 0, 0, 0.2)"
            strokeColor="rgba(255, 0, 0, 0.5)"
          />

          {/* Marcador para la ubicación tocada (renderizado condicionalmente) */}
          {ubicacionTocada && (
            <Marker
              coordinate={ubicacionTocada}
              title="Ubicación seleccionada"
              description="Toca para ver las coordenadas"
            >
              <Callout>
                <View>
                  <Text style={styles.tituloCallout}>Ubicación</Text>
                  <Text style={styles.textoCallout}>
                    Latitud: {ubicacionTocada.latitude.toFixed(6)}
                  </Text>
                  <Text style={styles.textoCallout}>
                    Longitud: {ubicacionTocada.longitude.toFixed(6)}
                  </Text>
                </View>
              </Callout>
            </Marker>
          )}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
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

export default PantallaMapa;
