import { useState } from "react";
import Tabs from "../ui/Tabs";
import VehicleTable from "./VehicleTable";
import StationaryForm from "./StationaryForm";
import RefrigerantForm from "./RefrigerantForm";
import FugitiveForm from "./FugitiveForm";
import Scope1Summary from "./Scope1Summary";

export default function Scope1Container() {
  const [activeTab, setActiveTab] = useState("mobile"); // Set to first tab ID by default
  const [calculationMethod, setCalculationMethod] = useState("UK Government Factors");

  const scope1Tabs = [
    { id: "mobile", label: "Mobile Combustion", icon: "🚗" },
    { id: "stationary", label: "Stationary Combustion", icon: "🏭" },
    { id: "refrigerants", label: "Refrigerants", icon: "❄️" },
    { id: "fugitive", label: "Fugitive Emissions", icon: "💨" },
  ];

  return (
    <div className="scope1-container">
      {/* Header - Enhanced Design */}
      <div className="calculator-header">
        <div className="header-content">
          <h1>Scope 1 Emissions</h1>
          <p>Direct emissions from owned or controlled sources</p>
          <div className="model-status">
            <span className="status-dot"></span>
            Real-time calculation with UK Government Factors
          </div>
        </div>
      </div>

      {/* Method Selection Bar */}
      <div className="method-bar">
        <div className="method-selector">
          <label htmlFor="calculation-method">Calculation Method:</label>
          <select 
            id="calculation-method"
            value={calculationMethod}
            onChange={(e) => setCalculationMethod(e.target.value)}
            className="method-select"
          >
            <option>UK Government Factors</option>
            <option>IPCC Default Factors</option>
            <option>EPA Factors</option>
            <option>AI Model (Beta)</option>
          </select>
        </div>
      </div>

      {/* Professional Tabs */}
      <div className="tabs-container">
        <div className="tabs-header">
          {scope1Tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
              {activeTab === tab.id && <span className="tab-indicator"></span>}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content with Animation */}
      <div className="tab-content-wrapper">
        <div className={`tab-pane ${activeTab === 'mobile' ? 'active' : ''}`}>
          <VehicleTable />
        </div>
        <div className={`tab-pane ${activeTab === 'stationary' ? 'active' : ''}`}>
          <StationaryForm />
        </div>
        <div className={`tab-pane ${activeTab === 'refrigerants' ? 'active' : ''}`}>
          <RefrigerantForm />
        </div>
        <div className={`tab-pane ${activeTab === 'fugitive' ? 'active' : ''}`}>
          <FugitiveForm />
        </div>
      </div>

      {/* Summary */}
      <Scope1Summary />

      <style jsx>{`
        .scope1-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px;
          width: 100%;
          box-sizing: border-box;
        }

        /* Header Styles */
        .calculator-header {
          background: linear-gradient(135deg, #f0f9f0 0%, #e6f3e6 100%);
          border-radius: 24px;
          padding: 32px;
          margin-bottom: 24px;
          border: 1px solid rgba(46, 125, 50, 0.2);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .header-content h1 {
          margin: 0 0 12px 0;
          font-size: 28px;
          font-weight: 700;
          color: #1B5E20;
          letter-spacing: -0.5px;
        }

        .header-content p {
          margin: 0 0 16px 0;
          font-size: 16px;
          color: #4B5563;
          line-height: 1.5;
        }

        .model-status {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          background: white;
          border-radius: 30px;
          font-size: 13px;
          color: #2E7D32;
          border: 1px solid rgba(46, 125, 50, 0.2);
        }

        .status-dot {
          width: 8px;
          height: 8px;
          background: #2E7D32;
          border-radius: 50%;
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        /* Method Bar */
        .method-bar {
          background: white;
          border-radius: 16px;
          padding: 16px 24px;
          margin-bottom: 24px;
          border: 1px solid rgba(46, 125, 50, 0.1);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
        }

        .method-selector {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .method-selector label {
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          letter-spacing: 0.3px;
        }

        .method-select {
          padding: 10px 16px;
          border: 1px solid rgba(46, 125, 50, 0.2);
          border-radius: 30px;
          font-size: 14px;
          color: #1B5E20;
          background: white;
          cursor: pointer;
          outline: none;
          min-width: 200px;
          transition: all 0.2s ease;
        }

        .method-select:hover {
          border-color: #2E7D32;
          box-shadow: 0 2px 8px rgba(46, 125, 50, 0.1);
        }

        .method-select:focus {
          border-color: #2E7D32;
          box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.1);
        }

        /* Professional Tabs Styling */
        .tabs-container {
          margin-bottom: 24px;
          background: white;
          border-radius: 20px;
          padding: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
          border: 1px solid rgba(46, 125, 50, 0.15);
        }

        .tabs-header {
          display: flex;
          gap: 8px;
          background: #f8faf8;
          padding: 6px;
          border-radius: 16px;
        }

        .tab-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 20px;
          border: none;
          border-radius: 12px;
          background: transparent;
          color: #6B7280;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .tab-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 0;
        }

        .tab-btn:hover {
          color: #2E7D32;
          background: rgba(46, 125, 50, 0.05);
          transform: translateY(-1px);
        }

        .tab-btn.active {
          color: white;
          background: linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%);
          box-shadow: 0 8px 16px -4px rgba(46, 125, 50, 0.3);
        }

        .tab-btn.active::before {
          opacity: 1;
        }

        .tab-icon {
          font-size: 18px;
          position: relative;
          z-index: 1;
          transition: transform 0.3s ease;
        }

        .tab-btn:hover .tab-icon {
          transform: scale(1.1);
        }

        .tab-label {
          position: relative;
          z-index: 1;
          white-space: nowrap;
        }

        .tab-indicator {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 3px;
          background: white;
          border-radius: 3px 3px 0 0;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from {
            bottom: -10px;
            opacity: 0;
          }
          to {
            bottom: 0;
            opacity: 1;
          }
        }

        /* Tab Content with Animation */
        .tab-content-wrapper {
          background: white;
          border-radius: 24px;
          padding: 24px;
          margin-bottom: 24px;
          border: 1px solid rgba(46, 125, 50, 0.1);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
          min-height: 450px;
          position: relative;
          overflow: hidden;
        }

        .tab-pane {
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.4s ease, transform 0.4s ease;
          display: none;
        }

        .tab-pane.active {
          opacity: 1;
          transform: translateY(0);
          display: block;
          animation: fadeIn 0.5s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive Styles */
        @media (max-width: 768px) {
          .scope1-container {
            padding: 16px;
          }

          .calculator-header {
            padding: 24px;
          }

          .header-content h1 {
            font-size: 24px;
          }

          .header-content p {
            font-size: 14px;
          }

          .method-bar {
            padding: 16px;
          }

          .method-selector {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }

          .method-select {
            width: 100%;
            min-width: auto;
          }

          .tabs-header {
            flex-direction: column;
            gap: 6px;
          }

          .tab-btn {
            justify-content: flex-start;
            padding: 12px 16px;
          }

          .tab-indicator {
            width: 4px;
            height: auto;
            top: 4px;
            bottom: 4px;
            left: 0;
            right: auto;
            border-radius: 0 4px 4px 0;
            animation: slideLeft 0.3s ease;
          }

          @keyframes slideLeft {
            from {
              left: -10px;
              opacity: 0;
            }
            to {
              left: 0;
              opacity: 1;
            }
          }

          .tab-content-wrapper {
            padding: 16px;
            min-height: 400px;
          }
        }

        @media (max-width: 480px) {
          .scope1-container {
            padding: 12px;
          }

          .calculator-header {
            padding: 20px;
          }

          .header-content h1 {
            font-size: 20px;
          }

          .model-status {
            font-size: 12px;
            padding: 4px 10px;
          }

          .tab-btn {
            padding: 10px 14px;
            font-size: 14px;
          }

          .tab-icon {
            font-size: 16px;
          }

          .tab-content-wrapper {
            padding: 12px;
            min-height: 350px;
          }
        }
      `}</style>
    </div>
  );
}