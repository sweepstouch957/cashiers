// src/i18n/locales/es.ts
import type { Translations } from './en';

const es: Translations = {
  // ── Navegación ─────────────────────────────────────────────────────────────
  nav: {
    home:     'Inicio',
    history:  'Historial',
    rewards:  'Premios',
    redeemed: 'Canjeados',
  },

  // ── Login ──────────────────────────────────────────────────────────────────
  login: {
    title:        'Premios del Cajero',
    subtitle:     'Ingresa tu código de cajero para comenzar',
    welcomeBack:  'Bienvenido de Nuevo',
    cashierCode:  'Código de Cajero',
    codePlaceholder: 'Ingresa tu código',
    loginBtn:     'Iniciar Sesión',
    loggingIn:    'Iniciando sesión...',
    footer:       '¡Comienza a ganar premios hoy!',
  },

  // ── Menú de Usuario ────────────────────────────────────────────────────────
  userMenu: {
    cashier:        'Cajero',
    uploadingPhoto: 'Subiendo foto…',
    photoUpdated:   '¡Foto actualizada!',
    uploadFailed:   'Error al subir. Intenta de nuevo.',
    logOut:         'Cerrar Sesión',
    language:       'Idioma',
  },

  // ── Panel Principal ────────────────────────────────────────────────────────
  dashboard: {
    welcomeBack:    'Bienvenido,',
    totalPoints:    'Puntos Totales',
    points:         'puntos',
    nextReward:     'Siguiente',
    ptsNeeded:      (pts: number, regs: number) =>
      `${pts} pts necesarios (${regs} registros nuevos)`,
    onFire:         '¡Estás en racha!',
    todaySummary:   'Resumen de Hoy',
    registrations:  'Registros',
    pointsEarned:   'Puntos Ganados',
    quickActions:   'Acciones Rápidas',
    boostSignUps:   'Registrar Clientes',
    viewRewards:    'Ver Premios Disponibles',
    thisWeek:       'Esta Semana',
    weeklyProgress: 'Progreso Semanal',
    weeklyRegUnit:  'registros',
  },

  // ── Modal de Registro Manual ───────────────────────────────────────────────
  modal: {
    registerCustomer:   'Registrar Cliente',
    enterPhone:         'Ingresa el número del cliente para registrarlo y ganar 1 punto.',
    phoneNumber:        'Número de Teléfono',
    invalidPhone:       'Ingresa un número de 10 dígitos válido',
    existingNumber:     'Número existente - No se ganarán puntos',
    cancel:             'Cancelar',
    register:           'Registrar',
    successRegistered:  '¡Registro Exitoso!',
    customer:           'Cliente',
    newNumber:          'Número Nuevo',
    pointEarned:        '+1 Punto Ganado',
    registrationRecorded: 'Registro Guardado',
    existingNumberLabel:  'Número Existente',
    noPointsEarned:       'Sin puntos - Número ya registrado',
  },

  // ── Sección de Premios ─────────────────────────────────────────────────────
  rewards: {
    title:          'Premios',
    subtitle:       'Canjea tus puntos por increíbles premios',
    yourPoints:     'Tus Puntos',
    viewCatalog:    'Ver Catálogo Completo',
    featuredReward: 'Premio Destacado',
    allRewards:     'Todos los Premios',
    available:      'Disponible',
    availableBadge: '¡Disponible!',
    morePts:        (n: number) => `${n} pts más`,
    moreLabel:      (n: number) => `${n} más`,
    progressToward: (pct: number) => `${pct}% hacia este premio`,
    noRewards:      'No hay premios disponibles por ahora.',
    loadError:      'No se pudieron cargar los premios.\nVerifica tu conexión e intenta de nuevo.',
    lowStock:       (n: number) => `Quedan ${n}`,
    outOfStock:     'Sin existencias',
    redeem:         'Canjear',
    confirmTitle:   'Confirmar Canje',
    confirmMsg:     (name: string) => `¿Seguro que quieres canjear ${name}?`,
    currentPoints:  'Puntos Actuales:',
    rewardCost:     'Costo del Premio:',
    remaining:      'Puntos Restantes:',
    cancel:         'Cancelar',
    confirm:        'Confirmar',
    claiming:       'Canjeando…',
    successMsg:     (name: string) => `¡${name} canjeado exitosamente! 🎉`,
  },

  // ── Historial de Participación ─────────────────────────────────────────────
  history: {
    title:             'Historial de Participación',
    subtitle:          'Rastrea tu desempeño diario',
    totalRegistrations: 'Total de Registros',
    pointsEarned:      'Puntos Ganados',
    newNumbers:        'Números Nuevos',
    existingNumbers:   'Números Existentes',
    registrationMethod: 'Método de Registro',
    manualEntry:       'Entrada Manual',
    tabletRegs:        'Registros en Tablet',
    dailyBreakdown:    'Desglose Diario',
    today:             'Hoy',
    yesterday:         'Ayer',
    totalRegsDay:      (n: number) => `${n} registros totales`,
    pointsEarnedCheck: '✓ Puntos ganados',
    noPoints:          'Sin puntos',
    manual:            'Manual',
    tablet:            'Tablet',
  },

  // ── Historial de Canjes ────────────────────────────────────────────────────
  redeemed: {
    title:          'Premios Canjeados',
    subtitle:       'Tu historial de canjes',
    totalRedeemed:  'Total Canjeados',
    pointsSpent:    'Puntos Usados',
    noRewards:      'Aún no has canjeado premios',
    noRewardsSub:   '¡Comienza a ganar puntos y canjea tu primer premio!',
    greatJob:       '¡Buen trabajo! 🎉',
    keepRegistering:(n: number) => `Canjeaste ${n} premios. ¡Sigue registrando clientes para ganar más!`,
    hotOpportunity: 'OPORTUNIDAD HOT',
    earnExtra:      'Gana Extra',
    wantMore:       '💰 ¿Quieres ganar MÁS puntos?',
    extraWorkMsg:   '¡Tenemos trabajo extra disponible! Registra más clientes ahora y duplica tus puntos 🚀',
    yesExtraWork:   '¡Sí, quiero trabajo extra!',
    twoXPoints:     '2x Puntos',
    doubleRewards:  'Premios dobles',
    bonus:          'Bono',
    exclusiveRewards: 'Premios exclusivos',
    points:         'puntos',
  },

  // ── Modales de Logros ──────────────────────────────────────────────────────
  achievement: {
    unlocked:    '🎉 ¡Premio Desbloqueado!',
    congrats:    '¡Felicidades!',
    youUnlocked: 'Desbloqueaste',
    yourPoints:  'Tus Puntos',
    redeemNow:   'Canjear Ahora',
    keepGoing:   'Seguir',
  },
} as const;

export default es;
