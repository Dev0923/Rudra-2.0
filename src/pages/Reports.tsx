import React, { useState } from 'react';
import { Download, FileText, Calendar } from 'lucide-react';
import Navbar from '../components/Navbar';
import { mockSites } from '../data/mockData';

const Reports: React.FC = () => {
  const [selectedSite, setSelectedSite] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('30d');

  // Mock report data
  const reports = [
    {
      id: '1',
      siteName: 'NH-5 Tunnel Exit',
      type: 'Risk Assessment',
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      size: '2.4 MB',
    },
    {
      id: '2',
      siteName: 'Slope-3 Ridge Line',
      type: 'Monthly Summary',
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      size: '1.8 MB',
    },
    {
      id: '3',
      siteName: 'All Sites',
      type: 'System Overview',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      size: '5.2 MB',
    },
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const generateReport = () => {
    alert('Report generation initiated. You will receive an email when ready.');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Reports</h1>
          <p className="text-gray-400">Generate and download site risk assessment reports</p>
        </div>

        {/* Report Generation */}
        <div className="card p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">Generate New Report</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Site</label>
              <select
                value={selectedSite}
                onChange={(e) => setSelectedSite(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Sites</option>
                {mockSites.map((site) => (
                  <option key={site.id} value={site.id}>
                    {site.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Date Range</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:ring-2 focus:ring-blue-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="3m">Last 3 months</option>
                <option value="1y">Last year</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={generateReport}
                className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200"
              >
                Generate Report
              </button>
            </div>
          </div>
        </div>

        {/* Previous Reports */}
        <div className="card">
          <div className="px-6 py-4 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-white">Previous Reports</h2>
          </div>
          
          <div className="divide-y divide-gray-700">
            {reports.map((report) => (
              <div key={report.id} className="p-6 hover:bg-gray-700/30 transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <FileText className="h-8 w-8 text-blue-400" />
                    <div>
                      <h3 className="text-white font-medium">{report.type}</h3>
                      <p className="text-sm text-gray-400">{report.siteName}</p>
                      <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                        <span className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(report.date)}</span>
                        </span>
                        <span>{report.size}</span>
                      </div>
                    </div>
                  </div>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-md transition-colors duration-200">
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;