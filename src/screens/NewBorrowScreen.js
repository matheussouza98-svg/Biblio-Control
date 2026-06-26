import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { books, students } from '../data/mockData';
import { CLASS_OPTIONS } from '../data/generateStudents';
import { useTheme } from '../theme/ThemeContext';
import { useThemedStyles } from '../theme/useThemedStyles';
import ThemedScrollList from '../components/ThemedScrollList';

const LIST_HEIGHT = 320;
const TURMA_BLOCK_HEIGHT = 92;

function createStyles(colors) {
  return StyleSheet.create({
    card: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 28,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 24,
    },
    formRow: {
      flexDirection: 'row',
      gap: 24,
      flexWrap: 'wrap',
      marginBottom: 24,
      alignItems: 'stretch',
    },
    formSection: {
      flex: 1,
      minWidth: 280,
      flexDirection: 'column',
    },
    turmaBlock: {
      marginBottom: 4,
    },
    topSpacer: {
      height: TURMA_BLOCK_HEIGHT,
      marginBottom: 4,
    },
    selectionBlock: {
      flex: 1,
      flexDirection: 'column',
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 10,
    },
    selectTrigger: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      backgroundColor: colors.surfaceAlt,
      paddingHorizontal: 14,
      paddingVertical: 12,
      marginBottom: 4,
    },
    selectTriggerOpen: {
      borderColor: colors.primary,
    },
    selectValue: {
      fontSize: 14,
      color: colors.text,
      flex: 1,
    },
    selectPlaceholder: {
      fontSize: 14,
      color: colors.textMuted,
      flex: 1,
    },
    dropdown: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      backgroundColor: colors.surface,
      marginBottom: 15,
      maxHeight: 280,
      overflow: 'hidden',
      zIndex: 10,
    },
    dropdownItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 14,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    dropdownItemLast: {
      borderBottomWidth: 0,
    },
    dropdownItemActive: {
      backgroundColor: colors.primaryLight,
    },
    dropdownItemText: {
      fontSize: 14,
      color: colors.text,
    },
    searchInput: {
      backgroundColor: colors.surfaceAlt,
      borderRadius: 10,
      paddingHorizontal: 14,
      paddingVertical: 12,
      fontSize: 14,
      color: colors.text,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 10,
      outlineStyle: 'none',
    },
    list: {
      height: LIST_HEIGHT,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      backgroundColor: colors.surfaceAlt,
    },
    listPlaceholder: {
      height: LIST_HEIGHT,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      backgroundColor: colors.surfaceAlt,
    },
    placeholderIcon: {
      marginBottom: 16,
    },
    placeholderText: {
      fontSize: 14,
      color: colors.textMuted,
      textAlign: 'center',
      fontWeight: '500',
    },
    placeholderSubtext: {
      fontSize: 13,
      color: colors.textMuted,
      textAlign: 'center',
      marginTop: 8,
    },
    listItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    listItemActive: {
      backgroundColor: colors.primaryLight,
    },
    avatar: {
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarText: {
      color: colors.white,
      fontWeight: '700',
    },
    bookCover: {
      width: 36,
      height: 36,
      borderRadius: 6,
      alignItems: 'center',
      justifyContent: 'center',
    },
    itemTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
    },
    itemSub: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 2,
    },
    check: {
      marginLeft: 'auto',
    },
    datesRow: {
      flexDirection: 'row',
      gap: 20,
      marginBottom: 28,
      flexWrap: 'wrap',
    },
    dateField: {
      flex: 1,
      minWidth: 200,
    },
    dateInput: {
      backgroundColor: colors.surfaceAlt,
      borderRadius: 10,
      paddingHorizontal: 14,
      paddingVertical: 12,
      fontSize: 14,
      color: colors.text,
      borderWidth: 1,
      borderColor: colors.border,
      outlineStyle: 'none',
    },
    confirmBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      backgroundColor: colors.primary,
      paddingVertical: 16,
      borderRadius: 10,
    },
    confirmBtnDisabled: {
      opacity: 0.5,
    },
    confirmText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: '700',
    },
  });
}

