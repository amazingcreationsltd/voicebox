import { type Theme, useUIStore } from '@/stores/uiStore';
import { ThemeSwitcher } from '@/components/ui/theme-switcher';

export function ThemeSelect() {
  const theme = useUIStore((s) => s.theme);
  const setTheme = useUIStore((s) => s.setTheme);

  return (
    <ThemeSwitcher
      value={theme}
      onChange={(value) => setTheme(value as Theme)}
    />
  );
}
