import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';
import NewBorrowScreen from './NewBorrowScreen';
import ReturnScreen from './ReturnScreen';
import { recentBorrows } from '../data/mockData';
import { useTheme } from '../theme/ThemeContext';
import { useThemedStyles } from '../theme/useThemedStyles';

const TABS = [
  { id: 'history', label: 'Histórico', icon: 'time-outline' },
  { id: 'new', label: 'Novo Empréstimo', icon: 'add-circle-outline' },
  { id: 'return', label: 'Devolução', icon: 'return-down-back-outline' },
];

function createStyles(colors) {
  return StyleSheet.create({
    tabs: {
      flexDirection: 'row',
      gap: 8,
      marginBottom: 24,
      flexWrap: 'wrap',
    },
    tab: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      paddingHorizontal: 18,
      paddingVertical: 12,
      borderRadius: 10,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    tabActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    tabText: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.textSecondary,
    },
    tabTextActive: {
      color: colors.white,
      fontWeight: '600',
    },
    table: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: 'hidden',
    },
    tableHeader: {
      flexDirection: 'row',
      backgroundColor: colors.surfaceAlt,
      paddingVertical: 14,
      paddingHorizontal: 20,
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
    row: {
      flexDirection: 'row',
      paddingVertical: 14,
      paddingHorizontal: 20,
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    rowAlt: {
      backgroundColor: colors.surfaceAlt,
    },
    td: {
      fontSize: 13,
      color: colors.text,
    },
    cover: {
      width: 32,
      height: 32,
      borderRadius: 6,
      alignItems: 'center',
      justifyContent: 'center',
    },
    bookTitle: {
      fontSize: 13,
      fontWeight: '600',
      flex: 1,
    },
  });
}

export default function LoansScreen({ initialTab = 'history' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);

  return (
    <View>
      <PageHeader
        title="Empréstimos"
        subtitle="Gerencie empréstimos, devoluções e histórico"
      />

      <View style={styles.tabs}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tab, isActive && styles.tabActive]}
              onPress={() => setActiveTab(tab.id)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={tab.icon}
                size={18}
                color={isActive ? colors.white : colors.textSecondary}
              />
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {activeTab === 'history' && (
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.th, { flex: 2.5 }]}>Livro</Text>
            <Text style={[styles.th, { flex: 2 }]}>Aluno</Text>
            <Text style={[styles.th, { flex: 1.2 }]}>Empréstimo</Text>
            <Text style={[styles.th, { flex: 1.2 }]}>Devolução</Text>
            <Text style={[styles.th, { flex: 1 }]}>Status</Text>
          </View>
          {recentBorrows.map((item, index) => (
            <View key={item.id} style={[styles.row, index % 2 === 0 && styles.rowAlt]}>
              <View style={[styles.td, { flex: 2.5, flexDirection: 'row', alignItems: 'center', gap: 10 }]}>
                <View style={[styles.cover, { backgroundColor: item.coverColor }]}>
                  <Ionicons name="book" size={14} color={colors.white} />
                </View>
                <Text style={styles.bookTitle} numberOfLines={1}>{item.bookTitle}</Text>
              </View>
              <Text style={[styles.td, { flex: 2 }]} numberOfLines={1}>{item.studentName}</Text>
              <Text style={[styles.td, { flex: 1.2 }]}>{item.borrowDate}</Text>
              <Text style={[styles.td, { flex: 1.2 }]}>{item.returnDate}</Text>
              <View style={{ flex: 1 }}>
                <StatusBadge status={item.status} />
              </View>
            </View>
          ))}
        </View>
      )}

      {activeTab === 'new' && <NewBorrowScreen />}
      {activeTab === 'return' && <ReturnScreen />}
    </View>
  );
}
