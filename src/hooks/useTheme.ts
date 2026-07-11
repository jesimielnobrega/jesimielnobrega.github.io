import { useState, useEffect } from 'react';

export type Theme = 'dark' | 'light';

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  return (localStorage.getItem('theme') as Theme) ?? 'dark';
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return { theme, toggleTheme, isDark: theme === 'dark' };
}
