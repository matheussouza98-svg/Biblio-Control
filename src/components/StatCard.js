import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { useThemedStyles } from '../theme/useThemedStyles';

function createStyles(colors) {
  return StyleSheet.create({
    card: {
      flex: 1,
      minWidth: 160,
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    iconWrap: {
      width: 48,
      height: 48,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      flex: 1,
    },
    value: {
      fontSize: 26,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 2,
    },
    title: {
      fontSize: 13,
      color: colors.textSecondary,
      fontWeight: '500',
    },
  });
}

export default function StatCard({ title, value, icon, iconColor, accentColor }) {
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.card}>
      <View style={[styles.iconWrap, { backgroundColor: accentColor || colors.primaryLight }]}>
        <Ionicons name={icon} size={22} color={iconColor || colors.primary} />
      </View>
      <View style={styles.content}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
}
