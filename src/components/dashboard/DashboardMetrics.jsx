// src/components/dashboard/DashboardMetrics.jsx
import React from "react";
import Card from "../ui/Card";
import { useEmissionStore } from "../../store/emissionStore";
import { FiArrowUp, FiArrowDown } from "react-icons/fi";

const DashboardMetrics = () => {
  const scope1Total = useEmissionStore((s) => s.scope1Total || 0);
  const scope2Total = useEmissionStore((s) => s.scope2Total || 0);
  const total = scope1Total + scope2Total;

  // Mock percentage changes (would come from real data)
  const changes = {
    scope1: -5.2,
    scope2: +2.1,
    total: -3.4
  };

  const MetricCard = ({ title, value, change, color, icon }) => (
    <Card className="metric-card">
      <div className="metric-header">
        <span className="metric-title">{title}</span>
        <span className="metric-icon" style={{ background: `${color}20`, color }}>{icon}</span>
      </div>
      <div className="metric-value">{value.toFixed(1)} <span className="metric-unit">tCO₂e</span></div>
      <div className="metric-footer">
        <span className={`trend ${change >= 0 ? 'up' : 'down'}`}>
          {change >= 0 ? <FiArrowUp /> : <FiArrowDown />}
          {Math.abs(change)}%
        </span>
        <span className="trend-label">vs last month</span>
      </div>
    </Card>
  );

  return (
    <div className="metrics-grid">
      <MetricCard 
        title="Scope 1 Emissions"
        value={scope1Total}
        change={changes.scope1}
        color="#3B82F6"
        icon="🏭"
      />
      <MetricCard 
        title="Scope 2 Emissions"
        value={scope2Total}
        change={changes.scope2}
        color="#F59E0B"
        icon="⚡"
      />
      <MetricCard 
        title="Total Emissions"
        value={total}
        change={changes.total}
        color="#10B981"
        icon="🌍"
      />

      <style jsx>{`
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 24px;
        }

        .metric-card {
          background: white;
          border-radius: 20px;
          padding: 20px;
          border: 1px solid rgba(34, 197, 94, 0.1);
          transition: all 0.3s ease;
        }

        .metric-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(34, 197, 94, 0.15);
        }

        .metric-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .metric-title {
          font-size: 14px;
          font-weight: 500;
          color: #6B7280;
        }

        .metric-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }

        .metric-value {
          font-size: 32px;
          font-weight: 700;
          color: #14532D;
          margin-bottom: 12px;
        }

        .metric-unit {
          font-size: 14px;
          font-weight: 400;
          color: #9CA3AF;
        }

        .metric-footer {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
        }

        .trend {
          display: flex;
          align-items: center;
          gap: 2px;
          font-weight: 600;
        }

        .trend.up {
          color: #EF4444;
        }

        .trend.down {
          color: #10B981;
        }

        .trend-label {
          color: #6B7280;
        }

        @media (max-width: 768px) {
          .metrics-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardMetrics;