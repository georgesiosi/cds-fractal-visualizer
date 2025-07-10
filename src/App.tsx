import React, { useState, useEffect, useCallback } from 'react';
import FractalCanvas from './components/FractalCanvas';
import ControlPanel from './components/ControlPanel';
import Footer from './components/Footer';
import AboutModal from './components/AboutModal';
import { Calculator, Info } from 'lucide-react';

function App() {
  const [realPart, setRealPart] = useState(0);
  const [imagPart, setImagPart] = useState(0);
  const [maxIterations, setMaxIterations] = useState(80);
  const [zoom, setZoom] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [colorScheme, setColorScheme] = useState('classic');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);

  const handleReset = useCallback(() => {
    setRealPart(0);
    setImagPart(0);
    setMaxIterations(80);
    setZoom(1);
    setOffsetX(0);
    setOffsetY(0);
    setColorScheme('classic');
    setIsAnimating(false);
  }, []);

  const handlePresetSelect = useCallback((real: number, imag: number) => {
    setRealPart(real);
    setImagPart(imag);
    setIsAnimating(false);
  }, []);

  const handleToggleAnimation = useCallback(() => {
    setIsAnimating(!isAnimating);
  }, [isAnimating]);

  const handleAboutClick = useCallback(() => {
    setShowAboutModal(true);
  }, []);

  const handleCloseAboutModal = useCallback(() => {
    setShowAboutModal(false);
  }, []);

  // Animation effect
  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setImagPart(prev => {
        const newValue = prev + 0.005;
        return newValue > 2 ? -2 : newValue;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center justify-center">
            <Calculator className="mr-3" size={36} />
            Complex Dynamical Systems Visualizer
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Explore the beautiful world of fractals through the iterative formula f(z) = z² + c
          </p>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="mt-4 flex items-center space-x-2 mx-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <Info size={16} />
            <span>{showInfo ? 'Hide' : 'Show'} Info</span>
          </button>
        </header>

        {showInfo && (
          <div className="mb-8 bg-blue-900/30 border border-blue-700 rounded-lg p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-3">How it works:</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• <strong>Mandelbrot Set (c = 0):</strong> Each pixel represents a different starting point c. The fractal shows which points remain bounded under iteration.</li>
              <li>• <strong>Julia Sets (c ≠ 0):</strong> With a fixed constant c, each pixel represents a different starting point z. Creates stunning, connected fractal patterns.</li>
              <li>• <strong>Controls:</strong> Adjust the real and imaginary parts of c to explore different fractals. Higher iterations reveal more detail.</li>
              <li>• <strong>Animation:</strong> Watch the fractal morph as the imaginary part of c changes continuously.</li>
            </ul>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <div className="bg-white p-4 rounded-lg shadow-2xl overflow-hidden">
              <FractalCanvas
                width={800}
                height={600}
                realPart={realPart}
                imagPart={imagPart}
                maxIterations={maxIterations}
                zoom={zoom}
                offsetX={offsetX}
                offsetY={offsetY}
                colorScheme={colorScheme}
              />
            </div>
          </div>

          <div className="space-y-6">
            <ControlPanel
              realPart={realPart}
              imagPart={imagPart}
              maxIterations={maxIterations}
              zoom={zoom}
              colorScheme={colorScheme}
              isAnimating={isAnimating}
              onRealPartChange={setRealPart}
              onImagPartChange={setImagPart}
              onMaxIterationsChange={setMaxIterations}
              onZoomChange={setZoom}
              onColorSchemeChange={setColorScheme}
              onReset={handleReset}
              onToggleAnimation={handleToggleAnimation}
              onPresetSelect={handlePresetSelect}
            />
          </div>
        </div>

        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>Tip: Try different presets to see various Julia sets, or set both parts to 0 for the classic Mandelbrot set.</p>
        </div>

        <AboutModal 
          isOpen={showAboutModal} 
          onClose={handleCloseAboutModal} 
        />
      </div>
      
      <Footer onAboutClick={handleAboutClick} />
    </div>
  );
}

export default App;