import { create } from "zustand";

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("chatup-theme") || "night",
    setTheme: (theme) => {
        localStorage.setItem("chatup-theme", theme);
        set({ theme });
    },
}));