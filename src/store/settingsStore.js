// src/store/settingsStore.js
import { create } from "zustand";

export const useSettingsStore = create((set) => ({
  // ===== General Reporting Settings =====
  reportingYear: new Date().getFullYear(),
  currency: "USD",
  region: "UAE",

  // ===== Units =====
  distanceUnit: "km",          // km | miles
  fuelUnit: "litres",          // litres | gallons
  electricityUnit: "kWh",      // kWh | MWh
  heatUnit: "MJ",              // MJ | GJ

  // ===== Emission Factor Source =====
  factorSource: "DEFRA",       // DEFRA | EPA | Custom

  // ===== Generic Setter =====
  updateSetting: (key, value) =>
    set(() => ({
      [key]: value,
    })),

  // ===== Reset to Defaults =====
  resetSettings: () =>
    set(() => ({
      reportingYear: new Date().getFullYear(),
      currency: "USD",
      region: "UAE",
      distanceUnit: "km",
      fuelUnit: "litres",
      electricityUnit: "kWh",
      heatUnit: "MJ",
      factorSource: "DEFRA",
    })),
}));
