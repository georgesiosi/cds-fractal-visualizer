import React from 'react';
import { Sparkles } from 'lucide-react';

interface PresetButtonsProps {
  onPresetSelect: (real: number, imag: number) => void;
}

const PresetButtons: React.FC<PresetButtonsProps> = ({ onPresetSelect }) => {
  const presets = [
    { name: 'Mandelbrot', real: 0, imag: 0, description: 'Classic Mandelbrot Set' },
    { name: 'Dragon', real: -0.7269, imag: 0.1889, description: 'Dragon-like fractal' },
    { name: 'Lightning', real: -0.8, imag: 0.156, description: 'Lightning bolt pattern' },
    { name: 'Spiral', real: -0.75, imag: 0.1, description: 'Spiral arms' },
    { name: 'Dendrite', real: -0.235, imag: 0.827, description: 'Tree-like branches' },
    { name: 'Airplane', real: -0.7, imag: 0.27015, description: 'Airplane silhouette' },
    { name: 'Siegel Disk', real: -0.391, imag: -0.587, description: 'Circular patterns' },
    { name: 'Rabbit', real: -0.123, imag: 0.745, description: 'Rabbit-like shapes' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <Sparkles className="mr-2" size={20} />
        Fractal Presets
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {presets.map((preset, index) => (
          <button
            key={index}
            onClick={() => onPresetSelect(preset.real, preset.imag)}
            className="p-3 text-left border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all group"
          >
            <div className="font-medium text-gray-800 group-hover:text-blue-600">
              {preset.name}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {preset.description}
            </div>
            <div className="text-xs font-mono text-gray-400 mt-1">
              {preset.real.toFixed(3)} + {preset.imag.toFixed(3)}i
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PresetButtons;