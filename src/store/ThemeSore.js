import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useThemeStore = create(
  persist(
    (set, get) => {
      return {
        theme: "system",
        darkTheme: () => {
          document.documentElement.classList.add("dark");
          set({ theme: "dark" });
        },
        ligthTheme: () => {
          document.documentElement.classList.remove("dark");
          set({ theme: "" });
        },
        systemTheme: () => {
          set({ theme: "system" });
        },
      };
    },
    { name: "theme" }
  )
);
