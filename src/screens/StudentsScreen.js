import { useState, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PageHeader from '../components/PageHeader';
import SearchBar from '../components/SearchBar';
import FilterChips from '../components/FilterChips';
import { students } from '../data/mockData';
import { useThemedStyles } from '../theme/useThemedStyles';

const COURSE_FILTERS = [
  { id: 'all', label: 'Todos (180)' },
  { id: 'Administração', label: 'Administração (45)' },
  { id: 'Desenvolvimento de Sistemas', label: 'Desenv. Sistemas (45)' },
  { id: 'Edificações', label: 'Edificações (45)' },
  { id: 'Massoterapia', label: 'Massoterapia (45)' },
];

function getInitials(name) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

function createStyles(colors) {
  return StyleSheet.create({
    toolbar: {
      marginBottom: 16,
    },
    filters: {
      marginBottom: 20,
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
      paddingVertical: 16,
      paddingHorizontal: 20,
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    rowAlt: {
      backgroundColor: colors.surfaceAlt,
    },
    td: {
      fontSize: 14,
      color: colors.text,
    },
    colName: { flex: 3 },
    colReg: { flex: 1.2 },
    colClass: { flex: 2 },
    colCourse: { flex: 1.8 },
    nameCell: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarText: {
      color: colors.white,
      fontWeight: '700',
      fontSize: 14,
    },
    name: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
      flex: 1,
    },
  });
}

export default function StudentsScreen() {
  const [search, setSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const styles = useThemedStyles(createStyles);

  const filtered = useMemo(() => {
    const query = search.toLowerCase();
    return students.filter((s) => {
      const matchesCourse = courseFilter === 'all' || s.course === courseFilter;
      const matchesSearch =
        !query ||
        s.name.toLowerCase().includes(query) ||
        s.registration.includes(query) ||
        s.class.toLowerCase().includes(query) ||
        s.course.toLowerCase().includes(query);
      return matchesCourse && matchesSearch;
    });
  }, [search, courseFilter]);

  return (
    <View>
      <PageHeader
        title="Alunos"
        subtitle={`${filtered.length} aluno(s) cadastrado(s)`}
        actionLabel="Novo Aluno"
        actionIcon="person-add-outline"
      />

      <View style={styles.toolbar}>
        <SearchBar
          placeholder="Buscar por nome, matrícula, turma..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View style={styles.filters}>
        <FilterChips
          filters={COURSE_FILTERS}
          activeFilter={courseFilter}
          onFilterChange={setCourseFilter}
        />
      </View>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.th, styles.colName]}>Aluno</Text>
          <Text style={[styles.th, styles.colReg]}>Matrícula</Text>
          <Text style={[styles.th, styles.colClass]}>Turma</Text>
          <Text style={[styles.th, styles.colCourse]}>Curso</Text>
        </View>

        {filtered.map((student, index) => (
          <View key={student.id} style={[styles.row, index % 2 === 0 && styles.rowAlt]}>
            <View style={[styles.td, styles.colName, styles.nameCell]}>
              <View style={[styles.avatar, { backgroundColor: student.avatarColor }]}>
                <Text style={styles.avatarText}>{getInitials(student.name)}</Text>
              </View>
              <Text style={styles.name}>{student.name}</Text>
            </View>
            <Text style={[styles.td, styles.colReg]}>{student.registration}</Text>
            <Text style={[styles.td, styles.colClass]}>{student.class}</Text>
            <Text style={[styles.td, styles.colCourse]}>{student.course}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
