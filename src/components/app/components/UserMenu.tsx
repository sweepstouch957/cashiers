"use client";

import { useState, useRef } from 'react';
import { User, LogOut, Camera, X, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { uploadProfileImage } from '@/services/upload.service';
import { updateProfile } from '@/services/auth.service';
import { useAuth } from '@/context/auth-context';
import { useI18n } from '@/i18n/i18n-context';
import { LanguageToggle } from './LanguageToggle';

interface UserMenuProps {
  userName: string;
  userPhoto: string | null;
  onLogout: () => void;
}

type UploadState = 'idle' | 'uploading' | 'success' | 'error';

export function UserMenu({ userName, userPhoto, onLogout }: UserMenuProps) {
  const { user, updateUser } = useAuth();
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [uploadState, setUploadState] = useState<UploadState>('idle');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentPhoto = previewUrl ?? userPhoto;

  const handlePhotoClick = () => fileInputRef.current?.click();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user?._id) return;

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setUploadState('uploading');

    try {
      const { url } = await uploadProfileImage(file);
      await updateProfile(user._id, { profileImage: url });
      updateUser({ profileImage: url });
      setPreviewUrl(url);
      setUploadState('success');
      setTimeout(() => setUploadState('idle'), 2000);
    } catch (err) {
      console.error('Profile photo upload failed:', err);
      setPreviewUrl(null);
      setUploadState('error');
      setTimeout(() => setUploadState('idle'), 3000);
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const statusIcon = () => {
    if (uploadState === 'uploading') return <Loader2 className="w-3.5 h-3.5 text-white animate-spin" />;
    if (uploadState === 'success') return <CheckCircle className="w-3.5 h-3.5 text-white" />;
    if (uploadState === 'error') return <AlertCircle className="w-3.5 h-3.5 text-white" />;
    return <Camera className="w-4 h-4 text-white" />;
  };

  const cameraButtonColor =
    uploadState === 'error' ? 'bg-red-500 hover:bg-red-600' :
      uploadState === 'success' ? 'bg-green-500 hover:bg-green-600' :
        'bg-[#FC0680] hover:bg-[#C90566]';

  return (
    <>
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center overflow-hidden transition-all hover:scale-105 active:scale-95"
      >
        {currentPhoto ? (
          <img src={currentPhoto} alt={userName} className="w-full h-full object-cover" />
        ) : (
          <User className="w-6 h-6 text-[#FC0680]" />
        )}
      </button>

      {/* Menu Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div className="relative bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md p-6 shadow-2xl animate-slide-up">
            {/* Close */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {/* Profile */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FC0680] to-[#FF4DA6] p-1 shadow-lg">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                    {currentPhoto ? (
                      <img src={currentPhoto} alt={userName} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-12 h-12 text-[#FC0680]" />
                    )}
                  </div>
                </div>

                <button
                  onClick={handlePhotoClick}
                  disabled={uploadState === 'uploading'}
                  className={`absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed ${cameraButtonColor}`}
                  title="Change profile photo"
                >
                  {statusIcon()}
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              <h2 className="text-foreground font-semibold mb-0.5">{userName}</h2>
              <p className="text-sm text-muted-foreground">{t.userMenu.cashier}</p>

              {uploadState === 'uploading' && (
                <p className="mt-2 text-xs text-[#FC0680] animate-pulse">{t.userMenu.uploadingPhoto}</p>
              )}
              {uploadState === 'success' && (
                <p className="mt-2 text-xs text-green-600">{t.userMenu.photoUpdated}</p>
              )}
              {uploadState === 'error' && (
                <p className="mt-2 text-xs text-red-500">{t.userMenu.uploadFailed}</p>
              )}
            </div>

            {/* Divider */}
            <div className="h-px bg-border mb-4" />

            {/* Language selector */}
            <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 mb-2">
              <span className="text-sm text-foreground font-medium">{t.userMenu.language}</span>
              <LanguageToggle />
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-colors group"
              >
                <div className="w-10 h-10 bg-red-50 group-hover:bg-red-100 rounded-full flex items-center justify-center transition-colors">
                  <LogOut className="w-5 h-5 text-red-500" />
                </div>
                <span className="text-foreground group-hover:text-red-500 transition-colors">{t.userMenu.logOut}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
      `}</style>
    </>
  );
}
