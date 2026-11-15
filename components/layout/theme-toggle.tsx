"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Switch between light and dark theme"
      className="group relative grid size-11 place-items-center rounded-full border border-border text-text transition-colors hover:border-text"
    >
      {/* Both icons render; CSS picks one, so there is no hydration flicker. */}
      <Sun className="hidden size-[18px] transition-transform duration-500 group-hover:rotate-45 dark:block" aria-hidden />
      <Moon className="size-[18px] transition-transform duration-500 group-hover:-rotate-12 dark:hidden" aria-hidden />
    </button>
  );
}
