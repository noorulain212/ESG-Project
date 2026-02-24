import React, { useState, useEffect } from "react";
import SelectDropdown from "../ui/SelectDropdown";
import PrimaryButton from "../ui/PrimaryButton";
import ErrorDisplay from "../ui/ErrorDisplay";

export default function LocationManager({ data, updateField }) {
  const [selectedLocation, setSelectedLocation] = useState("");

  // ✅ Region → Locations mapping (frontend-only for now)
  const regionLocations = {
    uae: [
      "Dubai",
      "Abu Dhabi",
      "Fujairah",
      "Ras al Khaimah",
      "Ajman",
      "Sharjah",
    ],

    // UK + Europe placeholders (we’ll handle later)
    uk: [],
    europe: [],
  };

  // Get available locations based on selected region
  const availableLocations = regionLocations[data.region] || [];

  // Reset dropdown if region changes
  useEffect(() => {
    setSelectedLocation("");
  }, [data.region]);

  // ✅ Add selected location
  function addLocation() {
    if (!selectedLocation) return;

    // Prevent duplicates
    if (data.locations.includes(selectedLocation)) return;

    updateField("locations", [...data.locations, selectedLocation]);
    setSelectedLocation("");
  }

  // ✅ Remove location
  function removeLocation(location) {
    const updated = data.locations.filter((loc) => loc !== location);
    updateField("locations", updated);
  }

  return (
    <div>
      <h3>Step 6: Manage Locations</h3>

      {/* If region not selected */}
      {!data.region && (
        <ErrorDisplay message="Please select a region first before choosing locations." />
      )}

      {/* Show dropdown only if region is selected */}
      {data.region && (
        <>
          {/* Dropdown */}
          <SelectDropdown
            label="Select Location"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            options={availableLocations.map((loc) => ({
              label: loc,
              value: loc,
            }))}
          />

          {/* Add Button */}
          <PrimaryButton onClick={addLocation}>
            Add Location
          </PrimaryButton>

          {/* Selected Locations List */}
          <div style={{ marginTop: "20px" }}>
            <h4>Added Locations:</h4>

            {data.locations.length === 0 ? (
              <p style={{ color: "#6B7280" }}>No locations added yet.</p>
            ) : (
              <ul>
                {data.locations.map((loc, index) => (
                  <li key={index} style={{ marginBottom: "8px" }}>
                    {loc}{" "}
                    <button
                      onClick={() => removeLocation(loc)}
                      style={{
                        marginLeft: "10px",
                        color: "red",
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                      }}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}
