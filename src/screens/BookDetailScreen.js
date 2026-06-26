import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StatusBadge from '../components/StatusBadge';
import Toast from '../components/Toast';
import { useTheme } from '../theme/ThemeContext';
import { useThemedStyles } from '../theme/useThemedStyles';

const DETAIL_FIELDS = [
  { key: 'barcode', label: 'Código de Barras', icon: 'barcode-outline' },
  { key: 'publisher', label: 'Editora', icon: 'business-outline' },
  { key: 'year', label: 'Ano', icon: 'calendar-outline' },
  { key: 'category', label: 'Categoria', icon: 'folder-outline' },
  { key: 'location', label: 'Localização', icon: 'location-outline' },
  { key: 'quantity', label: 'Quantidade', icon: 'layers-outline' },
];

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
    header: {
      flexDirection: 'row',
      gap: 28,
      flexWrap: 'wrap',
    },
    cover: {
      width: 160,
      height: 220,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerInfo: {
      flex: 1,
      minWidth: 240,
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 8,
    },
    author: {
      fontSize: 16,
      color: colors.textSecondary,
      marginBottom: 16,
    },
    badges: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
      marginBottom: 24,
    },
    codeBadge: {
      backgroundColor: colors.surfaceAlt,
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    codeText: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.textSecondary,
    },
    actions: {
      flexDirection: 'row',
      gap: 12,
    },
    editBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      backgroundColor: colors.primary,
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 10,
    },
    editText: {
      color: colors.white,
      fontWeight: '600',
      fontSize: 14,
    },
    deleteBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      backgroundColor: colors.dangerBg,
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.danger,
    },
    deleteText: {
      color: colors.danger,
      fontWeight: '600',
      fontSize: 14,
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: 28,
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
      alignItems: 'center',
      gap: 14,
      minWidth: 240,
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
    },
    detailLabel: {
      fontSize: 11,
      color: colors.textMuted,
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: 2,
    },
    detailValue: {
      fontSize: 14,
      color: colors.text,
      fontWeight: '600',
    },
  });
}

export default function BookDetailScreen({ book, onBack, onEdit, onDelete }) {
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);

  console.log('Livro recebido:', book);

  if (!book) {
    return (
      <View>
        <Text>Livro não encontrado.</Text>
      </View>
    );
  }

  const hideToast = () => setToast((prev) => ({ ...prev, visible: false }));

  const handleDelete = () => {
    onDelete(book.id);
    setToast({
      visible: true,
      message: 'Livro excluído com sucesso',
      type: 'success',
    });
    setTimeout(onBack, 1500);
  };

  return (
    <View style={{ width: '100%' }}>
      <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
        <Ionicons name="arrow-back" size={20} color={colors.primary} />
        <Text style={styles.backText}>Voltar para Livros</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <View style={styles.header}>
          <View style={[styles.cover, { backgroundColor: book.coverColor }]}>
            <Ionicons name="book" size={48} color={colors.white} />
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.title}>{book.title}</Text>
            <Text style={styles.author}>{book.author}</Text>
            <View style={styles.badges}>
              <StatusBadge status={book.status} />
              <View style={styles.codeBadge}>
                <Text style={styles.codeText}>{book.code}</Text>
              </View>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.editBtn}
                activeOpacity={0.8}
                onPress={() => onEdit(book.id)}
              >
                <Ionicons name="create-outline" size={18} color={colors.white} />
                <Text style={styles.editText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteBtn}
                activeOpacity={0.8}
                onPress={handleDelete}
              >
                <Ionicons name="trash-outline" size={18} color={colors.danger} />
                <Text style={styles.deleteText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Informações do Livro</Text>
        <View style={styles.detailsGrid}>
          {DETAIL_FIELDS.map((field) => (
            <View key={field.key} style={styles.detailItem}>
              <View style={styles.detailIcon}>
                <Ionicons name={field.icon} size={18} color={colors.primary} />
              </View>
              <View>
                <Text style={styles.detailLabel}>{field.label}</Text>
                <Text style={styles.detailValue}>
                  {book[field.key] ?? '-'}
                </Text>
              </View>
            </View>
          ))}
          <View style={styles.detailItem}>
            <View style={styles.detailIcon}>
              <Ionicons name="checkmark-circle-outline" size={18} color={colors.success} />
            </View>
            <View>
              <Text style={styles.detailLabel}>Disponíveis</Text>
              <Text style={styles.detailValue}>{book.available} de {book.quantity}</Text>
            </View>
          </View>
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
