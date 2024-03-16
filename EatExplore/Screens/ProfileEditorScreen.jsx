import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { TextInput, Button, IconButton } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const EditProfileScreen = () => {
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
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
                    icon="arrow-left"
                    color="#000"
                    size={30}
                    onPress={handleGoBack}
                    style={styles.backButton}
                />
                <Text style={styles.title}>Editar perfil</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Información Personal</Text>
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
                <Button mode="contained" onPress={handleSave} style={styles.button}>
                    Guardar cambios
                </Button>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Configuraciones Adicionales</Text>
                <SettingItem icon="restaurant" title="Tipo de cocina" />
                <SettingItem icon="paid" title="Rango de precios" />
                <SettingItem icon="place" title="Distancia" />
            </View>
        </ScrollView>
    );
};

const SettingItem = ({ icon, title }) => (
    <View style={styles.setting}>
        <MaterialIcons name={icon} size={24} color="#777" />
        <Text style={styles.settingText}>{title}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingTop: 10,
    },
    backButton: {
        marginRight: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        width: '100%',
        marginVertical: 10,
    },
    button: {
        marginTop: 10,
    },
    setting: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
    },
    settingText: {
        marginLeft: 10,
    },
});

export default EditProfileScreen;