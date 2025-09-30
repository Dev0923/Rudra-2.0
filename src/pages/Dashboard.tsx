import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import MapView from '../components/MapView';
import SitePanel from '../components/SitePanel';
import { mockSites } from '../data/mockData';
import { Site, Filter } from '../types';

const Dashboard: React.FC = () => {
  const [sites, setSites] = useState<Site[]>(mockSites);
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [filters, setFilters] = useState<Filter>({
    riskLevels: ['safe', 'moderate', 'high', 'critical'],
    siteTypes: ['tunnel', 'slope', 'road-cut', 'bridge', 'retaining-wall'],
    timeRange: '24h',
  });

  // Filter sites based on current filters
  const filteredSites = sites.filter(site => 
    filters.riskLevels.includes(site.riskLevel) &&
    filters.siteTypes.includes(site.type)
  );

  // Update site data periodically (simulate real-time updates)
  useEffect(() => {
    const interval = setInterval(() => {
      setSites(prevSites => 
        prevSites.map(site => ({
          ...site,
          lastUpdated: new Date(),
          // Simulate minor fluctuations in sensor data
          sensors: {
            ...site.sensors,
            vibration: Math.max(0, site.sensors.vibration + (Math.random() - 0.5) * 0.5),
            temperature: site.sensors.temperature + (Math.random() - 0.5) * 0.2,
          }
        }))
      );
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleSiteSelect = (site: Site) => {
    setSelectedSite(site);
  };

  const handleFilterChange = (newFilters: Partial<Filter>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          sites={filteredSites}
          selectedSite={selectedSite}
          onSiteSelect={handleSiteSelect}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          filters={filters}
          onFilterChange={handleFilterChange}
        />
        
        <main className="flex-1 relative overflow-hidden">
          <MapView
            sites={filteredSites}
            selectedSite={selectedSite}
            onSiteSelect={handleSiteSelect}
          />
          
          {selectedSite && (
            <SitePanel
              site={selectedSite}
              onClose={() => setSelectedSite(null)}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;