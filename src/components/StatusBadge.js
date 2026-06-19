import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

function getStatusConfig(colors) {
  return {
    available: {
      label: 'Disponível',
      bg: '#6B7280',
      text: '#FFFFFF',
    },

    borrowed: {
      label: 'Emprestado',
      bg: '#2563EB', // azul sólido
      text: '#FFFFFF',
    },

    overdue: {
      label: 'Atrasado',
      bg: '#DC2626', // vermelho sólido
      text: '#FFFFFF',
    },

    returned: {
      label: 'Devolvido',
      bg: '#16A34A', // verde sólido
      text: '#FFFFFF',
    },
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
