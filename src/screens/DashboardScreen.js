import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import { stats, recentBorrows } from '../data/mockData';
import { useTheme } from '../theme/ThemeContext';
import { useThemedStyles } from '../theme/useThemedStyles';

function createStyles(colors) {
  return StyleSheet.create({
    statsRow: {
      flexDirection: 'row',
      gap: 16,
      marginBottom: 16,
      flexWrap: 'wrap',
    },
    section: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 20,
      marginTop: 8,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.text,
    },
    seeAll: {
      fontSize: 13,
      color: colors.primary,
      fontWeight: '600',
    },
    table: {
      borderRadius: 8,
      overflow: 'hidden',
    },
    tableHeader: {
      flexDirection: 'row',
      backgroundColor: colors.surfaceAlt,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    th: {
      fontSize: 12,
      fontWeight: '700',
      color: colors.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    tableRow: {
      flexDirection: 'row',
      paddingVertical: 14,
      paddingHorizontal: 16,
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    tableRowAlt: {
      backgroundColor: colors.surfaceAlt,
    },
    td: {
      fontSize: 13,
      color: colors.text,
    },
    colBook: { flex: 2.5 },
    colStudent: { flex: 2 },
    colDate: { flex: 1.2 },
    colStatus: { flex: 1 },
    bookCell: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    miniCover: {
      width: 32,
      height: 32,
      borderRadius: 6,
      alignItems: 'center',
      justifyContent: 'center',
    },
    bookTitle: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.text,
      flex: 1,
    },
  });
}

export default function DashboardScreen({ onNavigate }) {
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);

  return (
    <View>
      <PageHeader
        title="Dashboard"
        subtitle="Visão geral da biblioteca — 18 de junho de 2026"
        actionLabel="Novo Empréstimo"
        actionIcon="add-circle-outline"
        onAction={() => onNavigate('loans', { tab: 'new' })}
      />

      <View style={styles.statsRow}>
        <StatCard title="Total de Livros" value={stats.totalBooks.toLocaleString('pt-BR')} icon="book" iconColor={colors.primary} />
        <StatCard title="Disponíveis" value={stats.availableBooks.toLocaleString('pt-BR')} icon="checkmark-circle" iconColor={colors.success} accentColor={colors.successBg} />
        <StatCard title="Emprestados" value={stats.borrowedBooks.toLocaleString('pt-BR')} icon="swap-horizontal" iconColor={colors.danger} accentColor={colors.dangerBg} />
      </View>

      <View style={styles.statsRow}>
        <StatCard title="Total de Alunos" value={stats.totalStudents.toLocaleString('pt-BR')} icon="people" iconColor={colors.primary} />
        <StatCard title="Empréstimos Hoje" value={stats.borrowsToday} icon="today" iconColor={colors.warning} accentColor={colors.warningBg} />
        <StatCard title="Devoluções Hoje" value={stats.returnsToday} icon="return-down-back" iconColor={colors.success} accentColor={colors.successBg} />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Empréstimos Recentes</Text>
          <TouchableOpacity onPress={() => onNavigate('loans')}>
            <Text style={styles.seeAll}>Ver todos</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.th, styles.colBook]}>Livro</Text>
            <Text style={[styles.th, styles.colStudent]}>Aluno</Text>
            <Text style={[styles.th, styles.colDate]}>Empréstimo</Text>
            <Text style={[styles.th, styles.colDate]}>Devolução</Text>
            <Text style={[styles.th, styles.colStatus]}>Status</Text>
          </View>

          {recentBorrows.map((item, index) => (
            <View key={item.id} style={[styles.tableRow, index % 2 === 0 && styles.tableRowAlt]}>
              <View style={[styles.td, styles.colBook, styles.bookCell]}>
                <View style={[styles.miniCover, { backgroundColor: item.coverColor }]}>
                  <Ionicons name="book" size={14} color={colors.white} />
                </View>
                <Text style={styles.bookTitle} numberOfLines={1}>{item.bookTitle}</Text>
              </View>
              <Text style={[styles.td, styles.colStudent]} numberOfLines={1}>{item.studentName}</Text>
              <Text style={[styles.td, styles.colDate]}>{item.borrowDate}</Text>
              <Text style={[styles.td, styles.colDate]}>{item.returnDate}</Text>
              <View style={[styles.td, styles.colStatus]}>
                <StatusBadge status={item.status} />
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
