import React, { useState, useMemo } from "react";
import Card from "../ui/Card";
import PrimaryButton from "../ui/PrimaryButton";
import SecondaryButton from "../ui/SecondaryButton";
import InputField from "../ui/InputField";
import EmptyState from "../ui/EmptyState";
import { useEmissionStore } from "../../store/emissionStore";

export default function VehicleTable() {
  const vehicles = useEmissionStore((s) => s.scope1Vehicles);
  const addVehicle = useEmissionStore((s) => s.addScope1Vehicle);
  const updateVehicle = useEmissionStore((s) => s.updateScope1Vehicle);
  const deleteVehicle = useEmissionStore((s) => s.deleteScope1Vehicle);

  // Form state
  const [vehicleType, setVehicleType] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [km, setKm] = useState("");
  const [litres, setLitres] = useState("");
  const [registration, setRegistration] = useState("");
  const [editId, setEditId] = useState(null);
  const [editVehicleType, setEditVehicleType] = useState("");
  const [editFuelType, setEditFuelType] = useState("");
  const [editKm, setEditKm] = useState("");
  const [editLitres, setEditLitres] = useState("");
  const [editRegistration, setEditRegistration] = useState("");

  // Search bar
  const [searchTerm, setSearchTerm] = useState("");

  const vehicleOptions = [
    "Car", "Truck", "Bus", "Ship", "Airplane",
    "Cargo van", "Motorboat", "Motorcycle", "Forklift", "Lift", "Other"
  ];
  const fuelOptions = ["Diesel", "Petrol", "LPG", "Biodiesel", "Other"];

  const displayedVehicles = useMemo(() => {
    if (!searchTerm) return vehicles;
    return vehicles.filter(v =>
      v.vehicleType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.fuelType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.registration.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [vehicles, searchTerm]);

  const handleAdd = () => {
    if (!vehicleType || !fuelType || !km || !litres || !registration) return;
    addVehicle({
      id: Date.now(),
      vehicleType,
      fuelType,
      km: Number(km),
      litres: Number(litres),
      registration
    });
    setVehicleType(""); setFuelType(""); setKm(""); setLitres(""); setRegistration("");
  };

  const startEdit = (v) => {
    setEditId(v.id);
    setEditVehicleType(v.vehicleType);
    setEditFuelType(v.fuelType);
    setEditKm(v.km);
    setEditLitres(v.litres);
    setEditRegistration(v.registration);
  };

  const handleUpdate = () => {
    if (!editVehicleType || !editFuelType || !editKm || !editLitres || !editRegistration) return;
    updateVehicle({
      id: editId,
      vehicleType: editVehicleType,
      fuelType: editFuelType,
      km: Number(editKm),
      litres: Number(editLitres),
      registration: editRegistration
    });
    setEditId(null); setEditVehicleType(""); setEditFuelType(""); setEditKm(""); setEditLitres(""); setEditRegistration("");
  };

  const handleDelete = (id) => deleteVehicle(id);

  // Emissions preview
  const totalKm = vehicles.reduce((sum, v) => sum + v.km, 0);
  const totalLitres = vehicles.reduce((sum, v) => sum + v.litres, 0);
  const estimatedCO2 = totalLitres * 2.31;

  // Get fuel badge color
  const getFuelBadgeClass = (fuel) => {
    const fuelMap = {
      'Diesel': 'bg-amber-100 text-amber-800 border-amber-200',
      'Petrol': 'bg-blue-100 text-blue-800 border-blue-200',
      'LPG': 'bg-purple-100 text-purple-800 border-purple-200',
      'Biodiesel': 'bg-green-100 text-green-800 border-green-200',
      'Other': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return fuelMap[fuel] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="vehicle-table-container">
      {/* Header with description */}
      <div className="section-description">
        <div className="description-icon">🚗</div>
        <div className="description-content">
          <h3>Mobile Combustion Sources</h3>
          <p>
            Provide fuel consumption for <span className="highlight">mobile vehicles</span> owned by your company. 
            Only company-owned vehicles should be reported here.
          </p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="search-filter-bar">
        <div className="search-box">
          <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="#6B7280" strokeWidth="2"/>
            <path d="M19 19L15 15" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search vehicles, fuel type or registration..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-badge">
          {vehicles.length} vehicles
        </div>
      </div>

      {/* Add Vehicle Form Card */}
      <Card className="add-vehicle-card">
        <div className="card-header-compact">
          <h4>Add New Vehicle</h4>
          <p>Enter vehicle details below</p>
        </div>
        <div className="add-vehicle-form">
          <div className="form-grid">
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="form-select"
            >
              <option value="">Vehicle Type</option>
              {vehicleOptions.map(v => <option key={v} value={v}>{v}</option>)}
            </select>

            <select
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value)}
              className="form-select"
            >
              <option value="">Fuel Type</option>
              {fuelOptions.map(f => <option key={f} value={f}>{f}</option>)}
            </select>

            <InputField
              placeholder="Registration Number"
              value={registration}
              onChange={(e) => setRegistration(e.target.value)}
              className="form-input"
            />

            <InputField
              placeholder="Distance (km)"
              type="number"
              value={km}
              onChange={(e) => setKm(e.target.value)}
              className="form-input"
            />

            <InputField
              placeholder="Fuel (litres)"
              type="number"
              value={litres}
              onChange={(e) => setLitres(e.target.value)}
              className="form-input"
            />
          </div>
          
          <PrimaryButton onClick={handleAdd} className="add-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 4V16M4 10H16" stroke="white" strokeWidth="2"/>
            </svg>
            Add Vehicle
          </PrimaryButton>
        </div>
      </Card>

      {/* Vehicles Table */}
      {displayedVehicles.length === 0 ? (
        <EmptyState 
          message="No vehicles found" 
          icon="🚗"
          className="empty-state-custom"
        />
      ) : (
        <Card className="table-card">
          <div className="table-wrapper">
            <table className="vehicles-table">
              <thead>
                <tr>
                  <th>Vehicle Type</th>
                  <th>Fuel Type</th>
                  <th>Registration</th>
                  <th>Distance (km)</th>
                  <th>Fuel (litres)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedVehicles.map(v => (
                  <tr key={v.id} className="vehicle-row">
                    <td>
                      {editId === v.id ? (
                        <select 
                          value={editVehicleType} 
                          onChange={e => setEditVehicleType(e.target.value)} 
                          className="edit-select"
                        >
                          {vehicleOptions.map(vt => <option key={vt} value={vt}>{vt}</option>)}
                        </select>
                      ) : (
                        <span className="vehicle-badge">{v.vehicleType}</span>
                      )}
                    </td>
                    <td>
                      {editId === v.id ? (
                        <select 
                          value={editFuelType} 
                          onChange={e => setEditFuelType(e.target.value)} 
                          className="edit-select"
                        >
                          {fuelOptions.map(ft => <option key={ft} value={ft}>{ft}</option>)}
                        </select>
                      ) : (
                        <span className={`fuel-badge ${getFuelBadgeClass(v.fuelType)}`}>
                          {v.fuelType}
                        </span>
                      )}
                    </td>
                    <td>
                      {editId === v.id ? (
                        <InputField 
                          value={editRegistration} 
                          onChange={e => setEditRegistration(e.target.value)} 
                          className="edit-input" 
                        />
                      ) : (
                        v.registration
                      )}
                    </td>
                    <td className="number-cell">
                      {editId === v.id ? (
                        <InputField 
                          type="number" 
                          value={editKm} 
                          onChange={e => setEditKm(e.target.value)} 
                          className="edit-input" 
                        />
                      ) : (
                        v.km.toLocaleString()
                      )}
                    </td>
                    <td className="number-cell">
                      {editId === v.id ? (
                        <InputField 
                          type="number" 
                          value={editLitres} 
                          onChange={e => setEditLitres(e.target.value)} 
                          className="edit-input" 
                        />
                      ) : (
                        v.litres.toLocaleString()
                      )}
                    </td>
                    <td className="actions-cell">
                      {editId === v.id ? (
                        <PrimaryButton onClick={handleUpdate} className="save-btn">
                          Save
                        </PrimaryButton>
                      ) : (
                        <SecondaryButton onClick={() => startEdit(v)} className="edit-btn">
                          Edit
                        </SecondaryButton>
                      )}
                      <button 
                        onClick={() => handleDelete(v.id)} 
                        className="delete-btn"
                        title="Delete"
                      >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                          <path d="M3 3L15 15M15 3L3 15" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Emissions Summary Footer */}
      <Card className="summary-footer">
        <div className="summary-grid">
          <div className="summary-item">
            <span className="summary-label">Total Distance</span>
            <span className="summary-value">{totalKm.toLocaleString()} km</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Total Fuel</span>
            <span className="summary-value">{totalLitres.toLocaleString()} L</span>
          </div>
          <div className="summary-item highlight">
            <span className="summary-label">Estimated CO₂e</span>
            <span className="summary-value emission">
              {estimatedCO2.toFixed(2)} tCO₂e
            </span>
          </div>
        </div>
        <div className="footer-note">
          <p>🌱 Based on UK Government conversion factors</p>
        </div>
      </Card>

      <style jsx>{`
        .vehicle-table-container {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 20px;
        }

        /* Section Description */
        .section-description {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 24px;
          padding: 20px 24px;
          background: linear-gradient(135deg, #f0f9f0 0%, #e6f3e6 100%);
          border-radius: 20px;
          border-left: 6px solid #2E7D32;
          box-shadow: 0 4px 12px rgba(46, 125, 50, 0.1);
        }

        .description-icon {
          font-size: 32px;
          line-height: 1;
        }

        .description-content h3 {
          margin: 0 0 8px 0;
          font-size: 20px;
          font-weight: 700;
          color: #1B5E20;
        }

        .description-content p {
          margin: 0;
          color: #374151;
          font-size: 15px;
          line-height: 1.6;
        }

        .highlight {
          background: rgba(46, 125, 50, 0.1);
          padding: 2px 8px;
          border-radius: 20px;
          font-weight: 600;
          color: #2E7D32;
        }

        /* Search Bar */
        .search-filter-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          gap: 16px;
        }

        .search-box {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 20px;
          background: white;
          border-radius: 60px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e7eb;
          transition: all 0.2s ease;
        }

        .search-box:focus-within {
          border-color: #2E7D32;
          box-shadow: 0 0 0 4px rgba(46, 125, 50, 0.15);
        }

        .search-icon {
          flex-shrink: 0;
        }

        .search-input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 15px;
          background: transparent;
        }

        .filter-badge {
          padding: 8px 16px;
          background: #2E7D32;
          color: white;
          border-radius: 30px;
          font-size: 14px;
          font-weight: 500;
          white-space: nowrap;
        }

        /* Add Vehicle Card */
        .add-vehicle-card {
          margin-bottom: 24px;
          border: 1px solid rgba(46, 125, 50, 0.2);
        }

        .card-header-compact {
          padding: 16px 20px;
          background: #f8faf8;
          border-bottom: 1px solid #e5e7eb;
        }

        .card-header-compact h4 {
          margin: 0 0 4px 0;
          font-size: 16px;
          font-weight: 600;
          color: #2E7D32;
        }

        .card-header-compact p {
          margin: 0;
          font-size: 13px;
          color: #6B7280;
        }

        .add-vehicle-form {
          padding: 24px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 20px;
        }

        .form-select {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 14px;
          background: white;
          transition: all 0.2s ease;
          outline: none;
        }

        .form-select:focus {
          border-color: #2E7D32;
          box-shadow: 0 0 0 4px rgba(46, 125, 50, 0.15);
        }

        .form-input {
          width: 100%;
        }

        .add-btn {
          width: 100%;
          padding: 14px !important;
          font-size: 16px !important;
        }

        /* Table Card */
        .table-card {
          margin-bottom: 24px;
          overflow: hidden;
          border: 1px solid rgba(46, 125, 50, 0.2);
        }

        .table-wrapper {
          overflow-x: auto;
          max-width: 100%;
        }

        .vehicles-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0 8px;
          padding: 8px;
        }

        .vehicles-table th {
          text-align: left;
          padding: 16px 20px;
          background: #f8faf8;
          font-size: 13px;
          font-weight: 600;
          color: #4B5563;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .vehicles-table td {
          padding: 16px 20px;
          background: white;
          border-bottom: 1px solid #f0f0f0;
        }

        .vehicle-row {
          transition: all 0.2s ease;
        }

        .vehicle-row:hover {
          background: #f8faf8;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .vehicle-badge {
          padding: 4px 12px;
          background: #f0f9f0;
          color: #2E7D32;
          border-radius: 30px;
          font-size: 13px;
          font-weight: 500;
        }

        .fuel-badge {
          padding: 4px 12px;
          border-radius: 30px;
          font-size: 13px;
          font-weight: 500;
          border: 1px solid;
        }

        .number-cell {
          font-family: 'Inter', monospace;
          font-weight: 500;
        }

        .actions-cell {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .edit-select {
          padding: 8px 12px;
          border: 2px solid #e5e7eb;
          border-radius: 10px;
          width: 140px;
          font-size: 13px;
        }

        .edit-input {
          width: 100px;
        }

        .edit-btn {
          padding: 6px 16px !important;
          font-size: 13px !important;
        }

        .save-btn {
          padding: 6px 16px !important;
          font-size: 13px !important;
        }

        .delete-btn {
          padding: 8px;
          background: white;
          border: 1px solid #fee2e2;
          border-radius: 10px;
          color: #ef4444;
          cursor: pointer;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .delete-btn:hover {
          background: #fee2e2;
          transform: scale(1.1);
        }

        /* Summary Footer */
        .summary-footer {
          margin-top: 24px;
          padding: 0;
          overflow: hidden;
          border: 1px solid rgba(46, 125, 50, 0.2);
        }

        .summary-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: #e5e7eb;
        }

        .summary-item {
          background: white;
          padding: 24px;
          text-align: center;
        }

        .summary-item.highlight {
          background: linear-gradient(135deg, #f0f9f0 0%, #e6f3e6 100%);
        }

        .summary-label {
          display: block;
          font-size: 14px;
          color: #6B7280;
          margin-bottom: 8px;
        }

        .summary-value {
          display: block;
          font-size: 28px;
          font-weight: 700;
          color: #1B5E20;
        }

        .summary-value.emission {
          color: #2E7D32;
          font-size: 32px;
        }

        .footer-note {
          padding: 16px 24px;
          background: #f8faf8;
          border-top: 1px solid #e5e7eb;
          font-size: 13px;
          color: #6B7280;
        }

        .footer-note p {
          margin: 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Empty State */
        .empty-state-custom {
          padding: 48px;
          background: white;
          border-radius: 24px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          border: 1px dashed #2E7D32;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .vehicle-table-container {
            padding: 12px;
          }

          .section-description {
            flex-direction: column;
            align-items: flex-start;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .summary-grid {
            grid-template-columns: 1fr;
          }

          .summary-value {
            font-size: 24px;
          }

          .summary-value.emission {
            font-size: 28px;
          }

          .actions-cell {
            flex-wrap: wrap;
          }
        }

        @media (max-width: 480px) {
          .search-filter-bar {
            flex-direction: column;
          }

          .filter-badge {
            align-self: flex-start;
          }
        }
      `}</style>
    </div>
  );
}