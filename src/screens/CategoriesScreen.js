import { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    FlatList,
} from 'react-native';

export default function CategoriesScreen() {
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([
        'Literatura Brasileira',
        'Romance',
        'Infantil',
        'Ficção Científica',
    ]);

    const [editingIndex, setEditingIndex] = useState(null);

    const addCategory = () => {
        if (!category.trim()) return;

        if (editingIndex !== null) {
            // EDITAR
            const updated = [...categories];
            updated[editingIndex] = category;
            setCategories(updated);
            setEditingIndex(null);
        } else {
            // ADICIONAR
            setCategories([...categories, category]);
        }

        setCategory('');
    };

    const deleteCategory = (index) => {
        setCategories(categories.filter((_, i) => i !== index));
    };

    const editCategory = (index) => {
        setCategory(categories[index]);
        setEditingIndex(index);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Categorias</Text>
            <Text style={styles.subtitle}>
                Gerencie as categorias da biblioteca
            </Text>

            {/* INPUT + BOTÃO */}
            <View style={styles.card}>
                <TextInput
                    placeholder="Nova categoria"
                    value={category}
                    onChangeText={setCategory}
                    style={styles.input}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={addCategory}
                >
                    <Text style={styles.buttonText}>
                        {editingIndex !== null ? 'Salvar' : 'Adicionar'}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* LISTA */}
            <FlatList
                data={categories}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.item}>
                        <Text style={styles.itemText}>{item}</Text>

                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => editCategory(index)}>
                                <Text style={{ color: 'blue', fontWeight: 'bold', marginRight: 10 }}>
                                    Editar
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => deleteCategory(index)}>
                                <Text style={{ color: 'red', fontWeight: 'bold' }}>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    title: {
        fontSize: 32,
        fontWeight: '700',
        marginBottom: 8,
    },

    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },

    card: {
        flexDirection: 'row',
        marginBottom: 20,
    },

    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 45,
        backgroundColor: '#fff',
    },

    button: {
        marginLeft: 10,
        backgroundColor: '#0047AB',
        paddingHorizontal: 20,
        justifyContent: 'center',
        borderRadius: 8,
    },

    buttonText: {
        color: '#fff',
        fontWeight: '600',
    },

    item: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#eee',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemText: {
        fontSize: 16,
    },
});