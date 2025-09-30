export interface Site {
  id: string;
  name: string;
  type: 'tunnel' | 'slope' | 'road-cut' | 'bridge' | 'retaining-wall';
  coordinates: [number, number];
  riskLevel: 'safe' | 'moderate' | 'high' | 'critical';
  riskPercentage: number;
  lastUpdated: Date;
  sensors: {
    temperature: number;
    vibration: number;
    rainfall: number;
    soilMoisture: number;
    slopeAngle: number;
  };
  alerts: Alert[];
}

export interface Alert {
  id: string;
  siteId: string;
  level: 'info' | 'warning' | 'critical';
  message: string;
  timestamp: Date;
  status: 'active' | 'acknowledged' | 'resolved';
  actionTaken?: string;
}

export interface RiskFactor {
  name: string;
  value: number;
  impact: number;
  description: string;
}

export interface SimulationParams {
  rainfall: number;
  slopeAngle: number;
  soilMoisture: number;
  vibration: number;
  temperature: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'operator' | 'viewer';
}

export type TimeRange = '24h' | '7d' | '30d' | '3m' | '1y';

export interface Filter {
  riskLevels: Array<'safe' | 'moderate' | 'high' | 'critical'>;
  siteTypes: Array<Site['type']>;
  timeRange: TimeRange;
}