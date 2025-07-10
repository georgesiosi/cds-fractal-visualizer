import React from 'react';
import { Play, Pause, RotateCcw, Palette, Zap } from 'lucide-react';

interface ControlsProps {
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
}

const Controls: React.FC<ControlsProps> = ({
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
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Control Settings</h3>
        <div className="flex space-x-2">
          <button
            onClick={onToggleAnimation}
            className="flex items-center space-x-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            {isAnimating ? <Pause size={16} /> : <Play size={16} />}
            <span>{isAnimating ? 'Pause' : 'Animate'}</span>
          </button>
          <button
            onClick={onReset}
            className="flex items-center space-x-2 px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <RotateCcw size={16} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Complex Constant (c = a + bi)
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Real Part (a)</label>
              <input
                type="range"
                min="-2"
                max="2"
                step="0.01"
                value={realPart}
                onChange={(e) => onRealPartChange(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="text-center text-sm text-gray-600 mt-1">
                {realPart.toFixed(3)}
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Imaginary Part (b)</label>
              <input
                type="range"
                min="-2"
                max="2"
                step="0.01"
                value={imagPart}
                onChange={(e) => onImagPartChange(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="text-center text-sm text-gray-600 mt-1">
                {imagPart.toFixed(3)}
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Zap size={16} className="inline mr-1" />
            Max Iterations
          </label>
          <input
            type="range"
            min="10"
            max="200"
            step="10"
            value={maxIterations}
            onChange={(e) => onMaxIterationsChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="text-center text-sm text-gray-600 mt-1">
            {maxIterations}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Zoom Level
          </label>
          <input
            type="range"
            min="0.1"
            max="5"
            step="0.1"
            value={zoom}
            onChange={(e) => onZoomChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="text-center text-sm text-gray-600 mt-1">
            {zoom.toFixed(1)}x
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Palette size={16} className="inline mr-1" />
            Color Scheme
          </label>
          <select
            value={colorScheme}
            onChange={(e) => onColorSchemeChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="classic">Classic</option>
            <option value="fire">Fire</option>
            <option value="ocean">Ocean</option>
            <option value="psychedelic">Psychedelic</option>
          </select>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-2">Current Formula</h4>
        <div className="text-sm text-gray-600 font-mono">
          f(z) = z² + ({realPart.toFixed(3)} + {imagPart.toFixed(3)}i)
        </div>
        <div className="text-xs text-gray-500 mt-2">
          {realPart === 0 && imagPart === 0 
            ? "Mandelbrot Set: Each pixel represents a different value of c"
            : "Julia Set: c is constant, z varies across the complex plane"
          }
        </div>
      </div>
    </div>
  );
};

export default Controls;
  )
}