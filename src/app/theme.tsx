'use client';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import React, { ReactNode, useEffect, useState } from 'react';

// 기본 색상: #fdb35c (황금빛/주황색)
// 이 색상을 다양한 밝기로 변형하여 테마에 사용

const mainColor = '#fdb35c';
const darkMainColor = '#d9962f'; // 어두운 버전

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: mainColor,
      dark: darkMainColor,
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#7a5c27', // 보완 색상
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8f8f8',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#555555',
    },
  },
  typography: {
    fontFamily: '"Noto Sans KR", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      color: '#333333',
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: mainColor,
          '&:hover': {
            backgroundColor: darkMainColor,
          },
        },
        outlined: {
          borderColor: mainColor,
          color: mainColor,
          '&:hover': {
            borderColor: darkMainColor,
            backgroundColor: 'rgba(253, 179, 92, 0.08)',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#666666',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: mainColor,
          },
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: mainColor,
      dark: darkMainColor,
      contrastText: '#000000',
    },
    secondary: {
      main: '#ffd399', // 밝은 보완 색상
      contrastText: '#000000',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#f0f0f0',
      secondary: '#cccccc',
    },
  },
  typography: {
    fontFamily: '"Noto Sans KR", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      color: '#f0f0f0',
    },
    h6: {
      fontWeight: 500,
    },
    h1: {
      color: mainColor,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: mainColor,
          '&:hover': {
            backgroundColor: darkMainColor,
          },
        },
        outlined: {
          borderColor: mainColor,
          color: mainColor,
          '&:hover': {
            borderColor: '#ffc77a',
            backgroundColor: 'rgba(253, 179, 92, 0.15)',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#aaaaaa',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: mainColor,
          },
        },
      },
    },
  },
});

interface ThemeContextProps {
  toggleColorMode: () => void;
  mode: 'light' | 'dark';
}

export const ThemeContext = React.createContext<ThemeContextProps>({
  toggleColorMode: () => {},
  mode: 'light',
});

export function ThemeProviderWrapper({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // 시스템 테마 감지
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setMode(mediaQuery.matches ? 'dark' : 'light');

    const handler = (e: MediaQueryListEvent) => {
      setMode(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      mode,
    }),
    [mode]
  );

  const theme = React.useMemo(
    () => (mode === 'light' ? lightTheme : darkTheme),
    [mode]
  );

  return (
    <ThemeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
