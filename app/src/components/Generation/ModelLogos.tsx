import type React from 'react';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

/**
 * Official Qwen (Alibaba Cloud) logo mark
 */
export function QwenLogo({ className = 'size-4', ...props }: LogoProps) {
  return (
    <svg
      viewBox="27.55 17.52 147.28 145.51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M174.82 108.75L155.38 75L165.64 57.75C166.46 56.31 166.46 54.53 165.64 53.09L155.38 35.84C154.86 34.91 153.87 34.33 152.78 34.33H114.88L106.14 19.03C105.62 18.1 104.63 17.52 103.54 17.52H83.3C82.21 17.52 81.22 18.1 80.7 19.03L61.26 52.77H41.02C39.93 52.77 38.94 53.35 38.42 54.28L28.16 71.53C27.34 72.97 27.34 74.75 28.16 76.19L45.52 107.5L36.78 122.8C35.96 124.24 35.96 126.02 36.78 127.46L47.04 144.71C47.56 145.64 48.55 146.22 49.64 146.22H87.54L96.28 161.52C96.8 162.45 97.79 163.03 98.88 163.03H119.12C120.21 163.03 121.2 162.45 121.72 161.52L141.16 127.78H158.52C159.61 127.78 160.6 127.2 161.12 126.27L171.38 109.02C172.2 107.58 172.2 105.8 171.38 104.36L174.82 108.75Z"
        fill="#615ced"
      />
      <path
        d="M119.12 163.03H98.88L87.54 144.71H49.64L61.26 126.39H80.7L38.42 55.29H61.26L83.3 19.03L93.56 37.35L83.3 55.29H161.58L151.32 72.54L170.76 106.28H151.32L141.16 88.34L101.18 163.03H119.12Z"
        fill="white"
      />
      <path
        d="M127.86 79.83H76.14L101.18 122.11L127.86 79.83Z"
        fill="#3c34ab"
      />
    </svg>
  );
}

/**
 * Official Hume AI (TADA) mark
 */
export function HumeLogo({ className = 'size-4', ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <circle cx="12" cy="12" r="10" fill="#18181B" stroke="#A1A1AA" strokeWidth="1.5" />
      <path
        d="M7 8V16M17 8V16M7 12H17"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Resemble AI (Chatterbox / Chatterbox Turbo) brand speech wave mark
 */
export function ResembleLogo({ className = 'size-4', ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20H4V12Z"
        fill="#10B981"
      />
      <circle cx="9" cy="12" r="1.5" fill="white" />
      <circle cx="15" cy="12" r="1.5" fill="white" />
    </svg>
  );
}

/**
 * Kokoro TTS Heart & Audio Waveform mark
 */
export function KokoroLogo({ className = 'size-4', ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill="#F43F5E"
      />
      <path
        d="M8 12h1.5l1-3 2 6 1.5-3H16"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * LuxTTS Lightning & High-Speed Audio mark
 */
export function LuxTTSLogo({ className = 'size-4', ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <rect width="24" height="24" rx="6" fill="#F59E0B" />
      <path
        d="M13 3L6 14H12L11 21L18 10H12L13 3Z"
        fill="white"
      />
    </svg>
  );
}

/**
 * OmniVoice Neural Voice Network mark
 */
export function OmniVoiceLogo({ className = 'size-4', ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <circle cx="12" cy="12" r="10" fill="#6366F1" />
      <circle cx="12" cy="12" r="3.5" fill="white" />
      <circle cx="6" cy="12" r="1.5" fill="white" fillOpacity="0.8" />
      <circle cx="18" cy="12" r="1.5" fill="white" fillOpacity="0.8" />
      <circle cx="12" cy="6" r="1.5" fill="white" fillOpacity="0.8" />
      <circle cx="12" cy="18" r="1.5" fill="white" fillOpacity="0.8" />
    </svg>
  );
}

/**
 * Helper to get the correct SVG component for a given engine
 */
export function getEngineLogo(engine: string, className = 'size-4.5') {
  switch (engine) {
    case 'qwen':
    case 'qwen_custom_voice':
    case 'qwen_voice_design':
      return <QwenLogo className={className} />;
    case 'tada':
      return <HumeLogo className={className} />;
    case 'chatterbox':
    case 'chatterbox_turbo':
      return <ResembleLogo className={className} />;
    case 'kokoro':
      return <KokoroLogo className={className} />;
    case 'luxtts':
      return <LuxTTSLogo className={className} />;
    case 'omnivoice':
      return <OmniVoiceLogo className={className} />;
    default:
      return null;
  }
}
