import { StyleSheet, Text, View, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PageHeader from '../components/PageHeader';
import { useTheme } from '../theme/ThemeContext';
import { useThemedStyles } from '../theme/useThemedStyles';

const SECTIONS = {
  users: {
    title: 'Usuários',
    subtitle: 'Controle de acesso e permissões do sistema.',
    items: [
      { id: 'admin', label: 'Administrador', description: 'Acesso total ao sistema', icon: 'shield-checkmark-outline' },
      { id: 'librarian', label: 'Bibliotecário', description: 'Gerenciar livros e empréstimos', icon: 'person-outline' },
      { id: 'viewer', label: 'Consulta', description: 'Somente leitura de relatórios', icon: 'eye-outline' },
    ],
  },
  profile: {
    title: 'Perfil',
    subtitle: 'Dados da conta e preferências pessoais.',
    items: [
      { id: 'name', label: 'Administrador', description: 'admin@biblioteca.edu.br', icon: 'person-circle-outline' },
      { id: 'password', label: 'Alterar senha', description: 'Atualize sua senha de acesso', icon: 'key-outline' },
      { id: 'notifications', label: 'Notificações', description: 'Alertas de devoluções e atrasos', icon: 'notifications-outline' },
    ],
  },
  backup: {
    title: 'Backup',
    subtitle: 'Exportar e importar dados da biblioteca.',
    items: [
      { id: 'export', label: 'Exportar backup', description: 'Gerar arquivo .json com todos os dados', icon: 'cloud-upload-outline' },
      { id: 'import', label: 'Importar backup', description: 'Restaurar dados de um arquivo anterior', icon: 'cloud-download-outline' },
      { id: 'schedule', label: 'Backup automático', description: 'Agendar exportação semanal', icon: 'time-outline' },
    ],
  },
  system: {
    title: 'Sistema',
    subtitle: 'Preferências gerais e informações do software.',
    items: [
      { id: 'language', label: 'Idioma', description: 'Português (Brasil)', icon: 'language-outline' },
      { id: 'version', label: 'Versão', description: 'SAM Biblioteca v1.0.0', icon: 'information-circle-outline' },
      { id: 'logs', label: 'Logs do sistema', description: 'Histórico de operações recentes', icon: 'document-text-outline' },
    ],
  },
};

function createStyles(colors) {
  return StyleSheet.create({
    section: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 20,
      overflow: 'hidden',
    },
    sectionTitle: {
      fontSize: 12,
      fontWeight: '700',
      color: colors.textMuted,
      textTransform: 'uppercase',
      letterSpacing: 1,
      paddingHorizontal: 20,
      paddingTop: 16,
      paddingBottom: 8,
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      paddingVertical: 16,
      paddingHorizontal: 20,
    },
    itemBorder: {
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    itemIcon: {
      width: 44,
      height: 44,
      borderRadius: 10,
      backgroundColor: colors.primaryLight,
      alignItems: 'center',
      justifyContent: 'center',
    },
    itemContent: {
      flex: 1,
    },
    itemLabel: {
      fontSize: 15,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 2,
    },
    itemDesc: {
      fontSize: 12,
      color: colors.textSecondary,
    },
    infoCard: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 20,
      backgroundColor: colors.primaryLight,
      borderRadius: 12,
      padding: 24,
      borderWidth: 1,
      borderColor: colors.primary,
    },
    infoContent: {
      flex: 1,
    },
    infoTitle: {
      fontSize: 18,
      fontWeight: '800',
      color: colors.primary,
      letterSpacing: 1,
    },
    infoSub: {
      fontSize: 13,
      color: colors.textSecondary,
      marginTop: 4,
    },
    infoVersion: {
      fontSize: 12,
      color: colors.textMuted,
      marginTop: 8,
    },
  });
}

export default function SettingsScreen({ initialSection = 'users' }) {
  const { colors, isDark, setDarkMode } = useTheme();
  const styles = useThemedStyles(createStyles);
  const section = SECTIONS[initialSection] || SECTIONS.users;

  return (
    <View>
      <PageHeader title={section.title} subtitle={section.subtitle} />

      {initialSection === 'system' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aparência</Text>
          <View style={styles.item}>
            <View style={styles.itemIcon}>
              <Ionicons name={isDark ? 'moon' : 'sunny-outline'} size={22} color={colors.primary} />
            </View>
            <View style={styles.itemContent}>
              <Text style={styles.itemLabel}>Modo Escuro</Text>
              <Text style={styles.itemDesc}>Alternar entre tema claro e escuro</Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={setDarkMode}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.white}
            />
          </View>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{section.title}</Text>
        {section.items.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.item, index < section.items.length - 1 && styles.itemBorder]}
            activeOpacity={0.7}
          >
            <View style={styles.itemIcon}>
              <Ionicons name={item.icon} size={22} color={colors.primary} />
            </View>
            <View style={styles.itemContent}>
              <Text style={styles.itemLabel}>{item.label}</Text>
              <Text style={styles.itemDesc}>{item.description}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="library" size={32} color={colors.primary} />
        <View style={styles.infoContent}>
          <Text style={styles.infoTitle}>SAM BIBLIOTECA</Text>
          <Text style={styles.infoSub}>Sistema de Administração de Biblioteca Escolar</Text>
          <Text style={styles.infoVersion}>Versão 1.0.0 — © 2026</Text>
        </View>
      </View>
    </View>
  );
}
