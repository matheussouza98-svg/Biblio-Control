import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PageHeader from '../components/PageHeader';
import { settingsSections } from '../data/mockData';
import { colors } from '../theme/colors';

export default function SettingsScreen() {
  return (
    <View>
      <PageHeader
        title="Mais"
        subtitle="Configurações e gerenciamento do sistema"
      />

      {settingsSections.map((section) => (
        <View key={section.title} style={styles.section}>
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
      ))}

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

const styles = StyleSheet.create({
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
