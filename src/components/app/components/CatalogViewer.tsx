"use client";

import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const catalogCover = '/assets/6452ba987eafffe4e50095aa55787bcd48073049.png';
const catalogPage1 = '/assets/c0e30860ab4572461e01f42571ce71d80c37b839.png';
const catalogPage2 = '/assets/47e5d8aa92d0d3a1a77e229303e091493a6f7167.png';
const catalogPage3 = '/assets/799e801fec800c8075e6f319a9f992ec21e3b10b.png';
const catalogPage4 = '/assets/4e1696330e9c67ba9e5773369e601b7e84e876e3.png';
const catalogPage5 = '/assets/5efb783e30d18d04b34c09783d8b0c51c8e067e2.png';
const catalogPage6 = '/assets/9c6d336a77ae812f1438127dac46c763a1203423.png';
const catalogPage7 = '/assets/7c8459bc9275b383269d3d5b67d6935c7dd2a1f0.png';
const catalogPage8 = '/assets/8e06fad066802359980c447a07ea2d32d46613ad.png';
const catalogPage9 = '/assets/25e516a349f342a6bfdd09f442a20a28ba4932ad.png';
const catalogPage10 = '/assets/1ae2d6e424910914235e799bc528bccbbbc98c93.png';


interface CatalogViewerProps {
  onClose: () => void;
}

export function CatalogViewer({ onClose }: CatalogViewerProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const catalogPages = [
    catalogCover,
    catalogPage1,
    catalogPage2,
    catalogPage3,
    catalogPage4,
    catalogPage5,
    catalogPage6,
    catalogPage7,
    catalogPage8,
    catalogPage9,
    catalogPage10,
  ];

  const nextPage = () => {
    if (currentPage < catalogPages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#FC0680] to-[#FF4DA6] px-4 py-3 flex items-center justify-between shadow-lg">
        <div>
          <h2 className="text-white font-bold">Awards Catalog 2026</h2>
          <p className="text-white/80 text-sm">Page {currentPage + 1} of {catalogPages.length}</p>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Catalog Content */}
      <div className="flex-1 relative overflow-hidden bg-gray-100">
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <img
            src={catalogPages[currentPage]}
            alt={`Catalog page ${currentPage + 1}`}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          />
        </div>
      </div>

      {/* Page Indicators - Below image */}
      <div className="bg-white px-4 py-3 flex items-center justify-center gap-2">
        {catalogPages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index)}
            className={`transition-all ${
              index === currentPage
                ? 'w-8 h-2 bg-[#FC0680] rounded-full'
                : 'w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Navigation Buttons - Below dots */}
      <div className="bg-white px-4 py-3 border-t border-border flex gap-3">
        <button
          onClick={previousPage}
          disabled={currentPage === 0}
          className={`flex-1 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
            currentPage === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-[#FC0680] text-white hover:bg-[#C90566] active:scale-98'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage === catalogPages.length - 1}
          className={`flex-1 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
            currentPage === catalogPages.length - 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-[#FC0680] text-white hover:bg-[#C90566] active:scale-98'
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}