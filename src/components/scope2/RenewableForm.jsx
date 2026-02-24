import React, { useState } from "react";
import Card from "../ui/Card";
import PrimaryButton from "../ui/PrimaryButton";
import SecondaryButton from "../ui/SecondaryButton";
import EmptyState from "../ui/EmptyState";
import InputField from "../ui/InputField";
import SelectDropdown from "../ui/SelectDropdown";
import { useEmissionStore } from "../../store/emissionStore";

export default function RenewableForm() {
  const renewableTypes = [
    "Photovoltaics (Solar)",
    "Wind Turbine",
    "Hydroelectricity",
    "Other",
  ];

  const [renewableType, setRenewableType] = useState(renewableTypes[0]);
  const [renewableKwh, setRenewableKwh] = useState("");
  const [recCredits, setRecCredits] = useState("");
  const [search, setSearch] = useState("");

  const renewableEntries = useEmissionStore((s) => s.scope2Renewable);
  const addRenewable = useEmissionStore((s) => s.addScope2Renewable);
  const deleteRenewable = useEmissionStore((s) => s.deleteScope2Renewable);

  const handleAddRenewable = () => {
    if (!renewableKwh || Number(renewableKwh) <= 0) return;

    addRenewable({
      id: Date.now(),
      type: renewableType,
      kwh: Number(renewableKwh),
    });

    setRenewableKwh("");
  };

  // Filter entries by search
  const filteredEntries = renewableEntries.filter(
    (r) =>
      r.type.toLowerCase().includes(search.toLowerCase()) ||
      r.kwh.toString().includes(search)
  );

  return (
    <div className="renewable-form">
      {/* Header Section */}
      <div className="form-header">
        <h2>Renewable Energy</h2>
        <p className="header-description">
          Report renewable electricity generation and certificates
        </p>
      </div>

      {/* Search Bar */}
      <div className="search-wrapper">
        <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19 19L15 15" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <input
          type="text"
          placeholder="Search by type or kWh..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Info Card */}
      <div className="info-card">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 14V10M10 6H10.01" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <p>Report any renewable electricity generated on-site (solar, wind, hydro), and optionally record renewable certificates purchased.</p>
      </div>

      {/* On-site Generation Section */}
      <div className="section-card">
        <div className="section-header">
          <h3>On-site Renewable Generation</h3>
          <span className="section-badge">Generation</span>
        </div>

        <div className="input-grid">
          <div className="input-group">
            <label className="input-label">Installation Type</label>
            <div className="select-wrapper">
              <select
                value={renewableType}
                onChange={(e) => setRenewableType(e.target.value)}
                className="renewable-select"
              >
                {renewableTypes.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <svg className="select-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6L8 10L12 6" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Production</label>
            <div className="input-wrapper">
              <input
                type="number"
                min="0"
                value={renewableKwh}
                onChange={(e) => setRenewableKwh(e.target.value)}
                placeholder="e.g. 2000"
                className="text-input"
              />
              <span className="input-suffix">kWh</span>
            </div>
          </div>
        </div>

        <div className="add-button-wrapper">
          <PrimaryButton onClick={handleAddRenewable} className="add-button">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 4V16M4 10H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Add Renewable Entry
          </PrimaryButton>
        </div>
      </div>

      {/* Table Section */}
      <div className="table-section">
        <div className="table-header">
          <h3>Renewable Generation Entries</h3>
          <span className="entry-count">{filteredEntries.length} entries</span>
        </div>

        {filteredEntries.length === 0 ? (
          <EmptyState message="No renewable generation entries added yet." />
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Installation Type</th>
                  <th>Production</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEntries.map((r) => (
                  <tr key={r.id}>
                    <td>
                      <div className="type-cell">
                        <span className="type-badge">{r.type}</span>
                      </div>
                    </td>
                    <td>
                      <span className="production-value">{r.kwh.toLocaleString()}</span>
                      <span className="production-unit"> kWh</span>
                    </td>
                    <td>
                      <SecondaryButton 
                        onClick={() => deleteRenewable(r.id)}
                        className="remove-button"
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 4H14M12 4V13C12 14 11 15 10 15H6C5 15 4 14 4 13V4M5.5 2.5V2C5.5 1 6.5 0 7.5 0H8.5C9.5 0 10.5 1 10.5 2V2.5" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M6.5 7V11M9.5 7V11" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Remove
                      </SecondaryButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Renewable Certificates Section */}
      <div className="section-card certificates-section">
        <div className="section-header">
          <h3>Renewable Certificates</h3>
          <span className="section-badge optional">Optional</span>
        </div>

        <div className="certificates-content">
          <div className="input-group">
            <label className="input-label">Renewable Credits Purchased</label>
            <div className="input-wrapper">
              <input
                type="number"
                min="0"
                value={recCredits}
                onChange={(e) => setRecCredits(e.target.value)}
                placeholder="e.g. 1500"
                className="text-input"
              />
              <span className="input-suffix">kWh</span>
            </div>
          </div>

          <div className="certificates-note">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 10V8M8 6H8.01M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p>Include RECs or Guarantees of Origin purchased to reduce market-based Scope 2 emissions.</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .renewable-form {
          width: 100%;
        }

        /* Form Header */
        .form-header {
          margin-bottom: 24px;
        }

        .form-header h2 {
          margin: 0 0 8px 0;
          font-size: 20px;
          font-weight: 700;
          color: #1B5E20;
        }

        .header-description {
          margin: 0;
          font-size: 14px;
          color: #6B7280;
        }

        /* Search Bar */
        .search-wrapper {
          position: relative;
          margin-bottom: 24px;
        }

        .search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
        }

        .search-input {
          width: 100%;
          padding: 12px 16px 12px 44px;
          font-size: 14px;
          border: 1px solid #E5E7EB;
          border-radius: 30px;
          background: white;
          transition: all 0.2s ease;
          outline: none;
        }

        .search-input:focus {
          border-color: #2E7D32;
          box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.1);
        }

        .search-input::placeholder {
          color: #9CA3AF;
        }

        /* Info Card */
        .info-card {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background: #f0f9f0;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 24px;
          border: 1px solid rgba(46, 125, 50, 0.2);
        }

        .info-card svg {
          flex-shrink: 0;
        }

        .info-card p {
          margin: 0;
          font-size: 14px;
          color: #374151;
          line-height: 1.5;
        }

        /* Section Cards */
        .section-card {
          background: #F9FAFB;
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 24px;
          border: 1px solid rgba(46, 125, 50, 0.1);
        }

        .certificates-section {
          margin-top: 32px;
          background: white;
          border: 1px solid rgba(46, 125, 50, 0.2);
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .section-header h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 700;
          color: #1B5E20;
        }

        .section-badge {
          font-size: 12px;
          font-weight: 600;
          padding: 4px 10px;
          background: #2E7D32;
          color: white;
          border-radius: 30px;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .section-badge.optional {
          background: #9CA3AF;
        }

        /* Input Grid */
        .input-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-bottom: 20px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .input-label {
          font-size: 13px;
          font-weight: 600;
          color: #374151;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        /* Select Styling */
        .select-wrapper {
          position: relative;
          width: 100%;
        }

        .renewable-select {
          width: 100%;
          padding: 12px 16px;
          font-size: 14px;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          background: white;
          cursor: pointer;
          outline: none;
          transition: all 0.2s ease;
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          padding-right: 40px;
        }

        .renewable-select:hover {
          border-color: #2E7D32;
        }

        .renewable-select:focus {
          border-color: #2E7D32;
          box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.1);
        }

        .select-arrow {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
        }

        /* Input Styling */
        .input-wrapper {
          position: relative;
          width: 100%;
        }

        .text-input {
          width: 100%;
          padding: 12px 16px;
          font-size: 14px;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          background: white;
          transition: all 0.2s ease;
          outline: none;
        }

        .text-input:focus {
          border-color: #2E7D32;
          box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.1);
        }

        .text-input::placeholder {
          color: #9CA3AF;
        }

        .input-suffix {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #6B7280;
          font-size: 14px;
          font-weight: 500;
        }

        /* Add Button */
        .add-button-wrapper {
          display: flex;
          justify-content: flex-end;
          border-top: 1px solid #E5E7EB;
          padding-top: 20px;
        }

        .add-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          font-size: 14px;
          font-weight: 600;
        }

        /* Table Section */
        .table-section {
          background: white;
          border-radius: 16px;
          border: 1px solid rgba(46, 125, 50, 0.1);
          overflow: hidden;
          margin-bottom: 24px;
        }

        .table-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          background: #F9FAFB;
          border-bottom: 1px solid rgba(46, 125, 50, 0.1);
        }

        .table-header h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 700;
          color: #1B5E20;
        }

        .entry-count {
          font-size: 13px;
          color: #6B7280;
          background: white;
          padding: 4px 12px;
          border-radius: 30px;
          border: 1px solid rgba(46, 125, 50, 0.1);
        }

        .table-wrapper {
          overflow-x: auto;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }

        .data-table th {
          text-align: left;
          padding: 16px 24px;
          background: white;
          color: #374151;
          font-weight: 600;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          border-bottom: 2px solid rgba(46, 125, 50, 0.1);
        }

        .data-table td {
          padding: 16px 24px;
          color: #1F2937;
          border-bottom: 1px solid #F3F4F6;
        }

        .data-table tr:last-child td {
          border-bottom: none;
        }

        .data-table tr:hover td {
          background: #F9FAFB;
        }

        .type-cell {
          display: flex;
          align-items: center;
        }

        .type-badge {
          background: #E3F2E3;
          color: #1B5E20;
          padding: 4px 12px;
          border-radius: 30px;
          font-size: 13px;
          font-weight: 500;
        }

        .production-value {
          font-weight: 600;
          color: #1B5E20;
        }

        .production-unit {
          color: #6B7280;
          font-size: 13px;
        }

        .remove-button {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          font-size: 13px;
          color: #DC2626;
          background: #FEF2F2;
          border: 1px solid #FECACA;
          border-radius: 30px;
          transition: all 0.2s ease;
        }

        .remove-button:hover {
          background: #FEE2E2;
          border-color: #F87171;
        }

        /* Certificates Section */
        .certificates-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .certificates-note {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          background: #F3F4F6;
          border-radius: 12px;
          padding: 12px 16px;
        }

        .certificates-note p {
          margin: 0;
          font-size: 13px;
          color: #6B7280;
          line-height: 1.5;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .input-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .add-button-wrapper {
            justify-content: center;
          }

          .add-button {
            width: 100%;
            justify-content: center;
          }

          .table-header {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
          }

          .data-table th,
          .data-table td {
            padding: 12px 16px;
          }

          .section-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
        }

        @media (max-width: 480px) {
          .section-card {
            padding: 16px;
          }

          .info-card {
            padding: 12px;
          }

          .data-table {
            font-size: 13px;
          }

          .data-table th,
          .data-table td {
            padding: 10px 12px;
          }

          .remove-button {
            padding: 4px 8px;
            font-size: 12px;
          }

          .type-badge {
            padding: 2px 8px;
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
}