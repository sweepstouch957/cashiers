"use client";

import { useState } from 'react';
import {
  Lock, Gift, Sparkles, ChevronRight, LockKeyhole,
  BookOpen, X, Loader2, AlertCircle, CheckCircle2,
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CatalogViewer } from './CatalogViewer';
import { useAllRewards, useFeaturedReward } from '@/services/reward.service';
import { useClaimReward } from '@/services/redeem.service';
import { useI18n } from '@/i18n/i18n-context';
import type { BackendReward } from '@/services/reward.service';

// ─── Props ────────────────────────────────────────────────────────────────────

interface RewardsSectionProps {
  totalPoints: number;
  cashierId?: string;
  storeId?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const isAvailable = (pointsCost: number, totalPoints: number) => totalPoints >= pointsCost;
const pointsNeeded = (pointsCost: number, totalPoints: number) =>
  Math.max(0, pointsCost - totalPoints);
const progressPct = (pointsCost: number, totalPoints: number) =>
  Math.min(100, Math.round((totalPoints / pointsCost) * 100));

// ─── Skeleton ────────────────────────────────────────────────────────────────

function RewardSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm animate-pulse">
      <div className="flex gap-4 p-4">
        <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0" />
        <div className="flex-1 space-y-2 py-1">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-100 rounded w-full" />
          <div className="h-3 bg-gray-100 rounded w-5/6" />
          <div className="flex items-center justify-between pt-2">
            <div className="h-4 bg-gray-200 rounded w-20" />
            <div className="h-7 bg-gray-200 rounded w-16" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────

interface ToastProps {
  type: 'success' | 'error';
  message: string;
  onDismiss: () => void;
}

function Toast({ type, message, onDismiss }: ToastProps) {
  return (
    <div
      className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-xl text-sm font-medium text-white transition-all ${type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}
    >
      {type === 'success'
        ? <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
        : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
      <span>{message}</span>
      <button onClick={onDismiss} className="ml-2 opacity-80 hover:opacity-100">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export function RewardsSection({ totalPoints, cashierId, storeId }: RewardsSectionProps) {
  const { t } = useI18n();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState<BackendReward | null>(null);
  const [showCatalog, setShowCatalog] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState<{ url: string; name: string } | null>(null);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // ── Live data ──────────────────────────────────────────────────────────────
  const { data: allRewards = [], isLoading: loadingAll, isError: errorAll } = useAllRewards(storeId);
  const { data: featuredReward, isLoading: loadingFeatured } = useFeaturedReward(storeId);
  const { mutate: claimReward, isPending: claiming } = useClaimReward();

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  // Exclude the featured reward from the "All Rewards" list
  const otherRewards = featuredReward
    ? allRewards.filter(r => r._id !== featuredReward._id)
    : allRewards;

  // ── Claim handler ─────────────────────────────────────────────────────────
  const handleConfirmClaim = () => {
    if (!selectedReward || !cashierId) return;
    claimReward(
      { rewardId: selectedReward._id, cashierId },
      {
        onSuccess: () => {
          showToast('success', t.rewards.successMsg(selectedReward.name));
          setShowConfirmModal(false);
          setSelectedReward(null);
        },
        onError: (err: unknown) => {
          const msg =
            (err as { response?: { data?: { error?: string } } })?.response?.data?.error ??
            t.rewards.loadError;
          showToast('error', msg);
          setShowConfirmModal(false);
          setSelectedReward(null);
        },
      }
    );
  };

  const openConfirm = (reward: BackendReward) => {
    setSelectedReward(reward);
    setShowConfirmModal(true);
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-full bg-background pb-20">

      {/* Header */}
      <div className="bg-gradient-to-r from-[#FC0680] to-[#FF4DA6] px-6 pt-12 pb-8 rounded-b-[2rem] shadow-lg">
        <h1 className="text-white mb-2">{t.rewards.title}</h1>
        <p className="text-white/90">{t.rewards.subtitle}</p>
      </div>

      {/* Current Points + Catalog */}
      <div className="px-6 -mt-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-lg border border-border flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#FC0680]/10 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-[#FC0680]" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t.rewards.yourPoints}</p>
              <p className="text-2xl font-bold text-[#FC0680]">{totalPoints}</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowCatalog(true)}
          className="w-full bg-gradient-to-r from-[#FC0680] to-[#FF4DA6] text-white py-3 px-4 rounded-xl shadow-md hover:shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          <BookOpen className="w-5 h-5" />
          <span className="font-medium">{t.rewards.viewCatalog}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* ── Featured Reward ──────────────────────────────────────────────── */}
      {(loadingFeatured || featuredReward) && (
        <div className="px-6 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Gift className="w-5 h-5 text-[#FC0680]" />
            <h3 className="text-foreground">{t.rewards.featuredReward}</h3>
          </div>

          {loadingFeatured ? (
            <div className="bg-white rounded-2xl overflow-hidden border-2 border-[#FC0680]/20 shadow-lg animate-pulse">
              <div className="h-48 bg-gray-200" />
              <div className="p-4 space-y-3">
                <div className="h-5 bg-gray-200 rounded w-2/3" />
                <div className="h-4 bg-gray-100 rounded w-full" />
                <div className="h-8 bg-gray-200 rounded w-24 ml-auto" />
              </div>
            </div>
          ) : featuredReward && (
            <div className="bg-gradient-to-br from-[#FC0680]/10 to-[#FF4DA6]/10 rounded-2xl overflow-hidden border-2 border-[#FC0680]/20 shadow-lg">
              <div className="relative h-48">
                <ImageWithFallback
                  src={featuredReward.imageUrl ?? ''}
                  alt={featuredReward.name}
                  className="w-full h-full object-cover"
                  onClick={() =>
                    featuredReward.imageUrl &&
                    setEnlargedImage({ url: featuredReward.imageUrl, name: featuredReward.name })
                  }
                />
                {isAvailable(featuredReward.pointsCost, totalPoints) ? (
                  <div className="absolute top-3 right-3 bg-[#FC0680] text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Sparkles className="w-4 h-4" />
                    {t.rewards.availableBadge}
                  </div>
                ) : (
                  <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <LockKeyhole className="w-4 h-4" />
                    {t.rewards.morePts(pointsNeeded(featuredReward.pointsCost, totalPoints))}
                  </div>
                )}
              </div>

              <div className="p-4">
                <h4 className="text-foreground mb-1">{featuredReward.name}</h4>
                {featuredReward.description && (
                  <p className="text-sm text-muted-foreground mb-3">{featuredReward.description}</p>
                )}

                {/* Progress bar */}
                {!isAvailable(featuredReward.pointsCost, totalPoints) && (
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#FC0680] to-[#FF4DA6] h-full rounded-full transition-all duration-500"
                        style={{ width: `${progressPct(featuredReward.pointsCost, totalPoints)}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {t.rewards.progressToward(progressPct(featuredReward.pointsCost, totalPoints))}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#FC0680]" />
                    <span className="font-medium text-foreground">{featuredReward.pointsCost} {t.rewards.yourPoints.toLowerCase()}</span>
                  </div>
                  <button
                    disabled={!isAvailable(featuredReward.pointsCost, totalPoints)}
                    onClick={() => openConfirm(featuredReward)}
                    className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${isAvailable(featuredReward.pointsCost, totalPoints)
                      ? 'bg-[#FC0680] text-white hover:bg-[#C90566] active:scale-95'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                  >
                    {t.rewards.redeem}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── All Rewards ───────────────────────────────────────────────────── */}
      <div className="px-6">
        <h3 className="mb-4 text-foreground">{t.rewards.allRewards}</h3>

        {loadingAll ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => <RewardSkeleton key={i} />)}
          </div>
        ) : errorAll ? (
          <div className="flex flex-col items-center gap-3 py-12 text-muted-foreground">
            <AlertCircle className="w-10 h-10 text-red-400" />
            <p className="text-sm text-center whitespace-pre-line">{t.rewards.loadError}</p>
          </div>
        ) : otherRewards.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-12 text-muted-foreground">
            <Gift className="w-10 h-10 opacity-30" />
            <p className="text-sm">{t.rewards.noRewards}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {otherRewards.map((reward) => (
              <div
                key={reward._id}
                className="bg-white rounded-xl overflow-hidden border border-[#FC0680]/20 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex gap-4 p-4">

                  {/* Image */}
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src={reward.imageUrl ?? ''}
                      alt={reward.name}
                      className="w-full h-full object-cover"
                      onClick={() =>
                        reward.imageUrl &&
                        setEnlargedImage({ url: reward.imageUrl!, name: reward.name })
                      }
                    />
                    {/* Low-stock badge */}
                    {reward.quantity !== -1 && reward.quantity <= 10 && reward.quantity > 0 && (
                      <span className="absolute bottom-0 left-0 right-0 bg-orange-500/90 text-white text-[10px] text-center py-0.5">
                        {t.rewards.lowStock(reward.quantity)}
                      </span>
                    )}
                    {reward.quantity === 0 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Lock className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="text-foreground leading-tight">{reward.name}</h4>
                      {isAvailable(reward.pointsCost, totalPoints) ? (
                        <div className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium flex-shrink-0 ml-2 flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          {t.rewards.available}
                        </div>
                      ) : (
                        <div className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs font-medium flex-shrink-0 ml-2 flex items-center gap-1">
                          <LockKeyhole className="w-3 h-3" />
                          {t.rewards.moreLabel(pointsNeeded(reward.pointsCost, totalPoints))}
                        </div>
                      )}
                    </div>

                    {reward.description && (
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{reward.description}</p>
                    )}

                    {/* Mini progress bar when locked */}
                    {!isAvailable(reward.pointsCost, totalPoints) && (
                      <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden mb-2">
                        <div
                          className="bg-[#FC0680]/60 h-full rounded-full transition-all duration-500"
                          style={{ width: `${progressPct(reward.pointsCost, totalPoints)}%` }}
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#FC0680]" />
                        <span className="text-sm font-medium text-foreground">
                          {reward.pointsCost} pts
                        </span>
                      </div>

                      {isAvailable(reward.pointsCost, totalPoints) && reward.quantity !== 0 && (
                        <button
                          onClick={() => openConfirm(reward)}
                          className="bg-[#FC0680] text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-[#C90566] active:scale-95 transition-all flex items-center gap-1"
                        >
                          {t.rewards.redeem}
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Confirmation Modal ────────────────────────────────────────────── */}
      {showConfirmModal && selectedReward && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-[#FC0680]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-[#FC0680]" />
              </div>
              <h3 className="text-foreground mb-2">{t.rewards.confirmTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.rewards.confirmMsg(selectedReward.name)}
              </p>

              <div className="bg-[#FC0680]/5 rounded-lg p-3 mb-4 text-left">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t.rewards.currentPoints}</span>
                  <span className="font-medium text-foreground">{totalPoints}</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-1">
                  <span className="text-muted-foreground">{t.rewards.rewardCost}</span>
                  <span className="font-medium text-[#FC0680]">-{selectedReward.pointsCost}</span>
                </div>
                <div className="border-t border-[#FC0680]/20 mt-2 pt-2 flex items-center justify-between">
                  <span className="text-muted-foreground">{t.rewards.remaining}</span>
                  <span className="font-bold text-foreground">
                    {totalPoints - selectedReward.pointsCost}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                disabled={claiming}
                onClick={() => { setShowConfirmModal(false); setSelectedReward(null); }}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                {t.rewards.cancel}
              </button>
              <button
                disabled={claiming}
                onClick={handleConfirmClaim}
                className="flex-1 bg-[#FC0680] text-white py-3 rounded-lg hover:bg-[#C90566] transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {claiming ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t.rewards.claiming}
                  </>
                ) : (
                  t.rewards.confirm
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Catalog Viewer */}
      {showCatalog && <CatalogViewer onClose={() => setShowCatalog(false)} />}

      {/* Enlarged Image Modal */}
      {enlargedImage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={() => setEnlargedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setEnlargedImage(null)}
              className="absolute -top-12 right-0 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <div className="absolute -top-12 left-0 text-white">
              <p className="font-medium">{enlargedImage.name}</p>
            </div>
            <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src={enlargedImage.url}
                alt={enlargedImage.name}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* Toast notification */}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onDismiss={() => setToast(null)}
        />
      )}
    </div>
  );
}