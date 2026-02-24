// src/pages/SettingsPage.jsx
import React, { useState } from "react";
import Card from "../components/ui/Card";
import PrimaryButton from "../components/ui/PrimaryButton";
import SelectDropdown from "../components/ui/SelectDropdown";
import { 
  FiSave, 
  FiRefreshCw, 
  FiGlobe, 
  FiDollarSign, 
  FiCalendar,
  FiMapPin,
  FiZap,
  FiThermometer,
  FiAlertCircle,
  FiCheckCircle,
  FiTrash2
} from "react-icons/fi";
import { BiLeaf, BiWorld, BiGasPump } from "react-icons/bi"; // BiGasPump instead of FiFuel
import { GiFactory } from "react-icons/gi";

import { useSettingsStore } from "../store/settingsStore";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const {
    reportingYear,
    currency,
    region,
    distanceUnit,
    fuelUnit,
    electricityUnit,
    heatUnit,
    factorSource,
    updateSetting,
    resetSettings,
  } = useSettingsStore();

  const handleSave = () => {
    // In a real app, you might save to backend here
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all settings to default?")) {
      resetSettings();
    }
  };

  return (
    <div className="settings-container">
      {/* Header */}
      <div className="settings-header">
        <div>
          <h1>Settings</h1>
          <p>Configure your reporting preferences, units, and emission factors</p>
        </div>
        <div className="header-actions">
          {saved && (
            <span className="save-success">
              <FiCheckCircle /> Settings saved
            </span>
          )}
          <PrimaryButton onClick={handleSave} className="save-btn">
            <FiSave /> Save Changes
          </PrimaryButton>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="settings-grid">
        {/* General Settings */}
        <Card className="settings-card">
          <div className="card-header">
            <div className="header-icon">
              <FiGlobe />
            </div>
            <div>
              <h2>General Reporting</h2>
              <p>Basic reporting preferences</p>
            </div>
          </div>

          <div className="settings-form">
            <div className="form-group">
              <label>
                <FiCalendar className="label-icon" />
                Reporting Year
              </label>
              <SelectDropdown
                value={reportingYear}
                onChange={(e) => updateSetting("reportingYear", e.target.value)}
                options={[
                  { label: "2024", value: "2024" },
                  { label: "2025", value: "2025" },
                  { label: "2026", value: "2026" },
                ]}
              />
            </div>

            <div className="form-group">
              <label>
                <FiDollarSign className="label-icon" />
                Currency
              </label>
              <SelectDropdown
                value={currency}
                onChange={(e) => updateSetting("currency", e.target.value)}
                options={[
                  { label: "USD ($)", value: "USD" },
                  { label: "EUR (€)", value: "EUR" },
                  { label: "GBP (£)", value: "GBP" },
                  { label: "PKR (₨)", value: "PKR" },
                ]}
              />
            </div>

            <div className="form-group">
              <label>
                <FiMapPin className="label-icon" />
                Default Region
              </label>
              <SelectDropdown
                value={region}
                onChange={(e) => updateSetting("region", e.target.value)}
                options={[
                  { label: "🇦🇪 UAE", value: "UAE" },
                  { label: "🇬🇧 UK", value: "UK" },
                  { label: "🇺🇸 USA", value: "USA" },
                  { label: "🌍 Global Average", value: "GLOBAL" },
                ]}
              />
            </div>
          </div>
        </Card>

        {/* Units Settings */}
        <Card className="settings-card">
          <div className="card-header">
            <div className="header-icon">
              <BiWorld />
            </div>
            <div>
              <h2>Measurement Units</h2>
              <p>Preferred units for calculations</p>
            </div>
          </div>

          <div className="settings-form">
            <div className="form-group">
              <label>
                <FiMapPin className="label-icon" />
                Distance Unit
              </label>
              <SelectDropdown
                value={distanceUnit}
                onChange={(e) => updateSetting("distanceUnit", e.target.value)}
                options={[
                  { label: "Kilometers (km)", value: "km" },
                  { label: "Miles", value: "miles" },
                ]}
              />
            </div>

            <div className="form-group">
              <label>
                <BiGasPump className="label-icon" /> {/* Changed from FiFuel to BiGasPump */}
                Fuel Unit
              </label>
              <SelectDropdown
                value={fuelUnit}
                onChange={(e) => updateSetting("fuelUnit", e.target.value)}
                options={[
                  { label: "Litres (L)", value: "litres" },
                  { label: "Gallons (gal)", value: "gallons" },
                  { label: "Cubic meters (m³)", value: "m3" },
                ]}
              />
            </div>

            <div className="form-group">
              <label>
                <FiZap className="label-icon" />
                Electricity Unit
              </label>
              <SelectDropdown
                value={electricityUnit}
                onChange={(e) => updateSetting("electricityUnit", e.target.value)}
                options={[
                  { label: "Kilowatt-hours (kWh)", value: "kWh" },
                  { label: "Megawatt-hours (MWh)", value: "MWh" },
                ]}
              />
            </div>

            <div className="form-group">
              <label>
                <FiThermometer className="label-icon" />
                Heat Unit
              </label>
              <SelectDropdown
                value={heatUnit}
                onChange={(e) => updateSetting("heatUnit", e.target.value)}
                options={[
                  { label: "Megajoules (MJ)", value: "MJ" },
                  { label: "Gigajoules (GJ)", value: "GJ" },
                ]}
              />
            </div>
          </div>
        </Card>

        {/* Emission Factors */}
        <Card className="settings-card">
          <div className="card-header">
            <div className="header-icon">
              <GiFactory />
            </div>
            <div>
              <h2>Emission Factors</h2>
              <p>Choose your factor database</p>
            </div>
          </div>

          <div className="settings-form">
            <div className="form-group">
              <label>
                <BiLeaf className="label-icon" />
                Factor Database
              </label>
              <SelectDropdown
                value={factorSource}
                onChange={(e) => updateSetting("factorSource", e.target.value)}
                options={[
                  { label: "🇬🇧 DEFRA (UK)", value: "DEFRA" },
                  { label: "🇺🇸 EPA (US)", value: "EPA" },
                  { label: "🇪🇺 EEA (Europe)", value: "EEA" },
                  { label: "⚙️ Custom (Manual)", value: "Custom" },
                ]}
              />
            </div>

            <div className="factor-info">
              <FiAlertCircle className="info-icon" />
              <p>Factors are updated annually. Last update: January 2024</p>
            </div>
          </div>
        </Card>

        {/* Data Management */}
        <Card className="settings-card">
          <div className="card-header">
            <div className="header-icon">
              <FiRefreshCw />
            </div>
            <div>
              <h2>Data Management</h2>
              <p>Import, export, and reset options</p>
            </div>
          </div>

          <div className="settings-form">
            <div className="button-group">
              <PrimaryButton onClick={handleReset} className="reset-btn">
                <FiRefreshCw /> Reset to Default
              </PrimaryButton>
              
              <button className="export-btn">
                Export Data
              </button>
            </div>

            <div className="danger-zone">
              <button className="delete-btn">
                <FiTrash2 /> Delete All Data
              </button>
            </div>
          </div>
        </Card>
      </div>

      <style jsx>{`
        .settings-container {
          padding: 24px;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Header */
        .settings-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .settings-header h1 {
          font-size: 28px;
          font-weight: 700;
          color: #14532D;
          margin: 0 0 4px;
        }

        .settings-header p {
          color: #4B5563;
          margin: 0;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .save-success {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #10B981;
          font-size: 14px;
          font-weight: 500;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(10px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .save-btn {
          display: flex !important;
          align-items: center;
          gap: 8px !important;
          padding: 12px 24px !important;
          background: linear-gradient(135deg, #15803D, #22C55E) !important;
        }

        /* Settings Grid */
        .settings-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .settings-card {
          background: white;
          border-radius: 20px;
          padding: 24px;
          border: 1px solid rgba(34, 197, 94, 0.1);
          transition: all 0.3s ease;
        }

        .settings-card:hover {
          box-shadow: 0 10px 30px rgba(34, 197, 94, 0.1);
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(34, 197, 94, 0.1);
        }

        .header-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #22C55E20, #15803D20);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: #22C55E;
        }

        .card-header h2 {
          font-size: 18px;
          font-weight: 600;
          color: #14532D;
          margin: 0 0 4px;
        }

        .card-header p {
          font-size: 13px;
          color: #6B7280;
          margin: 0;
        }

        /* Settings Form */
        .settings-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 600;
          color: #374151;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .label-icon {
          color: #22C55E;
          font-size: 14px;
        }

        /* Factor Info */
        .factor-info {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #F0FDF4;
          padding: 12px 16px;
          border-radius: 12px;
          margin-top: 8px;
        }

        .info-icon {
          color: #22C55E;
          font-size: 18px;
          flex-shrink: 0;
        }

        .factor-info p {
          margin: 0;
          font-size: 13px;
          color: #166534;
        }

        /* Button Group */
        .button-group {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .reset-btn {
          flex: 1;
          background: #F3F4F6 !important;
          color: #374151 !important;
          border: 1px solid #E5E7EB !important;
          display: flex !important;
          align-items: center !important;
          gap: 8px !important;
        }

        .reset-btn:hover {
          background: #E5E7EB !important;
        }

        .export-btn {
          flex: 1;
          padding: 10px 20px;
          background: white;
          border: 2px solid #22C55E;
          border-radius: 8px;
          color: #15803D;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .export-btn:hover {
          background: #F0FDF4;
        }

        /* Danger Zone */
        .danger-zone {
          margin-top: 16px;
          padding: 16px;
          background: #FEF2F2;
          border-radius: 12px;
          border: 1px solid #FECACA;
        }

        .danger-zone h4 {
          font-size: 14px;
          font-weight: 600;
          color: #B91C1C;
          margin: 0 0 12px;
        }

        .delete-btn {
          width: 100%;
          padding: 10px;
          background: transparent;
          border: 2px solid #DC2626;
          border-radius: 8px;
          color: #DC2626;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .delete-btn:hover {
          background: #DC2626;
          color: white;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .settings-grid {
            grid-template-columns: 1fr;
          }

          .settings-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .header-actions {
            width: 100%;
          }

          .save-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}