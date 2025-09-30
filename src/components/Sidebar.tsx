import React from 'react';
import { ChevronLeft, ChevronRight, Filter, Clock, MapPin } from 'lucide-react';
import { Site, Filter as FilterType } from '../types';

interface SidebarProps {
  sites: Site[];
  selectedSite: Site | null;
  onSiteSelect: (site: Site) => void;
  isOpen: boolean;
  onToggle: () => void;
  filters: FilterType;
  onFilterChange: (filters: Partial<FilterType>) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  sites,
  selectedSite,
  onSiteSelect,
  isOpen,
  onToggle,
  filters,
  onFilterChange,
}) => {
  const riskColors = {
    safe: 'bg-green-500',
    moderate: 'bg-yellow-500',
    high: 'bg-orange-500',
    critical: 'bg-red-500',
  };

  const riskTextColors = {
    safe: 'text-green-400',
    moderate: 'text-yellow-400',
    high: 'text-orange-400',
    critical: 'text-red-400',
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

  const handleRiskLevelToggle = (level: Site['riskLevel']) => {
    const newLevels = filters.riskLevels.includes(level)
      ? filters.riskLevels.filter(l => l !== level)
      : [...filters.riskLevels, level];
    onFilterChange({ riskLevels: newLevels });
  };

  const handleSiteTypeToggle = (type: Site['type']) => {
    const newTypes = filters.siteTypes.includes(type)
      ? filters.siteTypes.filter(t => t !== type)
      : [...filters.siteTypes, type];
    onFilterChange({ siteTypes: newTypes });
  };

  return (
    <div className={`bg-gray-800 border-r border-gray-700 flex flex-col sidebar-transition ${
      isOpen ? 'w-80' : 'w-12'
    }`}>
      {/* Toggle Button */}
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        {isOpen && (
          <h2 className="text-lg font-semibold text-white">Sites & Filters</h2>
        )}
        <button
          onClick={onToggle}
          className="p-2 hover:bg-gray-700 rounded-md transition-colors duration-200"
        >
          {isOpen ? (
            <ChevronLeft className="h-5 w-5 text-gray-300" />
          ) : (
            <ChevronRight className="h-5 w-5 text-gray-300" />
          )}
        </button>
      </div>

      {isOpen && (
        <>
          {/* Filters Section */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center space-x-2 mb-4">
              <Filter className="h-4 w-4 text-gray-400" />
              <h3 className="text-sm font-medium text-gray-200">Filters</h3>
            </div>

            {/* Risk Level Filter */}
            <div className="mb-4">
              <h4 className="text-xs font-medium text-gray-400 mb-2">Risk Level</h4>
              <div className="space-y-2">
                {['critical', 'high', 'moderate', 'safe'].map((level) => (
                  <label key={level} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.riskLevels.includes(level as Site['riskLevel'])}
                      onChange={() => handleRiskLevelToggle(level as Site['riskLevel'])}
                      className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
                    />
                    <div className={`w-3 h-3 rounded-full ${riskColors[level as Site['riskLevel']]}`} />
                    <span className="text-sm text-gray-300 capitalize">{level}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Site Type Filter */}
            <div className="mb-4">
              <h4 className="text-xs font-medium text-gray-400 mb-2">Site Type</h4>
              <div className="space-y-2">
                {['tunnel', 'slope', 'road-cut', 'bridge', 'retaining-wall'].map((type) => (
                  <label key={type} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.siteTypes.includes(type as Site['type'])}
                      onChange={() => handleSiteTypeToggle(type as Site['type'])}
                      className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-300 capitalize">{type.replace('-', ' ')}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Time Range Filter */}
            <div>
              <h4 className="text-xs font-medium text-gray-400 mb-2">Time Range</h4>
              <select
                value={filters.timeRange}
                onChange={(e) => onFilterChange({ timeRange: e.target.value as FilterType['timeRange'] })}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="24h">Last 24 hours</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="3m">Last 3 months</option>
                <option value="1y">Last year</option>
              </select>
            </div>
          </div>

          {/* Sites List */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center space-x-2 mb-4">
                <MapPin className="h-4 w-4 text-gray-400" />
                <h3 className="text-sm font-medium text-gray-200">
                  Sites ({sites.length})
                </h3>
              </div>

              <div className="space-y-2">
                {sites.map((site) => (
                  <div
                    key={site.id}
                    onClick={() => onSiteSelect(site)}
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedSite?.id === site.id
                        ? 'bg-blue-600/20 border border-blue-500/30'
                        : 'bg-gray-700 hover:bg-gray-600 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${riskColors[site.riskLevel]} ${
                          site.riskLevel === 'critical' ? 'pulse-critical' : ''
                        }`} />
                        <span className="text-sm font-medium text-white truncate">
                          {site.name}
                        </span>
                      </div>
                      <span className={`text-xs font-bold ${riskTextColors[site.riskLevel]}`}>
                        {site.riskPercentage}%
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span className="capitalize">{site.type.replace('-', ' ')}</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{formatLastUpdated(site.lastUpdated)}</span>
                      </div>
                    </div>

                    {site.alerts.length > 0 && (
                      <div className="mt-2 flex items-center space-x-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-xs text-red-400">
                          {site.alerts.length} active alert{site.alerts.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {sites.length === 0 && (
                <div className="text-center py-8">
                  <MapPin className="h-12 w-12 text-gray-600 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">No sites match your filters</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;