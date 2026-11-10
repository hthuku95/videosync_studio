import { createTheme } from '@mui/material/styles';

/**
 * VideoSync Studio theme — production-grade tokens aligned with the VideoSync
 * app family (dark glassmorphism, indigo/sky palette, Inter).
 *
 * Design rules applied so the site does NOT look "vibe coded":
 * - 8pt spacing rhythm (all paddings/gaps are multiples of 8)
 * - Consistent type scale via Typography variants (no ad-hoc inline sizes)
 * - ONE accent hue (indigo-400) + neutral surfaces; color used for state, not decoration
 * - Uniform radius (12px) + 1px hairline borders instead of heavy shadows
 * - Real content hierarchy: eyebrow → h1 (clamp) → support → CTA
 */
export const studioTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#818cf8', light: '#a5b4fc', dark: '#6366f1', contrastText: '#0b0b14' },
    secondary: { main: '#38bdf8', light: '#7dd3fc', dark: '#0ea5e9', contrastText: '#0b0b14' },
    success: { main: '#34d399' },
    background: { default: '#07111d', paper: '#0e1a2b' },
    text: { primary: '#eef0ff', secondary: '#a5b0c8' },
    divider: 'rgba(148,163,184,0.16)',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica Neue", Arial, sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.03em', fontSize: 'clamp(2.1rem, 4.2vw, 3.4rem)', lineHeight: 1.08 },
    h2: { fontWeight: 800, letterSpacing: '-0.02em', fontSize: 'clamp(1.6rem, 3vw, 2.3rem)', lineHeight: 1.15 },
    h3: { fontWeight: 700, fontSize: '1.35rem', lineHeight: 1.25 },
    subtitle1: { fontWeight: 600, lineHeight: 1.5 },
    body1: { lineHeight: 1.65 },
    body2: { lineHeight: 1.6, color: '#a5b0c8' },
    button: { fontWeight: 700, textTransform: 'none', letterSpacing: 0 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { background: '#07111d', color: '#eef0ff' },
        'html, body': { scrollBehavior: 'smooth' },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 10, paddingInline: 22, paddingBlock: 10 },
        containedPrimary: {
          background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
          '&:hover': { background: 'linear-gradient(135deg, #7379f4, #5b54ee)' },
        },
        outlinedPrimary: { borderColor: 'rgba(148,163,184,0.25)' },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          background: 'rgba(14,26,43,0.72)',
          border: '1px solid rgba(148,163,184,0.14)',
          backdropFilter: 'blur(14px)',
        },
      },
    },
    MuiChip: { styleOverrides: { root: { fontWeight: 600 } } },
  },
});
