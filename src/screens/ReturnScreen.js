import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { useThemedStyles } from '../theme/useThemedStyles';

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
      marginBottom: 20,
    },
    modeTabs: {
      flexDirection: 'row',
      gap: 8,
      marginBottom: 24,
    },
    modeTab: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 10,
      backgroundColor: colors.surfaceAlt,
      borderWidth: 1,
      borderColor: colors.border,
    },
    modeTabActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    modeText: {
      fontSize: 13,
      fontWeight: '500',
      color: colors.textSecondary,
    },
    modeTextActive: {
      color: colors.white,
      fontWeight: '600',
    },
    scanArea: {
      backgroundColor: colors.primaryLight,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: colors.primary,
      borderStyle: 'dashed',
      padding: 40,
      alignItems: 'center',
      marginBottom: 24,
    },
    scanIcon: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
    },
    scanTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 6,
    },
    scanSub: {
      fontSize: 13,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    dividerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginBottom: 20,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: colors.border,
    },
    dividerText: {
      fontSize: 12,
      color: colors.textMuted,
      fontWeight: '500',
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 10,
    },
    inputRow: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 28,
      flexWrap: 'wrap',
    },
    input: {
      flex: 1,
      minWidth: 200,
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
    searchBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      backgroundColor: colors.primary,
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 10,
    },
    searchBtnText: {
      color: colors.white,
      fontWeight: '600',
      fontSize: 14,
    },
    confirmBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      backgroundColor: colors.success,
      paddingVertical: 16,
      borderRadius: 10,
    },
    confirmText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: '700',
    },
  });
}

export default function ReturnScreen() {
  const [searchMode, setSearchMode] = useState('code');
  const [searchValue, setSearchValue] = useState('');
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Registrar Devolução</Text>

      <View style={styles.modeTabs}>
        <TouchableOpacity
          style={[styles.modeTab, searchMode === 'code' && styles.modeTabActive]}
          onPress={() => setSearchMode('code')}
        >
          <Ionicons name="barcode-outline" size={18} color={searchMode === 'code' ? colors.white : colors.textSecondary} />
          <Text style={[styles.modeText, searchMode === 'code' && styles.modeTextActive]}>Por Código</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modeTab, searchMode === 'student' && styles.modeTabActive]}
          onPress={() => setSearchMode('student')}
        >
          <Ionicons name="person-outline" size={18} color={searchMode === 'student' ? colors.white : colors.textSecondary} />
          <Text style={[styles.modeText, searchMode === 'student' && styles.modeTextActive]}>Por Aluno</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.scanArea}>
        <View style={styles.scanIcon}>
          <Ionicons name="scan-outline" size={48} color={colors.primary} />
        </View>
        <Text style={styles.scanTitle}>Área de Leitura de Código de Barras</Text>
        <Text style={styles.scanSub}>Posicione o código de barras do livro na área de leitura</Text>
      </View>

      <View style={styles.dividerRow}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>ou digite manualmente</Text>
        <View style={styles.dividerLine} />
      </View>

      <Text style={styles.label}>
        {searchMode === 'code' ? 'Código do Livro / Código de Barras' : 'Nome ou Matrícula do Aluno'}
      </Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder={searchMode === 'code' ? 'Ex: LIV-001 ou 9788535914848' : 'Ex: Ana Clara Silva ou 2024001'}
          placeholderTextColor={colors.textMuted}
          value={searchValue}
          onChangeText={setSearchValue}
        />
        <TouchableOpacity style={styles.searchBtn} activeOpacity={0.8}>
          <Ionicons name="search" size={20} color={colors.white} />
          <Text style={styles.searchBtnText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.confirmBtn} activeOpacity={0.8}>
        <Ionicons name="return-down-back-outline" size={22} color={colors.white} />
        <Text style={styles.confirmText}>Confirmar Devolução</Text>
      </TouchableOpacity>
    </View>
  );
}
