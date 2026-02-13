export const theme = {
  colors: {
    background: '#0a0a0a',
    surface: '#1a1a1a',
    surfaceElevated: '#2a2a2a',
    primary: '#9b87f5',
    textPrimary: '#ffffff',
    textSecondary: '#b0b0b0',
    error: '#ff3b30',
    success: '#34c759',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  borderRadius: {
    sm: '8px',
    md: '16px',
    lg: '24px',
    full: '50%',
  },
  touchTarget: {
    minimum: '44px',
  },
};

export type Theme = typeof theme;
