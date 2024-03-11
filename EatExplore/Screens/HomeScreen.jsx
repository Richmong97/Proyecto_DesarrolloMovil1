// HomeScreen.jsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar, Button, Title } from 'react-native-paper';
import RestaurantList from '../Components/RestaurantList';

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Aquí se puede implementar la lógica de búsqueda con los filtros seleccionados
    alert(`Realizar búsqueda con filtro: ${searchQuery}`);
  };

  const restaurantData = [
    { id: 1, name: 'Restaurante 1', image: 'https://picsum.photos/200/300/?blur', averagePrice: '$$', rating: 4.5, description: 'Descripción del restaurante 1' },
    { id: 2, name: 'Restaurante 2', image: 'https://picsum.photos/200/300/?blur', averagePrice: '$$', rating: 3.8, description: 'Descripción del restaurante 2' },
    { id: 3, name: 'Restaurante 2', image: 'https://picsum.photos/200/300/?blur', averagePrice: '$$', rating: 3.8, description: 'Descripción del restaurante 2' },
    { id: 4, name: 'Restaurante 2', image: 'https://picsum.photos/200/300/?blur', averagePrice: '$$', rating: 3.8, description: 'Descripción del restaurante 2' },
    { id: 5, name: 'Restaurante 2', image: 'https://picsum.photos/200/300/?blur', averagePrice: '$$', rating: 3.8, description: 'Descripción del restaurante 2' },
    { id: 6, name: 'Restaurante 2', image: 'https://picsum.photos/200/300/?blur', averagePrice: '$$', rating: 3.8, description: 'Descripción del restaurante 2' },
    { id: 7, name: 'Restaurante 2', image: 'https://picsum.photos/200/300/?blur', averagePrice: '$$', rating: 3.8, description: 'Descripción del restaurante 2' },
    { id: 8, name: 'Restaurante 2', image: 'https://picsum.photos/200/300/?blur', averagePrice: '$$', rating: 3.8, description: 'Descripción del restaurante 2' },
    { id: 9, name: 'Restaurante 2', image: 'https://picsum.photos/200/300/?blur', averagePrice: '$$', rating: 3.8, description: 'Descripción del restaurante 2' },
    { id: 10, name: 'Restaurante 2', image: 'https://picsum.photos/200/300/?blur', averagePrice: '$$', rating: 3.8, description: 'Descripción del restaurante 2' },
  ];

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
      {/* Resto del contenido de la pantalla */}
      <RestaurantList data={restaurantData} />
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
});


export default HomeScreen;
