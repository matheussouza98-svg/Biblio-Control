import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { useThemedStyles } from '../theme/useThemedStyles';

const REPORT_ITEMS = [
  { id: 'loans', icon: 'bar-chart-outline', label: 'Empréstimos por Mês' },
  { id: 'topBooks', icon: 'book-outline', label: 'Livros Mais Emprestados' },
  { id: 'topStudents', icon: 'people-outline', label: 'Alunos Mais Ativos' },
  { id: 'export', icon: 'document-text-outline', label: 'Exportar PDF' },
];

function createStyles(colors) {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
      fontSize: 32,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 6,
    },
    subtitle: {
      fontSize: 16,
      color: colors.textSecondary,
      marginBottom: 32,
    },
    statsRow: {
      flexDirection: 'row',
      gap: 16,
      marginBottom: 32,
      flexWrap: 'wrap',
    },
    statCard: {
      flex: 1,
      minWidth: 160,
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 20,
      borderWidth: 1,
      borderColor: colors.border,
    },
    statNumber: {
      fontSize: 28,
      fontWeight: '700',
      color: colors.text,
      marginTop: 10,
    },
    statLabel: {
      color: colors.textSecondary,
      marginTop: 4,
    },
    sectionTitle: {
      fontSize: 22,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 20,
    },
    reportCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 18,
      marginBottom: 12,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    reportCardActive: {
      borderColor: colors.primary,
      backgroundColor: colors.primaryLight,
    },
    reportText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    reportTextActive: {
      color: colors.primary,
    },
    focusPanel: {
      marginTop: 24,
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 24,
      borderWidth: 1,
      borderColor: colors.border,
    },
    focusTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 8,
    },
    focusDesc: {
      fontSize: 14,
      color: colors.textSecondary,
      lineHeight: 22,
    },
  });
}

const FOCUS_CONTENT = {
  loans: {
    title: 'Relatório de Empréstimos',
    description: 'Visualize empréstimos por mês, taxa de devolução e tendências de uso da biblioteca.',
  },
  topBooks: {
    title: 'Livros Mais Emprestados',
    description: 'Ranking dos títulos com maior circulação nos últimos meses.',
  },
  topStudents: {
    title: 'Alunos Mais Ativos',
    description: 'Alunos com maior número de empréstimos e engajamento com a biblioteca.',
  },
  export: {
    title: 'Exportar PDF',
    description: 'Gere relatórios em PDF para impressão ou arquivamento.',
  },
};

export default function ReportsScreen({ initialTab = 'loans' }) {
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);
  const focus = FOCUS_CONTENT[initialTab] || FOCUS_CONTENT.loans;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relatórios</Text>
      <Text style={styles.subtitle}>
        Visualize estatísticas e relatórios da biblioteca.
      </Text>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Ionicons name="library-outline" size={24} color={colors.textSecondary} />
          <Text style={styles.statNumber}>1250</Text>
          <Text style={styles.statLabel}>Livros</Text>
        </View>

        <View style={styles.statCard}>
          <Ionicons name="people-outline" size={24} color={colors.textSecondary} />
          <Text style={styles.statNumber}>540</Text>
          <Text style={styles.statLabel}>Alunos</Text>
        </View>

        <View style={styles.statCard}>
          <Ionicons name="repeat-outline" size={24} color={colors.textSecondary} />
          <Text style={styles.statNumber}>82</Text>
          <Text style={styles.statLabel}>Empréstimos</Text>
        </View>

        <View style={styles.statCard}>
          <Ionicons name="alert-circle-outline" size={24} color={colors.textSecondary} />
          <Text style={styles.statNumber}>7</Text>
          <Text style={styles.statLabel}>Atrasados</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Relatórios Disponíveis</Text>

      {REPORT_ITEMS.map((item) => {
        const isActive = initialTab === item.id;
        return (
          <View
            key={item.id}
            style={[styles.reportCard, isActive && styles.reportCardActive]}
          >
            <Ionicons
              name={item.icon}
              size={22}
              color={isActive ? colors.primary : colors.textSecondary}
            />
            <Text style={[styles.reportText, isActive && styles.reportTextActive]}>
              {item.label}
            </Text>
          </View>
        );
      })}

      <View style={styles.focusPanel}>
        <Text style={styles.focusTitle}>{focus.title}</Text>
        <Text style={styles.focusDesc}>{focus.description}</Text>
      </View>
    </View>
  );
}
