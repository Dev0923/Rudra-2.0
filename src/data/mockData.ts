import { Site, Alert, RiskFactor } from '../types';

// Mock data for demonstration
export const mockSites: Site[] = [
  {
    id: 'nh-5-tunnel',
    name: 'NH-5 Tunnel Exit',
    type: 'tunnel',
    coordinates: [28.2096, 83.9856], // Nepal coordinates
    riskLevel: 'critical',
    riskPercentage: 85,
    lastUpdated: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    sensors: {
      temperature: 22.5,
      vibration: 8.2,
      rainfall: 45.3,
      soilMoisture: 78.5,
      slopeAngle: 42.0,
    },
    alerts: [
      {
        id: 'alert-1',
        siteId: 'nh-5-tunnel',
        level: 'critical',
        message: 'High rainfall combined with steep slope indicates critical risk',
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
        status: 'active',
      },
    ],
  },
  {
    id: 'slope-3-ridge',
    name: 'Slope-3 Ridge Line',
    type: 'slope',
    coordinates: [28.1906, 83.9756],
    riskLevel: 'moderate',
    riskPercentage: 42,
    lastUpdated: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    sensors: {
      temperature: 24.1,
      vibration: 3.1,
      rainfall: 12.7,
      soilMoisture: 45.2,
      slopeAngle: 28.5,
    },
    alerts: [],
  },
  {
    id: 'road-cut-a1',
    name: 'Highway A1 Cut Section',
    type: 'road-cut',
    coordinates: [28.2196, 83.9956],
    riskLevel: 'high',
    riskPercentage: 68,
    lastUpdated: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    sensors: {
      temperature: 23.8,
      vibration: 5.7,
      rainfall: 32.1,
      soilMoisture: 62.3,
      slopeAngle: 38.2,
    },
    alerts: [
      {
        id: 'alert-2',
        siteId: 'road-cut-a1',
        level: 'warning',
        message: 'Increasing soil moisture levels detected',
        timestamp: new Date(Date.now() - 25 * 60 * 1000),
        status: 'acknowledged',
        actionTaken: 'Increased monitoring frequency',
      },
    ],
  },
  {
    id: 'bridge-support-b2',
    name: 'Bridge Support B2',
    type: 'bridge',
    coordinates: [28.1796, 83.9656],
    riskLevel: 'safe',
    riskPercentage: 18,
    lastUpdated: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
    sensors: {
      temperature: 25.2,
      vibration: 1.8,
      rainfall: 5.4,
      soilMoisture: 25.1,
      slopeAngle: 15.3,
    },
    alerts: [],
  },
  {
    id: 'retaining-wall-rw1',
    name: 'Retaining Wall RW-1',
    type: 'retaining-wall',
    coordinates: [28.2296, 84.0056],
    riskLevel: 'moderate',
    riskPercentage: 35,
    lastUpdated: new Date(Date.now() - 8 * 60 * 1000), // 8 minutes ago
    sensors: {
      temperature: 21.9,
      vibration: 2.9,
      rainfall: 18.6,
      soilMoisture: 41.7,
      slopeAngle: 31.8,
    },
    alerts: [],
  },
];

