// Theme color sets – use via ThemeContext (useTheme().colors)

export type ThemeMode = 'light' | 'dark';

export const lightTheme = {
  background: '#FFF5EB',
  backgroundLight: '#FFF9F2',
  backgroundDark: '#F8E8D8',
  text: '#3C2415',
  textSecondary: '#8A7060',
  border: '#EBD9C8',
  card: '#FFFCF8',
  shadow: 'rgba(60, 36, 21, 0.1)',
  darkBrown: '#3C2415',
  primary: '#E07030',
  primaryDark: '#C45A28',
  primarySoft: '#F3E0D2',
  onPrimary: '#FFFFFF',
  menuCard: '#FFFFFF',
  quoteMark: '#E07030',
} as const;

export const darkTheme = {
  background: '#1C1917',
  backgroundLight: '#292524',
  backgroundDark: '#0C0A09',
  text: '#F5F5F4',
  textSecondary: '#A8A29E',
  border: '#57534E',
  card: '#292524',
  shadow: 'rgba(0, 0, 0, 0.3)',
  darkBrown: '#D4A574',
  primary: '#E07030',
  primaryDark: '#C45A28',
  primarySoft: '#3F2A1F',
  onPrimary: '#FFFFFF',
  menuCard: '#292524',
  quoteMark: '#E07030',
} as const;

export type ThemeColors = {
  background: string;
  backgroundLight: string;
  backgroundDark: string;
  text: string;
  textSecondary: string;
  border: string;
  card: string;
  shadow: string;
  darkBrown: string;
  primary: string;
  primaryDark: string;
  primarySoft: string;
  onPrimary: string;
  menuCard: string;
  quoteMark: string;
};

export function getThemeColors(mode: ThemeMode): ThemeColors {
  return mode === 'dark' ? darkTheme : lightTheme;
}
