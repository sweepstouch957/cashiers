// src/i18n/locales/en.ts

// ─── Translations interface ────────────────────────────────────────────────
// All string values are string (not literals) so es.ts can satisfy this type.

export interface Translations {
  nav: {
    home: string;
    history: string;
    rewards: string;
    redeemed: string;
  };
  login: {
    title: string;
    subtitle: string;
    welcomeBack: string;
    cashierCode: string;
    codePlaceholder: string;
    loginBtn: string;
    loggingIn: string;
    footer: string;
  };
  userMenu: {
    cashier: string;
    uploadingPhoto: string;
    photoUpdated: string;
    uploadFailed: string;
    logOut: string;
    language: string;
  };
  dashboard: {
    welcomeBack: string;
    totalPoints: string;
    points: string;
    nextReward: string;
    ptsNeeded: (pts: number, regs: number) => string;
    onFire: string;
    todaySummary: string;
    registrations: string;
    pointsEarned: string;
    quickActions: string;
    boostSignUps: string;
    viewRewards: string;
    thisWeek: string;
    weeklyProgress: string;
    weeklyRegUnit: string;
  };
  modal: {
    registerCustomer: string;
    enterPhone: string;
    phoneNumber: string;
    invalidPhone: string;
    existingNumber: string;
    cancel: string;
    register: string;
    successRegistered: string;
    customer: string;
    newNumber: string;
    pointEarned: string;
    registrationRecorded: string;
    existingNumberLabel: string;
    noPointsEarned: string;
  };
  rewards: {
    title: string;
    subtitle: string;
    yourPoints: string;
    viewCatalog: string;
    featuredReward: string;
    allRewards: string;
    available: string;
    availableBadge: string;
    morePts: (n: number) => string;
    moreLabel: (n: number) => string;
    progressToward: (pct: number) => string;
    noRewards: string;
    loadError: string;
    lowStock: (n: number) => string;
    outOfStock: string;
    redeem: string;
    confirmTitle: string;
    confirmMsg: (name: string) => string;
    currentPoints: string;
    rewardCost: string;
    remaining: string;
    cancel: string;
    confirm: string;
    claiming: string;
    successMsg: (name: string) => string;
  };
  history: {
    title: string;
    subtitle: string;
    totalRegistrations: string;
    pointsEarned: string;
    newNumbers: string;
    existingNumbers: string;
    registrationMethod: string;
    manualEntry: string;
    tabletRegs: string;
    dailyBreakdown: string;
    today: string;
    yesterday: string;
    totalRegsDay: (n: number) => string;
    pointsEarnedCheck: string;
    noPoints: string;
    manual: string;
    tablet: string;
  };
  redeemed: {
    title: string;
    subtitle: string;
    totalRedeemed: string;
    pointsSpent: string;
    noRewards: string;
    noRewardsSub: string;
    greatJob: string;
    keepRegistering: (n: number) => string;
    hotOpportunity: string;
    earnExtra: string;
    wantMore: string;
    extraWorkMsg: string;
    yesExtraWork: string;
    twoXPoints: string;
    doubleRewards: string;
    bonus: string;
    exclusiveRewards: string;
    points: string;
  };
  achievement: {
    unlocked: string;
    congrats: string;
    youUnlocked: string;
    yourPoints: string;
    redeemNow: string;
    keepGoing: string;
  };
}

// ─── English locale ────────────────────────────────────────────────────────

