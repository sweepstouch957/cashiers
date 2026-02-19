"use client";

import { Lock, Gift, Sparkles, ChevronRight, LockKeyhole, BookOpen, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';
import { CatalogViewer } from './CatalogViewer';

const bluetoothSpeakerImg = '/assets/b41f0840ee1ec3b2591756608ba9369b6039b239.png';
const wirelessEarbudsImg = '/assets/e83506e82c30c2bae54ad5ee0532834af2e58e0b.png';
const insulatedCoffeeMugImg = '/assets/3a6154ae3798cda7574d362abf563c59cd7789e9.png';
const travelMugSocksGiftBoxImg = '/assets/f8870a94021208a11f892c069c9942fee61c7ad5.png';
const stanleyQuencherImg = '/assets/55aff019b1abef550d68dc89fcd201509dc1b512.png';
const electricSpinningScrubberImg = '/assets/08eb4c5478dde1338e613170b8c0ddee68b754d3.png';
const sephoraGiftCardImg = '/assets/f756bb15c98d5420a2a71bbf8f5c43bb928254e0.png';
const workOrthoticInsolesImg = '/assets/ce7cd9f8ee8a3bf44c875972964a8b983cc3b33e.png';
const solDeJaneiroJetSetImg = '/assets/b9ba81748ddd4e996ebda7620e4db5f7c7657cc8.png';
const ufreeBeardTrimmerImg = '/assets/87b30d25c74ca0e7b91d57194160bcc23d20c057.png';
const homeSpaKitImg = '/assets/487bd229e31a56ac2ed0047cf39aed5e4acec7d0.png';
const olaplexKitImg = '/assets/6eff6cfa66ae70c380a4370970535622ac4f9369.png';
const frameoPictureFrameImg = '/assets/7a0ebdf2c7dd8f029d18f42adcf78304e2d8381e.png';
const sgvMiniProjectorImg = '/assets/b87089a3797aa827fb6d4b6bd4af345993aa61d5.png';
const wavytalkSteamBrushImg = '/assets/2a6c79032ee91f0ef54e089ad1f26cfa49cd6cbe.png';
const skinCareKitImg = '/assets/5c5c216f5d640e8ac572977e46123ef939b283b7.png';
const echoDotImg = '/assets/e5abad9407a980f947e9eb2037a3eb46836e1a44.png';
const confuBlowDryerImg = '/assets/8dc9ca75d102e356585ea3869b17534c965fa1fa.png';
const trulyShaveSetImg = '/assets/01b488057ac31473e3d1ddcbc124787696ef4689.png';
const gourmiaAirFryerImg = '/assets/287a26709336827bbe1eb15b0301cc3c6b4f336e.png';
const samsungTvImg = '/assets/ab0cbb27441fa385f8f8205736b4c683db84b5b4.png';


interface RewardsSectionProps {
  totalPoints: number;
  onRedeem: (reward: { id: string; name: string; description: string; pointsRequired: number; imageUrl: string }) => void;
}

interface Reward {
  id: string;
  name: string;
  description: string;
  pointsRequired: number;
  imageUrl: string;
  isFeatured?: boolean;
}

export function RewardsSection({ totalPoints, onRedeem }: RewardsSectionProps) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [showCatalog, setShowCatalog] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState<{ url: string; name: string } | null>(null);

  const rewards: Reward[] = [
  
    {
      id: '7',
      name: 'Bluetooth Speaker',
      description: 'Portable Wireless & IPX5 Waterproof',
      pointsRequired: 29,
      imageUrl: bluetoothSpeakerImg,
    },
    {
      id: '8',
      name: 'Wireless Earbuds',
      description: 'Waterproof Bluetooth Earbuds for Laptop/Phones/Sports',
      pointsRequired: 35,
      imageUrl: wirelessEarbudsImg,
    },
    {
      id: '9',
      name: 'Insulated Coffee Mug',
      description: 'Dravizon Stainless Steel Vacuum Insulated Coffee Mug 510ML',
      pointsRequired: 37,
      imageUrl: insulatedCoffeeMugImg,
    },
    {
      id: '10',
      name: 'Travel Mug & Socks Gift Box',
      description: 'luxurious gift box containing an AD thermal travel mug & under boot knee high socks.',
      pointsRequired: 40,
      imageUrl: travelMugSocksGiftBoxImg,
    },
    {
      id: '11',
      name: 'STANLEY Quencher H2.0 Tumbler',
      description: 'combines functionality and style in one iconic design.',
      pointsRequired: 45,
      imageUrl: stanleyQuencherImg,
    },
    {
      id: '12',
      name: 'Electric Spinning Scrubber',
      description: 'Power Electric Scrubber for Cleaning.',
      pointsRequired: 48,
      imageUrl: electricSpinningScrubberImg,
    },
    {
      id: '13',
      name: 'Sephora Gift Card',
      description: 'Redeemable for a wide selection of beauty products at Sephora stores or online.',
      pointsRequired: 50,
      imageUrl: sephoraGiftCardImg,
    },
    {
      id: '14',
      name: 'Work Orthotic Insoles',
      description: 'Anti Fatigue Medium Arch Support Shoe Insert.',
      pointsRequired: 50,
      imageUrl: workOrthoticInsolesImg,
    },
    {
      id: '23',
      name: 'SOL DE JANEIRO Jet Set',
      description: 'Caffeine-rich guarana visibly firms and tightens skin.',
      pointsRequired: 62,
      imageUrl: solDeJaneiroJetSetImg,
    },
    {
      id: '24',
      name: 'Ufree Beard Trimmer',
      description: 'Electric Razor for Nose, Body, Face & Mustache, Cordless Hair Clippers Shavers Grooming Kit.',
      pointsRequired: 65,
      imageUrl: ufreeBeardTrimmerImg,
    },
    {
      id: '25',
      name: 'Home Spa Kit',
      description: 'Luxury Spa Gift Box for Her | Cozy Self Care Valentine Gift.',
      pointsRequired: 70,
      imageUrl: homeSpaKitImg,
    },
    {
      id: '26',
      name: 'Olaplex Kit',
      description: 'FULL-ON SHINE SET, limited-edition set for shiny, smooth, strong hair in one use.',
      pointsRequired: 75,
      imageUrl: olaplexKitImg,
    },
    {
      id: '15',
      name: 'Frameo Digital Picture Frame',
      description: 'Electronic Photo Frame Load from Phone, Touch Screen HD Display.',
      pointsRequired: 75,
      imageUrl: frameoPictureFrameImg,
    },
    {
      id: '16',
      name: 'Echo Dot',
      description: 'Amazon Echo Dot (newest model).',
      pointsRequired: 105,
      imageUrl: echoDotImg,
    },
    {
      id: '17',
      name: 'CONFU Ionic Blow Dryer',
      description: 'Fast Drying Negative Ion Hairdryer Blowdryer.',
      pointsRequired: 106,
      imageUrl: confuBlowDryerImg,
    },
    {
      id: '18',
      name: 'Truly Luxury Shave Set',
      description: 'Complete 3-step shave set in a fuzzy, travel-ready pouch.',
      pointsRequired: 120,
      imageUrl: trulyShaveSetImg,
    },
    {
      id: '19',
      name: 'Gourmia Digital Air Fryer',
      description: '8 Qt Digital Air Fryer GAF826 – XL Capacity with 12 One-Touch Presets.',
      pointsRequired: 127,
      imageUrl: gourmiaAirFryerImg,
    },
    {
      id: '20',
      name: 'SGV Smart Mini Projector',
      description: 'Outdoor Projector with WiFi and Bluetooth for Home Theater Outdoor Movie.',
      pointsRequired: 90,
      imageUrl: sgvMiniProjectorImg,
    },
    {
      id: '21',
      name: 'Wavytalk Pro Steam',
      description: 'Wavytalk Pro Steam Hair Straightener Brush.',
      pointsRequired: 95,
      imageUrl: wavytalkSteamBrushImg,
    },
    {
      id: '22',
      name: 'Skin Care Kit',
      description: 'Rice Raw Pulp Rejuvenating Moisturizing Face Cream Cleanser Toner Lotion Eye Cream.',
      pointsRequired: 100,
      imageUrl: skinCareKitImg,
    },
    {
      id: '27',
      name: 'Samsung Smart TV 65-Inch 4K',
      description: 'Samsung Smart TV Crystal UHD U8000F 4K de 65 inches and built-in Alexa.',
      pointsRequired: 500,
      imageUrl: samsungTvImg,
      isFeatured: true,
    },
  ];

  const featuredReward = rewards.find(r => r.isFeatured);
  const otherRewards = rewards.filter(r => !r.isFeatured);

  // Helper function to check if reward is available
  const isRewardAvailable = (pointsRequired: number) => totalPoints >= pointsRequired;

  // Helper function to calculate points needed
  const getPointsNeeded = (pointsRequired: number) => {
    return Math.max(0, pointsRequired - totalPoints);
  };

  // Function to open PDF catalog
  const handleViewCatalog = () => {
    // Replace this URL with your actual PDF catalog URL
    // You can upload your PDF to the public folder or use an external URL
    const catalogUrl = '/catalog.pdf'; // Replace with your PDF path
    window.open(catalogUrl, '_blank');
  };

  return (
    <div className="min-h-full bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#FC0680] to-[#FF4DA6] px-6 pt-12 pb-8 rounded-b-[2rem] shadow-lg">
        <h1 className="text-white mb-2">Rewards</h1>
        <p className="text-white/90">Redeem your points for amazing rewards</p>
      </div>

      {/* Current Points */}
      <div className="px-6 -mt-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-lg border border-border flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#FC0680]/10 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-[#FC0680]" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Your Points</p>
              <p className="text-2xl font-bold text-[#FC0680]">{totalPoints}</p>
            </div>
          </div>
        </div>

        {/* View Catalog Button */}
        <button
          onClick={() => setShowCatalog(true)}
          className="w-full bg-gradient-to-r from-[#FC0680] to-[#FF4DA6] text-white py-3 px-4 rounded-xl shadow-md hover:shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          <BookOpen className="w-5 h-5" />
          <span className="font-medium">View Full Catalog</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Featured Reward */}
      {featuredReward && (
        <div className="px-6 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Gift className="w-5 h-5 text-[#FC0680]" />
            <h3 className="text-foreground">Featured Reward</h3>
          </div>
          
          <div className="bg-gradient-to-br from-[#FC0680]/10 to-[#FF4DA6]/10 rounded-2xl overflow-hidden border-2 border-[#FC0680]/20 shadow-lg">
            <div className="relative h-48">
              <ImageWithFallback
                src={featuredReward.imageUrl}
                alt={featuredReward.name}
                className="w-full h-full object-cover"
                onClick={() => setEnlargedImage({ url: featuredReward.imageUrl, name: featuredReward.name })}
              />
              {isRewardAvailable(featuredReward.pointsRequired) ? (
                <div className="absolute top-3 right-3 bg-[#FC0680] text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <Sparkles className="w-4 h-4" />
                  Available!
                </div>
              ) : (
                <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <LockKeyhole className="w-4 h-4" />
                  {getPointsNeeded(featuredReward.pointsRequired)} more pts
                </div>
              )}
            </div>
            
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="text-foreground mb-1">{featuredReward.name}</h4>
                  <p className="text-sm text-muted-foreground">{featuredReward.description}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#FC0680]" />
                  <span className="font-medium text-foreground">{featuredReward.pointsRequired} points</span>
                </div>
                
                <button
                  disabled={!isRewardAvailable(featuredReward.pointsRequired)}
                  className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                    isRewardAvailable(featuredReward.pointsRequired)
                      ? 'bg-[#FC0680] text-white hover:bg-[#C90566] active:scale-95'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                  onClick={() => {
                    setSelectedReward(featuredReward);
                    setShowConfirmModal(true);
                  }}
                >
                  Redeem
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* All Rewards */}
      <div className="px-6">
        <h3 className="mb-4 text-foreground">All Rewards</h3>
        
        <div className="space-y-3">
          {otherRewards.map((reward) => (
            <div
              key={reward.id}
              className="bg-white rounded-xl overflow-hidden border border-[#FC0680]/30 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex gap-4 p-4">
                <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src={reward.imageUrl}
                    alt={reward.name}
                    className="w-full h-full object-cover"
                    onClick={() => setEnlargedImage({ url: reward.imageUrl, name: reward.name })}
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="text-foreground">{reward.name}</h4>
                    {isRewardAvailable(reward.pointsRequired) ? (
                      <div className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium flex-shrink-0 ml-2 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Available
                      </div>
                    ) : (
                      <div className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs font-medium flex-shrink-0 ml-2 flex items-center gap-1">
                        <LockKeyhole className="w-3 h-3" />
                        {getPointsNeeded(reward.pointsRequired)} more
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{reward.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#FC0680]" />
                      <span className="text-sm font-medium text-foreground">
                        {reward.pointsRequired} points
                      </span>
                    </div>
                    
                    {isRewardAvailable(reward.pointsRequired) && (
                      <button
                        onClick={() => {
                          setSelectedReward(reward);
                          setShowConfirmModal(true);
                        }}
                        className="bg-[#FC0680] text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-[#C90566] active:scale-95 transition-all flex items-center gap-1"
                      >
                        Redeem
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && selectedReward && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-[#FC0680]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-[#FC0680]" />
              </div>
              <h3 className="text-foreground mb-2">Confirm Redemption</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Are you sure you want to redeem <span className="font-medium text-foreground">{selectedReward.name}</span>?
              </p>
              <div className="bg-[#FC0680]/5 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Current Points:</span>
                  <span className="font-medium text-foreground">{totalPoints}</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-1">
                  <span className="text-muted-foreground">Reward Cost:</span>
                  <span className="font-medium text-[#FC0680]">-{selectedReward.pointsRequired}</span>
                </div>
                <div className="border-t border-[#FC0680]/20 mt-2 pt-2 flex items-center justify-between">
                  <span className="text-muted-foreground">Remaining Points:</span>
                  <span className="font-bold text-foreground">{totalPoints - selectedReward.pointsRequired}</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  setSelectedReward(null);
                }}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onRedeem(selectedReward);
                  setShowConfirmModal(false);
                  setSelectedReward(null);
                }}
                className="flex-1 bg-[#FC0680] text-white py-3 rounded-lg hover:bg-[#C90566] transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Catalog Viewer */}
      {showCatalog && (
        <CatalogViewer
          onClose={() => setShowCatalog(false)}
        />
      )}

      {/* Enlarged Image Modal */}
      {enlargedImage && (
        <div 
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={() => setEnlargedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            {/* Close button */}
            <button
              onClick={() => setEnlargedImage(null)}
              className="absolute -top-12 right-0 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Reward name */}
            <div className="absolute -top-12 left-0 text-white">
              <p className="font-medium">{enlargedImage.name}</p>
            </div>

            {/* Image */}
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
    </div>
  );
}