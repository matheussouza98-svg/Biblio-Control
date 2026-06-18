import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Toast from '../components/Toast';
import { useTheme } from '../theme/ThemeContext';
import { useThemedStyles } from '../theme/useThemedStyles';

const MAIN_FIELDS = [
  { key: 'title', label: 'Título', icon: 'book-outline', placeholder: 'Digite o título do livro' },
  { key: 'author', label: 'Autor', icon: 'person-outline', placeholder: 'Digite o nome do autor' },
];

const FORM_FIELDS = [
  { key: 'barcode', label: 'Código de Barras', icon: 'barcode-outline', placeholder: 'Digite o código de barras' },
  { key: 'publisher', label: 'Editora', icon: 'business-outline', placeholder: 'Digite a editora' },
  { key: 'year', label: 'Ano', icon: 'calendar-outline', placeholder: 'Digite o ano', keyboardType: 'numeric' },
  { key: 'category', label: 'Categoria', icon: 'folder-outline', placeholder: 'Digite a categoria' },
  { key: 'location', label: 'Localização', icon: 'location-outline', placeholder: 'Ex: Estante A - Prateleira 3' },
  { key: 'quantity', label: 'Quantidade', icon: 'layers-outline', placeholder: 'Digite a quantidade', keyboardType: 'numeric' },
  { key: 'available', label: 'Disponíveis', icon: 'checkmark-circle-outline', placeholder: 'Digite quantos estão disponíveis', keyboardType: 'numeric' },
];

const ALL_FIELDS = [...MAIN_FIELDS, ...FORM_FIELDS];

const INITIAL_FORM = Object.fromEntries(ALL_FIELDS.map((field) => [field.key, '']));

function bookToForm(book) {
  return {
    title: book.title,
    author: book.author,
    barcode: book.barcode,
    publisher: book.publisher,
    year: String(book.year),
    category: book.category,
    location: book.location,
    quantity: String(book.quantity),
    available: String(book.available),
  };
}

function createStyles(colors) {
  return StyleSheet.create({
    backBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 20,
    },
    backText: {
      fontSize: 14,
      color: colors.primary,
      fontWeight: '600',
    },
    card: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 28,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 20,
    },
    detailsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 20,
    },
    detailItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 14,
      minWidth: 280,
      flex: 1,
      backgroundColor: colors.surfaceAlt,
      padding: 16,
      borderRadius: 10,
    },
    detailIcon: {
      width: 40,
      height: 40,
      borderRadius: 10,
      backgroundColor: colors.primaryLight,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 2,
    },
    detailContent: {
      flex: 1,
    },
    detailLabel: {
      fontSize: 11,
      color: colors.textMuted,
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: 8,
    },
    input: {
      fontSize: 14,
      color: colors.text,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      minHeight: 42,
      outlineStyle: 'none',
    },
    actions: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 28,
      justifyContent: 'flex-end',
    },
    cancelBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      backgroundColor: colors.surfaceAlt,
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.border,
    },
    cancelText: {
      color: colors.textSecondary,
      fontWeight: '600',
      fontSize: 14,
    },
    saveBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      backgroundColor: colors.primary,
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 10,
    },
    saveText: {
      color: colors.white,
      fontWeight: '600',
      fontSize: 14,
    },
  });
}

export default function RegisterBookScreen({
  onBack,
  onSave,
  initialBook = null,
  mode = 'create',
  backLabel = 'Voltar para Livros',
}) {
  const isEdit = mode === 'edit';
  const [form, setForm] = useState(() => (initialBook ? bookToForm(initialBook) : INITIAL_FORM));
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const hideToast = () => setToast((prev) => ({ ...prev, visible: false }));

  const handleSave = () => {
    const missing = ALL_FIELDS.filter((field) => !form[field.key].trim());

    if (missing.length > 0) {
      setToast({
        visible: true,
        message: isEdit
          ? 'Preencha todos os campos antes de salvar.'
          : 'Preencha todos os campos antes de cadastrar.',
        type: 'error',
      });
      return;
    }

    onSave(form);
    if (!isEdit) setForm(INITIAL_FORM);
    setToast({
      visible: true,
      message: isEdit ? 'Livro atualizado com sucesso' : 'Livro cadastrado com sucesso',
      type: 'success',
    });

    setTimeout(() => {
      onBack();
    }, 1800);
  };

  const renderField = (field) => (
    <View key={field.key} style={styles.detailItem}>
      <View style={styles.detailIcon}>
        <Ionicons
          name={field.icon}
          size={18}
          color={field.key === 'available' ? colors.success : colors.primary}
        />
      </View>
      <View style={styles.detailContent}>
        <Text style={styles.detailLabel}>{field.label}</Text>
        <TextInput
          style={styles.input}
          placeholder={field.placeholder}
          placeholderTextColor={colors.textMuted}
          value={form[field.key]}
          onChangeText={(value) => updateField(field.key, value)}
          keyboardType={field.keyboardType || 'default'}
        />
      </View>
    </View>
  );

  return (
    <View>
      <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
        <Ionicons name="arrow-back" size={20} color={colors.primary} />
        <Text style={styles.backText}>{backLabel}</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>{isEdit ? 'Editar Livro' : 'Cadastrar Livro'}</Text>

        <View style={styles.detailsGrid}>
          {MAIN_FIELDS.map(renderField)}
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 28, fontSize: 16 }]}>
          Informações do Livro
        </Text>

        <View style={styles.detailsGrid}>
          {FORM_FIELDS.map(renderField)}
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.cancelBtn} onPress={onBack} activeOpacity={0.8}>
            <Ionicons name="close-outline" size={18} color={colors.textSecondary} />
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.8}>
            <Ionicons name="checkmark-circle-outline" size={18} color={colors.white} />
            <Text style={styles.saveText}>{isEdit ? 'Salvar alterações' : 'Cadastrar'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onHide={hideToast}
      />
    </View>
  );
}