export const mockRiskFactors: Record<string, RiskFactor[]> = {
  'nh-5-tunnel': [
    { name: 'Rainfall', value: 45.3, impact: 35, description: 'Heavy rainfall increases mining risk' },
    { name: 'Slope Angle', value: 42.0, impact: 25, description: 'Steep slope contributes to instability' },
    { name: 'Soil Moisture', value: 78.5, impact: 20, description: 'High moisture weakens soil structure' },
    { name: 'Vibration', value: 8.2, impact: 15, description: 'Traffic vibrations affect stability' },
    { name: 'Temperature', value: 22.5, impact: 5, description: 'Temperature variation causes expansion' },
  ],
  'slope-3-ridge': [
    { name: 'Slope Angle', value: 28.5, impact: 30, description: 'Moderate slope angle' },
    { name: 'Soil Moisture', value: 45.2, impact: 25, description: 'Moderate moisture levels' },
    { name: 'Rainfall', value: 12.7, impact: 20, description: 'Light rainfall' },
    { name: 'Vibration', value: 3.1, impact: 15, description: 'Low vibration levels' },
    { name: 'Temperature', value: 24.1, impact: 10, description: 'Stable temperature' },
  ],
  'road-cut-a1': [
    { name: 'Rainfall', value: 32.1, impact: 30, description: 'Moderate to heavy rainfall' },
    { name: 'Slope Angle', value: 38.2, impact: 28, description: 'Steep road cut' },
    { name: 'Soil Moisture', value: 62.3, impact: 25, description: 'High moisture content' },
    { name: 'Vibration', value: 5.7, impact: 12, description: 'Vehicle traffic vibrations' },
    { name: 'Temperature', value: 23.8, impact: 5, description: 'Normal temperature range' },
  ],
  'bridge-support-b2': [
    { name: 'Slope Angle', value: 15.3, impact: 40, description: 'Gentle slope, low risk' },
    { name: 'Soil Moisture', value: 25.1, impact: 25, description: 'Low moisture levels' },
    { name: 'Rainfall', value: 5.4, impact: 20, description: 'Minimal rainfall' },
    { name: 'Vibration', value: 1.8, impact: 10, description: 'Very low vibrations' },
    { name: 'Temperature', value: 25.2, impact: 5, description: 'Stable conditions' },
  ],
  'retaining-wall-rw1': [
    { name: 'Slope Angle', value: 31.8, impact: 35, description: 'Moderate slope behind wall' },
    { name: 'Soil Moisture', value: 41.7, impact: 25, description: 'Moderate moisture' },
    { name: 'Rainfall', value: 18.6, impact: 20, description: 'Light to moderate rainfall' },
    { name: 'Vibration', value: 2.9, impact: 15, description: 'Low vibration impact' },
    { name: 'Temperature', value: 21.9, impact: 5, description: 'Cool temperatures' },
  ],
};

export const mockAlerts: Alert[] = [
  {
    id: 'alert-1',
    siteId: 'nh-5-tunnel',
    level: 'critical',
    message: 'High rainfall combined with steep slope indicates critical risk. Immediate action required.',
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    status: 'active',
  },
  {
    id: 'alert-2',
    siteId: 'road-cut-a1',
    level: 'warning',
    message: 'Increasing soil moisture levels detected. Enhanced monitoring recommended.',
    timestamp: new Date(Date.now() - 25 * 60 * 1000),
    status: 'acknowledged',
    actionTaken: 'Increased monitoring frequency to every 15 minutes',
  },
  {
    id: 'alert-3',
    siteId: 'nh-5-tunnel',
    level: 'critical',
    message: 'Vibration sensors detect unusual patterns. Traffic restrictions advised.',
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    status: 'resolved',
    actionTaken: 'Temporary traffic diversion implemented',
  },
  {
    id: 'alert-4',
    siteId: 'retaining-wall-rw1',
    level: 'info',
    message: 'Routine maintenance check completed successfully.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    status: 'resolved',
    actionTaken: 'Visual inspection confirmed structural integrity',
  },
];

// Risk assessment algorithm
export const calculateRisk = (sensors: Site['sensors']): number => {
  const weights = {
    rainfall: 0.3,
    slopeAngle: 0.25,
    soilMoisture: 0.2,
    vibration: 0.15,
    temperature: 0.1,
  };

  // Normalize values to 0-100 scale and apply weights
  const normalizedValues = {
    rainfall: Math.min(sensors.rainfall / 50 * 100, 100),
    slopeAngle: Math.min(sensors.slopeAngle / 45 * 100, 100),
    soilMoisture: Math.min(sensors.soilMoisture / 80 * 100, 100),
    vibration: Math.min(sensors.vibration / 10 * 100, 100),
    temperature: Math.abs(sensors.temperature - 25) / 15 * 100, // deviation from 25°C
  };

  const riskScore = Object.entries(normalizedValues).reduce((acc, [key, value]) => {
    return acc + (value * weights[key as keyof typeof weights]);
  }, 0);

  return Math.round(Math.min(riskScore, 100));
};

export const getRiskLevel = (percentage: number): Site['riskLevel'] => {
  if (percentage >= 75) return 'critical';
  if (percentage >= 50) return 'high';
  if (percentage >= 25) return 'moderate';
  return 'safe';
};

export const getRiskColor = (level: Site['riskLevel']): string => {
  switch (level) {
    case 'safe': return '#10b981';
    case 'moderate': return '#f59e0b';
    case 'high': return '#f97316';
    case 'critical': return '#ef4444';
    default: return '#64748b';
  }
};