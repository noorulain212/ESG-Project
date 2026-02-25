import { useState } from "react";
import { emissionFactorsList } from "../../utils/emissionFactors";
import Card from "../../components/ui/Card";
import PrimaryButton from "../../components/ui/PrimaryButton";
import InputField from "../../components/ui/InputField";
import SelectDropdown from "../../components/ui/SelectDropdown";
import { FiEdit2, FiTrash2, FiPlus, FiSave, FiX } from "react-icons/fi";

export default function EmissionFactorsPage() {
  const [factors, setFactors] = useState(emissionFactorsList);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    category: "",
    region: "",
    value: "",
    unit: ""
  });

  const categories = ["Electricity", "Diesel", "Petrol", "Natural Gas", "Coal", "Biomass"];
  const regions = ["UK", "USA", "EU", "Global", "Asia", "Middle East"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setFactors(factors.map(f => 
        f.id === editingId ? { ...formData, id: editingId, value: parseFloat(formData.value) } : f
      ));
    } else {
      setFactors([...factors, { 
        ...formData, 
        id: Date.now(), 
        value: parseFloat(formData.value) 
      }]);
    }
    resetForm();
  };

  const handleEdit = (factor) => {
    setEditingId(factor.id);
    setFormData({
      category: factor.category,
      region: factor.region,
      value: factor.value.toString(),
      unit: factor.unit
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this factor?")) {
      setFactors(factors.filter(f => f.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({ category: "", region: "", value: "", unit: "" });
    setEditingId(null);
  };

  return (
    <div style={{ padding: "32px", maxWidth: "1280px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1F2937", margin: "0 0 8px 0" }}>
          Emission Factors
        </h1>
        <p style={{ fontSize: "16px", color: "#6B7280", margin: 0 }}>
          Manage emission factors by category and region
        </p>
      </div>

      {/* Form Card */}
      <div style={{ 
        background: "white", 
        borderRadius: "16px", 
        border: "1px solid #E5E7EB",
        marginBottom: "32px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
      }}>
        <div style={{ padding: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <div style={{ width: "4px", height: "24px", background: "#059669", borderRadius: "4px" }}></div>
            <h2 style={{ fontSize: "18px", fontWeight: "600", color: "#1F2937", margin: 0 }}>
              {editingId ? "Edit Factor" : "Add New Factor"}
            </h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(4, 1fr)", 
              gap: "16px",
              marginBottom: "24px"
            }}>
              <div>
                <SelectDropdown
                  label="Category"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  options={categories.map(c => ({ label: c, value: c }))}
                  required
                />
              </div>
              <div>
                <SelectDropdown
                  label="Region"
                  value={formData.region}
                  onChange={(e) => setFormData({...formData, region: e.target.value})}
                  options={regions.map(r => ({ label: r, value: r }))}
                  required
                />
              </div>
              <div>
                <InputField
                  label="Value"
                  type="number"
                  step="0.001"
                  value={formData.value}
                  onChange={(e) => setFormData({...formData, value: e.target.value})}
                  placeholder="0.233"
                  required
                />
              </div>
              <div>
                <InputField
                  label="Unit"
                  value={formData.unit}
                  onChange={(e) => setFormData({...formData, unit: e.target.value})}
                  placeholder="kgCO₂e/kWh"
                  required
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <PrimaryButton type="submit" style={{ padding: "10px 20px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  {editingId ? <FiSave size={18} /> : <FiPlus size={18} />}
                  {editingId ? "Update Factor" : "Add Factor"}
                </span>
              </PrimaryButton>
              {editingId && (
                <button 
                  onClick={resetForm}
                  style={{
                    padding: "10px 20px",
                    background: "white",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                    color: "#4B5563",
                    fontSize: "14px",
                    fontWeight: "500",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}
                >
                  <FiX size={18} />
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Table Card */}
      <div style={{ 
        background: "white", 
        borderRadius: "16px", 
        border: "1px solid #E5E7EB",
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
      }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
              <tr>
                <th style={{ textAlign: "left", padding: "16px 20px", fontSize: "13px", fontWeight: "600", color: "#4B5563" }}>Category</th>
                <th style={{ textAlign: "left", padding: "16px 20px", fontSize: "13px", fontWeight: "600", color: "#4B5563" }}>Region</th>
                <th style={{ textAlign: "left", padding: "16px 20px", fontSize: "13px", fontWeight: "600", color: "#4B5563" }}>Value</th>
                <th style={{ textAlign: "left", padding: "16px 20px", fontSize: "13px", fontWeight: "600", color: "#4B5563" }}>Unit</th>
                <th style={{ textAlign: "left", padding: "16px 20px", fontSize: "13px", fontWeight: "600", color: "#4B5563" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {factors.map((f, index) => (
                <tr key={f.id} style={{ 
                  borderBottom: index < factors.length - 1 ? "1px solid #F3F4F6" : "none",
                  transition: "background 0.2s"
                }}>
                  <td style={{ padding: "16px 20px" }}>
                    <span style={{
                      display: "inline-block",
                      padding: "4px 12px",
                      background: "#F0FDF4",
                      color: "#059669",
                      borderRadius: "20px",
                      fontSize: "13px",
                      fontWeight: "500"
                    }}>
                      {f.category}
                    </span>
                  </td>
                  <td style={{ padding: "16px 20px", color: "#1F2937", fontSize: "14px" }}>{f.region}</td>
                  <td style={{ padding: "16px 20px", color: "#1F2937", fontSize: "14px", fontWeight: "500" }}>{f.value}</td>
                  <td style={{ padding: "16px 20px", color: "#6B7280", fontSize: "14px" }}>{f.unit}</td>
                  <td style={{ padding: "16px 20px" }}>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button 
                        onClick={() => handleEdit(f)}
                        style={{
                          padding: "6px",
                          background: "none",
                          border: "none",
                          borderRadius: "6px",
                          color: "#3B82F6",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <FiEdit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(f.id)}
                        style={{
                          padding: "6px",
                          background: "none",
                          border: "none",
                          borderRadius: "6px",
                          color: "#EF4444",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Footer */}
        <div style={{ 
          background: "#F9FAFB", 
          padding: "12px 20px", 
          borderTop: "1px solid #E5E7EB",
          fontSize: "13px",
          color: "#6B7280"
        }}>
          Total {factors.length} emission factors
        </div>
      </div>
    </div>
  );
}