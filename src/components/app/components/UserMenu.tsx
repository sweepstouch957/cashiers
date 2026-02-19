"use client";

import { useState, useRef } from 'react';
import { User, LogOut, Camera, X } from 'lucide-react';

interface UserMenuProps {
  userName: string;
  userPhoto: string | null;
  onPhotoUpload: (photo: string) => void;
  onLogout: () => void;
}

export function UserMenu({ userName, userPhoto, onPhotoUpload, onLogout }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onPhotoUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center overflow-hidden transition-all hover:scale-105 active:scale-95"
      >
        {userPhoto ? (
          <img src={userPhoto} alt={userName} className="w-full h-full object-cover" />
        ) : (
          <User className="w-6 h-6 text-[#FC0680]" />
        )}
      </button>

      {/* Menu Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu Content */}
          <div className="relative bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md p-6 shadow-2xl animate-slide-up">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {/* Profile Section */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FC0680] to-[#FF4DA6] p-1 shadow-lg">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                    {userPhoto ? (
                      <img src={userPhoto} alt={userName} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-12 h-12 text-[#FC0680]" />
                    )}
                  </div>
                </div>
                
                {/* Upload Photo Button */}
                <button
                  onClick={handlePhotoClick}
                  className="absolute bottom-0 right-0 w-8 h-8 bg-[#FC0680] rounded-full flex items-center justify-center shadow-lg hover:bg-[#C90566] transition-all active:scale-95"
                >
                  <Camera className="w-4 h-4 text-white" />
                </button>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              <h2 className="text-foreground mb-1">{userName}</h2>
              <p className="text-sm text-muted-foreground">Cashier</p>
            </div>

            {/* Divider */}
            <div className="h-px bg-border mb-4" />

            {/* Menu Options */}
            <div className="space-y-2">
              {/* Logout Button */}
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-colors group"
              >
                <div className="w-10 h-10 bg-red-50 group-hover:bg-red-100 rounded-full flex items-center justify-center transition-colors">
                  <LogOut className="w-5 h-5 text-red-500" />
                </div>
                <span className="text-foreground group-hover:text-red-500 transition-colors">Log Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
