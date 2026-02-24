import React, { useState } from "react";
import Card from "../ui/Card";
import PrimaryButton from "../ui/PrimaryButton";
import SecondaryButton from "../ui/SecondaryButton";
import EmptyState from "../ui/EmptyState";
import { useEmissionStore } from "../../store/emissionStore";

export default function HeatingForm() {
  const fuelTypes = ["Natural Gas", "Heating Oil", "Diesel", "Biomass", "Other"];

  const [fuel, setFuel] = useState(fuelTypes[0]);
  const [amount, setAmount] = useState("");
  const [search, setSearch] = useState("");

  const heatingEntries = useEmissionStore((s) => s.scope2Heating);
  const addHeating = useEmissionStore((s) => s.addScope2Heating);
  const deleteHeating = useEmissionStore((s) => s.deleteScope2Heating);

  const handleAdd = () => {
    if (!amount || Number(amount) <= 0) return;

    addHeating({
      id: Date.now(),
      fuel,
      amount: Number(amount),
    });

    setAmount("");
  };

  // Filter entries for search
  const filteredEntries = heatingEntries.filter(
    (h) =>
      h.fuel.toLowerCase().includes(search.toLowerCase()) ||
      h.amount.toString().includes(search)
  );

  return (
    <div className="heating-form">
      {/* Header Section */}
      <div className="form-header">
        <h2>Heating & Cooling</h2>
        <p className="header-description">
          Record your purchased heating and cooling consumption
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
          placeholder="Search by fuel type or consumption..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Input Form Section */}
      <div className="input-section">
        <div className="input-grid">
          <div className="input-group">
            <label className="input-label">Fuel Type</label>
            <div className="select-wrapper">
              <select
                value={fuel}
                onChange={(e) => setFuel(e.target.value)}
                className="fuel-select"
              >
                {fuelTypes.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
              <svg className="select-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6L8 10L12 6" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Consumption</label>
            <div className="input-wrapper">
              <input
                type="number"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 2000"
                className="text-input"
              />
              <span className="input-suffix">MJ</span>
            </div>
          </div>
        </div>

        {/* Add Button */}
        <div className="add-button-wrapper">
          <PrimaryButton onClick={handleAdd} className="add-button">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 4V16M4 10H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Add Heating Entry
          </PrimaryButton>
        </div>
      </div>

      {/* Table Section */}
      <div className="table-section">
        <div className="table-header">
          <h3>Heating Entries</h3>
          <span className="entry-count">{filteredEntries.length} entries</span>
        </div>

        {filteredEntries.length === 0 ? (
          <EmptyState message="No heating entries added yet." />
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Fuel Type</th>
                  <th>Consumption</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEntries.map((h) => (
                  <tr key={h.id}>
                    <td>
                      <div className="fuel-cell">
                        <span className="fuel-badge">{h.fuel}</span>
                      </div>
                    </td>
                    <td>
                      <span className="consumption-value">{h.amount.toLocaleString()}</span>
                      <span className="consumption-unit"> MJ</span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <SecondaryButton 
                          onClick={() => alert("Edit coming soon")}
                          className="edit-button"
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.5 2.5L13.5 4.5M2 14L4 13.5L12.5 5L11 3.5L2.5 12L2 14Z" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Edit
                        </SecondaryButton>
                        <PrimaryButton
                          onClick={() => deleteHeating(h.id)}
                          className="delete-button"
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 4H14M12 4V13C12 14 11 15 10 15H6C5 15 4 14 4 13V4M5.5 2.5V2C5.5 1 6.5 0 7.5 0H8.5C9.5 0 10.5 1 10.5 2V2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M6.5 7V11M9.5 7V11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Delete
                        </PrimaryButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style jsx>{`
        .heating-form {
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

        /* Input Section */
        .input-section {
          background: #F9FAFB;
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 32px;
          border: 1px solid rgba(46, 125, 50, 0.1);
        }

        .input-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-bottom: 24px;
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

        .fuel-select {
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

        .fuel-select:hover {
          border-color: #2E7D32;
        }

        .fuel-select:focus {
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
          padding-top: 24px;
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

        .fuel-cell {
          display: flex;
          align-items: center;
        }

        .fuel-badge {
          background: rgba(46, 125, 50, 0.1);
          color: #1B5E20;
          padding: 4px 12px;
          border-radius: 30px;
          font-size: 13px;
          font-weight: 500;
        }

        .consumption-value {
          font-weight: 600;
          color: #1B5E20;
        }

        .consumption-unit {
          color: #6B7280;
          font-size: 13px;
        }

        .action-buttons {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .edit-button {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          font-size: 13px;
          color: #4B5563;
          background: #F3F4F6;
          border: 1px solid #E5E7EB;
          border-radius: 30px;
          transition: all 0.2s ease;
        }

        .edit-button:hover {
          background: #E5E7EB;
          border-color: #9CA3AF;
        }

        .delete-button {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          font-size: 13px;
          background: #DC2626;
          border-radius: 30px;
          transition: all 0.2s ease;
        }

        .delete-button:hover {
          background: #B91C1C;
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

          .action-buttons {
            flex-direction: column;
          }
        }

        @media (max-width: 480px) {
          .input-section {
            padding: 16px;
          }

          .data-table {
            font-size: 13px;
          }

          .data-table th,
          .data-table td {
            padding: 10px 12px;
          }

          .edit-button,
          .delete-button {
            padding: 4px 8px;
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
}