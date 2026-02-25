// src/pages/DashboardPage.jsx
import React from "react";
import { 
  FiTrendingUp, 
  FiCalendar, 
  FiDownload,
  FiAlertCircle,
  FiZap,
  FiPieChart,
  FiArrowUp,
  FiArrowDown,
  FiTarget,
  FiClock,
  FiAward
} from "react-icons/fi";
import { BiLeaf, BiTrendingUp } from "react-icons/bi";
import { GiEarthAmerica, GiFactory } from "react-icons/gi";
import DashboardMetrics from "../components/dashboard/DashboardMetrics";
import ScopeBreakdown from "../components/dashboard/ScopeBreakdown";
import EmissionsTrendLine from "../components/dashboard/DashboardCharts/EmissionsTrendLine";
import TotalEmissionsPie from "../components/dashboard/DashboardCharts/TotalEmissionsPie";
import { useEmissionStore } from "../store/emissionStore";
import Card from "../components/ui/Card";

export default function DashboardPage() {
  const scope1Total = useEmissionStore((s) => s.scope1Total || 0);
  const scope2Total = useEmissionStore((s) => s.scope2Total || 0);

  const scope1Breakdown = [
    { label: "Mobile Combustion", value: 40, color: "bg-blue-500", icon: "🚗" },
    { label: "Stationary", value: 30, color: "bg-green-500", icon: "🏭" },
    { label: "Refrigerants", value: 30, color: "bg-orange-500", icon: "❄️" },
  ];

  const scope2Breakdown = [
    { label: "Electricity", value: 60, color: "bg-purple-500", icon: "⚡" },
    { label: "Heating/Cooling", value: 40, color: "bg-yellow-500", icon: "🔥" },
  ];

  const totalEmissions = scope1Total + scope2Total;

  // Goal tracking data
  const baselineYear = 2020;
  const baseEmissions = 1250; // Baseline emissions in tCO₂e
  const targetYear = 2030;
  const targetReduction = 50; // 50% reduction by 2030
  const currentYear = 2025;
  
  // Calculate progress
  const currentEmissions = totalEmissions || 980; // Use real data or fallback
  const reductionSoFar = ((baseEmissions - currentEmissions) / baseEmissions) * 100;
  const remainingYears = targetYear - currentYear;
  const requiredAnnualReduction = (targetReduction - reductionSoFar) / remainingYears;
  
  // Milestone tracking
  const milestones = [
    { year: 2025, target: 15, achieved: 12, status: "in-progress" },
    { year: 2026, target: 22, achieved: 0, status: "upcoming" },
    { year: 2027, target: 30, achieved: 0, status: "upcoming" },
    { year: 2028, target: 38, achieved: 0, status: "upcoming" },
    { year: 2029, target: 45, achieved: 0, status: "upcoming" },
    { year: 2030, target: 50, achieved: 0, status: "upcoming" },
  ];

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <div className="dashboard-header">
        <div>
          <h1>Emissions Dashboard</h1>
          <p>Track your organization's carbon footprint in real-time</p>
        </div>
        
        <div className="header-actions">
          <button className="date-range-btn">
            <FiCalendar />
            <span>Jan 2024 - Mar 2024</span>
          </button>
          <button className="export-btn">
            <FiDownload />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Quick Stats Banner */}
      <div className="stats-banner">
        <div className="stat-item">
          <BiLeaf className="stat-icon" />
          <div>
            <span className="stat-label">Carbon Intensity</span>
            <span className="stat-value">24.5 tCO₂e/£M</span>
          </div>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <FiTrendingUp className="stat-icon" />
          <div>
            <span className="stat-label">vs Last Period</span>
            <span className="stat-value text-green-600">-8.2%</span>
          </div>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <FiZap className="stat-icon" />
          <div>
            <span className="stat-label">Renewable Share</span>
            <span className="stat-value">42%</span>
          </div>
        </div>
      </div>

      {/* Main Metrics Cards */}
      <DashboardMetrics />

      {/* Enhanced Progress Tracking Section */}
      <div className="progress-section">
        {/* Main Goal Card */}
        <Card className="goal-card">
          <div className="goal-header">
            <div className="goal-title">
              <FiTarget className="goal-icon" />
              <div>
                <h3>Science-Based Target</h3>
                <p>Reduction pathway to 2030</p>
              </div>
            </div>
            <div className="goal-badge">
              <FiAward />
              <span>On Track</span>
            </div>
          </div>

          <div className="goal-visual">
            <div className="goal-stats">
              <div className="goal-stat-item">
                <span className="stat-label">Base Year ({baselineYear})</span>
                <span className="stat-value">{baseEmissions} tCO₂e</span>
              </div>
              <div className="goal-stat-item">
                <span className="stat-label">Current</span>
                <span className="stat-value">{currentEmissions} tCO₂e</span>
              </div>
              <div className="goal-stat-item">
                <span className="stat-label">Target ({targetYear})</span>
                <span className="stat-value">{baseEmissions * (1 - targetReduction/100)} tCO₂e</span>
              </div>
            </div>

            {/* Main Progress Bar */}
            <div className="progress-container">
              <div className="progress-track">
                <div 
                  className="progress-fill"
                  style={{ width: "100%" }}
                />
                <div className="progress-marker" style={{ left: `${(reductionSoFar / targetReduction) * 100}%` }}>
                  <span className="marker-label">{reductionSoFar.toFixed(1)}%</span>
                </div>
              </div>
              <div className="progress-labels">
                <span>0%</span>
                <span className="current-label">Current: {reductionSoFar.toFixed(1)}%</span>
                <span>{targetReduction}%</span>
              </div>
            </div>

            <div className="goal-metrics">
              <div className="metric">
                <span className="metric-value">{reductionSoFar.toFixed(1)}%</span>
                <span className="metric-label">Reduced so far</span>
              </div>
              <div className="metric-divider"></div>
              <div className="metric">
                <span className="metric-value">{(targetReduction - reductionSoFar).toFixed(1)}%</span>
                <span className="metric-label">Remaining</span>
              </div>
              <div className="metric-divider"></div>
              <div className="metric">
                <span className="metric-value">{requiredAnnualReduction.toFixed(1)}%</span>
                <span className="metric-label">Need per year</span>
              </div>
            </div>
          </div>

          <div className="goal-footer">
            <FiAlertCircle className="footer-icon" />
            <div className="footer-text">
              <strong>You're on track!</strong> Current reduction rate exceeds required annual target.
            </div>
          </div>
        </Card>

        {/* Milestone Timeline */}
        <Card className="milestone-card">
          <div className="milestone-header">
            <FiClock className="milestone-icon" />
            <h3>2030 Milestone Tracker</h3>
          </div>
          
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className="timeline-item">
                <div className={`timeline-dot ${milestone.status}`}>
                  {milestone.status === 'completed' && '✓'}
                </div>
                <div className="timeline-content">
                  <div className="timeline-year">{milestone.year}</div>
                  <div className="timeline-progress">
                    <div className="timeline-bar">
                      <div 
                        className={`timeline-fill ${milestone.status}`}
                        style={{ width: `${(milestone.achieved / milestone.target) * 100}%` }}
                      />
                    </div>
                    <div className="timeline-stats">
                      <span className="timeline-target">Target: {milestone.target}%</span>
                      {milestone.achieved > 0 && (
                        <span className="timeline-achieved">{milestone.achieved}% achieved</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        {/* Trend Line Chart */}
        <Card className="chart-card large">
          <div className="chart-header">
            <h3>Emissions Trend</h3>
            <div className="chart-legend">
              <span className="legend-item">
                <span className="legend-dot scope1"></span>
                Scope 1
              </span>
              <span className="legend-item">
                <span className="legend-dot scope2"></span>
                Scope 2
              </span>
            </div>
          </div>
          <div className="chart-wrapper">
            <EmissionsTrendLine />
          </div>
        </Card>

        {/* Pie Chart */}
        <Card className="chart-card">
          <div className="chart-header">
            <h3>Emissions Distribution</h3>
          </div>
          <div className="pie-chart-wrapper">
            <TotalEmissionsPie />
          </div>
          <div className="chart-insight">
            <BiTrendingUp />
            <span>Scope 1 is your largest contributor</span>
          </div>
        </Card>
      </div>

      {/* Scope Breakdowns */}
      <div className="breakdown-grid">
        <ScopeBreakdown title="Scope 1 Breakdown" items={scope1Breakdown} />
        <ScopeBreakdown title="Scope 2 Breakdown" items={scope2Breakdown} />
      </div>

      {/* Recent Activity */}
      <Card className="activity-card">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon">📊</div>
            <div className="activity-content">
              <p><strong>Monthly data updated</strong> - March 2024</p>
              <span className="activity-time">2 hours ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">🚗</div>
            <div className="activity-content">
              <p><strong>New vehicle added</strong> - Tesla Model 3</p>
              <span className="activity-time">Yesterday</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">⚡</div>
            <div className="activity-content">
              <p><strong>Renewable certificate uploaded</strong> - 150 RECs</p>
              <span className="activity-time">3 days ago</span>
            </div>
          </div>
        </div>
      </Card>

      <style jsx>{`
        .dashboard-container {
          padding: 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        /* Header */
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .dashboard-header h1 {
          font-size: 28px;
          font-weight: 700;
          color: #14532D;
          margin: 0 0 4px;
        }

        .dashboard-header p {
          color: #4B5563;
          margin: 0;
        }

        .header-actions {
          display: flex;
          gap: 12px;
        }

        .date-range-btn, .export-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border: 1px solid rgba(34, 197, 94, 0.3);
          border-radius: 30px;
          background: white;
          color: #374151;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .date-range-btn:hover, .export-btn:hover {
          border-color: #22C55E;
          background: #F0FDF4;
        }

        /* Stats Banner */
        .stats-banner {
          display: flex;
          align-items: center;
          justify-content: space-around;
          background: white;
          border-radius: 20px;
          padding: 20px 24px;
          margin-bottom: 24px;
          border: 1px solid rgba(34, 197, 94, 0.2);
          box-shadow: 0 4px 12px rgba(0,40,0,0.05);
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .stat-icon {
          font-size: 28px;
          color: #22C55E;
        }

        .stat-label {
          display: block;
          font-size: 12px;
          color: #6B7280;
          margin-bottom: 4px;
        }

        .stat-value {
          display: block;
          font-size: 18px;
          font-weight: 600;
          color: #14532D;
        }

        .text-green-600 {
          color: #16A34A;
        }

        .stat-divider {
          width: 1px;
          height: 40px;
          background: rgba(34, 197, 94, 0.2);
        }

        /* Progress Section */
        .progress-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 24px;
        }

        /* Goal Card */
        .goal-card {
          background: linear-gradient(135deg, #14532D 0%, #166534 100%);
          color: white;
          padding: 24px;
          border: none;
        }

        .goal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
        }

        .goal-title {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .goal-icon {
          font-size: 28px;
          color: rgba(255,255,255,0.9);
        }

        .goal-title h3 {
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 4px;
        }

        .goal-title p {
          font-size: 13px;
          opacity: 0.8;
          margin: 0;
        }

        .goal-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          background: rgba(255,255,255,0.15);
          border-radius: 30px;
          font-size: 13px;
          font-weight: 500;
          border: 1px solid rgba(255,255,255,0.2);
        }

        .goal-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 24px;
          padding: 16px;
          background: rgba(255,255,255,0.1);
          border-radius: 16px;
        }

        .goal-stat-item {
          text-align: center;
        }

        .goal-stat-item .stat-label {
          font-size: 11px;
          opacity: 0.7;
          margin-bottom: 4px;
        }

        .goal-stat-item .stat-value {
          font-size: 16px;
          font-weight: 600;
        }

        /* Progress Container */
        .progress-container {
          margin-bottom: 24px;
          position: relative;
        }

        .progress-track {
          height: 12px;
          background: rgba(255,255,255,0.2);
          border-radius: 6px;
          position: relative;
          margin-bottom: 8px;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #4ADE80, #22C55E);
          border-radius: 6px;
          transition: width 0.3s ease;
          position: relative;
        }

        .progress-marker {
          position: absolute;
          top: -20px;
          transform: translateX(-50%);
          background: white;
          color: #14532D;
          padding: 4px 8px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          white-space: nowrap;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }

        .progress-marker::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 6px solid white;
        }

        .progress-labels {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          opacity: 0.7;
        }

        .current-label {
          color: #4ADE80;
          font-weight: 500;
        }

        /* Goal Metrics */
        .goal-metrics {
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 16px;
          background: rgba(0,0,0,0.2);
          border-radius: 16px;
        }

        .metric {
          text-align: center;
        }

        .metric-value {
          display: block;
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .metric-label {
          font-size: 11px;
          opacity: 0.7;
        }

        .metric-divider {
          width: 1px;
          height: 30px;
          background: rgba(255,255,255,0.2);
        }

        .goal-footer {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 16px;
          padding: 12px 16px;
          background: rgba(0,0,0,0.2);
          border-radius: 12px;
          font-size: 13px;
        }

        .footer-icon {
          color: #4ADE80;
          font-size: 18px;
        }

        /* Milestone Card */
        .milestone-card {
          background: white;
          padding: 24px;
          border: 1px solid rgba(34, 197, 94, 0.15);
        }

        .milestone-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 24px;
        }

        .milestone-icon {
          font-size: 24px;
          color: #22C55E;
        }

        .milestone-header h3 {
          font-size: 18px;
          font-weight: 600;
          color: #14532D;
          margin: 0;
        }

        .timeline {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .timeline-item {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }

        .timeline-dot {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #F3F4F6;
          border: 2px solid #E5E7EB;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          color: white;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .timeline-dot.completed {
          background: #22C55E;
          border-color: #22C55E;
        }

        .timeline-dot.in-progress {
          background: #F59E0B;
          border-color: #F59E0B;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .timeline-dot.upcoming {
          background: white;
          border-color: #E5E7EB;
        }

        .timeline-content {
          flex: 1;
        }

        .timeline-year {
          font-weight: 600;
          color: #14532D;
          margin-bottom: 6px;
        }

        .timeline-progress {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .timeline-bar {
          flex: 1;
          height: 6px;
          background: #E5E7EB;
          border-radius: 3px;
          overflow: hidden;
        }

        .timeline-fill {
          height: 100%;
          border-radius: 3px;
          transition: width 0.3s ease;
        }

        .timeline-fill.completed {
          background: #22C55E;
        }

        .timeline-fill.in-progress {
          background: #F59E0B;
        }

        .timeline-stats {
          min-width: 120px;
          font-size: 12px;
        }

        .timeline-target {
          color: #6B7280;
          margin-right: 8px;
        }

        .timeline-achieved {
          color: #22C55E;
          font-weight: 500;
        }

        /* Charts Grid */
        .charts-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 24px;
          margin-bottom: 24px;
        }

        .chart-card {
          background: white;
          border-radius: 20px;
          padding: 20px;
          border: 1px solid rgba(34, 197, 94, 0.1);
        }

        .chart-card.large {
          min-height: 400px;
        }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .chart-header h3 {
          font-size: 16px;
          font-weight: 600;
          color: #14532D;
          margin: 0;
        }

        .chart-legend {
          display: flex;
          gap: 16px;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #4B5563;
        }

        .legend-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .legend-dot.scope1 {
          background: #0088FE;
        }

        .legend-dot.scope2 {
          background: #FF8042;
        }

        .chart-wrapper {
          height: 300px;
          width: 100%;
        }

        .pie-chart-wrapper {
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chart-insight {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 12px;
          padding: 8px 12px;
          background: #F0FDF4;
          border-radius: 30px;
          font-size: 13px;
          color: #15803D;
        }

        /* Breakdown Grid */
        .breakdown-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 24px;
        }

        /* Activity Card */
        .activity-card {
          background: white;
          border: 1px solid rgba(34, 197, 94, 0.1);
        }

        .activity-card h3 {
          font-size: 16px;
          font-weight: 600;
          color: #14532D;
          margin: 0 0 16px;
        }

        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .activity-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px;
          background: #F9FAFB;
          border-radius: 12px;
          border: 1px solid rgba(34, 197, 94, 0.1);
          transition: all 0.2s ease;
        }

        .activity-item:hover {
          transform: translateX(4px);
          background: #F0FDF4;
        }

        .activity-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #22C55E20, #15803D20);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }

        .activity-content {
          flex: 1;
        }

        .activity-content p {
          margin: 0 0 4px;
          font-size: 14px;
          color: #374151;
        }

        .activity-time {
          font-size: 12px;
          color: #6B7280;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .progress-section,
          .charts-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .dashboard-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .stats-banner {
            flex-direction: column;
            gap: 16px;
          }

          .stat-divider {
            width: 80%;
            height: 1px;
          }

          .goal-stats {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .goal-metrics {
            flex-direction: column;
            gap: 12px;
          }

          .metric-divider {
            width: 80%;
            height: 1px;
          }

          .breakdown-grid {
            grid-template-columns: 1fr;
          }

          .timeline-progress {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}