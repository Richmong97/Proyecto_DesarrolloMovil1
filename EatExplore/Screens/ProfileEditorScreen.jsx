import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { TextInput, Button, Avatar, IconButton } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const EditProfileScreen = () => {
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [photo, setPhoto] = useState('');
    const [types, setTypes] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100);
    const [distance, setDistance] = useState(10);

    const handleSave = () => {
        // Implementar la lógica para guardar los cambios
    };

    const handleGoBack = () => {
        navigation.goBack();
    };


    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <IconButton
                    icon="arrow-left" // Ícono de flecha para regresar
                    color="#000"
                    size={30}
                    onPress={handleGoBack}
                    style={styles.backButton}
                />
                <Text style={styles.title}>Editar perfil</Text>
            </View>
            <View style={styles.profile}>
                <Avatar.Image size={128} source={{ uri: photo }} />
                <TextInput
                    label="Nombre"
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                />
                <TextInput
                    label="Correo electrónico"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                />
                <Button mode="contained" onPress={handleSave}>
                    Guardar cambios
                </Button>
            </View>
            <View style={styles.settings}>
                <View style={styles.setting}>
                    <MaterialIcons name="restaurant" size={24} color="#777" />
                    <Text>Tipo de cocina</Text>
                </View>
                <View style={styles.setting}>
                    <MaterialIcons name="paid" size={24} color="#777" />
                    <Text>Rango de precios</Text>
                </View>
                <View style={styles.setting}>
                    <MaterialIcons name="place" size={24} color="#777" />
                    <Text>Distancia</Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        flexDirection: 'row', // Organiza los elementos en fila
        alignItems: 'center', // Alinea verticalmente al centro
        justifyContent: 'space-between', // Distribuye el espacio entre elementos
        marginBottom: 20,
        paddingTop:10,
    },
    backButton: {
        marginRight: 10, // Margen derecho para el botón
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    profile: {
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        width: 300,
        marginVertical: 10,
    },
    settings: {
        borderRadius: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 10,
    },
    setting: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
    },
});

export default EditProfileScreen;
