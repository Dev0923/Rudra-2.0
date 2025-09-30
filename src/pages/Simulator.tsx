import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Settings } from 'lucide-react';
import Navbar from '../components/Navbar';
import RiskGauge from '../components/RiskGauge';
import { calculateRisk, getRiskLevel } from '../data/mockData';
import { SimulationParams, Site } from '../types';

const Simulator: React.FC = () => {
  const [params, setParams] = useState<SimulationParams>({
    rainfall: 25,
    slopeAngle: 30,
    soilMoisture: 50,
    vibration: 5,
    temperature: 25,
  });

  const [riskPercentage, setRiskPercentage] = useState(42);
  const [riskLevel, setRiskLevel] = useState<Site['riskLevel']>('moderate');
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    // Simulate calculation delay
    setIsRunning(true);
    const timer = setTimeout(() => {
      const newRisk = calculateRisk(params);
      setRiskPercentage(newRisk);
      setRiskLevel(getRiskLevel(newRisk));
      setIsRunning(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [params]);

  const handleParamChange = (param: keyof SimulationParams, value: number) => {
    setParams(prev => ({ ...prev, [param]: value }));
  };

  const resetToDefaults = () => {
    setParams({
      rainfall: 25,
      slopeAngle: 30,
      soilMoisture: 50,
      vibration: 5,
      temperature: 25,
    });
  };

  const runSimulation = () => {
    // Force a recalculation
    setIsRunning(true);
    setTimeout(() => {
      const newRisk = calculateRisk(params);
      setRiskPercentage(newRisk);
      setRiskLevel(getRiskLevel(newRisk));
      setIsRunning(false);
    }, 1000);
  };

  const sliders = [
    {
      key: 'rainfall',
      label: 'Rainfall',
      value: params.rainfall,
      min: 0,
      max: 100,
      unit: 'mm',
      icon: '🌧️',
      description: 'Current rainfall intensity'
    },
    {
      key: 'slopeAngle',
      label: 'Slope Angle',
      value: params.slopeAngle,
      min: 0,
      max: 60,
      unit: '°',
      icon: '📐',
      description: 'Geological slope steepness'
    },
    {
      key: 'soilMoisture',
      label: 'Soil Moisture',
      value: params.soilMoisture,
      min: 0,
      max: 100,
      unit: '%',
      icon: '💧',
      description: 'Soil water content level'
    },
    {
      key: 'vibration',
      label: 'Vibration',
      value: params.vibration,
      min: 0,
      max: 20,
      unit: 'Hz',
      icon: '📳',
      description: 'Seismic or traffic-induced vibrations'
    },
    {
      key: 'temperature',
      label: 'Temperature',
      value: params.temperature,
      min: -10,
      max: 50,
      unit: '°C',
      icon: '🌡️',
      description: 'Environmental temperature'
    },
  ];

  const getRecommendations = () => {
    const recommendations = [];
    
    if (params.rainfall > 40) {
      recommendations.push('High rainfall detected - consider drainage improvements');
    }
    if (params.slopeAngle > 45) {
      recommendations.push('Steep slope angle - slope stabilization recommended');
    }
    if (params.soilMoisture > 70) {
      recommendations.push('High soil moisture - install water management systems');
    }
    if (params.vibration > 10) {
      recommendations.push('Excessive vibrations - implement vibration dampening');
    }
    
    if (recommendations.length === 0) {
      recommendations.push('Conditions are within acceptable parameters');
    }
    
    return recommendations;
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Risk Simulation</h1>
          <p className="text-gray-400">
            Adjust environmental parameters to see real-time risk predictions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Settings className="h-5 w-5 text-blue-400" />
                  <h2 className="text-lg font-semibold text-white">Simulation Parameters</h2>
                </div>
                <button
                  onClick={resetToDefaults}
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-md transition-colors duration-200"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Reset</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sliders.map((slider) => (
                  <div key={slider.key} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{slider.icon}</span>
                        <label className="text-sm font-medium text-gray-200">
                          {slider.label}
                        </label>
                      </div>
                      <span className="text-sm font-semibold text-white">
                        {slider.value.toFixed(1)} {slider.unit}
                      </span>
                    </div>
                    
                    <input
                      type="range"
                      min={slider.min}
                      max={slider.max}
                      step={0.1}
                      value={slider.value}
                      onChange={(e) => handleParamChange(slider.key as keyof SimulationParams, parseFloat(e.target.value))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                    
                    <p className="text-xs text-gray-400">{slider.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-700">
                <button
                  onClick={runSimulation}
                  disabled={isRunning}
                  className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-md transition-colors duration-200"
                >
                  <Play className="h-4 w-4" />
                  <span>{isRunning ? 'Running Simulation...' : 'Run Simulation'}</span>
                </button>
              </div>
            </div>

            {/* Recommendations */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-white mb-4">AI Recommendations</h3>
              <div className="space-y-3">
                {getRecommendations().map((recommendation, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-gray-300">{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {/* Risk Gauge */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-white mb-4 text-center">
                Predicted Risk Level
              </h3>
              <div className="flex justify-center">
                {isRunning ? (
                  <div className="flex items-center justify-center h-40">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
                  </div>
                ) : (
                  <RiskGauge value={riskPercentage} size={180} />
                )}
              </div>
            </div>

            {/* Risk Breakdown */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Risk Factor Impact</h3>
              <div className="space-y-3">
                {[
                  { name: 'Rainfall', impact: Math.min(params.rainfall / 50 * 100, 100), weight: 30 },
                  { name: 'Slope Angle', impact: Math.min(params.slopeAngle / 45 * 100, 100), weight: 25 },
                  { name: 'Soil Moisture', impact: Math.min(params.soilMoisture / 80 * 100, 100), weight: 20 },
                  { name: 'Vibration', impact: Math.min(params.vibration / 10 * 100, 100), weight: 15 },
                  { name: 'Temperature', impact: Math.abs(params.temperature - 25) / 15 * 100, weight: 10 },
                ].map((factor) => (
                  <div key={factor.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">{factor.name}</span>
                      <span className="text-white font-medium">
                        {factor.impact.toFixed(0)}% (Weight: {factor.weight}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${factor.impact}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Conditions Summary */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Simulation Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Risk Level:</span>
                  <span className={`font-medium capitalize ${
                    riskLevel === 'safe' ? 'text-green-400' :
                    riskLevel === 'moderate' ? 'text-yellow-400' :
                    riskLevel === 'high' ? 'text-orange-400' :
                    'text-red-400'
                  }`}>
                    {riskLevel}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Risk Score:</span>
                  <span className="text-white font-medium">{riskPercentage}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Primary Factor:</span>
                  <span className="text-white font-medium">
                    {params.rainfall > 40 ? 'Rainfall' :
                     params.slopeAngle > 45 ? 'Slope Angle' :
                     params.soilMoisture > 70 ? 'Soil Moisture' :
                     'Multiple Factors'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulator;