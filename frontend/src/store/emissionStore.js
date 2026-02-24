import { create } from "zustand";

export const useEmissionStore = create((set) => ({
  // === Scope 1 ===
  scope1Vehicles: [],
  scope1Stationary: [],
  scope1Refrigerants: [],
  scope1Total: 20,

  // Vehicles
  addScope1Vehicle: (vehicle) =>
    set((state) => {
      const updated = [...state.scope1Vehicles, vehicle];
      const total =
        updated.reduce((sum, v) => sum + Number(v.km || 0), 0) +
        state.scope1Stationary.reduce((sum, s) => sum + Number(s.consumption || 0), 0) +
        state.scope1Refrigerants.reduce((sum, r) => sum + Number(r.gwp || 0), 0);
      return { scope1Vehicles: updated, scope1Total: total };
    }),
  updateScope1Vehicle: (vehicle) =>
    set((state) => {
      const updated = state.scope1Vehicles.map((v) =>
        v.id === vehicle.id ? vehicle : v
      );
      const total =
        updated.reduce((sum, v) => sum + Number(v.km || 0), 0) +
        state.scope1Stationary.reduce((sum, s) => sum + Number(s.consumption || 0), 0) +
        state.scope1Refrigerants.reduce((sum, r) => sum + Number(r.gwp || 0), 0);
      return { scope1Vehicles: updated, scope1Total: total };
    }),
  deleteScope1Vehicle: (id) =>
    set((state) => {
      const updated = state.scope1Vehicles.filter((v) => v.id !== id);
      const total =
        updated.reduce((sum, v) => sum + Number(v.km || 0), 0) +
        state.scope1Stationary.reduce((sum, s) => sum + Number(s.consumption || 0), 0) +
        state.scope1Refrigerants.reduce((sum, r) => sum + Number(r.gwp || 0), 0);
      return { scope1Vehicles: updated, scope1Total: total };
    }),

  // Stationary
  addScope1Stationary: (entry) =>
    set((state) => {
      const updated = [...state.scope1Stationary, entry];
      const total =
        state.scope1Vehicles.reduce((sum, v) => sum + Number(v.km || 0), 0) +
        updated.reduce((sum, s) => sum + Number(s.consumption || 0), 0) +
        state.scope1Refrigerants.reduce((sum, r) => sum + Number(r.gwp || 0), 0);
      return { scope1Stationary: updated, scope1Total: total };
    }),
  updateScope1Stationary: (entry) =>
    set((state) => {
      const updated = state.scope1Stationary.map((s) =>
        s.id === entry.id ? entry : s
      );
      const total =
        state.scope1Vehicles.reduce((sum, v) => sum + Number(v.km || 0), 0) +
        updated.reduce((sum, s) => sum + Number(s.consumption || 0), 0) +
        state.scope1Refrigerants.reduce((sum, r) => sum + Number(r.gwp || 0), 0);
      return { scope1Stationary: updated, scope1Total: total };
    }),
  deleteScope1Stationary: (id) =>
    set((state) => {
      const updated = state.scope1Stationary.filter((s) => s.id !== id);
      const total =
        state.scope1Vehicles.reduce((sum, v) => sum + Number(v.km || 0), 0) +
        updated.reduce((sum, s) => sum + Number(s.consumption || 0), 0) +
        state.scope1Refrigerants.reduce((sum, r) => sum + Number(r.gwp || 0), 0);
      return { scope1Stationary: updated, scope1Total: total };
    }),

  // Refrigerants
  addScope1Refrigerant: (entry) =>
    set((state) => {
      const updated = [...state.scope1Refrigerants, entry];
      const total =
        state.scope1Vehicles.reduce((sum, v) => sum + Number(v.km || 0), 0) +
        state.scope1Stationary.reduce((sum, s) => sum + Number(s.consumption || 0), 0) +
        updated.reduce((sum, r) => sum + Number(r.gwp || 0), 0);
      return { scope1Refrigerants: updated, scope1Total: total };
    }),
  updateScope1Refrigerant: (entry) =>
    set((state) => {
      const updated = state.scope1Refrigerants.map((r) =>
        r.id === entry.id ? entry : r
      );
      const total =
        state.scope1Vehicles.reduce((sum, v) => sum + Number(v.km || 0), 0) +
        state.scope1Stationary.reduce((sum, s) => sum + Number(s.consumption || 0), 0) +
        updated.reduce((sum, r) => sum + Number(r.gwp || 0), 0);
      return { scope1Refrigerants: updated, scope1Total: total };
    }),
  deleteScope1Refrigerant: (id) =>
    set((state) => {
      const updated = state.scope1Refrigerants.filter((r) => r.id !== id);
      const total =
        state.scope1Vehicles.reduce((sum, v) => sum + Number(v.km || 0), 0) +
        state.scope1Stationary.reduce((sum, s) => sum + Number(s.consumption || 0), 0) +
        updated.reduce((sum, r) => sum + Number(r.gwp || 0), 0);
      return { scope1Refrigerants: updated, scope1Total: total };
    }),

    //Fugitive
    // Fugitive Emissions
scope1Fugitive: [],
addScope1Fugitive: (entry) =>
  set((state) => {
    const updated = [...state.scope1Fugitive, entry];
    const vehiclesTotal = state.scope1Vehicles.reduce(
      (sum, v) => sum + Number(v.km || 0),
      0
    );
    const stationaryTotal = state.scope1Stationary.reduce(
      (sum, s) => sum + Number(s.consumption || 0),
      0
    );
    const fugitiveTotal = updated.reduce((sum, f) => sum + Number(f.amount || 0), 0);

    return {
      scope1Fugitive: updated,
      scope1Total: vehiclesTotal + stationaryTotal + fugitiveTotal,
    };
  }),
deleteScope1Fugitive: (id) =>
  set((state) => {
    const updated = state.scope1Fugitive.filter((f) => f.id !== id);
    const vehiclesTotal = state.scope1Vehicles.reduce(
      (sum, v) => sum + Number(v.km || 0),
      0
    );
    const stationaryTotal = state.scope1Stationary.reduce(
      (sum, s) => sum + Number(s.consumption || 0),
      0
    );
    const fugitiveTotal = updated.reduce((sum, f) => sum + Number(f.amount || 0), 0);

    return {
      scope1Fugitive: updated,
      scope1Total: vehiclesTotal + stationaryTotal + fugitiveTotal,
    };
  }),


  // === Scope 2 ===
  scope2Electricity: [],
  scope2Heating: [],
  scope2Renewable: [],
  scope2Total: 50,

  addScope2Electricity: (entry) =>
    set((state) => {
      const updated = [...state.scope2Electricity, entry];
      const total =
        updated.reduce((sum, e) => sum + Number(e.consumption || e.kwh || 0), 0) +
        state.scope2Heating.reduce((sum, h) => sum + Number(h.consumption || 0), 0) +
        state.scope2Renewable.reduce((sum, r) => sum + Number(r.consumption || 0), 0);
      return { scope2Electricity: updated, scope2Total: total };
    }),
  deleteScope2Electricity: (id) =>
    set((state) => {
      const updated = state.scope2Electricity.filter((e) => e.id !== id);
      const total =
        updated.reduce((sum, e) => sum + Number(e.consumption || e.kwh || 0), 0) +
        state.scope2Heating.reduce((sum, h) => sum + Number(h.consumption || 0), 0) +
        state.scope2Renewable.reduce((sum, r) => sum + Number(r.consumption || 0), 0);
      return { scope2Electricity: updated, scope2Total: total };
    }),

  addScope2Heating: (entry) =>
    set((state) => {
      const updated = [...state.scope2Heating, entry];
      const total =
        state.scope2Electricity.reduce((sum, e) => sum + Number(e.consumption || e.kwh || 0), 0) +
        updated.reduce((sum, h) => sum + Number(h.consumption || 0), 0) +
        state.scope2Renewable.reduce((sum, r) => sum + Number(r.consumption || 0), 0);
      return { scope2Heating: updated, scope2Total: total };
    }),
  deleteScope2Heating: (id) =>
    set((state) => {
      const updated = state.scope2Heating.filter((h) => h.id !== id);
      const total =
        state.scope2Electricity.reduce((sum, e) => sum + Number(e.consumption || e.kwh || 0), 0) +
        updated.reduce((sum, h) => sum + Number(h.consumption || 0), 0) +
        state.scope2Renewable.reduce((sum, r) => sum + Number(r.consumption || 0), 0);
      return { scope2Heating: updated, scope2Total: total };
    }),

  addScope2Renewable: (entry) =>
    set((state) => {
      const updated = [...state.scope2Renewable, entry];
      const total =
        state.scope2Electricity.reduce((sum, e) => sum + Number(e.consumption || e.kwh || 0), 0) +
        state.scope2Heating.reduce((sum, h) => sum + Number(h.consumption || 0), 0) +
        updated.reduce((sum, r) => sum + Number(r.consumption || 0), 0);
      return { scope2Renewable: updated, scope2Total: total };
    }),
  deleteScope2Renewable: (id) =>
    set((state) => {
      const updated = state.scope2Renewable.filter((r) => r.id !== id);
      const total =
        state.scope2Electricity.reduce((sum, e) => sum + Number(e.consumption || e.kwh || 0), 0) +
        state.scope2Heating.reduce((sum, h) => sum + Number(h.consumption || 0), 0) +
        updated.reduce((sum, r) => sum + Number(r.consumption || 0), 0);
      return { scope2Renewable: updated, scope2Total: total };
    }),
}));