export default function NewBorrowScreen() {
  const [selectedClass, setSelectedClass] = useState('');
  const [turmaDropdownOpen, setTurmaDropdownOpen] = useState(false);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [borrowDate, setBorrowDate] = useState('18/06/2026');
  const [returnDate, setReturnDate] = useState('02/07/2026');
  const [studentSearch, setStudentSearch] = useState('');
  const [bookSearch, setBookSearch] = useState('');
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);

  const filteredStudents = students.filter(
    (s) =>
      s.class === selectedClass &&
      s.name.toLowerCase().includes(studentSearch.toLowerCase())
  );
  const filteredBooks = books.filter(
    (b) =>
      b.status === 'available' &&
      (b.title.toLowerCase().includes(bookSearch.toLowerCase()) ||
        b.code.toLowerCase().includes(bookSearch.toLowerCase()))
  );

  const handleSelectTurma = (turma) => {
    setSelectedClass(turma);
    setSelectedStudent(null);
    setStudentSearch('');
    setTurmaDropdownOpen(false);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Registrar Novo Empréstimo</Text>

      <View style={styles.formRow}>
        <View style={styles.formSection}>
          <View style={styles.turmaBlock}>

          <Text style={styles.label}>
            <Ionicons
              name="school-outline"
              size={16}
              color={colors.primary}
            />
            {' '}Selecionar Turma
          </Text>

          <TouchableOpacity
            style={[styles.selectTrigger, turmaDropdownOpen && styles.selectTriggerOpen]}
            onPress={() => setTurmaDropdownOpen((open) => !open)}
            activeOpacity={0.8}
          >
            <Text style={selectedClass ? styles.selectValue : styles.selectPlaceholder}>
              {selectedClass || 'Selecionar turma'}
            </Text>
            <Ionicons
              name={turmaDropdownOpen ? 'chevron-up' : 'chevron-down'}
              size={18}
              color={colors.textMuted}
            />
          </TouchableOpacity>

          {turmaDropdownOpen && (
            <ThemedScrollList style={styles.dropdown}>
              {CLASS_OPTIONS.map((item, index) => {
                const isSelected = selectedClass === item;
                const isLast = index === CLASS_OPTIONS.length - 1;

                return (
                  <TouchableOpacity
                    key={item}
                    style={[
                      styles.dropdownItem,
                      isSelected && styles.dropdownItemActive,
                      isLast && styles.dropdownItemLast,
                    ]}
                    onPress={() => handleSelectTurma(item)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.dropdownItemText}>{item}</Text>
                    {isSelected && (
                      <Ionicons name="checkmark" size={18} color={colors.primary} />
                    )}
                  </TouchableOpacity>
                );
              })}
            </ThemedScrollList>
          )}

          {!turmaDropdownOpen && <View style={{ marginBottom: 11 }} />}
          </View>

          <View style={styles.selectionBlock}>
          {selectedClass ? (
            <>
              <Text style={styles.label}>
                <Ionicons
                  name="person-outline"
                  size={16}
                  color={colors.primary}
                />
                {' '}Selecionar Aluno
              </Text>

              <TextInput
                style={styles.searchInput}
                placeholder="Buscar aluno..."
                placeholderTextColor={colors.textMuted}
                value={studentSearch}
                onChangeText={setStudentSearch}
              />

              <ThemedScrollList style={styles.list}>
                {filteredStudents.map((student) => (
                  <TouchableOpacity
                    key={student.id}
                    style={[
                      styles.listItem,
                      selectedStudent?.id === student.id &&
                      styles.listItemActive,
                    ]}
                    onPress={() => setSelectedStudent(student)}
                  >
                    <View
                      style={[
                        styles.avatar,
                        { backgroundColor: student.avatarColor },
                      ]}
                    >
                      <Text style={styles.avatarText}>
                        {student.name[0]}
                      </Text>
                    </View>

                    <View>
                      <Text style={styles.itemTitle}>
                        {student.name}
                      </Text>

                      <Text style={styles.itemSub}>
                        {student.registration} — {student.class}
                      </Text>
                    </View>

                    {selectedStudent?.id === student.id && (
                      <Ionicons
                        name="checkmark-circle"
                        size={22}
                        color={colors.primary}
                        style={styles.check}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </ThemedScrollList>
            </>
          ) : (
            <View style={styles.listPlaceholder}>
              <Ionicons
                name="people-outline"
                size={48}
                color={colors.textMuted}
                style={styles.placeholderIcon}
              />
              <Text style={styles.placeholderText}>Nenhuma turma selecionada.</Text>
              <Text style={styles.placeholderSubtext}>Selecione uma turma para carregar os alunos.</Text>
            </View>
          )}
          </View>
        </View>

        <View style={styles.formSection}>
          <View style={styles.selectionBlock}>
          <Text style={styles.label}>
            <Ionicons name="book-outline" size={16} color={colors.primary} /> Selecionar Livro
          </Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar livro..."
            placeholderTextColor={colors.textMuted}
            value={bookSearch}
            onChangeText={setBookSearch}
          />
          <ThemedScrollList style={styles.list}>
            {filteredBooks.map((book) => (
              <TouchableOpacity
                key={book.id}
                style={[styles.listItem, selectedBook?.id === book.id && styles.listItemActive]}
                onPress={() => setSelectedBook(book)}
              >
                <View style={[styles.bookCover, { backgroundColor: book.coverColor }]}>
                  <Ionicons name="book" size={16} color={colors.white} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemTitle}>{book.title}</Text>
                  <Text style={styles.itemSub}>{book.code} — {book.author}</Text>
                </View>
                {selectedBook?.id === book.id && (
                  <Ionicons name="checkmark-circle" size={22} color={colors.primary} style={styles.check} />
                )}
              </TouchableOpacity>
            ))}
          </ThemedScrollList>
          </View>
        </View>
      </View>

      <View style={styles.datesRow}>
        <View style={styles.dateField}>
          <Text style={styles.label}>Data do Empréstimo</Text>
          <TextInput style={styles.dateInput} value={borrowDate} onChangeText={setBorrowDate} />
        </View>
        <View style={styles.dateField}>
          <Text style={styles.label}>Data de Devolução</Text>
          <TextInput style={styles.dateInput} value={returnDate} onChangeText={setReturnDate} />
        </View>
      </View>

      <TouchableOpacity
        style={[styles.confirmBtn, (!selectedStudent || !selectedBook) && styles.confirmBtnDisabled]}
        activeOpacity={0.8}
        disabled={!selectedStudent || !selectedBook}
      >
        <Ionicons name="checkmark-circle-outline" size={22} color={colors.white} />
        <Text style={styles.confirmText}>Confirmar Empréstimo</Text>
      </TouchableOpacity>
    </View>
  );
}
