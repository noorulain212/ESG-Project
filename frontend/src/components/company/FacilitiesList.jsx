// src/components/company/FacilitiesList.jsx
import { useState } from "react";
import { FiEdit2, FiTrash2, FiSave, FiX, FiPlus, FiMapPin } from "react-icons/fi";
import { BiBuilding } from "react-icons/bi";
import Card from "../ui/Card";
import InputField from "../ui/InputField";
import PrimaryButton from "../ui/PrimaryButton";
import SecondaryButton from "../ui/SecondaryButton";
import EmptyState from "../ui/EmptyState";

export default function FacilitiesList({ locations, setLocations }) {
  // Form State (Add Facility)
  const [facilityName, setFacilityName] = useState("");
  const [facilityCity, setFacilityCity] = useState("");
  const [facilityCountry, setFacilityCountry] = useState("");

  // Edit State
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editCity, setEditCity] = useState("");
  const [editCountry, setEditCountry] = useState("");

  function handleAddFacility() {
    if (!facilityName || !facilityCity || !facilityCountry) {
      alert("Please fill all facility fields.");
      return;
    }

    const newFacility = {
      id: Date.now(),
      name: facilityName,
      city: facilityCity,
      country: facilityCountry,
    };

    setLocations([...locations, newFacility]);
    setFacilityName("");
    setFacilityCity("");
    setFacilityCountry("");
  }

  function startEdit(facility) {
    setEditId(facility.id);
    setEditName(facility.name);
    setEditCity(facility.city);
    setEditCountry(facility.country);
  }

  function cancelEdit() {
    setEditId(null);
    setEditName("");
    setEditCity("");
    setEditCountry("");
  }

  function handleSaveEdit() {
    const updated = locations.map((f) =>
      f.id === editId
        ? { ...f, name: editName, city: editCity, country: editCountry }
        : f
    );
    setLocations(updated);
    cancelEdit();
  }

  function handleDelete(id) {
    if (!window.confirm("Delete this facility?")) return;
    const filtered = locations.filter((f) => f.id !== id);
    setLocations(filtered);
  }

  return (
    <div className="facilities-step">
      <div className="step-header">
        <span className="step-icon">🏛️</span>
        <h3>Facilities & Locations</h3>
      </div>

      <p className="step-description">
        Add all physical locations, offices, and facilities owned or operated by your company.
      </p>

      {/* Add Facility Card */}
      <Card className="add-facility-card">
        <div className="card-header">
          <BiBuilding className="header-icon" />
          <h4>Add New Facility</h4>
        </div>

        <div className="add-form-grid">
          <InputField
            label="Facility Name"
            value={facilityName}
            placeholder="e.g. Headquarters"
            onChange={(e) => setFacilityName(e.target.value)}
          />
          <InputField
            label="City"
            value={facilityCity}
            placeholder="e.g. Dubai"
            onChange={(e) => setFacilityCity(e.target.value)}
          />
          <InputField
            label="Country"
            value={facilityCountry}
            placeholder="e.g. UAE"
            onChange={(e) => setFacilityCountry(e.target.value)}
          />
        </div>

        <PrimaryButton onClick={handleAddFacility} className="add-btn">
          <FiPlus /> Add Facility
        </PrimaryButton>
      </Card>

      {/* Facilities List */}
      <Card className="facilities-list-card">
        <div className="list-header">
          <h4>Your Facilities</h4>
          <span className="facility-count">{locations.length} {locations.length === 1 ? 'facility' : 'facilities'}</span>
        </div>

        {locations.length === 0 ? (
          <EmptyState 
            message="No facilities added yet" 
            suggestion="Add your first facility using the form above"
          />
        ) : (
          <div className="facilities-grid">
            {locations.map((facility) => (
              <div key={facility.id} className="facility-card">
                {editId === facility.id ? (
                  // Edit Mode
                  <div className="edit-mode">
                    <InputField
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      placeholder="Name"
                      size="small"
                    />
                    <InputField
                      value={editCity}
                      onChange={(e) => setEditCity(e.target.value)}
                      placeholder="City"
                      size="small"
                    />
                    <InputField
                      value={editCountry}
                      onChange={(e) => setEditCountry(e.target.value)}
                      placeholder="Country"
                      size="small"
                    />
                    <div className="edit-actions">
                      <PrimaryButton onClick={handleSaveEdit} className="save-btn">
                        <FiSave /> Save
                      </PrimaryButton>
                      <SecondaryButton onClick={cancelEdit} className="cancel-btn">
                        <FiX /> Cancel
                      </SecondaryButton>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <>
                    <div className="facility-icon">
                      <BiBuilding />
                    </div>
                    <div className="facility-details">
                      <h5>{facility.name}</h5>
                      <p>
                        <FiMapPin /> {facility.city}, {facility.country}
                      </p>
                    </div>
                    <div className="facility-actions">
                      <button onClick={() => startEdit(facility)} className="icon-btn edit">
                        <FiEdit2 />
                      </button>
                      <button onClick={() => handleDelete(facility.id)} className="icon-btn delete">
                        <FiTrash2 />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>

      <style jsx>{`
        .facilities-step {
          animation: fadeIn 0.5s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .step-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .step-icon {
          font-size: 32px;
        }

        .step-header h3 {
          font-size: 22px;
          font-weight: 700;
          color: #14532D;
          margin: 0;
        }

        .step-description {
          color: #4B5563;
          margin-bottom: 32px;
          font-size: 15px;
          line-height: 1.6;
        }

        /* Add Facility Card */
        .add-facility-card {
          background: linear-gradient(135deg, #f0fdf4 0%, #e6f7e6 100%);
          border: 1px solid rgba(34, 197, 94, 0.2);
          margin-bottom: 24px;
          padding: 24px;
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        .header-icon {
          font-size: 24px;
          color: #22C55E;
        }

        .card-header h4 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: #14532D;
        }

        .add-form-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 20px;
        }

        .add-btn {
          width: 100%;
          justify-content: center;
          padding: 14px !important;
        }

        /* Facilities List */
        .facilities-list-card {
          padding: 24px;
          border: 1px solid rgba(34, 197, 94, 0.15);
        }

        .list-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .list-header h4 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: #14532D;
        }

        .facility-count {
          padding: 4px 12px;
          background: #F0FDF4;
          color: #15803D;
          border-radius: 30px;
          font-size: 13px;
          font-weight: 500;
        }

        .facilities-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
        }

        .facility-card {
          background: white;
          border: 1px solid rgba(34, 197, 94, 0.15);
          border-radius: 16px;
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: all 0.2s ease;
          position: relative;
        }

        .facility-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(34, 197, 94, 0.15);
          border-color: #22C55E;
        }

        .facility-icon {
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

        .facility-details {
          flex: 1;
        }

        .facility-details h5 {
          margin: 0 0 4px;
          font-size: 16px;
          font-weight: 600;
          color: #14532D;
        }

        .facility-details p {
          margin: 0;
          font-size: 13px;
          color: #6B7280;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .facility-actions {
          display: flex;
          gap: 6px;
        }

        .icon-btn {
          width: 32px;
          height: 32px;
          border: none;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          background: transparent;
        }

        .icon-btn.edit {
          color: #3B82F6;
        }

        .icon-btn.edit:hover {
          background: #DBEAFE;
        }

        .icon-btn.delete {
          color: #EF4444;
        }

        .icon-btn.delete:hover {
          background: #FEE2E2;
        }

        /* Edit Mode */
        .edit-mode {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .edit-actions {
          display: flex;
          gap: 8px;
          margin-top: 8px;
        }

        .save-btn, .cancel-btn {
          flex: 1;
          padding: 8px !important;
          font-size: 13px !important;
        }

        @media (max-width: 768px) {
          .add-form-grid {
            grid-template-columns: 1fr;
          }

          .facilities-grid {
            grid-template-columns: 1fr;
          }

          .facility-card {
            flex-wrap: wrap;
          }

          .facility-actions {
            width: 100%;
            justify-content: flex-end;
          }
        }
      `}</style>
    </div>
  );
}