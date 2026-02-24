// src/components/reports/ReportsOverview.jsx
import React, { useState } from "react";
import Card from "../ui/Card";
import StatusBadge from "../ui/StatusBadge";
import ProgressBar from "../ui/ProgressBar";
import { FiDownload, FiEye, FiMoreVertical, FiCalendar, FiTrendingUp } from "react-icons/fi";
import { BiLeaf } from "react-icons/bi";

export default function ReportsOverview() {
  const [expandedReport, setExpandedReport] = useState(null);

  // Sample data for demonstration - in real app, this would come from API
  const reports = [
    {
      id: 1,
      title: "Monthly Emissions Report",
      period: "January 2026",
      date: "2026-01-31",
      scope1: 120,
      scope2: 80,
      total: 200,
      unit: "tCO₂e",
      completion: 60,
      status: "Complete",
      trend: -5.2,
      dataPoints: 31,
      lastUpdated: "2026-02-01",
    },
    {
      id: 2,
      title: "Quarterly Emissions Report",
      period: "Q4 2025",
      date: "2025-12-31",
      scope1: 450,
      scope2: 300,
      total: 750,
      unit: "tCO₂e",
      completion: 80,
      status: "Reliable",
      trend: 2.1,
      dataPoints: 92,
      lastUpdated: "2026-01-15",
    },
    {
      id: 3,
      title: "Annual Sustainability Report",
      period: "2025",
      date: "2025-12-31",
      scope1: 1650,
      scope2: 1100,
      total: 2750,
      unit: "tCO₂e",
      completion: 95,
      status: "Complete",
      trend: -8.4,
      dataPoints: 365,
      lastUpdated: "2026-01-10",
    },
  ];

  const getStatusColor = (status) => {
    const colors = {
      "Complete": "success",
      "Reliable": "success",
      "Pending": "warning",
      "Draft": "info",
    };
    return colors[status] || "default";
  };

  return (
    <div className="reports-overview">
      {/* Section Header */}
      <div className="section-header">
        <h2>Generated Reports</h2>
        <div className="header-actions">
          <button className="view-toggle">
            <FiTrendingUp /> Trend View
          </button>
        </div>
      </div>

      {/* Reports List */}
      <div className="reports-list">
        {reports.map((report) => (
          <Card key={report.id} className="report-card">
            {/* Card Header */}
            <div className="report-header">
              <div className="header-left">
                <div className="report-icon">
                  <BiLeaf />
                </div>
                <div>
                  <h3>{report.title}</h3>
                  <div className="report-meta">
                    <span className="meta-item">
                      <FiCalendar /> {report.period}
                    </span>
                    <span className="meta-divider">•</span>
                    <span className="meta-item">
                      {report.dataPoints} data points
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="header-right">
                <StatusBadge status={report.status} className={getStatusColor(report.status)} />
                <button 
                  className="expand-btn"
                  onClick={() => setExpandedReport(expandedReport === report.id ? null : report.id)}
                >
                  <FiMoreVertical />
                </button>
              </div>
            </div>

            {/* Main Stats */}
            <div className="stats-grid">
              <div className="stat-box">
                <span className="stat-label">Scope 1</span>
                <span className="stat-value">{report.scope1}</span>
                <span className="stat-unit">{report.unit}</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">Scope 2</span>
                <span className="stat-value">{report.scope2}</span>
                <span className="stat-unit">{report.unit}</span>
              </div>
              <div className="stat-box highlight">
                <span className="stat-label">Total CO₂e</span>
                <span className="stat-value">{report.total}</span>
                <span className="stat-unit">{report.unit}</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">vs Previous</span>
                <span className={`trend-value ${report.trend >= 0 ? 'up' : 'down'}`}>
                  {report.trend > 0 ? '+' : ''}{report.trend}%
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="progress-section">
              <div className="progress-header">
                <span className="progress-label">Data Completion</span>
                <span className="progress-value">{report.completion}%</span>
              </div>
              <ProgressBar value={report.completion} />
              <div className="progress-footer">
                <span>Last updated: {report.lastUpdated}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button className="action-btn view">
                <FiEye /> Preview
              </button>
              <button className="action-btn download">
                <FiDownload /> Download PDF
              </button>
              <button className="action-btn export">
                Export CSV
              </button>
            </div>

            {/* Expanded Details (shown when expanded) */}
            {expandedReport === report.id && (
              <div className="expanded-details">
                <h4>Detailed Breakdown</h4>
                <div className="details-grid">
                  <div className="detail-item">
                    <span>Mobile Combustion</span>
                    <span>85 tCO₂e</span>
                  </div>
                  <div className="detail-item">
                    <span>Stationary Combustion</span>
                    <span>35 tCO₂e</span>
                  </div>
                  <div className="detail-item">
                    <span>Electricity</span>
                    <span>60 tCO₂e</span>
                  </div>
                  <div className="detail-item">
                    <span>Heating</span>
                    <span>20 tCO₂e</span>
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Empty State (when no reports) */}
      {reports.length === 0 && (
        <Card className="empty-state">
          <div className="empty-icon">📊</div>
          <h3>No Reports Generated</h3>
          <p>Generate your first report using the templates above</p>
          <button className="generate-first-btn">Generate Report</button>
        </Card>
      )}

      <style jsx>{`
        .reports-overview {
          width: 100%;
        }

        /* Section Header */
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .section-header h2 {
          font-size: 18px;
          font-weight: 600;
          color: #14532D;
          margin: 0;
        }

        .view-toggle {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: white;
          border: 1px solid rgba(34, 197, 94, 0.2);
          border-radius: 30px;
          color: #374151;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .view-toggle:hover {
          border-color: #22C55E;
          background: #F0FDF4;
        }

        /* Reports List */
        .reports-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .report-card {
          background: white;
          border-radius: 20px;
          padding: 24px;
          border: 1px solid rgba(34, 197, 94, 0.1);
          transition: all 0.3s ease;
        }

        .report-card:hover {
          box-shadow: 0 10px 30px rgba(34, 197, 94, 0.1);
        }

        /* Report Header */
        .report-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .report-icon {
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

        .report-header h3 {
          font-size: 18px;
          font-weight: 600;
          color: #14532D;
          margin: 0 0 4px;
        }

        .report-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #6B7280;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .expand-btn {
          background: none;
          border: none;
          color: #9CA3AF;
          cursor: pointer;
          padding: 4px;
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 20px;
          padding: 16px;
          background: #F9FAFB;
          border-radius: 16px;
        }

        .stat-box {
          text-align: center;
        }

        .stat-box.highlight {
          background: linear-gradient(135deg, #22C55E20, #15803D20);
          border-radius: 12px;
          padding: 8px;
        }

        .stat-label {
          display: block;
          font-size: 12px;
          color: #6B7280;
          margin-bottom: 4px;
        }

        .stat-value {
          display: inline-block;
          font-size: 20px;
          font-weight: 700;
          color: #14532D;
          margin-right: 4px;
        }

        .stat-unit {
          font-size: 12px;
          color: #9CA3AF;
        }

        .trend-value {
          font-size: 18px;
          font-weight: 600;
        }

        .trend-value.down {
          color: #10B981;
        }

        .trend-value.up {
          color: #EF4444;
        }

        /* Progress Section */
        .progress-section {
          margin-bottom: 20px;
        }

        .progress-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .progress-label {
          font-size: 13px;
          color: #4B5563;
        }

        .progress-value {
          font-weight: 600;
          color: #14532D;
        }

        .progress-footer {
          font-size: 12px;
          color: #9CA3AF;
          margin-top: 8px;
          text-align: right;
        }

        /* Action Buttons */
        .action-buttons {
          display: flex;
          gap: 12px;
          border-top: 1px solid rgba(34, 197, 94, 0.1);
          padding-top: 20px;
        }

        .action-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .action-btn.view {
          background: #F3F4F6;
          border: 1px solid #E5E7EB;
          color: #374151;
        }

        .action-btn.view:hover {
          background: #E5E7EB;
        }

        .action-btn.download {
          background: linear-gradient(135deg, #15803D, #22C55E);
          border: none;
          color: white;
        }

        .action-btn.download:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(34, 197, 94, 0.3);
        }

        .action-btn.export {
          background: white;
          border: 2px solid #22C55E;
          color: #15803D;
        }

        .action-btn.export:hover {
          background: #F0FDF4;
        }

        /* Expanded Details */
        .expanded-details {
          margin-top: 20px;
          padding: 20px;
          background: #F9FAFB;
          border-radius: 16px;
          animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .expanded-details h4 {
          font-size: 15px;
          font-weight: 600;
          color: #14532D;
          margin: 0 0 16px;
        }

        .details-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .detail-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 12px;
          background: white;
          border-radius: 8px;
          font-size: 13px;
        }

        .detail-item span:first-child {
          color: #4B5563;
        }

        .detail-item span:last-child {
          font-weight: 600;
          color: #14532D;
        }

        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 60px 24px;
        }

        .empty-icon {
          font-size: 64px;
          margin-bottom: 20px;
          opacity: 0.5;
        }

        .empty-state h3 {
          font-size: 18px;
          font-weight: 600;
          color: #374151;
          margin: 0 0 8px;
        }

        .empty-state p {
          color: #6B7280;
          margin: 0 0 20px;
        }

        .generate-first-btn {
          padding: 12px 24px;
          background: linear-gradient(135deg, #15803D, #22C55E);
          color: white;
          border: none;
          border-radius: 30px;
          font-weight: 600;
          cursor: pointer;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .action-buttons {
            flex-direction: column;
          }

          .report-header {
            flex-direction: column;
            gap: 12px;
          }

          .header-right {
            width: 100%;
            justify-content: space-between;
          }

          .details-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}