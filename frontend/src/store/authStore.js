// src/store/authStore.js
import {create} from "zustand";

export const useAuthStore = create((set) => ({
  loggedIn: false,
  login: () => set({ loggedIn: true }),
  logout: () => set({ loggedIn: false }),
}));
