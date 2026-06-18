import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import StatusBadge from './StatusBadge';
import { useThemedStyles } from '../theme/useThemedStyles';

function createStyles(colors) {
  return StyleSheet.create({
    card: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: 'hidden',
      flex: 1,
      minWidth: 200,
      maxWidth: 280,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    cover: {
      height: 120,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
    },
    coverText: {
      color: colors.white,
      fontSize: 14,
      fontWeight: '700',
      textAlign: 'center',
      lineHeight: 20,
    },
    info: {
      padding: 14,
    },
    title: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 4,
    },
    author: {
      fontSize: 12,
      color: colors.textSecondary,
      marginBottom: 10,
    },
    meta: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    code: {
      fontSize: 11,
      color: colors.textMuted,
      fontWeight: '500',
    },
  });
}

export default function BookCard({ book, onPress }) {
  const styles = useThemedStyles(createStyles);

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress?.(book)} activeOpacity={0.85}>
      <View style={[styles.cover, { backgroundColor: book.coverColor }]}>
        <Text style={styles.coverText} numberOfLines={3}>
          {book.title}
        </Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{book.title}</Text>
        <Text style={styles.author} numberOfLines={1}>{book.author}</Text>
        <View style={styles.meta}>
          <Text style={styles.code}>{book.code}</Text>
          <StatusBadge status={book.status} />
        </View>
      </View>
    </TouchableOpacity>
  );
}
