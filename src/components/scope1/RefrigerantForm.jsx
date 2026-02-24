import React, { useState, useMemo } from "react";
import Card from "../ui/Card";
import PrimaryButton from "../ui/PrimaryButton";
import SecondaryButton from "../ui/SecondaryButton";
import EmptyState from "../ui/EmptyState";
import SelectDropdown from "../ui/SelectDropdown";
import { useEmissionStore } from "../../store/emissionStore";

export default function RefrigerantForm() {
  const refrigerants = useEmissionStore((s) => s.scope1Refrigerants);
  const addRefrigerant = useEmissionStore((s) => s.addScope1Refrigerant);
  const deleteRefrigerant = useEmissionStore((s) => s.deleteScope1Refrigerant);

  const [refrigerantType, setRefrigerantType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const refrigerantOptions = [
    { label: "R-134a", value: "R-134a", gwp: 1430 },
    { label: "R-410A", value: "R-410A", gwp: 2088 },
    { label: "R-22", value: "R-22", gwp: 1810 },
    { label: "R-404A", value: "R-404A", gwp: 3922 },
    { label: "R-407C", value: "R-407C", gwp: 1774 },
    { label: "R-32", value: "R-32", gwp: 675 },
    { label: "R-123", value: "R-123", gwp: 77 },
    { label: "R-245fa", value: "R-245fa", gwp: 1030 },
    { label: "R-717 (Ammonia)", value: "Ammonia", gwp: 0 },
    { label: "R-744 (CO2)", value: "CO2", gwp: 1 },
  ];

  const handleAdd = () => {
    if (!refrigerantType || !quantity) {
      alert("Enter all fields");
      return;
    }
    addRefrigerant({
      id: Date.now(),
      refrigerantType,
      gwp: Number(quantity),
    });
    setRefrigerantType("");
    setQuantity("");
  };

  const handleDelete = (id) => deleteRefrigerant(id);

  // Filtered display
  const displayedEntries = useMemo(() => {
    if (!searchTerm) return refrigerants;
    return refrigerants.filter(
      r =>
        r.refrigerantType.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [refrigerants, searchTerm]);

  const totalGWP = refrigerants.reduce((sum, r) => sum + r.gwp, 0);
  const totalCO2e = totalGWP * 0.001; // Convert kg to tonnes, adjust factor as needed

  // Get GWP factor for selected refrigerant
  const getSelectedGWP = () => {
    const selected = refrigerantOptions.find(opt => opt.value === refrigerantType);
    return selected ? selected.gwp : 0;
  };

  return (
    <div className="refrigerant-container">
      {/* Header with description */}
      <div className="section-description">
        <div className="description-icon">❄️</div>
        <div className="description-content">
          <h3>Refrigerant Management</h3>
          <p>
            Track <span className="highlight">refrigerant usage and leaks</span> from cooling equipment. 
            Refrigerants have high global warming potential (GWP) and must be reported accurately.
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
            placeholder="Search refrigerants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-badge">
          {refrigerants.length} entries
        </div>
      </div>

      {/* Add Refrigerant Form Card */}
      <Card className="add-refrigerant-card">
        <div className="card-header-compact">
          <h4>Add Refrigerant Entry</h4>
          <p>Select refrigerant type and enter quantity (kg)</p>
        </div>
        
        <div className="add-refrigerant-form">
          <div className="form-row">
            <div className="form-group refrigerant-select">
              <label className="form-label">Refrigerant Type</label>
              <select
                value={refrigerantType}
                onChange={(e) => setRefrigerantType(e.target.value)}
                className="refrigerant-select"
              >
                <option value="">Select refrigerant type</option>
                {refrigerantOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label} (GWP: {opt.gwp})
                  </option>
                ))}
              </select>
              {refrigerantType && (
                <div className="gwp-indicator">
                  <span className="gwp-label">GWP Factor:</span>
                  <span className="gwp-value">{getSelectedGWP()}</span>
                </div>
              )}
            </div>

            <div className="form-group quantity-input">
              <label className="form-label">Quantity (kg)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter quantity in kg"
                className="quantity-field"
              />
            </div>
          </div>

          {/* Preview calculation if both fields are filled */}
          {refrigerantType && quantity && Number(quantity) > 0 && (
            <div className="preview-calculation">
              <span className="preview-label">Estimated CO₂e:</span>
              <span className="preview-value">
                {(Number(quantity) * getSelectedGWP() / 1000).toFixed(3)} tCO₂e
              </span>
            </div>
          )}

          {/* Submit Button */}
          <div className="form-actions">
            <PrimaryButton onClick={handleAdd} className="submit-btn">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 4V16M4 10H16" stroke="white" strokeWidth="2"/>
              </svg>
              Add Refrigerant Entry
            </PrimaryButton>
          </div>
        </div>
      </Card>

      {/* Entries Table */}
      {displayedEntries.length === 0 ? (
        <EmptyState 
          message="No refrigerant entries added yet" 
          icon="❄️"
          className="empty-state-custom"
        />
      ) : (
        <Card className="table-card">
          <div className="table-wrapper">
            <table className="entries-table">
              <thead>
                <tr>
                  <th style={{ width: '25%' }}>Refrigerant Type</th>
                  <th style={{ width: '15%' }}>Quantity (kg)</th>
                  <th style={{ width: '15%' }}>GWP Factor</th>
                  <th style={{ width: '20%' }}>CO₂e (t)</th>
                  <th style={{ width: '25%' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedEntries.map(r => {
                  const gwpFactor = refrigerantOptions.find(opt => opt.value === r.refrigerantType)?.gwp || 1000;
                  const co2e = (r.gwp * gwpFactor / 1000).toFixed(3);
                  
                  return (
                    <tr key={r.id} className="entry-row">
                      <td>
                        <span className="refrigerant-badge">{r.refrigerantType}</span>
                      </td>
                      <td className="number-cell">{r.gwp.toLocaleString()}</td>
                      <td>
                        <span className="gwp-badge">{gwpFactor}</span>
                      </td>
                      <td>
                        <span className="co2e-indicator">{co2e}</span>
                      </td>
                      <td className="actions-cell">
                        <SecondaryButton 
                          onClick={() => alert("Edit coming soon")} 
                          className="edit-btn"
                        >
                          Edit
                        </SecondaryButton>
                        <button 
                          onClick={() => handleDelete(r.id)} 
                          className="delete-btn"
                          title="Delete"
                        >
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M3 3L15 15M15 3L3 15" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Emissions Summary Footer */}
      <Card className="summary-footer">
        <div className="summary-grid">
          <div className="summary-item">
            <span className="summary-label">Total Refrigerant</span>
            <span className="summary-value">{refrigerants.length} entries</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Total Quantity</span>
            <span className="summary-value">{totalGWP.toLocaleString()} kg</span>
          </div>
          <div className="summary-item highlight">
            <span className="summary-label">Total CO₂e</span>
            <span className="summary-value emission">
              {totalCO2e.toFixed(2)} tCO₂e
            </span>
          </div>
        </div>
        <div className="footer-note">
          <p>🌱 Based on IPCC AR5 GWP values for refrigerants</p>
          <p className="footnote">*CO₂e calculated using refrigerant-specific GWP factors</p>
        </div>
      </Card>

      <style jsx>{`
        .refrigerant-container {
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

        /* Add Refrigerant Card */
        .add-refrigerant-card {
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

        .add-refrigerant-form {
          padding: 24px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 20px;
          margin-bottom: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-label {
          font-size: 14px;
          font-weight: 600;
          color: #374151;
        }

        .refrigerant-select {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 14px;
          background: white;
          transition: all 0.2s ease;
          outline: none;
        }

        .refrigerant-select:focus {
          border-color: #2E7D32;
          box-shadow: 0 0 0 4px rgba(46, 125, 50, 0.15);
        }

        .gwp-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: #f0f9f0;
          border-radius: 10px;
          font-size: 13px;
        }

        .gwp-label {
          color: #4B5563;
        }

        .gwp-value {
          font-weight: 700;
          color: #2E7D32;
        }

        .quantity-field {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 14px;
          transition: all 0.2s ease;
          outline: none;
        }

        .quantity-field:focus {
          border-color: #2E7D32;
          box-shadow: 0 0 0 4px rgba(46, 125, 50, 0.15);
        }

        .preview-calculation {
          padding: 16px;
          background: #f0f9f0;
          border-radius: 12px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .preview-label {
          font-size: 14px;
          font-weight: 500;
          color: #374151;
        }

        .preview-value {
          font-size: 18px;
          font-weight: 700;
          color: #2E7D32;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
        }

        .submit-btn {
          min-width: 220px;
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

        .entries-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0 8px;
          padding: 8px;
          table-layout: fixed;
        }

        .entries-table th {
          text-align: left;
          padding: 16px 12px;
          background: #f8faf8;
          font-size: 13px;
          font-weight: 600;
          color: #4B5563;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          white-space: nowrap;
        }

        .entries-table td {
          padding: 16px 12px;
          background: white;
          border-bottom: 1px solid #f0f0f0;
          word-break: break-word;
        }

        .entry-row {
          transition: all 0.2s ease;
        }

        .entry-row:hover {
          background: #f8faf8;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .refrigerant-badge {
          display: inline-block;
          padding: 4px 10px;
          background: #e0f2fe;
          color: #0369a1;
          border-radius: 30px;
          font-size: 12px;
          font-weight: 500;
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .gwp-badge {
          display: inline-block;
          padding: 4px 8px;
          background: #f3f4f6;
          border-radius: 12px;
          font-size: 12px;
          color: #4B5563;
        }

        .co2e-indicator {
          font-weight: 600;
          color: #2E7D32;
          font-size: 14px;
        }

        .number-cell {
          font-family: 'Inter', monospace;
          font-weight: 500;
          font-size: 14px;
        }

        .actions-cell {
          display: flex;
          gap: 8px;
          align-items: center;
          flex-wrap: wrap;
        }

        .edit-btn {
          padding: 6px 12px !important;
          font-size: 12px !important;
          min-width: 60px;
        }

        .delete-btn {
          padding: 6px;
          background: white;
          border: 1px solid #fee2e2;
          border-radius: 8px;
          color: #ef4444;
          cursor: pointer;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
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
          margin: 4px 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .footnote {
          font-size: 11px;
          color: #9ca3af;
          margin-top: 4px;
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
          .refrigerant-container {
            padding: 12px;
          }

          .section-description {
            flex-direction: column;
            align-items: flex-start;
          }

          .form-row {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .entries-table {
            table-layout: auto;
          }
          
          .entries-table th {
            white-space: normal;
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

          .submit-btn {
            width: 100%;
          }

          .preview-calculation {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
        }
      `}</style>
    </div>
  );
}