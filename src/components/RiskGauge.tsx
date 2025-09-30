import React from 'react';

interface RiskGaugeProps {
  value: number; // 0-100
  size?: number;
  showLabels?: boolean;
}

const RiskGauge: React.FC<RiskGaugeProps> = ({ value, size = 120, showLabels = true }) => {
  const normalizedValue = Math.max(0, Math.min(100, value));
  const angle = (normalizedValue / 100) * 180; // 0 to 180 degrees
  
  const getRiskColor = (val: number) => {
    if (val >= 75) return '#ef4444'; // critical - red
    if (val >= 50) return '#f97316'; // high - orange
    if (val >= 25) return '#f59e0b'; // moderate - yellow
    return '#10b981'; // safe - green
  };

  const getRiskLevel = (val: number) => {
    if (val >= 75) return 'CRITICAL';
    if (val >= 50) return 'HIGH';
    if (val >= 25) return 'MODERATE';
    return 'SAFE';
  };

  const color = getRiskColor(normalizedValue);
  const level = getRiskLevel(normalizedValue);
  
  const radius = size / 2 - 10;
  const centerX = size / 2;
  const centerY = size / 2;
  
  // Create SVG arc path for the gauge background
  const createArcPath = (startAngle: number, endAngle: number, outerRadius: number) => {
    const start = polarToCartesian(centerX, centerY, outerRadius, endAngle);
    const end = polarToCartesian(centerX, centerY, outerRadius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    return [
      "M", start.x, start.y, 
      "A", outerRadius, outerRadius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
  };

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  // Calculate needle position
  const needleAngle = angle - 90; // Convert to SVG coordinate system
  const needleLength = radius - 15;
  const needleX = centerX + needleLength * Math.cos(needleAngle * Math.PI / 180);
  const needleY = centerY + needleLength * Math.sin(needleAngle * Math.PI / 180);

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width={size} height={size * 0.7} className="overflow-visible">
          {/* Background arc */}
          <path
            d={createArcPath(0, 180, radius)}
            fill="none"
            stroke="#374151"
            strokeWidth="8"
            strokeLinecap="round"
          />
          
          {/* Progress arc */}
          <path
            d={createArcPath(0, angle, radius)}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
          />
          
          {/* Risk level segments (background) */}
          {[
            { start: 0, end: 45, color: '#10b981' },    // Safe: 0-25%
            { start: 45, end: 90, color: '#f59e0b' },   // Moderate: 25-50%
            { start: 90, end: 135, color: '#f97316' },  // High: 50-75%
            { start: 135, end: 180, color: '#ef4444' }  // Critical: 75-100%
          ].map((segment, index) => (
            <path
              key={index}
              d={createArcPath(segment.start, segment.end, radius - 4)}
              fill="none"
              stroke={`${segment.color}20`}
              strokeWidth="4"
            />
          ))}
          
          {/* Center circle */}
          <circle
            cx={centerX}
            cy={centerY}
            r="6"
            fill={color}
            className="drop-shadow-sm"
          />
          
          {/* Needle */}
          <line
            x1={centerX}
            y1={centerY}
            x2={needleX}
            y2={needleY}
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
            className="drop-shadow-sm"
          />
          
          {/* Tick marks */}
          {[0, 25, 50, 75, 100].map((tick, index) => {
            const tickAngle = (tick / 100) * 180 - 90;
            const tickStart = polarToCartesian(centerX, centerY, radius - 15, tickAngle + 90);
            const tickEnd = polarToCartesian(centerX, centerY, radius - 5, tickAngle + 90);
            
            return (
              <line
                key={index}
                x1={tickStart.x}
                y1={tickStart.y}
                x2={tickEnd.x}
                y2={tickEnd.y}
                stroke="#9ca3af"
                strokeWidth="2"
              />
            );
          })}
        </svg>
        
        {/* Value display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
          <div className="text-2xl font-bold text-white">
            {normalizedValue}%
          </div>
          {showLabels && (
            <div 
              className="text-xs font-medium mt-1"
              style={{ color }}
            >
              {level}
            </div>
          )}
        </div>
      </div>
      
      {/* Labels */}
      {showLabels && (
        <div className="flex justify-between w-full text-xs text-gray-400 mt-2 px-2">
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
      )}
    </div>
  );
};

export default RiskGauge;