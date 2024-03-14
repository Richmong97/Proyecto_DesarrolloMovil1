import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

const RestaurantesPendientes = ({ restaurants }) => {
  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: item.imagen }} />
      <Card.Content>
        <Title style={styles.title}>{item.nombre}</Title>
        <Paragraph style={styles.text}>Precio promedio: L.{item.precioPromedio}</Paragraph>
        <Paragraph style={styles.text}>Calificación: {item.calificacion}</Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Restaurantes por visitar</Text>
      <FlatList
        data={restaurants}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal // Establece el scroll horizontal
        contentContainerStyle={styles.flatListContent} // Establece el estilo del contenedor de contenido del FlatList
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    marginRight: 10, // Agrega un margen derecho para separar las tarjetas
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
  },
  flatListContent: {
    paddingBottom: 10, // Agrega un espacio en la parte inferior para las tarjetas
  },
});

export default RestaurantesPendientes;
