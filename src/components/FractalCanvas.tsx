import React, { useRef, useEffect, useCallback } from 'react';

interface FractalCanvasProps {
  width: number;
  height: number;
  realPart: number;
  imagPart: number;
  maxIterations: number;
  zoom: number;
  offsetX: number;
  offsetY: number;
  colorScheme: string;
}

const FractalCanvas: React.FC<FractalCanvasProps> = ({
  width,
  height,
  realPart,
  imagPart,
  maxIterations,
  zoom,
  offsetX,
  offsetY,
  colorScheme,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const mandelbrot = useCallback((cx: number, cy: number, maxIter: number) => {
    let zx = 0;
    let zy = 0;
    let iteration = 0;

    while (zx * zx + zy * zy < 4 && iteration < maxIter) {
      const xtemp = zx * zx - zy * zy + cx;
      zy = 2 * zx * zy + cy;
      zx = xtemp;
      iteration++;
    }

    return iteration;
  }, []);

  const juliaSet = useCallback((zx: number, zy: number, cx: number, cy: number, maxIter: number) => {
    let iteration = 0;

    while (zx * zx + zy * zy < 4 && iteration < maxIter) {
      const xtemp = zx * zx - zy * zy + cx;
      zy = 2 * zx * zy + cy;
      zx = xtemp;
      iteration++;
    }

    return iteration;
  }, []);

  const getColor = useCallback((iteration: number, maxIter: number, scheme: string) => {
    if (iteration === maxIter) {
      return [0, 0, 0, 255]; // Black for points in the set
    }

    const t = iteration / maxIter;
    
    switch (scheme) {
      case 'classic':
        return [
          Math.floor(255 * (1 - t)),
          Math.floor(255 * (1 - t) * t * 4),
          Math.floor(255 * t),
          255
        ];
      case 'fire':
        return [
          Math.floor(255 * Math.min(1, t * 3)),
          Math.floor(255 * Math.max(0, Math.min(1, t * 3 - 1))),
          Math.floor(255 * Math.max(0, Math.min(1, t * 3 - 2))),
          255
        ];
      case 'ocean':
        return [
          Math.floor(255 * t * 0.3),
          Math.floor(255 * t * 0.7),
          Math.floor(255 * (0.3 + t * 0.7)),
          255
        ];
      case 'psychedelic':
        return [
          Math.floor(255 * (0.5 + 0.5 * Math.sin(t * Math.PI * 6))),
          Math.floor(255 * (0.5 + 0.5 * Math.sin(t * Math.PI * 6 + 2))),
          Math.floor(255 * (0.5 + 0.5 * Math.sin(t * Math.PI * 6 + 4))),
          255
        ];
      default:
        return [
          Math.floor(255 * t),
          Math.floor(255 * t * 0.8),
          Math.floor(255 * (1 - t)),
          255
        ];
    }
  }, []);

  const drawFractal = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    // Determine if we're rendering Mandelbrot or Julia set
    const isCustomConstant = realPart !== 0 || imagPart !== 0;

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        // Map pixel coordinates to complex plane
        const zx = (x - width / 2) / (zoom * width / 4) + offsetX;
        const zy = (y - height / 2) / (zoom * height / 4) + offsetY;

        let iteration;
        if (isCustomConstant) {
          // Julia set: z varies, c is constant
          iteration = juliaSet(zx, zy, realPart, imagPart, maxIterations);
        } else {
          // Mandelbrot set: c varies, z starts at 0
          iteration = mandelbrot(zx, zy, maxIterations);
        }

        const color = getColor(iteration, maxIterations, colorScheme);
        const pixelIndex = (y * width + x) * 4;

        data[pixelIndex] = color[0];     // Red
        data[pixelIndex + 1] = color[1]; // Green
        data[pixelIndex + 2] = color[2]; // Blue
        data[pixelIndex + 3] = color[3]; // Alpha
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }, [width, height, realPart, imagPart, maxIterations, zoom, offsetX, offsetY, colorScheme, mandelbrot, juliaSet, getColor]);

  useEffect(() => {
    drawFractal();
  }, [drawFractal]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="border border-gray-300 rounded-lg shadow-lg cursor-crosshair w-full h-auto max-w-full"
      style={{ aspectRatio: `${width}/${height}` }}
    />
  );
};

export default FractalCanvas;