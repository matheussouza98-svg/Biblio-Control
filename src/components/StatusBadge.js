import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

function getStatusConfig(colors) {
  return {
    available: { label: 'Disponível', bg: colors.successBg, text: colors.success },
    borrowed: { label: 'Emprestado', bg: colors.dangerBg, text: colors.danger },
    active: { label: 'Em aberto', bg: colors.dangerBg, text: colors.danger },
    returned: { label: 'Devolvido', bg: colors.successBg, text: colors.success },
  };
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default function StatusBadge({ status }) {
  const { colors } = useTheme();
  const config = getStatusConfig(colors)[status] || getStatusConfig(colors).available;

  return (
    <View style={[styles.badge, { backgroundColor: config.bg }]}>
      <Text style={[styles.text, { color: config.text }]}>{config.label}</Text>
    </View>
  );
}
