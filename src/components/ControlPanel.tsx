import React, { useState } from 'react';
import { Settings, Sparkles } from 'lucide-react';
import Controls from './Controls';
import PresetButtons from './PresetButtons';

interface ControlPanelProps {
  realPart: number;
  imagPart: number;
  maxIterations: number;
  zoom: number;
  colorScheme: string;
  isAnimating: boolean;
  onRealPartChange: (value: number) => void;
  onImagPartChange: (value: number) => void;
  onMaxIterationsChange: (value: number) => void;
  onZoomChange: (value: number) => void;
  onColorSchemeChange: (scheme: string) => void;
  onReset: () => void;
  onToggleAnimation: () => void;
  onPresetSelect: (real: number, imag: number) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  realPart,
  imagPart,
  maxIterations,
  zoom,
  colorScheme,
  isAnimating,
  onRealPartChange,
  onImagPartChange,
  onMaxIterationsChange,
  onZoomChange,
  onColorSchemeChange,
  onReset,
  onToggleAnimation,
  onPresetSelect,
}) => {
  const [activeTab, setActiveTab] = useState<'parameters' | 'presets'>('parameters');

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Tab Headers */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('parameters')}
          className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 font-medium transition-colors ${
            activeTab === 'parameters'
              ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
          }`}
        >
          <Settings size={18} />
          <span>Parameters</span>
        </button>
        <button
          onClick={() => setActiveTab('presets')}
          className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 font-medium transition-colors ${
            activeTab === 'presets'
              ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
          }`}
        >
          <Sparkles size={18} />
          <span>Presets</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="min-h-[500px]">
        {activeTab === 'parameters' && (
          <div className="p-6">
            <Controls
              realPart={realPart}
              imagPart={imagPart}
              maxIterations={maxIterations}
              zoom={zoom}
              colorScheme={colorScheme}
              isAnimating={isAnimating}
              onRealPartChange={onRealPartChange}
              onImagPartChange={onImagPartChange}
              onMaxIterationsChange={onMaxIterationsChange}
              onZoomChange={onZoomChange}
              onColorSchemeChange={onColorSchemeChange}
              onReset={onReset}
              onToggleAnimation={onToggleAnimation}
            />
          </div>
        )}
        
        {activeTab === 'presets' && (
          <div className="p-6">
            <PresetButtons onPresetSelect={onPresetSelect} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ControlPanel;