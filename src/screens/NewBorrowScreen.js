import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { books, students } from '../data/mockData';
import { useTheme } from '../theme/ThemeContext';
import { useThemedStyles } from '../theme/useThemedStyles';
import { Picker } from '@react-native-picker/picker';

const classes = [
  '1º Administração',
  '2º Administração',
  '3º Administração',
  '1º Desenvolvimento de Sistemas',
  '2º Desenvolvimento de Sistemas',
  '3º Desenvolvimento de Sistemas',
  '1º Edificações',
  '2º Edificações',
  '3º Edificações',
  '1º Massoterapia',
  '2º Massoterapia',
  '3º Massoterapia',
];

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
    },
    formSection: {
      flex: 1,
      minWidth: 280,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 10,
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
      maxHeight: 200,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      backgroundColor: colors.surfaceAlt,
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

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Registrar Novo Empréstimo</Text>

      <View style={styles.formRow}>
        <View style={styles.formSection}>

          <Text style={styles.label}>
            <Ionicons
              name="school-outline"
              size={16}
              color={colors.primary}
            />
            {' '}Selecionar Turma
          </Text>

          <View
            style={{
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 10,
              backgroundColor: colors.surfaceAlt,
              marginBottom: 15,
            }}
          >
            <Picker
              selectedValue={selectedClass}
              onValueChange={(value) => {
                setSelectedClass(value);
                setSelectedStudent(null);
                setStudentSearch('');
              }}
            >
              <Picker.Item
                label="Selecione uma turma"
                value=""
              />

              {classes.map((item) => (
                <Picker.Item
                  key={item}
                  label={item}
                  value={item}
                />
              ))}
            </Picker>
          </View>

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

              <ScrollView style={styles.list} nestedScrollEnabled>
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
              </ScrollView>
            </>
          ) : null}
        </View>

        <View style={styles.formSection}>
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
          <ScrollView style={styles.list} nestedScrollEnabled>
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
          </ScrollView>
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
