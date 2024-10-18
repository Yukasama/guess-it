import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from '@radix-ui/react-icons';
import { DropdownMenuItem, DropdownMenuShortcut } from './ui/dropdown-menu';

export const Themer = () => {
  const [darkMode, setDarkMode] = useState<boolean>(
    () => localStorage.getItem('darkMode') === 'true',
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  return (
    <DropdownMenuItem onClick={() => setDarkMode(!darkMode)}>
      Change Theme
      <DropdownMenuShortcut>
        {darkMode ? <SunIcon /> : <MoonIcon />}
      </DropdownMenuShortcut>
    </DropdownMenuItem>
  );
};
