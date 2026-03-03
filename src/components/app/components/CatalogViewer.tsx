"use client";

import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useI18n } from '@/i18n/i18n-context';


interface CatalogViewerProps {
  onClose: () => void;
}

export function CatalogViewer({ onClose }: CatalogViewerProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const { locale } = useI18n();

  // Suffix is empty for English, '_es' for Spanish
  const suffix = locale === 'es' ? '_es' : '';


  const catalogPages = Array.from({ length: 6 }, (_, i) =>
    `/assets/page_${i + 1}${suffix}.png`
  );

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
            className={`transition-all ${index === currentPage
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
          className={`flex-1 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${currentPage === 0
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-[#FC0680] text-white hover:bg-[#C90566] active:scale-98'
            }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage === catalogPages.length - 1}
          className={`flex-1 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${currentPage === catalogPages.length - 1
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