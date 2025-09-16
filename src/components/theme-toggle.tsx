'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export function ThemeToggle() {
  const [theme, setThemeState] = React.useState<'light' | 'dark' | null>(null);
  const { toast } = useToast();

  React.useEffect(() => {
    // On mount, read the class from the document and set the initial state
    const isDarkMode = document.documentElement.classList.contains('dark');
    setThemeState(isDarkMode ? 'dark' : 'light');
  }, []);

  React.useEffect(() => {
    if (theme === null) return;
    // Whenever the theme state changes, update the class on the <html> element
    const isDark = theme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
  }, [theme]);

  const toggleTheme = () => {
    if (theme === null) return;
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setThemeState(newTheme);
    toast({
        title: `Switched to ${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)} Mode`,
        duration: 2000,
    });
  };

  if (theme === null) {
    // Render a placeholder or nothing on the server and during initial client render
    return <div className="h-10 w-10" />;
  }

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
