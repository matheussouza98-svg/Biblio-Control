import { useEffect } from 'react';
import { Platform, ScrollView } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

const SCROLL_CLASS = 'biblio-themed-scroll';

export default function ThemedScrollList({ style, contentContainerStyle, children, ...props }) {
  const { colors } = useTheme();

  useEffect(() => {
    if (Platform.OS !== 'web') return undefined;

    let styleEl = document.head.querySelector(`style[data-${SCROLL_CLASS}]`);

    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.setAttribute(`data-${SCROLL_CLASS}`, 'true');
      document.head.appendChild(styleEl);
    }

    styleEl.textContent = `
      .${SCROLL_CLASS}::-webkit-scrollbar {
        width: 8px;
      }
      .${SCROLL_CLASS}::-webkit-scrollbar-track {
        background: ${colors.surfaceAlt};
        border-radius: 8px;
        margin: 4px 0;
      }
      .${SCROLL_CLASS}::-webkit-scrollbar-thumb {
        background: ${colors.primary};
        border-radius: 8px;
        border: 2px solid ${colors.surfaceAlt};
      }
      .${SCROLL_CLASS}::-webkit-scrollbar-thumb:hover {
        background: ${colors.primaryDark};
      }
    `;

    return undefined;
  }, [colors]);

  const webScrollbarStyle =
    Platform.OS === 'web'
      ? {
          scrollbarWidth: 'thin',
          scrollbarColor: `${colors.primary} ${colors.surfaceAlt}`,
        }
      : null;

  return (
    <ScrollView
      style={[style, webScrollbarStyle]}
      contentContainerStyle={contentContainerStyle}
      className={Platform.OS === 'web' ? SCROLL_CLASS : undefined}
      nestedScrollEnabled
      {...props}
    >
      {children}
    </ScrollView>
  );
}
