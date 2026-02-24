// src/pages/ForgotPassword.jsx
import { Link } from "react-router-dom";
import { useState } from "react";
import { FiMail, FiArrowLeft } from "react-icons/fi";
import { BiLeaf } from "react-icons/bi";
import PrimaryButton from "../components/ui/PrimaryButton";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="forgot-container">
      <div className="leaf-bg"><BiLeaf /></div>
      
      <div className="forgot-card">
        <Link to="/login" className="back-link">
          <FiArrowLeft /> Back to Login
        </Link>

        <h2>Reset Password</h2>
        <p className="subtitle">We'll email you instructions to reset your password</p>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <FiMail className="input-icon" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <PrimaryButton type="submit" className="reset-btn">
              Send Reset Link
            </PrimaryButton>
          </form>
        ) : (
          <div className="success-message">
            <div className="success-icon">✉️</div>
            <p>Check your email for reset instructions</p>
            <Link to="/login" className="back-to-login">Return to Login</Link>
          </div>
        )}
      </div>

      <style jsx>{`
        .forgot-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #14532D, #166534);
          padding: 20px;
          position: relative;
        }

        .leaf-bg {
          position: absolute;
          font-size: 15rem;
          color: rgba(255,255,255,0.05);
          transform: rotate(-15deg);
          bottom: -50px;
          left: -50px;
        }

        .forgot-card {
          background: white;
          padding: 40px;
          border-radius: 24px;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 20px 40px rgba(0,40,0,0.2);
          border: 1px solid rgba(34,197,94,0.2);
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #15803D;
          text-decoration: none;
          font-size: 14px;
          margin-bottom: 30px;
        }

        h2 {
          color: #14532D;
          font-size: 28px;
          margin: 0 0 8px;
        }

        .subtitle {
          color: #4B5563;
          font-size: 14px;
          margin-bottom: 30px;
        }

        .input-group {
          display: flex;
          align-items: center;
          gap: 12px;
          border: 2px solid #E5E7EB;
          border-radius: 12px;
          padding: 0 16px;
          margin-bottom: 24px;
        }

        .input-icon {
          color: #22C55E;
          font-size: 18px;
        }

        .input-group input {
          flex: 1;
          padding: 16px 0;
          border: none;
          outline: none;
          font-size: 15px;
        }

        .reset-btn {
          width: 100% !important;
          background: linear-gradient(135deg, #15803D, #22C55E) !important;
        }

        .success-message {
          text-align: center;
          padding: 20px 0;
        }

        .success-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }

        .back-to-login {
          display: inline-block;
          margin-top: 20px;
          color: #15803D;
          text-decoration: none;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}