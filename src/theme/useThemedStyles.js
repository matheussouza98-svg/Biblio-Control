import { useMemo } from 'react';
import { useTheme } from './ThemeContext';

export function useThemedStyles(factory) {
  const { colors } = useTheme();
  return useMemo(() => factory(colors), [colors, factory]);
}
