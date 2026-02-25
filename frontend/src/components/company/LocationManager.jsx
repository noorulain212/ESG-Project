// src/components/company/LocationManager.jsx
import React, { useState, useEffect } from "react";
import CountrySelector from "./CountrySelector";
import SelectDropdown from "../ui/SelectDropdown";
import PrimaryButton from "../ui/PrimaryButton";
import { FiMapPin, FiTrash2 } from "react-icons/fi";

export default function LocationManager({ data, updateField }) {
  const [selectedCity, setSelectedCity] = useState("");

  // Cities by country
  const citiesByCountry = {
    uae: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Fujairah", "Umm Al Quwain"],
    qatar: ["Doha", "Al Wakrah", "Al Khor", "Al Rayyan"],
    saudi: ["Riyadh", "Jeddah", "Dammam", "Khobar", "Medina", "Mecca"],
    // Add more countries as needed
  };

  const availableCities = citiesByCountry[data.country] || [];

  // Reset city selection when country changes
  useEffect(() => {
    setSelectedCity("");
  }, [data.country]);

  const addCity = () => {
    if (!selectedCity) return;

    // Check if city already exists
    const cityExists = data.locations.some(loc => loc.city === selectedCity);
    if (cityExists) return;

    const newLocation = {
      id: Date.now(),
      country: data.country,
      city: selectedCity,
    };

    updateField("locations", [...data.locations, newLocation]);
    setSelectedCity("");
  };

  const removeCity = (id) => {
    const updated = data.locations.filter(loc => loc.id !== id);
    updateField("locations", updated);
  };

  // If no region selected
  if (!data.region) {
    return (
      <div className="location-manager">
        <h3>Step 6: Add Facility Locations</h3>
        <div className="empty-state">
          <FiMapPin size={32} className="empty-icon" />
          <p>Please select a region first</p>
        </div>
        <style jsx>{`
          .location-manager {
            padding: 20px;
          }
          .empty-state {
            text-align: center;
            padding: 40px;
            background: #F9FAFB;
            border-radius: 16px;
            color: #6B7280;
          }
          .empty-icon {
            color: #9CA3AF;
            margin-bottom: 12px;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="location-manager">
      <h3>Step 6: Add Facility Locations</h3>
      
      {/* Show CountrySelector if region is selected but no country */}
      {data.region && !data.country && (
        <>
          <p className="step-description">
            First, select the country where your facilities are located.
          </p>
          <CountrySelector data={data} updateField={updateField} />
        </>
      )}

      {/* Show city selection only after country is selected */}
      {data.country && (
        <>
          <p className="step-description">
            Add cities where your facilities are located in {data.country === 'uae' ? 'UAE' : 
              data.country === 'qatar' ? 'Qatar' : 
              data.country === 'saudi' ? 'Saudi Arabia' : 'the selected country'}.
          </p>

          <div className="add-section">
            <div className="selector-wrapper">
              <SelectDropdown
                label="Select City"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                options={availableCities.map((city) => ({
                  label: city,
                  value: city,
                }))}
                placeholder="Choose a city"
              />
            </div>

            <PrimaryButton onClick={addCity} className="add-btn">
              Add City
            </PrimaryButton>
          </div>

          {/* Selected Cities List */}
          <div className="cities-list">
            <h4>Added Locations</h4>
            {data.locations.length === 0 ? (
              <p className="empty-list">No cities added yet.</p>
            ) : (
              <div className="cities-grid">
                {data.locations.map((loc) => (
                  <div key={loc.id} className="city-card">
                    <FiMapPin className="city-icon" />
                    <div className="city-info">
                      <span className="city-name">{loc.city}</span>
                    </div>
                    <button
                      onClick={() => removeCity(loc.id)}
                      className="remove-btn"
                      title="Remove city"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}