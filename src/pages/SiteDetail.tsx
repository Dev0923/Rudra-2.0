import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, AlertTriangle, Activity, TrendingUp } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Navbar from '../components/Navbar';
import RiskGauge from '../components/RiskGauge';
import { mockSites, mockRiskFactors } from '../data/mockData';
import { Site, RiskFactor } from '../types';

const SiteDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [site, setSite] = useState<Site | null>(null);
  const [riskFactors, setRiskFactors] = useState<RiskFactor[]>([]);
  const [timelineData, setTimelineData] = useState<any[]>([]);

  useEffect(() => {
    // Find the site by ID
    const foundSite = mockSites.find(s => s.id === id);
    if (foundSite) {
      setSite(foundSite);
      setRiskFactors(mockRiskFactors[foundSite.id] || []);
      
      // Generate mock timeline data for the last 7 days
      const generateTimelineData = () => {
        const data = [];
        const now = new Date();
        
        for (let i = 6; i >= 0; i--) {
          const date = new Date(now);
          date.setDate(date.getDate() - i);
          
          data.push({
            date: date.toLocaleDateString(),
            risk: Math.max(10, foundSite.riskPercentage + (Math.random() - 0.5) * 20),
            rainfall: Math.max(0, foundSite.sensors.rainfall + (Math.random() - 0.5) * 30),
            vibration: Math.max(0, foundSite.sensors.vibration + (Math.random() - 0.5) * 5),
            soilMoisture: Math.max(0, foundSite.sensors.soilMoisture + (Math.random() - 0.5) * 20),
          });
        }
        
        return data;
      };
      
      setTimelineData(generateTimelineData());
    }
  }, [id]);

  if (!site) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Site not found</h2>
          <Link to="/dashboard" className="text-blue-400 hover:text-blue-300">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const formatLastUpdated = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const getRiskBadgeClass = (level: Site['riskLevel']) => {
    switch (level) {
      case 'safe': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'moderate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link
              to="/dashboard"
              className="p-2 hover:bg-gray-800 rounded-md transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5 text-gray-400" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">{site.name}</h1>
              <div className="flex items-center space-x-3 mt-1">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getRiskBadgeClass(site.riskLevel)}`}>
                  {site.riskLevel.toUpperCase()} - {site.riskPercentage}%
                </span>
                <span className="text-sm text-gray-400 capitalize">
                  {site.type.replace('-', ' ')}
                </span>
                <span className="text-sm text-gray-400">
                  Updated {formatLastUpdated(site.lastUpdated)}
                </span>
              </div>
            </div>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200">
            <Download className="h-4 w-4" />
            <span>Download Report</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Metrics */}
          <div className="lg:col-span-2 space-y-6">
            {/* Risk Gauge */}
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Current Risk Assessment</h2>
              <div className="flex justify-center">
                <RiskGauge value={site.riskPercentage} size={200} />
              </div>
            </div>

            {/* Risk Factors Chart */}
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Risk Factor Analysis</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={riskFactors}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#9ca3af"
                    fontSize={12}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#f3f4f6'
                    }}
                  />
                  <Bar dataKey="impact" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Timeline Chart */}
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-white mb-4">7-Day Risk Trend</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#f3f4f6'
                    }}
                  />
                  <Line type="monotone" dataKey="risk" stroke="#ef4444" strokeWidth={2} name="Risk %" />
                  <Line type="monotone" dataKey="rainfall" stroke="#3b82f6" strokeWidth={2} name="Rainfall (mm)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Alerts */}
            {site.alerts.length > 0 && (
              <div className="card p-4">
                <div className="flex items-center space-x-2 mb-4">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <h3 className="text-lg font-semibold text-white">Active Alerts</h3>
                </div>
                <div className="space-y-3">
                  {site.alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-3 rounded-lg border ${
                        alert.level === 'critical'
                          ? 'bg-red-500/10 border-red-500/20'
                          : alert.level === 'warning'
                          ? 'bg-yellow-500/10 border-yellow-500/20'
                          : 'bg-blue-500/10 border-blue-500/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs font-medium uppercase ${
                          alert.level === 'critical' ? 'text-red-400' :
                          alert.level === 'warning' ? 'text-yellow-400' : 'text-blue-400'
                        }`}>
                          {alert.level}
                        </span>
                        <span className="text-xs text-gray-400">
                          {formatLastUpdated(alert.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-300">{alert.message}</p>
                      {alert.actionTaken && (
                        <div className="mt-2 p-2 bg-gray-700/50 rounded text-xs text-gray-400">
                          <strong>Action Taken:</strong> {alert.actionTaken}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sensor Data */}
            <div className="card p-4">
              <div className="flex items-center space-x-2 mb-4">
                <Activity className="h-5 w-5 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">Live Sensor Data</h3>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Rainfall', value: site.sensors.rainfall.toFixed(1), unit: 'mm', icon: '🌧️' },
                  { label: 'Vibration', value: site.sensors.vibration.toFixed(1), unit: 'Hz', icon: '📳' },
                  { label: 'Soil Moisture', value: site.sensors.soilMoisture.toFixed(1), unit: '%', icon: '💧' },
                  { label: 'Temperature', value: site.sensors.temperature.toFixed(1), unit: '°C', icon: '🌡️' },
                  { label: 'Slope Angle', value: site.sensors.slopeAngle.toFixed(1), unit: '°', icon: '📐' },
                ].map((sensor) => (
                  <div key={sensor.label} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{sensor.icon}</span>
                      <span className="text-sm text-gray-300">{sensor.label}</span>
                    </div>
                    <span className="text-sm font-semibold text-white">
                      {sensor.value} {sensor.unit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="card p-4">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="h-5 w-5 text-green-400" />
                <h3 className="text-lg font-semibold text-white">AI Recommendations</h3>
              </div>
              <div className="space-y-3">
                {site.riskLevel === 'critical' && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <div className="text-sm font-medium text-red-400 mb-2">🚨 IMMEDIATE ACTION REQUIRED</div>
                    <p className="text-sm text-gray-300">
                      Critical risk conditions detected. Implement emergency protocols immediately.
                    </p>
                  </div>
                )}
                
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="text-sm font-medium text-blue-400 mb-2">💡 RECOMMENDATIONS</div>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Monitor rainfall intensity closely</li>
                    <li>• Increase sensor data collection frequency</li>
                    <li>• Deploy additional vibration sensors</li>
                    <li>• Consider installing drainage systems</li>
                    {site.riskLevel !== 'safe' && <li>• Implement access restrictions if needed</li>}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteDetail;