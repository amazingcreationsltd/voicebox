import type React from 'react';

interface FlagProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

/**
 * High-quality SVG country flag icons mapped by language code
 */

// en: UK / US (Great Britain Union Jack or English)
export function FlagEN({ className = 'size-4', ...props }: FlagProps) {
  return (
    <svg viewBox="0 0 640 480" className={className} {...props}>
      <path fill="#012169" d="M0 0h640v480H0z" />
      <path
        fill="#FFF"
        d="m75 0 245 180L565 0h75v60L435 240l205 180v60h-75L320 300 75 480H0v-60l205-180L0 60V0h75z"
      />
      <path
        fill="#C8102E"
        d="m424 288 216 156v36L388 288h36zm-208-96L0 36V0l252 192h-36zm160-96L640 18v18L448 192h-72zm-272 96L0 444v-18l192-156h72z"
      />
      <path fill="#FFF" d="M240 0h160v480H240zM0 160h640v160H0z" />
      <path fill="#C8102E" d="M266 0h108v480H266zM0 186h640v108H0z" />
    </svg>
  );
}

// zh: China
export function FlagZH({ className = 'size-4', ...props }: FlagProps) {
  return (
    <svg viewBox="0 0 640 480" className={className} {...props}>
      <rect width="640" height="480" fill="#DE2910" />
      <polygon
        points="100,50 112,86 149,86 119,108 131,144 100,122 69,144 81,108 51,86 88,86"
        fill="#FFDE00"
      />
      <polygon
        points="200,30 205,45 220,45 208,55 212,70 200,60 188,70 192,55 180,45 195,45"
        fill="#FFDE00"
        transform="scale(0.7) translate(80, 0)"
      />
      <polygon
        points="240,70 245,85 260,85 248,95 252,110 240,100 228,110 232,95 220,85 235,85"
        fill="#FFDE00"
        transform="scale(0.7) translate(100, 20)"
      />
      <polygon
        points="240,130 245,145 260,145 248,155 252,170 240,160 228,170 232,155 220,145 235,145"
        fill="#FFDE00"
        transform="scale(0.7) translate(100, 60)"
      />
      <polygon
        points="200,180 205,195 220,195 208,205 212,220 200,210 188,220 192,205 180,195 195,195"
        fill="#FFDE00"
        transform="scale(0.7) translate(80, 80)"
      />
    </svg>
  );
}

// ja: Japan
export function FlagJA({ className = 'size-4', ...props }: FlagProps) {
  return (
    <svg viewBox="0 0 640 480" className={className} {...props}>
      <rect width="640" height="480" fill="#FFF" />
      <circle cx="320" cy="240" r="144" fill="#BC002D" />
    </svg>
  );
}

// ko: South Korea
export function FlagKO({ className = 'size-4', ...props }: FlagProps) {
  return (
    <svg viewBox="0 0 640 480" className={className} {...props}>
      <rect width="640" height="480" fill="#FFF" />
      <circle cx="320" cy="240" r="120" fill="#CD2E3A" />
      <path d="M200 240a120 120 0 0 0 240 0 60 60 0 0 1-120 0 60 60 0 0 0-120 0z" fill="#0047A0" />
      {/* Trigrams */}
      <rect
        x="90"
        y="80"
        width="16"
        height="70"
        rx="3"
        transform="rotate(-34 98 115)"
        fill="#000"
      />
      <rect
        x="114"
        y="80"
        width="16"
        height="70"
        rx="3"
        transform="rotate(-34 122 115)"
        fill="#000"
      />
      <rect
        x="138"
        y="80"
        width="16"
        height="70"
        rx="3"
        transform="rotate(-34 146 115)"
        fill="#000"
      />
      <rect
        x="490"
        y="330"
        width="16"
        height="70"
        rx="3"
        transform="rotate(-34 498 365)"
        fill="#000"
      />
      <rect
        x="514"
        y="330"
        width="16"
        height="70"
        rx="3"
        transform="rotate(-34 522 365)"
        fill="#000"
      />
      <rect
        x="538"
        y="330"
        width="16"
        height="70"
        rx="3"
        transform="rotate(-34 546 365)"
        fill="#000"
      />
    </svg>
  );
}

// de: Germany
export function FlagDE({ className = 'size-4', ...props }: FlagProps) {
  return (
    <svg viewBox="0 0 640 480" className={className} {...props}>
      <rect width="640" height="160" fill="#000" />
      <rect y="160" width="640" height="160" fill="#DD0000" />
      <rect y="320" width="640" height="160" fill="#FFCE00" />
    </svg>
  );
}

// fr: France
export function FlagFR({ className = 'size-4', ...props }: FlagProps) {
  return (
    <svg viewBox="0 0 640 480" className={className} {...props}>
      <rect width="213.3" height="480" fill="#002395" />
      <rect x="213.3" width="213.3" height="480" fill="#FFF" />
      <rect x="426.6" width="213.4" height="480" fill="#ED2939" />
    </svg>
  );
}

// ru: Russia
export function FlagRU({ className = 'size-4', ...props }: FlagProps) {
  return (
    <svg viewBox="0 0 640 480" className={className} {...props}>
      <rect width="640" height="160" fill="#FFF" />
      <rect y="160" width="640" height="160" fill="#0039A6" />
      <rect y="320" width="640" height="160" fill="#D52B1E" />
    </svg>
  );
}

// pt: Portugal / Brazil
export function FlagPT({ className = 'size-4', ...props }: FlagProps) {
  return (
    <svg viewBox="0 0 640 480" className={className} {...props}>
      <rect width="256" height="480" fill="#046A38" />
      <rect x="256" width="384" height="480" fill="#DA291C" />
      <circle cx="256" cy="240" r="80" fill="#FFC400" />
      <circle cx="256" cy="240" r="50" fill="#FFF" />
      <rect x="240" y="220" width="32" height="40" fill="#002F6C" rx="4" />
    </svg>
  );
}

// es: Spain
export function FlagES({ className = 'size-4', ...props }: FlagProps) {
  return (
    <svg viewBox="0 0 640 480" className={className} {...props}>
      <rect width="640" height="120" fill="#AA151B" />
      <rect y="120" width="640" height="240" fill="#F1BF00" />
      <rect y="360" width="640" height="120" fill="#AA151B" />
      <circle cx="160" cy="240" r="32" fill="#AA151B" fillOpacity="0.4" />
    </svg>
  );
}

// it: Italy
export function FlagIT({ className = 'size-4', ...props }: FlagProps) {
  return (
    <svg viewBox="0 0 640 480" className={className} {...props}>
      <rect width="213.3" height="480" fill="#009246" />
      <rect x="213.3" width="213.3" height="480" fill="#FFF" />
      <rect x="426.6" width="213.4" height="480" fill="#CE2B37" />
    </svg>
  );
}

// ar: Arabic (Pan-Arab colors)
export function FlagAR({ className = 'size-4', ...props }: FlagProps) {
  return (
    <svg viewBox="0 0 640 480" className={className} {...props}>
      <rect width="640" height="160" fill="#000" />
      <rect y="160" width="640" height="160" fill="#FFF" />
      <rect y="320" width="640" height="160" fill="#007A3D" />
      <polygon points="0,0 240,240 0,480" fill="#CE1126" />
    </svg>
  );
}

// hi: India
export function FlagHI({ className = 'size-4', ...props }: FlagProps) {
  return (
    <svg viewBox="0 0 640 480" className={className} {...props}>
      <rect width="640" height="160" fill="#FF9933" />
      <rect y="160" width="640" height="160" fill="#FFF" />
      <rect y="320" width="640" height="160" fill="#138808" />
      <circle cx="320" cy="240" r="50" stroke="#000080" strokeWidth="8" fill="none" />
      <circle cx="320" cy="240" r="12" fill="#000080" />
    </svg>
  );
}

// he: Hebrew (Israel)
export function FlagHE({ className = 'size-4', ...props }: FlagProps) {
  return (
    <svg viewBox="0 0 640 480" className={className} {...props}>
      <rect width="640" height="480" fill="#FFF" />
      <rect y="60" width="640" height="60" fill="#0038B8" />
      <rect y="360" width="640" height="60" fill="#0038B8" />
      <polygon points="320,170 370,260 270,260" stroke="#0038B8" strokeWidth="10" fill="none" />
      <polygon points="320,280 370,190 270,190" stroke="#0038B8" strokeWidth="10" fill="none" />
    </svg>
  );
}

// nl: Netherlands
export function FlagNL({ className = 'size-4', ...props }: FlagProps) {
  return (
    <svg viewBox="0 0 640 480" className={className} {...props}>
      <rect width="640" height="160" fill="#AE1C28" />
      <rect y="160" width="640" height="160" fill="#FFF" />
      <rect y="320" width="640" height="160" fill="#21468B" />
    </svg>
  );
}

// pl: Poland
export function FlagPL({ className = 'size-4', ...props }: FlagProps) {
  return (
    <svg viewBox="0 0 640 480" className={className} {...props}>
      <rect width="640" height="240" fill="#FFF" />
      <rect y="240" width="640" height="240" fill="#DC143C" />
    </svg>
  );
}

// tr: Turkey
export function FlagTR({ className = 'size-4', ...props }: FlagProps) {
  return (
    <svg viewBox="0 0 640 480" className={className} {...props}>
      <rect width="640" height="480" fill="#E30A17" />
      <circle cx="260" cy="240" r="120" fill="#FFF" />
      <circle cx="290" cy="240" r="96" fill="#E30A17" />
      <polygon points="370,240 420,256 385,214 385,266 420,224" fill="#FFF" />
    </svg>
  );
}

// sv: Sweden
export function FlagSV({ className = 'size-4', ...props }: FlagProps) {
  return (
    <svg viewBox="0 0 640 480" className={className} {...props}>
      <rect width="640" height="480" fill="#006AA7" />
      <rect x="180" width="80" height="480" fill="#FECC00" />
      <rect y="200" width="640" height="80" fill="#FECC00" />
    </svg>
  );
}

// da: Denmark
export function FlagDA({ className = 'size-4', ...props }: FlagProps) {
  return (
    <svg viewBox="0 0 640 480" className={className} {...props}>
      <rect width="640" height="480" fill="#C60C30" />
      <rect x="180" width="70" height="480" fill="#FFF" />
      <rect y="205" width="640" height="70" fill="#FFF" />
    </svg>
  );
}

// no: Norway
export function FlagNO({ className = 'size-4', ...props }: FlagProps) {
  return (
    <svg viewBox="0 0 640 480" className={className} {...props}>
      <rect width="640" height="480" fill="#BA0C2F" />
      <rect x="160" width="100" height="480" fill="#FFF" />
      <rect y="190" width="640" height="100" fill="#FFF" />
      <rect x="180" width="60" height="480" fill="#00205B" />
      <rect y="210" width="640" height="60" fill="#00205B" />
    </svg>
  );
}

// fi: Finland
export function FlagFI({ className = 'size-4', ...props }: FlagProps) {
  return (
    <svg viewBox="0 0 640 480" className={className} {...props}>
      <rect width="640" height="480" fill="#FFF" />
      <rect x="180" width="80" height="480" fill="#003580" />
      <rect y="200" width="640" height="80" fill="#003580" />
    </svg>
  );
}

// el: Greece
export function FlagEL({ className = 'size-4', ...props }: FlagProps) {
  return (
    <svg viewBox="0 0 640 480" className={className} {...props}>
      <rect width="640" height="53.3" fill="#0D5EAF" />
      <rect y="53.3" width="640" height="53.3" fill="#FFF" />
      <rect y="106.6" width="640" height="53.3" fill="#0D5EAF" />
      <rect y="160" width="640" height="53.3" fill="#FFF" />
      <rect y="213.3" width="640" height="53.3" fill="#0D5EAF" />
      <rect y="266.6" width="640" height="53.3" fill="#FFF" />
      <rect y="320" width="640" height="53.3" fill="#0D5EAF" />
      <rect y="373.3" width="640" height="53.3" fill="#FFF" />
      <rect y="426.6" width="640" height="53.3" fill="#0D5EAF" />
      <rect width="240" height="266.6" fill="#0D5EAF" />
      <rect x="90" width="60" height="266.6" fill="#FFF" />
      <rect y="103.3" width="240" height="60" fill="#FFF" />
    </svg>
  );
}

// ms: Malaysia
export function FlagMS({ className = 'size-4', ...props }: FlagProps) {
  return (
    <svg viewBox="0 0 640 480" className={className} {...props}>
      <rect width="640" height="480" fill="#CC0000" />
      <rect y="34.3" width="640" height="34.3" fill="#FFF" />
      <rect y="102.9" width="640" height="34.3" fill="#FFF" />
      <rect y="171.4" width="640" height="34.3" fill="#FFF" />
      <rect y="240" width="640" height="34.3" fill="#FFF" />
      <rect y="308.6" width="640" height="34.3" fill="#FFF" />
      <rect y="377.1" width="640" height="34.3" fill="#FFF" />
      <rect y="445.7" width="640" height="34.3" fill="#FFF" />
      <rect width="320" height="240" fill="#000066" />
      <circle cx="160" cy="120" r="60" fill="#FFCC00" />
      <circle cx="180" cy="120" r="50" fill="#000066" />
    </svg>
  );
}

// sw: Swahili (Tanzania / Kenya)
export function FlagSW({ className = 'size-4', ...props }: FlagProps) {
  return (
    <svg viewBox="0 0 640 480" className={className} {...props}>
      <polygon points="0,0 640,0 0,480" fill="#1EB53A" />
      <polygon points="640,0 640,480 0,480" fill="#00A3DD" />
      <polygon points="0,480 640,0 640,60 60,480" fill="#FCD116" />
      <polygon points="0,480 640,0 580,0 0,420" fill="#FCD116" />
      <polygon points="0,460 600,0 640,0 640,20 40,480 0,480" fill="#000" />
    </svg>
  );
}

/**
 * Returns country flag SVG by language code
 */
export function getLanguageFlag(langCode: string, className = 'size-4') {
  const code = (langCode || 'en').toLowerCase();
  switch (code) {
    case 'en':
      return <FlagEN className={className} />;
    case 'zh':
      return <FlagZH className={className} />;
    case 'ja':
      return <FlagJA className={className} />;
    case 'ko':
      return <FlagKO className={className} />;
    case 'de':
      return <FlagDE className={className} />;
    case 'fr':
      return <FlagFR className={className} />;
    case 'ru':
      return <FlagRU className={className} />;
    case 'pt':
      return <FlagPT className={className} />;
    case 'es':
      return <FlagES className={className} />;
    case 'it':
      return <FlagIT className={className} />;
    case 'ar':
      return <FlagAR className={className} />;
    case 'hi':
      return <FlagHI className={className} />;
    case 'he':
      return <FlagHE className={className} />;
    case 'nl':
      return <FlagNL className={className} />;
    case 'pl':
      return <FlagPL className={className} />;
    case 'tr':
      return <FlagTR className={className} />;
    case 'sv':
      return <FlagSV className={className} />;
    case 'da':
      return <FlagDA className={className} />;
    case 'no':
      return <FlagNO className={className} />;
    case 'fi':
      return <FlagFI className={className} />;
    case 'el':
      return <FlagEL className={className} />;
    case 'ms':
      return <FlagMS className={className} />;
    case 'sw':
      return <FlagSW className={className} />;
    default:
      return null;
  }
}
