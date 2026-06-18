import { StyleSheet, View, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Sidebar from '../components/Sidebar';
import { colors } from '../theme/colors';

export default function AppLayout({ activeScreen, onNavigate, children }) {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Sidebar activeScreen={activeScreen} onNavigate={onNavigate} />
      <ScrollView style={styles.main} contentContainerStyle={styles.contentInner}>
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
