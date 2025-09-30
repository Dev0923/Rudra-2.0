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
            <Popup className="custom-popup">
              <div className="p-2 min-w-[250px]">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-white text-sm">{site.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskBadgeClass(site.riskLevel)}`}>
                    {site.riskPercentage}%
                  </span>
                </div>
                
                <div className="space-y-1 text-xs text-gray-300">
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span className="capitalize">{site.type.replace('-', ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Risk Level:</span>
                    <span className={`capitalize font-medium ${
                      site.riskLevel === 'safe' ? 'text-green-400' :
                      site.riskLevel === 'moderate' ? 'text-yellow-400' :
                      site.riskLevel === 'high' ? 'text-orange-400' :
                      'text-red-400'
                    }`}>
                      {site.riskLevel}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Updated:</span>
                    <span>{formatLastUpdated(site.lastUpdated)}</span>
                  </div>
                </div>

                {site.alerts.length > 0 && (
                  <div className="mt-2 p-2 bg-red-500/10 border border-red-500/20 rounded">
                    <div className="flex items-center space-x-1 mb-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-xs font-medium text-red-400">
                        {site.alerts.length} Active Alert{site.alerts.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <p className="text-xs text-gray-300">
                      {site.alerts[0].message}
                    </p>
                  </div>
                )}

                <button
                  onClick={() => onSiteSelect(site)}
                  className="mt-3 w-full px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded transition-colors duration-200"
                >
                  View Details
                </button>
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