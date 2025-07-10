import React from 'react';
import { X, Zap, Palette, Calculator, Code } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <Calculator className="mr-3" size={24} />
            About This Visualizer
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">What is this?</h3>
            <p className="text-gray-600 leading-relaxed">
              This is an interactive visualization tool for exploring complex dynamical systems, 
              specifically focusing on the iterative formula <span className="font-mono bg-gray-100 px-1 rounded">f(z) = z² + c</span>. 
              This mathematical relationship is the foundation of both the famous Mandelbrot set and Julia sets.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <Zap className="mr-2" size={18} />
              How it works
            </h3>
            <div className="space-y-3 text-gray-600">
              <p>
                <strong>Mandelbrot Set (c = 0):</strong> Each pixel represents a different starting point c. 
                The fractal shows which points remain bounded under iteration.
              </p>
              <p>
                <strong>Julia Sets (c ≠ 0):</strong> With a fixed constant c, each pixel represents a 
                different starting point z. Creates stunning, connected fractal patterns.
              </p>
              <p>
                The colors represent how quickly points escape to infinity. Points that never escape 
                (remain bounded) are colored black and are part of the fractal set itself.
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <Palette className="mr-2" size={18} />
              Features
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>• <strong>Real-time parameter adjustment</strong> - Watch fractals transform as you change values</li>
              <li>• <strong>Multiple color schemes</strong> - Choose from Classic, Fire, Ocean, and Psychedelic palettes</li>
              <li>• <strong>Animation mode</strong> - See smooth transitions between different fractal states</li>
              <li>• <strong>Fractal presets</strong> - Explore curated examples like Dragon, Lightning, and Spiral patterns</li>
              <li>• <strong>Zoom controls</strong> - Dive into the infinite detail of fractal boundaries</li>
              <li>• <strong>Iteration control</strong> - Adjust computational depth for more detail</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <Code className="mr-2" size={18} />
              Tech Stack
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">Frontend</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• React 18 with TypeScript</li>
                  <li>• Tailwind CSS</li>
                  <li>• Lucide React (icons)</li>
                  <li>• HTML5 Canvas</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">Development</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Vite (build tool)</li>
                  <li>• ESLint (code quality)</li>
                  <li>• PostCSS (CSS processing)</li>
                  <li>• TypeScript (type safety)</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-2">Mathematical Beauty</h4>
              <p className="text-sm text-blue-700">
                Fractals reveal the infinite complexity that can emerge from simple mathematical rules. 
                Each pattern you see represents the boundary between order and chaos in the complex number plane, 
                demonstrating how mathematics can create stunning visual art.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;