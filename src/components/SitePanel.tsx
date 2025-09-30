import React from 'react';
import { Link } from 'react-router-dom';
import { X, ExternalLink, AlertTriangle, Activity, Thermometer, Droplets } from 'lucide-react';
import { Site } from '../types';
import RiskGauge from './RiskGauge';

interface SitePanelProps {
  site: Site;
  onClose: () => void;
}

const SitePanel: React.FC<SitePanelProps> = ({ site, onClose }) => {
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
    <div className="absolute top-0 right-0 h-full w-96 bg-gray-800 border-l border-gray-700 shadow-xl z-50 overflow-y-auto animate-slide-in">
      {/* Header */}
      <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-4 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">{site.name}</h2>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskBadgeClass(site.riskLevel)}`}>
                {site.riskLevel.toUpperCase()} - {site.riskPercentage}%
              </span>
              <span className="text-xs text-gray-400 capitalize">
                {site.type.replace('-', ' ')}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-md transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Risk Gauge */}
        <div className="card p-4">
          <h3 className="text-sm font-medium text-gray-200 mb-4">Current Risk Assessment</h3>
          <div className="flex justify-center">
            <RiskGauge value={site.riskPercentage} size={160} />
          </div>
          <div className="text-center mt-3 text-xs text-gray-400">
            Last updated: {formatLastUpdated(site.lastUpdated)}
          </div>
        </div>

        {/* Alerts */}
        {site.alerts.length > 0 && (
          <div className="card p-4">
            <div className="flex items-center space-x-2 mb-3">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <h3 className="text-sm font-medium text-gray-200">Active Alerts</h3>
            </div>
            <div className="space-y-2">
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
                  <div className="flex items-center justify-between mb-1">
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
                  <p className="text-xs text-gray-300">{alert.message}</p>
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
          <div className="flex items-center space-x-2 mb-3">
            <Activity className="h-4 w-4 text-blue-400" />
            <h3 className="text-sm font-medium text-gray-200">Live Sensor Data</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-700/50 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Droplets className="h-3 w-3 text-blue-400" />
                <span className="text-xs text-gray-400">Rainfall</span>
              </div>
              <div className="text-sm font-semibold text-white">
                {site.sensors.rainfall.toFixed(1)} mm
              </div>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Activity className="h-3 w-3 text-green-400" />
                <span className="text-xs text-gray-400">Vibration</span>
              </div>
              <div className="text-sm font-semibold text-white">
                {site.sensors.vibration.toFixed(1)} Hz
              </div>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Droplets className="h-3 w-3 text-cyan-400" />
                <span className="text-xs text-gray-400">Soil Moisture</span>
              </div>
              <div className="text-sm font-semibold text-white">
                {site.sensors.soilMoisture.toFixed(1)}%
              </div>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Thermometer className="h-3 w-3 text-orange-400" />
                <span className="text-xs text-gray-400">Temperature</span>
              </div>
              <div className="text-sm font-semibold text-white">
                {site.sensors.temperature.toFixed(1)}°C
              </div>
            </div>
          </div>
          <div className="mt-3 bg-gray-700/50 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <div className="h-3 w-3 bg-yellow-400 rounded-full" />
              <span className="text-xs text-gray-400">Slope Angle</span>
            </div>
            <div className="text-sm font-semibold text-white">
              {site.sensors.slopeAngle.toFixed(1)}°
            </div>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="card p-4">
          <h3 className="text-sm font-medium text-gray-200 mb-3">AI Recommendations</h3>
          <div className="space-y-3">
            {site.riskLevel === 'critical' && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="text-xs font-medium text-red-400 mb-1">IMMEDIATE ACTION REQUIRED</div>
                <p className="text-xs text-gray-300">
                  High rainfall combined with steep slope indicates critical risk. 
                  Recommend immediate area evacuation and traffic restrictions.
                </p>
              </div>
            )}
            {site.riskLevel === 'high' && (
              <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                <div className="text-xs font-medium text-orange-400 mb-1">HIGH ALERT</div>
                <p className="text-xs text-gray-300">
                  Increasing risk factors detected. Enhanced monitoring and precautionary 
                  measures recommended.
                </p>
              </div>
            )}
            {site.riskLevel === 'moderate' && (
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="text-xs font-medium text-yellow-400 mb-1">MONITOR CLOSELY</div>
                <p className="text-xs text-gray-300">
                  Moderate risk conditions. Continue regular monitoring and prepare 
                  contingency plans.
                </p>
              </div>
            )}
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="text-xs font-medium text-blue-400 mb-1">SUGGESTED ACTIONS</div>
              <ul className="text-xs text-gray-300 space-y-1">
                <li>• Increase sensor monitoring frequency</li>
                <li>• Deploy additional rain gauges</li>
                <li>• Install early warning systems</li>
                {site.riskLevel !== 'safe' && <li>• Consider temporary access restrictions</li>}
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Link
            to={`/site/${site.id}`}
            className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors duration-200"
          >
            View Full Details
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
          <button className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm font-medium rounded-md transition-colors duration-200">
            Download Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default SitePanel;