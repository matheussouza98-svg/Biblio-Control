import { StyleSheet, View, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Sidebar from '../components/Sidebar';
import { useTheme } from '../theme/ThemeContext';
import { useThemedStyles } from '../theme/useThemedStyles';

function createStyles(colors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: colors.background,
      minHeight: '100%',
    },
    main: {
      flex: 1,
    },
    contentInner: {
      padding: 32,
      paddingBottom: 48,
      flexGrow: 1,
    },
  });
}

export default function AppLayout({ activeScreen, onNavigate, children }) {
  const { isDark } = useTheme();
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.container}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Sidebar activeScreen={activeScreen} onNavigate={onNavigate} />
      <ScrollView style={styles.main} contentContainerStyle={styles.contentInner}>
        {children}
      </ScrollView>
    </View>
  );
}
