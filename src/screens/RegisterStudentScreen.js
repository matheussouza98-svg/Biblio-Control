import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Toast from '../components/Toast';
import { CLASS_OPTIONS } from '../data/generateStudents';
import { useTheme } from '../theme/ThemeContext';
import { useThemedStyles } from '../theme/useThemedStyles';

const COURSE_OPTIONS = [
  'Administração',
  'Desenvolvimento de Sistemas',
  'Edificações',
  'Massoterapia',
];

const FIELDS = [
  { key: 'name', label: 'Nome completo', icon: 'person-outline', placeholder: 'Digite o nome do aluno' },
  { key: 'registration', label: 'Matrícula', icon: 'card-outline', placeholder: 'Ex: 2026001' },
  { key: 'class', label: 'Turma', icon: 'school-outline', placeholder: 'Selecione a turma' },
  { key: 'course', label: 'Curso', icon: 'book-outline', placeholder: 'Selecione o curso' },
];

function createStyles(colors) {
  return StyleSheet.create({
    backBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 20,
    },
    backText: {
      fontSize: 14,
      color: colors.primary,
      fontWeight: '600',
    },
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
    field: {
      marginBottom: 20,
    },
    label: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.textSecondary,
      marginBottom: 8,
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      backgroundColor: colors.surfaceAlt,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 14,
      paddingVertical: 12,
    },
    input: {
      flex: 1,
      fontSize: 15,
      color: colors.text,
      outlineStyle: 'none',
    },
    chipRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginTop: 8,
    },
    chip: {
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surfaceAlt,
    },
    chipActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    chipText: {
      fontSize: 13,
      color: colors.textSecondary,
    },
    chipTextActive: {
      color: colors.white,
      fontWeight: '600',
    },
    saveBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      backgroundColor: colors.primary,
      borderRadius: 10,
      paddingVertical: 14,
      marginTop: 8,
    },
    saveText: {
      color: colors.white,
      fontSize: 15,
      fontWeight: '700',
    },
  });
}

export default function RegisterStudentScreen({ onBack, onSave }) {
  const [form, setForm] = useState({ name: '', registration: '', class: '', course: '' });
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);

  const hideToast = () => setToast((prev) => ({ ...prev, visible: false }));

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    const missing = FIELDS.filter((field) => !form[field.key].trim());
    if (missing.length > 0) {
      setToast({ visible: true, type: 'error', message: 'Preencha todos os campos antes de cadastrar.' });
      return;
    }
    onSave?.(form);
    setToast({ visible: true, type: 'success', message: 'Aluno cadastrado com sucesso!' });
    setForm({ name: '', registration: '', class: '', course: '' });
  };

  return (
    <View style={{ width: '100%' }}>
      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <Ionicons name="arrow-back" size={20} color={colors.primary} />
        <Text style={styles.backText}>Voltar para alunos</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Cadastrar Aluno</Text>

        {FIELDS.slice(0, 2).map((field) => (
          <View key={field.key} style={styles.field}>
            <Text style={styles.label}>{field.label}</Text>
            <View style={styles.inputRow}>
              <Ionicons name={field.icon} size={20} color={colors.textMuted} />
              <TextInput
                style={styles.input}
                placeholder={field.placeholder}
                placeholderTextColor={colors.textMuted}
                value={form[field.key]}
                onChangeText={(value) => updateField(field.key, value)}
              />
            </View>
          </View>
        ))}

        <View style={styles.field}>
          <Text style={styles.label}>Turma</Text>
          <View style={styles.chipRow}>
            {CLASS_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option}
                style={[styles.chip, form.class === option && styles.chipActive]}
                onPress={() => updateField('class', option)}
              >
                <Text style={[styles.chipText, form.class === option && styles.chipTextActive]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Curso</Text>
          <View style={styles.chipRow}>
            {COURSE_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option}
                style={[styles.chip, form.course === option && styles.chipActive]}
                onPress={() => updateField('course', option)}
              >
                <Text style={[styles.chipText, form.course === option && styles.chipTextActive]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Ionicons name="person-add" size={20} color={colors.white} />
          <Text style={styles.saveText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>

      <Toast
        visible={toast.visible}
        type={toast.type}
        message={toast.message}
        onHide={hideToast}
      />
    </View>
  );
}
