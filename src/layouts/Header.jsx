// src/components/layout/Header.jsx
import React, { useState, useEffect } from "react";
import { 
  FiBell, 
  FiUser, 
  FiChevronDown,
  FiSettings,
  FiSun,
  FiCloud,
  FiLogOut
} from "react-icons/fi";
import { BiLeaf } from "react-icons/bi";
import { GiEarthAmerica, GiWindTurbine } from "react-icons/gi";
import { RiRecycleLine } from "react-icons/ri";
import { MdOutlineEnergySavingsLeaf } from "react-icons/md";

export default function Header({ title = "ESG Calculator" }) {
  const [scrolled, setScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <header
      className="esg-header"
      style={{
        width: "100%",
        height: "64px",
        background: scrolled 
          ? "linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)" 
          : "linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)",
        color: "white",
        padding: "0 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: scrolled 
          ? "0 4px 20px rgba(0, 40, 0, 0.2)" 
          : "0 2px 10px rgba(0, 30, 0, 0.1)",
        transition: "all 0.3s ease",
        boxSizing: "border-box",
      }}
    >
      {/* Left Section - Logo and Title */}
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        gap: "16px",
      }}>
        <div style={{
          position: "relative",
          animation: "float 3s ease-in-out infinite",
        }}>
          <MdOutlineEnergySavingsLeaf size={32} style={{ 
            color: "#E8F5E9",
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
          }} />
          <BiLeaf size={16} style={{
            position: "absolute",
            bottom: "-2px",
            right: "-2px",
            color: "#FFD54F",
            filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.2))",
          }} />
        </div>

        <div>
          <h1 style={{ 
            margin: 0, 
            color: "white", 
            fontSize: "20px",
            fontWeight: 600,
            letterSpacing: "-0.5px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}>
            {title}
          </h1>
        </div>
      </div>

      {/* Center Section - Environmental Metrics */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "24px",
        background: "rgba(255,255,255,0.1)",
        padding: "8px 20px",
        borderRadius: "40px",
        backdropFilter: "blur(10px)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <GiEarthAmerica size={18} color="#E8F5E9" />
          <div>
            <span style={{ fontSize: "11px", opacity: 0.8 }}>Carbon Score</span>
            <span style={{ fontSize: "14px", fontWeight: 600, marginLeft: "4px" }}>A-</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <GiWindTurbine size={18} color="#E8F5E9" />
          <div>
            <span style={{ fontSize: "11px", opacity: 0.8 }}>Air Quality</span>
            <span style={{ fontSize: "14px", fontWeight: 600, marginLeft: "4px" }}>Good</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <FiSun size={18} color="#E8F5E9" />
          <div>
            <span style={{ fontSize: "11px", opacity: 0.8 }}>Renewable</span>
            <span style={{ fontSize: "14px", fontWeight: 600, marginLeft: "4px" }}>78%</span>
          </div>
        </div>
      </div>

      {/* Right Section - Actions and Profile */}
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        gap: "16px",
      }}>
        <div style={{
          textAlign: "right",
          borderRight: "1px solid rgba(255,255,255,0.3)",
          paddingRight: "16px",
        }}>
          <div style={{ fontSize: "13px", fontWeight: 500 }}>{formatDate(currentTime)}</div>
          <div style={{ fontSize: "11px", opacity: 0.8 }}>{formatTime(currentTime)}</div>
        </div>

        <button
          style={{
            background: "rgba(255,255,255,0.1)",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "white",
            position: "relative",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
          onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
        >
          <FiBell size={20} />
          <span style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            width: "8px",
            height: "8px",
            background: "#FFD54F",
            borderRadius: "50%",
            border: "2px solid #2E7D32",
          }} />
        </button>

        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "none",
              borderRadius: "30px",
              padding: "6px 12px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              color: "white",
              transition: "all 0.2s ease",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.25)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
          >
            <div style={{
              width: "32px",
              height: "32px",
              background: "linear-gradient(135deg, #FFD54F 0%, #FFB300 100%)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 600,
              fontSize: "14px",
            }}>
              JD
            </div>
            <span style={{ fontSize: "14px" }}>John Doe</span>
            <FiChevronDown size={16} style={{
              transform: showProfileMenu ? "rotate(180deg)" : "none",
              transition: "transform 0.3s ease",
            }} />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
      `}</style>
    </header>
  );
}