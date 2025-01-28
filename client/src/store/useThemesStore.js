import { create } from "zustand";
export const useThemeStore = create((setState) => ({
  theme: localStorage.getItem("chat-theme") || "dark",
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    setState({ theme });
  },
}));
