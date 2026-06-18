import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { useThemedStyles } from '../theme/useThemedStyles';

function createStyles(colors) {
  return StyleSheet.create({
    wrapper: {
      position: 'fixed',
      top: 24,
      right: 24,
      zIndex: 9999,
    },
    toast: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 14,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 12,
      elevation: 6,
      minWidth: 300,
      maxWidth: 420,
    },
    toastSuccess: {
      backgroundColor: colors.successBg,
      borderWidth: 1,
      borderColor: colors.success,
    },
    toastError: {
      backgroundColor: colors.dangerBg,
      borderWidth: 1,
      borderColor: colors.danger,
    },
    iconBox: {
      width: 28,
      height: 28,
      borderRadius: 6,
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconBoxSuccess: {
      backgroundColor: colors.success,
    },
    iconBoxError: {
      backgroundColor: colors.danger,
    },
    message: {
      fontSize: 14,
      fontWeight: '600',
      flex: 1,
    },
    messageSuccess: {
      color: colors.success,
    },
    messageError: {
      color: colors.danger,
    },
  });
}

export default function Toast({ visible, message, type = 'success', onHide, duration = 3500 }) {
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);

  useEffect(() => {
    if (!visible) return undefined;
    const timer = setTimeout(onHide, duration);
    return () => clearTimeout(timer);
  }, [visible, message, duration, onHide]);

  if (!visible || !message) return null;

  const isSuccess = type === 'success';

  return (
    <View style={styles.wrapper} pointerEvents="none">
      <View style={[styles.toast, isSuccess ? styles.toastSuccess : styles.toastError]}>
        <View style={[styles.iconBox, isSuccess ? styles.iconBoxSuccess : styles.iconBoxError]}>
          <Ionicons
            name={isSuccess ? 'checkmark' : 'alert'}
            size={16}
            color={colors.white}
          />
        </View>
        <Text style={[styles.message, isSuccess ? styles.messageSuccess : styles.messageError]}>
          {message}
        </Text>
      </View>
    </View>
  );
}
