import { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    FlatList,
} from 'react-native';
import { useThemedStyles } from '../theme/useThemedStyles';

function createStyles(colors) {
    return StyleSheet.create({
        container: {
            flex: 1,
        },
        title: {
            fontSize: 32,
            fontWeight: '700',
            marginBottom: 8,
            color: colors.text,
        },
        subtitle: {
            fontSize: 16,
            color: colors.textSecondary,
            marginBottom: 20,
        },
        card: {
            flexDirection: 'row',
            marginBottom: 20,
        },
        input: {
            flex: 1,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 8,
            paddingHorizontal: 12,
            height: 45,
            backgroundColor: colors.surface,
            color: colors.text,
        },
        button: {
            marginLeft: 10,
            backgroundColor: colors.primary,
            paddingHorizontal: 20,
            justifyContent: 'center',
            borderRadius: 8,
        },
        buttonText: {
            color: colors.white,
            fontWeight: '600',
        },
        item: {
            backgroundColor: colors.surface,
            padding: 15,
            borderRadius: 8,
            marginBottom: 10,
            borderWidth: 1,
            borderColor: colors.border,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        itemText: {
            fontSize: 16,
            color: colors.text,
        },
        editText: {
            color: colors.primary,
            fontWeight: 'bold',
            marginRight: 10,
        },
        deleteText: {
            color: colors.danger,
            fontWeight: 'bold',
        },
    });
}

export default function LocationsScreen() {
    const [location, setLocation] = useState('');
    const [locations, setLocations] = useState([
        'Estante A - Prateleira 1',
        'Estante B - Prateleira 2',
        'Sala de Leitura',
    ]);

    const [editingIndex, setEditingIndex] = useState(null);
    const styles = useThemedStyles(createStyles);

    const addLocation = () => {
        if (!location.trim()) return;

        if (editingIndex !== null) {
            const updated = [...locations];
            updated[editingIndex] = location;
            setLocations(updated);
            setEditingIndex(null);
        } else {
            setLocations([...locations, location]);
        }

        setLocation('');
    };

    const deleteLocation = (index) => {
        setLocations(locations.filter((_, i) => i !== index));
    };

    const editLocation = (index) => {
        setLocation(locations[index]);
        setEditingIndex(index);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Localizações</Text>
            <Text style={styles.subtitle}>
                Gerencie as localizações dos livros
            </Text>

            <View style={styles.card}>
                <TextInput
                    placeholder="Nova localização"
                    value={location}
                    onChangeText={setLocation}
                    style={styles.input}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={addLocation}
                >
                    <Text style={styles.buttonText}>
                        {editingIndex !== null ? 'Salvar' : 'Adicionar'}
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={locations}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.item}>
                        <Text style={styles.itemText}>
                            {item}
                        </Text>

                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => editLocation(index)}>
                                <Text style={styles.editText}>
                                    Editar
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => deleteLocation(index)}>
                                <Text style={styles.deleteText}>
                                    Excluir
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}
