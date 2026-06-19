import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useEffect, useMemo, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { useThemedStyles } from '../theme/useThemedStyles';

const NAV_MENU = [
  {
    id: 'dashboard',
    label: 'Início',
    icon: 'home-outline',
    iconActive: 'home',
  },
  {
    id: 'books-group',
    label: 'Livros',
    icon: 'book-outline',
    iconActive: 'book',
    children: [
      { navKey: 'books', screen: 'books', label: 'Todos os Livros' },
      { navKey: 'registerBook', screen: 'registerBook', label: 'Cadastrar Livro' },
      { navKey: 'categories', screen: 'categories', label: 'Categorias' },
      { navKey: 'locations', screen: 'locations', label: 'Localizações' },
    ],
  },
  {
    id: 'students-group',
    label: 'Alunos',
    icon: 'school-outline',
    iconActive: 'school',
    children: [
      { navKey: 'students', screen: 'students', label: 'Todos os Alunos' },
      { navKey: 'registerStudent', screen: 'registerStudent', label: 'Cadastrar Aluno' },
    ],
  },
  {
    id: 'loans-group',
    label: 'Empréstimos',
    icon: 'swap-horizontal-outline',
    iconActive: 'swap-horizontal',
    children: [
      { navKey: 'loans:history', screen: 'loans', params: { tab: 'history' }, label: 'Todos os Empréstimos' },
      { navKey: 'loans:new', screen: 'loans', params: { tab: 'new' }, label: 'Novo Empréstimo' },
      { navKey: 'loans:return', screen: 'loans', params: { tab: 'return' }, label: 'Devoluções' },
      { navKey: 'loans:overdue', screen: 'loans', params: { tab: 'overdue' }, label: 'Atrasados' },
    ],
  },
  {
    id: 'reports-group',
    label: 'Relatórios',
    icon: 'bar-chart-outline',
    iconActive: 'bar-chart',
    children: [
      { navKey: 'reports:loans', screen: 'reports', params: { tab: 'loans' }, label: 'Empréstimos' },
      { navKey: 'reports:topBooks', screen: 'reports', params: { tab: 'topBooks' }, label: 'Livros Mais Emprestados' },
      { navKey: 'reports:topStudents', screen: 'reports', params: { tab: 'topStudents' }, label: 'Alunos Mais Ativos' },
      { navKey: 'reports:export', screen: 'reports', params: { tab: 'export' }, label: 'Exportar PDF' },
    ],
  },
  {
    id: 'settings-group',
    label: 'Configurações',
    icon: 'settings-outline',
    iconActive: 'settings',
    children: [
      { navKey: 'settings:users', screen: 'settings', params: { section: 'users' }, label: 'Usuários' },
      { navKey: 'settings:profile', screen: 'settings', params: { section: 'profile' }, label: 'Perfil' },
      { navKey: 'settings:backup', screen: 'settings', params: { section: 'backup' }, label: 'Backup' },
      { navKey: 'settings:system', screen: 'settings', params: { section: 'system' }, label: 'Sistema' },
    ],
  },
];

export function resolveNavKey(screen, params = {}) {
  if (screen === 'bookDetail' || screen === 'editBook') return 'books';
  if (screen === 'loans') return `loans:${params.tab || 'history'}`;
  if (screen === 'reports') return `reports:${params.tab || 'loans'}`;
  if (screen === 'settings') return `settings:${params.section || 'users'}`;
  return screen;
}

function getDefaultOpenSections(navKey) {
  const open = {};
  NAV_MENU.forEach((group) => {
    if (group.children?.some((child) => child.navKey === navKey)) {
      open[group.id] = true;
    }
  });
  return open;
}

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
    arrow: {
      marginLeft: 'auto',
    },
    subMenu: {
      marginLeft: 36,
      marginBottom: 4,
    },
    subMenuItem: {
      paddingVertical: 9,
      paddingLeft: 4,
    },
    subMenuText: {
      color: 'rgba(255,255,255,0.65)',
      fontSize: 14,
    },
    subMenuTextActive: {
      color: colors.white,
      fontWeight: '700',
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

export default function Sidebar({ activeScreen, activeParams = {}, onNavigate }) {
  const activeNavKey = useMemo(
    () => resolveNavKey(activeScreen, activeParams),
    [activeScreen, activeParams]
  );

  const [openSections, setOpenSections] = useState(() =>
    getDefaultOpenSections(activeNavKey)
  );

  useEffect(() => {
    setOpenSections((prev) => {
      const next = { ...prev };
      NAV_MENU.forEach((group) => {
        if (group.children?.some((child) => child.navKey === activeNavKey)) {
          next[group.id] = true;
        }
      });
      return next;
    });
  }, [activeNavKey]);

  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);

  const toggleSection = (groupId) => {
    setOpenSections((prev) => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  const isGroupActive = (group) => {
    if (!group.children) return activeNavKey === group.id;
    return group.children.some((child) => child.navKey === activeNavKey);
  };

  const handleChildPress = (child) => {
    onNavigate(child.screen, child.params || {});
  };

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

      <ScrollView style={styles.navList} showsVerticalScrollIndicator={false}>
        {NAV_MENU.map((group) => {
          if (!group.children) {
            const isActive = activeNavKey === group.id;
            return (
              <TouchableOpacity
                key={group.id}
                style={[styles.navItem, isActive && styles.navItemActive]}
                onPress={() => onNavigate(group.id)}
              >
                <Ionicons
                  name={isActive ? group.iconActive : group.icon}
                  size={22}
                  color={isActive ? colors.white : 'rgba(255,255,255,0.65)'}
                />
                <Text style={[styles.navText, isActive && styles.navTextActive]}>
                  {group.label}
                </Text>
                {isActive && <View style={styles.activeIndicator} />}
              </TouchableOpacity>
            );
          }

          const isOpen = openSections[group.id];
          const groupActive = isGroupActive(group);

          return (
            <View key={group.id}>
              <TouchableOpacity
                style={[styles.navItem, groupActive && !isOpen && styles.navItemActive]}
                onPress={() => toggleSection(group.id)}
              >
                <Ionicons
                  name={groupActive ? group.iconActive : group.icon}
                  size={22}
                  color={groupActive ? colors.white : 'rgba(255,255,255,0.65)'}
                />
                <Text style={[styles.navText, groupActive && styles.navTextActive]}>
                  {group.label}
                </Text>
                <Ionicons
                  name={isOpen ? 'chevron-down' : 'chevron-forward'}
                  size={18}
                  color="rgba(255,255,255,0.65)"
                  style={styles.arrow}
                />
              </TouchableOpacity>

              {isOpen && (
                <View style={styles.subMenu}>
                  {group.children.map((child) => {
                    const isActive = activeNavKey === child.navKey;
                    return (
                      <TouchableOpacity
                        key={child.navKey}
                        style={styles.subMenuItem}
                        onPress={() => handleChildPress(child)}
                      >
                        <Text
                          style={[
                            styles.subMenuText,
                            isActive && styles.subMenuTextActive,
                          ]}
                        >
                          {child.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>
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
