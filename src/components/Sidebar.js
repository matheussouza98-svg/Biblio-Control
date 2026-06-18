import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { useThemedStyles } from '../theme/useThemedStyles';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Início', icon: 'home-outline', iconActive: 'home' },
  { id: 'books', label: 'Livros', icon: 'book-outline', iconActive: 'book' },
  { id: 'students', label: 'Alunos', icon: 'school-outline', iconActive: 'school' },
  { id: 'loans', label: 'Empréstimos', icon: 'swap-horizontal-outline', iconActive: 'swap-horizontal' },
  { id: 'settings', label: 'Configurações', icon: 'settings-outline', iconActive: 'settings' },
];

function createStyles(colors) {
  return StyleSheet.create({
    sidebar: {
      width: 260,
      backgroundColor: colors.sidebarBg,
      height: '100%',
      paddingTop: 24,
      paddingBottom: 20,
      paddingHorizontal: 16,
    },
    logoSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingHorizontal: 8,
      paddingBottom: 28,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(255,255,255,0.12)',
      marginBottom: 24,
    },
    logoIcon: {
      width: 48,
      height: 48,
      borderRadius: 12,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoTitle: {
      fontSize: 20,
      fontWeight: '800',
      color: colors.white,
      letterSpacing: 1,
    },
    logoSubtitle: {
      fontSize: 11,
      fontWeight: '600',
      color: 'rgba(255,255,255,0.6)',
      letterSpacing: 2,
    },
    navLabel: {
      fontSize: 10,
      fontWeight: '700',
      color: 'rgba(255,255,255,0.4)',
      letterSpacing: 1.5,
      paddingHorizontal: 12,
      marginBottom: 12,
    },
    navList: {
      flex: 1,
    },
    navItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
      paddingVertical: 14,
      paddingHorizontal: 14,
      borderRadius: 10,
      marginBottom: 4,
      position: 'relative',
    },
    navItemActive: {
      backgroundColor: colors.sidebarActive,
    },
    navText: {
      fontSize: 15,
      fontWeight: '500',
      color: 'rgba(255,255,255,0.65)',
      flex: 1,
    },
    navTextActive: {
      color: colors.white,
      fontWeight: '600',
    },
    activeIndicator: {
      position: 'absolute',
      left: 0,
      top: '25%',
      bottom: '25%',
      width: 3,
      backgroundColor: colors.white,
      borderRadius: 2,
    },
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingTop: 20,
      paddingHorizontal: 8,
      borderTopWidth: 1,
      borderTopColor: 'rgba(255,255,255,0.12)',
    },
    userAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    userInitials: {
      color: colors.white,
      fontWeight: '700',
      fontSize: 14,
    },
    userInfo: {
      flex: 1,
    },
    userName: {
      color: colors.white,
      fontSize: 13,
      fontWeight: '600',
    },
    userRole: {
      color: 'rgba(255,255,255,0.5)',
      fontSize: 11,
      marginTop: 2,
    },
  });
}

export default function Sidebar({ activeScreen, onNavigate }) {
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.sidebar}>
      <View style={styles.logoSection}>
        <View style={styles.logoIcon}>
          <Ionicons name="library" size={28} color={colors.white} />
        </View>
        <View>
          <Text style={styles.logoTitle}>SAM</Text>
          <Text style={styles.logoSubtitle}>BIBLIOTECA</Text>
        </View>
      </View>

      <Text style={styles.navLabel}>NAVEGAÇÃO</Text>

      <ScrollView style={styles.navList} showsVerticalScrollIndicator={false}>
        {NAV_ITEMS.map((item) => {
          const isActive = activeScreen === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.navItem, isActive && styles.navItemActive]}
              onPress={() => onNavigate(item.id)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={isActive ? item.iconActive : item.icon}
                size={22}
                color={isActive ? colors.white : 'rgba(255,255,255,0.65)'}
              />
              <Text style={[styles.navText, isActive && styles.navTextActive]}>
                {item.label}
              </Text>
              {isActive && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.userAvatar}>
          <Text style={styles.userInitials}>AD</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Administrador</Text>
          <Text style={styles.userRole}>Biblioteca Escolar</Text>
        </View>
      </View>
    </View>
  );
}
