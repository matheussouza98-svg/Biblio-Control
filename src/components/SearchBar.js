import { StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export default function SearchBar({ placeholder, value, onChangeText }) {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={20} color={colors.textMuted} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 10,
    borderWidth: 1,
    borderColor: colors.border,
    flex: 1,
    minWidth: 200,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    outlineStyle: 'none',
  },
});
