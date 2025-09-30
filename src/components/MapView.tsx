import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon, DivIcon } from 'leaflet';
import { Site } from '../types';
import { getRiskColor } from '../data/mockData';
import 'leaflet/dist/leaflet.css';

interface MapViewProps {
  sites: Site[];
  selectedSite: Site | null;
  onSiteSelect: (site: Site) => void;
}

const MapView: React.FC<MapViewProps> = ({ sites, selectedSite, onSiteSelect }) => {
  const center: [number, number] = [28.2096, 83.9856]; // Nepal coordinates
  const zoom = 12;

  // Create custom marker icons for different risk levels
  const createMarkerIcon = (site: Site) => {
    const color = getRiskColor(site.riskLevel);
    const size = selectedSite?.id === site.id ? 32 : 28;
    const pulseClass = site.riskLevel === 'critical' ? 'animate-pulse' : '';
    
    return new DivIcon({
      html: `
        <div class="relative">
          <svg width="${size}" height="${size + 8}" viewBox="0 0 24 32" class="${pulseClass}">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" 
                  fill="${color}" 
                  stroke="white" 
                  stroke-width="2"/>
            <circle cx="12" cy="9" r="3" fill="white"/>
          </svg>
          ${site.alerts.length > 0 ? `
            <div class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white animate-ping"></div>
          ` : ''}
        </div>
      `,
      className: 'custom-marker',
      iconSize: [size, size + 8],
      iconAnchor: [size / 2, size + 8],
    });
  };

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
    <div className="h-full w-full relative">
      <MapContainer
        center={center}
        zoom={zoom}
        className="h-full w-full"
        style={{ backgroundColor: '#1f2937' }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        
        {sites.map((site) => (
          <Marker
            key={site.id}
            position={site.coordinates}
            icon={createMarkerIcon(site)}
            eventHandlers={{
              click: () => onSiteSelect(site),
            }}
          >
            <Popup className="custom-popup" maxWidth={400}>
              <div className="p-4 min-w-[350px]">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-white text-lg">{site.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getRiskBadgeClass(site.riskLevel)}`}>
                    {site.riskLevel.toUpperCase()} - {site.riskPercentage}%
                  </span>
                </div>
                
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Type:</span>
                      <span className="text-white capitalize">{site.type.replace('-', ' ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Risk Level:</span>
                      <span className={`capitalize font-medium ${
                        site.riskLevel === 'safe' ? 'text-green-400' :
                        site.riskLevel === 'moderate' ? 'text-yellow-400' :
                        site.riskLevel === 'high' ? 'text-orange-400' :
                        'text-red-400'
                      }`}>
                        {site.riskLevel}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Last Updated:</span>
                      <span className="text-white">{formatLastUpdated(site.lastUpdated)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Coordinates:</span>
                      <span className="text-white text-xs">{site.coordinates[0].toFixed(4)}, {site.coordinates[1].toFixed(4)}</span>
                    </div>
                  </div>
                </div>

                {/* Sensor Data */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-200 mb-2 flex items-center">
                    <span className="mr-2">📊</span> Live Sensor Data
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-700/50 rounded-lg p-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">🌧️ Rainfall</span>
                        <span className="text-sm font-semibold text-white">{site.sensors.rainfall.toFixed(1)} mm</span>
                      </div>
                    </div>
                    <div className="bg-gray-700/50 rounded-lg p-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">📳 Vibration</span>
                        <span className="text-sm font-semibold text-white">{site.sensors.vibration.toFixed(1)} Hz</span>
                      </div>
                    </div>
                    <div className="bg-gray-700/50 rounded-lg p-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">💧 Soil Moisture</span>
                        <span className="text-sm font-semibold text-white">{site.sensors.soilMoisture.toFixed(1)}%</span>
                      </div>
                    </div>
                    <div className="bg-gray-700/50 rounded-lg p-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">🌡️ Temperature</span>
                        <span className="text-sm font-semibold text-white">{site.sensors.temperature.toFixed(1)}°C</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 bg-gray-700/50 rounded-lg p-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">📐 Slope Angle</span>
                      <span className="text-sm font-semibold text-white">{site.sensors.slopeAngle.toFixed(1)}°</span>
                    </div>
                  </div>
                </div>

                {/* Alerts */}
                {site.alerts.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-200 mb-2 flex items-center">
                      <span className="mr-2">⚠️</span> Active Alerts ({site.alerts.length})
                    </h4>
                    <div className="space-y-2 max-h-24 overflow-y-auto">
                      {site.alerts.map((alert) => (
                        <div key={alert.id} className={`p-2 rounded border ${
                          alert.level === 'critical' ? 'bg-red-500/10 border-red-500/20' :
                          alert.level === 'warning' ? 'bg-yellow-500/10 border-yellow-500/20' :
                          'bg-blue-500/10 border-blue-500/20'
                        }`}>
                          <div className="flex items-center justify-between mb-1">
                            <span className={`text-xs font-medium uppercase ${
                              alert.level === 'critical' ? 'text-red-400' :
                              alert.level === 'warning' ? 'text-yellow-400' : 'text-blue-400'
                            }`}>
                              {alert.level}
                            </span>
                            <span className="text-xs text-gray-400">{formatLastUpdated(alert.timestamp)}</span>
                          </div>
                          <p className="text-xs text-gray-300">{alert.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* AI Recommendations */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-200 mb-2 flex items-center">
                    <span className="mr-2">🤖</span> AI Recommendations
                  </h4>
                  <div className={`p-2 rounded border ${
                    site.riskLevel === 'critical' ? 'bg-red-500/10 border-red-500/20' :
                    site.riskLevel === 'high' ? 'bg-orange-500/10 border-orange-500/20' :
                    site.riskLevel === 'moderate' ? 'bg-yellow-500/10 border-yellow-500/20' :
                    'bg-green-500/10 border-green-500/20'
                  }`}>
                    <p className="text-xs text-gray-300">
                      {site.riskLevel === 'critical' ? 
                        '🚨 IMMEDIATE ACTION: Critical risk detected. Implement emergency protocols and restrict access immediately.' :
                        site.riskLevel === 'high' ? 
                        '⚠️ HIGH ALERT: Enhanced monitoring recommended. Consider preventive measures.' :
                        site.riskLevel === 'moderate' ? 
                        '⚡ MONITOR: Conditions warrant attention. Increase surveillance frequency.' :
                        '✅ STABLE: Current conditions are within safe parameters. Continue routine monitoring.'
                      }
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => onSiteSelect(site)}
                    className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition-colors duration-200"
                  >
                    📊 Full Analysis
                  </button>
                  <button
                    onClick={() => window.open(`/site/${site.id}`, '_blank')}
                    className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm font-medium rounded transition-colors duration-200"
                  >
                    🔗 Open
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-lg p-3">
        <h4 className="text-xs font-medium text-gray-200 mb-2">Risk Levels</h4>
        <div className="space-y-1">
          {[
            { level: 'safe', label: 'Safe (0-24%)', color: '#10b981' },
            { level: 'moderate', label: 'Moderate (25-49%)', color: '#f59e0b' },
            { level: 'high', label: 'High (50-74%)', color: '#f97316' },
            { level: 'critical', label: 'Critical (75-100%)', color: '#ef4444' },
          ].map(({ level, label, color }) => (
            <div key={level} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-xs text-gray-300">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Live Status Indicator */}
      <div className="absolute top-4 right-4 bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-lg p-3">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs text-gray-200">Live Monitoring</span>
        </div>
        <div className="text-xs text-gray-400 mt-1">
          {sites.length} sites active
        </div>
      </div>
    </div>
  );
};

export default MapView;