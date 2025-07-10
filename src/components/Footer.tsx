import React from 'react';

interface FooterProps {
  onAboutClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAboutClick }) => {
  return (
    <footer className="bg-slate-800 border-t border-slate-700 py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center space-x-2 text-sm text-gray-300">
          <span>made by</span>
          <a
            href="https://x.com/georgesiosi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            @georgesiosi
          </a>
          <span className="text-gray-500">|</span>
          <button
            onClick={onAboutClick}
            className="text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
          >
            about
          </button>
          <span className="text-gray-500">|</span>
          <span>built with</span>
          <a
            href="https://bolt.new"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            bolt.new
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;