const en: Translations = {
  nav: {
    home:     'Home',
    history:  'History',
    rewards:  'Rewards',
    redeemed: 'Redeemed',
  },
  login: {
    title:           'Cashier Rewards',
    subtitle:        'Enter your cashier code to start earning',
    welcomeBack:     'Welcome Back',
    cashierCode:     'Cashier Code',
    codePlaceholder: 'Enter your code',
    loginBtn:        'Login',
    loggingIn:       'Logging in...',
    footer:          'Start earning rewards today!',
  },
  userMenu: {
    cashier:        'Cashier',
    uploadingPhoto: 'Uploading photo…',
    photoUpdated:   'Photo updated!',
    uploadFailed:   'Upload failed. Try again.',
    logOut:         'Log Out',
    language:       'Language',
  },
  dashboard: {
    welcomeBack:    'Welcome back,',
    totalPoints:    'Total Points',
    points:         'points',
    nextReward:     'Next',
    ptsNeeded:      (pts, regs) => `${pts} pts needed (${regs} new registrations)`,
    onFire:         "You're on fire!",
    todaySummary:   "Today's Summary",
    registrations:  'Registrations',
    pointsEarned:   'Points Earned',
    quickActions:   'Quick Actions',
    boostSignUps:   'Boost Sign-ups',
    viewRewards:    'View Available Rewards',
    thisWeek:       'This Week',
    weeklyProgress: 'Weekly Progress',
    weeklyRegUnit:  'registrations',
  },
  modal: {
    registerCustomer:    'Register Customer',
    enterPhone:          "Enter the customer's phone number to register them and earn 1 point.",
    phoneNumber:         'Phone Number',
    invalidPhone:        'Please enter a valid 10-digit phone number',
    existingNumber:      'Existing number - No points will be earned',
    cancel:              'Cancel',
    register:            'Register',
    successRegistered:   'Successfully Registered!',
    customer:            'Customer',
    newNumber:           'New Number',
    pointEarned:         '+1 Point Earned',
    registrationRecorded:'Registration Recorded',
    existingNumberLabel: 'Existing Number',
    noPointsEarned:      'No points earned - Number already registered',
  },
  rewards: {
    title:          'Rewards',
    subtitle:       'Redeem your points for amazing rewards',
    yourPoints:     'Your Points',
    viewCatalog:    'View Full Catalog',
    featuredReward: 'Featured Reward',
    allRewards:     'All Rewards',
    available:      'Available',
    availableBadge: 'Available!',
    morePts:        (n) => `${n} more pts`,
    moreLabel:      (n) => `${n} more`,
    progressToward: (pct) => `${pct}% toward this reward`,
    noRewards:      'No rewards available right now.',
    loadError:      'Could not load rewards.\nCheck your connection and try again.',
    lowStock:       (n) => `${n} left`,
    outOfStock:     'Out of stock',
    redeem:         'Redeem',
    confirmTitle:   'Confirm Redemption',
    confirmMsg:     (name) => `Are you sure you want to redeem ${name}?`,
    currentPoints:  'Current Points:',
    rewardCost:     'Reward Cost:',
    remaining:      'Remaining Points:',
    cancel:         'Cancel',
    confirm:        'Confirm',
    claiming:       'Claiming…',
    successMsg:     (name) => `${name} redeemed successfully! 🎉`,
  },
  history: {
    title:              'Participation History',
    subtitle:           'Track your daily performance',
    totalRegistrations:  'Total Registrations',
    pointsEarned:       'Points Earned',
    newNumbers:         'New Numbers',
    existingNumbers:    'Existing Numbers',
    registrationMethod: 'Registration Method',
    manualEntry:        'Manual Entry',
    tabletRegs:         'Tablet Registrations',
    dailyBreakdown:     'Daily Breakdown',
    today:              'Today',
    yesterday:          'Yesterday',
    totalRegsDay:       (n) => `${n} total registrations`,
    pointsEarnedCheck:  '✓ Points earned',
    noPoints:           'No points',
    manual:             'Manual',
    tablet:             'Tablet',
  },
  redeemed: {
    title:           'Redeemed Rewards',
    subtitle:        'Your reward redemption history',
    totalRedeemed:   'Total Redeemed',
    pointsSpent:     'Points Spent',
    noRewards:       'No redeemed rewards yet',
    noRewardsSub:    'Start earning points and redeem your first reward!',
    greatJob:        'Great job! 🎉',
    keepRegistering: (n) => `You've redeemed ${n} rewards. Keep registering customers to earn more!`,
    hotOpportunity:  'HOT OPPORTUNITY',
    earnExtra:       'Earn Extra',
    wantMore:        '💰 Want to earn MORE points?',
    extraWorkMsg:    'We have extra work available! Register more customers now and double your point earnings 🚀',
    yesExtraWork:    'Yes, I want extra work!',
    twoXPoints:      '2x Points',
    doubleRewards:   'Double rewards',
    bonus:           'Bonus',
    exclusiveRewards:'Exclusive rewards',
    points:          'points',
  },
  achievement: {
    unlocked:    '🎉 Reward Unlocked!',
    congrats:    'Congratulations!',
    youUnlocked: "You've unlocked",
    yourPoints:  'Your Points',
    redeemNow:   'Redeem Now',
    keepGoing:   'Keep Going',
  },
};

export default en;
