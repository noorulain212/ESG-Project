// src/components/company/CompanyWizard.jsx
import { useState } from "react";
import CompanyInfoForm from "./CompanyInfoForm";
import RegionSelector from "./RegionSelector";
import IndustrySelector from "./IndustrySelector";
import EmployeeForm from "./EmployeeForm";
import RevenueForm from "./RevenueForm";
import FacilitiesList from "./FacilitiesList";
import SetupSummary from "./SetupSummary";
import LocationManager from "./LocationManager";
import PrimaryButton from "../ui/PrimaryButton";
import SecondaryButton from "../ui/SecondaryButton";
import Card from "../ui/Card";
import { FiCheck, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { BiLeaf } from "react-icons/bi";

export default function CompanyWizard() {
  const [step, setStep] = useState(1);
  const [companyData, setCompanyData] = useState({
  name: "",
  description: "",
  region: "",
  country: "", // Add this
  industry: "",
  employees: "",
  revenue: "",
  locations: [],
});

  const steps = [
    { id: 1, label: "Company Info", icon: "🏢" },
    { id: 2, label: "Region", icon: "🌍" },
    { id: 3, label: "Industry", icon: "🏭" },
    { id: 4, label: "Employees", icon: "👥" },
    { id: 5, label: "Revenue", icon: "💰" },
    { id: 6, label: "Facilities", icon: "🏛️" },
    { id: 7, label: "Summary", icon: "📋" },
  ];

  function updateField(field, value) {
    setCompanyData((prev) => ({ ...prev, [field]: value }));
  }

  function nextStep() {
    if (step < steps.length) setStep((prev) => prev + 1);
  }

  function prevStep() {
    if (step > 1) setStep((prev) => prev - 1);
  }

  // Check if current step is valid
  const isStepValid = () => {
    switch(step) {
      case 1: return companyData.name.trim() !== "";
      case 2: return companyData.region !== "";
      case 3: return companyData.industry !== "";
      case 4: return companyData.employees !== "";
      case 5: return companyData.revenue !== "";
      case 6: return true; // Facilities are optional
      case 7: return true; // Summary just shows data
      default: return true;
    }
  };

  return (
    <div className="wizard-container">
      {/* Step Progress Header */}
      <div className="wizard-header">
        <div className="steps-progress">
          {steps.map((s) => (
            <div key={s.id} className="step-item">
              <div className={`step-indicator ${step >= s.id ? 'completed' : ''} ${step === s.id ? 'active' : ''}`}>
                {step > s.id ? <FiCheck /> : s.icon}
              </div>
              <span className={`step-label ${step === s.id ? 'active' : ''}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${(step / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Content Card */}
      <Card className="wizard-content-card">
        <div className="wizard-content">
          {step === 1 && <CompanyInfoForm data={companyData} updateField={updateField} />}
          {step === 2 && <RegionSelector data={companyData} updateField={updateField} />}
          {step === 3 && <IndustrySelector data={companyData} updateField={updateField} />}
          {step === 4 && <EmployeeForm data={companyData} updateField={updateField} />}
          {step === 5 && <RevenueForm data={companyData} updateField={updateField} />}
          {step === 6 && (
            <LocationManager
              data={companyData}
              updateField={updateField}
            />
          )}
          
{step === 7 && <SetupSummary data={companyData} updateField={updateField} />}
        </div>

        {/* Navigation Buttons */}
        <div className="wizard-footer">
          {step > 1 && (
            <SecondaryButton onClick={prevStep} className="nav-btn back-btn">
              <FiArrowLeft /> Back
            </SecondaryButton>
          )}
          
          <PrimaryButton 
            onClick={nextStep} 
            className={`nav-btn next-btn ${!isStepValid() ? 'disabled' : ''}`}
            disabled={!isStepValid()}
          >
            {step === steps.length ? "Complete Setup" : "Continue"} 
            {step < steps.length && <FiArrowRight />}
            {step === steps.length && <BiLeaf />}
          </PrimaryButton>
        </div>
      </Card>

      <style jsx>{`
        .wizard-container {
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
        }

        /* Step Progress Header */
        .wizard-header {
          margin-bottom: 30px;
        }

        .steps-progress {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
          position: relative;
        }

        .step-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
          text-align: center;
        }

        .step-indicator {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: white;
          border: 2px solid #E5E7EB;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          color: #9CA3AF;
          margin-bottom: 8px;
          transition: all 0.3s ease;
        }

        .step-indicator.completed {
          background: #22C55E;
          border-color: #22C55E;
          color: white;
        }

        .step-indicator.active {
          border-color: #22C55E;
          color: #22C55E;
          transform: scale(1.1);
          box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.2);
        }

        .step-label {
          font-size: 12px;
          font-weight: 500;
          color: #6B7280;
          transition: all 0.3s ease;
        }

        .step-label.active {
          color: #22C55E;
          font-weight: 600;
        }

        .progress-bar-container {
          height: 6px;
          background: #E5E7EB;
          border-radius: 3px;
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #22C55E, #15803D);
          border-radius: 3px;
          transition: width 0.4s ease;
        }

        /* Content Card */
        .wizard-content-card {
          padding: 32px !important;
          border-radius: 24px !important;
          border: 1px solid rgba(34, 197, 94, 0.2) !important;
          box-shadow: 0 10px 30px rgba(0, 40, 0, 0.1) !important;
        }

        .wizard-content {
          min-height: 350px;
          margin-bottom: 30px;
        }

        /* Footer */
        .wizard-footer {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          padding-top: 24px;
          border-top: 1px solid rgba(34, 197, 94, 0.2);
        }

        .nav-btn {
          padding: 12px 28px !important;
          font-size: 15px !important;
          display: flex !important;
          align-items: center !important;
          gap: 8px !important;
          transition: all 0.3s ease !important;
        }

        .back-btn {
          background: white !important;
          color: #374151 !important;
          border: 2px solid #E5E7EB !important;
        }

        .back-btn:hover {
          border-color: #22C55E !important;
          background: #F0FDF4 !important;
        }

        .next-btn {
          background: linear-gradient(135deg, #22C55E, #15803D) !important;
          margin-left: auto !important;
        }

        .next-btn.disabled {
          opacity: 0.5;
          pointer-events: none;
          background: #9CA3AF !important;
        }

        @media (max-width: 768px) {
          .steps-progress {
            flex-wrap: wrap;
            gap: 10px;
          }

          .step-item {
            flex: 0 0 calc(33.333% - 10px);
          }

          .step-label {
            font-size: 10px;
          }

          .wizard-content-card {
            padding: 20px !important;
          }

          .wizard-footer {
            flex-direction: column-reverse;
          }

          .nav-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}