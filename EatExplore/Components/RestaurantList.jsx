// RestaurantList.jsx
import React from 'react';
import { FlatList, View, Text, Image, StyleSheet } from 'react-native';

const RestaurantList = ({ data }) => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.detailsContainer}>
          <Text>{`Precio promedio: ${item.averagePrice}`}</Text>
          <Text>{`Calificación: ${item.rating}`}</Text>
        </View>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 10,
    marginVertical: 6,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 4,
    margin: 10,
  },
  infoContainer: {
    flex: 1,
    marginVertical: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  description: {
    color: '#666',
    paddingHorizontal: 10,
  },
});

export default RestaurantList;
