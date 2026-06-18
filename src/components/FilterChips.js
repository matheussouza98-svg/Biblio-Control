import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useThemedStyles } from '../theme/useThemedStyles';

function createStyles(colors) {
  return StyleSheet.create({
    scroll: {
      flexGrow: 0,
    },
    row: {
      flexDirection: 'row',
      gap: 8,
    },
    chip: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: colors.surfaceAlt,
      borderWidth: 1,
      borderColor: colors.border,
    },
    chipActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    chipText: {
      fontSize: 13,
      fontWeight: '500',
      color: colors.textSecondary,
    },
    chipTextActive: {
      color: colors.white,
      fontWeight: '600',
    },
  });
}

export default function FilterChips({ filters, activeFilter, onFilterChange }) {
  const styles = useThemedStyles(createStyles);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
      <View style={styles.row}>
        {filters.map((filter) => {
          const isActive = activeFilter === filter.id;
          return (
            <TouchableOpacity
              key={filter.id}
              style={[styles.chip, isActive && styles.chipActive]}
              onPress={() => onFilterChange(filter.id)}
              activeOpacity={0.7}
            >
              <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}
