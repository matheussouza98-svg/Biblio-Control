import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import SearchBar from '../components/SearchBar';
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
    
    searchAndFilters: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginBottom: 16,
      zIndex: 9999,
    },

    searchHalf: {
      flex: 1,
    },
    filtersRow: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 16,
      flexWrap: 'wrap',
    },

    filterButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      minWidth: 120,
      paddingHorizontal: 14,
      paddingVertical: 12,
      borderRadius: 10,
      backgroundColor: colors.surfaceAlt,
      borderWidth: 1,
      borderColor: colors.border,
    },

    filterText: {
      color: colors.text,
      fontSize: 14,
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

    searchContainer: {
      marginBottom: 16,
    },
    filtersContainer: {
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
      zIndex: 1,
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
    colBook: { flex: 2 },
    colStudent: { flex: 2 },
    colClass: { flex: 1 },
    colCourse: { flex: 1.8 },
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

  const [search, setSearch] = useState('');
  const [showTurmas, setShowTurmas] = useState(false);
  const [turmaSelecionada, setTurmaSelecionada] = useState('');
  const [showCursos, setShowCursos] = useState(false);
  const [cursoSelecionado, setCursoSelecionado] = useState('');
  const [showPeriodos, setShowPeriodos] = useState(false);
  const [periodoSelecionado, setPeriodoSelecionado] = useState('');

  const now = new Date();

  const ultimaAtualizacao = now.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const filteredBorrows = recentBorrows
    .filter(item => {
      const busca =
        item.bookTitle.toLowerCase().includes(search.toLowerCase()) ||
        item.studentName.toLowerCase().includes(search.toLowerCase());

      const turma =
        turmaSelecionada === '' ||
        item.turma === turmaSelecionada;

      const curso =
        cursoSelecionado === '' ||
        item.curso === cursoSelecionado;

      let periodo = true;

      if (periodoSelecionado !== '') {
        const hoje = new Date();

        // Ajuste conforme o formato da sua data
        // Exemplo esperado: "23/06/2026"
        const [dia, mes, ano] = item.borrowDate.split('/');
        const dataEmprestimo = new Date(ano, mes - 1, dia);

        if (periodoSelecionado === 'Hoje') {
          periodo =
            dataEmprestimo.toDateString() === hoje.toDateString();
        }

        if (periodoSelecionado === 'Últimos 7 dias') {
          const seteDiasAtras = new Date();
          seteDiasAtras.setDate(hoje.getDate() - 7);

          periodo = dataEmprestimo >= seteDiasAtras;
        }

        if (periodoSelecionado === 'Últimos 30 dias') {
          const trintaDiasAtras = new Date();
          trintaDiasAtras.setDate(hoje.getDate() - 30);

          periodo = dataEmprestimo >= trintaDiasAtras;
        }
      }

      return busca && turma && curso && periodo;
    })
    .sort((a, b) => {
      const ordem = {
        overdue: 1,
        borrowed: 2,
        returned: 3,
      };

      if (ordem[a.status] !== ordem[b.status]) {
        return ordem[a.status] - ordem[b.status];
      }

      const [diaA, mesA, anoA] = a.borrowDate.split('/');
      const [diaB, mesB, anoB] = b.borrowDate.split('/');

      const dataA = new Date(anoA, mesA - 1, diaA);
      const dataB = new Date(anoB, mesB - 1, diaB);

      return dataB - dataA;
    });

  return (
    <View>
      <PageHeader
        title="Painel de Controle da Biblioteca"
        subtitle="Gerencie livros, empréstimos, devoluções e usuários em um único lugar."
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

        <View style={styles.searchAndFilters}>
          <View style={styles.searchHalf}>
            <SearchBar
              placeholder="Buscar livro, aluno ou matrícula..."
              value={search}
              onChangeText={setSearch}
            />
          </View>

          <View>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => {
                setShowTurmas(!showTurmas);
                setShowCursos(false);
              }}
            >
              <Text style={styles.filterText}>
                {turmaSelecionada || 'Turma'}
              </Text>

              <Ionicons
                name="chevron-down"
                size={16}
                color={colors.textSecondary}
              />
            </TouchableOpacity>

            {showTurmas && (
              <View
                style={{
                  position: 'absolute',
                  top: 55,
                  left: 0,
                  width: 140,
                  backgroundColor: colors.surface,
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 10,

                  zIndex: 9999,
                  elevation: 9999, // Android
                }}
              >
                {['Todos', '1º Ano', '2º Ano', '3º Ano'].map(turma => (
                  <TouchableOpacity
                    key={turma}
                    style={{ padding: 12 }}
                    onPress={() => {
                      setTurmaSelecionada(
                        turma === 'Todos' ? '' : turma
                      );
                      setShowTurmas(false);
                    }}
                  >
                    <Text style={{ color: colors.text }}>
                      {turma}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <View>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => {
                setShowCursos(!showCursos);
                setShowTurmas(false);
              }}
            >
              <Text style={styles.filterText}>
                {cursoSelecionado || 'Curso'}
              </Text>

              <Ionicons
                name="chevron-down"
                size={16}
                color={colors.textSecondary}
              />
            </TouchableOpacity>

            {showCursos && (
              <View
                style={{
                  position: 'absolute',
                  top: 55,
                  left: 0,
                  width: 220,
                  backgroundColor: colors.surface,
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 10,
                  zIndex: 9999,
                  elevation: 9999,
                }}
              >
                {[
                  'Todos',
                  'Administração',
                  'Desenvolvimento de Sistema',
                  'Edificações',
                  'Massoterapia',
                ].map(curso => (
                  <TouchableOpacity
                    key={curso}
                    style={{ padding: 12 }}
                    onPress={() => {
                      setCursoSelecionado(
                        curso === 'Todos' ? '' : curso
                      );
                      setShowCursos(false);
                    }}
                  >
                    <Text style={{ color: colors.text }}>
                      {curso}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <View>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => {
                setShowPeriodos(!showPeriodos);
                setShowTurmas(false);
                setShowCursos(false);
              }}
            >
              <Text style={styles.filterText}>
                {periodoSelecionado || 'Data'}
              </Text>

              <Ionicons
                name="chevron-down"
                size={16}
                color={colors.textSecondary}
              />
            </TouchableOpacity>

            {showPeriodos && (
              <View
                style={{
                  position: 'absolute',
                  top: 55,
                  left: 0,
                  width: 160,
                  backgroundColor: colors.surface,
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 10,
                  zIndex: 9999,
                  elevation: 9999,
                }}
              >
                {[
                  'Todos',
                  'Hoje',
                  'Últimos 7 dias',
                  'Últimos 30 dias',
                ].map(periodo => (
                  <TouchableOpacity
                    key={periodo}
                    style={{ padding: 12 }}
                    onPress={() => {
                      setPeriodoSelecionado(
                        periodo === 'Todos' ? '' : periodo
                      );
                      setShowPeriodos(false);
                    }}
                  >
                    <Text style={{ color: colors.text }}>
                      {periodo}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.th, { flex: 2 }]}>Livro</Text>
            <Text style={[styles.th, { flex: 2 }]}>Aluno</Text>
            <Text style={[styles.th, { flex: 1 }]}>Turma</Text>
            <Text style={[styles.th, { flex: 1.8 }]}>Curso</Text>
            <Text style={[styles.th, { flex: 1.2 }]}>Empréstimo</Text>
            <Text style={[styles.th, { flex: 1.2 }]}>Devolução</Text>
            <Text style={[styles.th, { flex: 1 }]}>Status</Text>
          </View>

          {filteredBorrows.length === 0 ? (
            <View
              style={{
                paddingVertical: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons
                name="search-outline"
                size={48}
                color={colors.textSecondary}
              />

              <Text
                style={{
                  marginTop: 12,
                  fontSize: 16,
                  fontWeight: '600',
                  color: colors.text,
                }}
              >
                Nenhum empréstimo encontrado
              </Text>

              <Text
                style={{
                  marginTop: 6,
                  fontSize: 13,
                  color: colors.textSecondary,
                  textAlign: 'center',
                }}
              >
                Tente alterar os filtros ou realizar uma nova busca.
              </Text>
            </View>
          ) : (
            filteredBorrows.map((item, index) => (
              <View
                key={item.id}
                style={[
                  styles.tableRow,
                  index % 2 === 0 && styles.tableRowAlt,
                ]}
              >
                <View style={[styles.td, styles.colBook, styles.bookCell]}>
                  <View
                    style={[
                      styles.miniCover,
                      { backgroundColor: item.coverColor },
                    ]}
                  >
                    <Ionicons
                      name="book"
                      size={14}
                      color={colors.white}
                    />
                  </View>

                  <Text style={styles.bookTitle} numberOfLines={1}>
                    {item.bookTitle}
                  </Text>
                </View>

                <Text style={[styles.td, { flex: 2 }]} numberOfLines={1}>
                  {item.studentName}
                </Text>

                <Text style={[styles.td, { flex: 1 }]}>
                  {item.turma}
                </Text>

                <Text style={[styles.td, { flex: 1.8 }]} numberOfLines={2}>
                  {item.curso}
                </Text>

                <Text style={[styles.td, { flex: 1.2 }]}>
                  {item.borrowDate}
                </Text>

                <Text style={[styles.td, styles.colDate]}>
                  {item.returnDate}
                </Text>

                <View style={[styles.td, styles.colStatus]}>
                  <StatusBadge status={item.status} />
                </View>
              </View>
            ))
          )}

        </View>

        <View
          style={{
            marginTop: 12,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >

          <Ionicons
            name="time-outline"
            size={14}
            color={colors.textSecondary}
          />

          <Text
            style={{
              marginLeft: 6,
              fontSize: 12,
              color: colors.textSecondary,
            }}
          >
            Última atualização: {ultimaAtualizacao}
          </Text>
        </View>
      </View>
    </View>
  );
}