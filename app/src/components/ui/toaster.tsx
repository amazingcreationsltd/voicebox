import { usePlayerStore } from '@/stores/playerStore';
import { PolishedToaster } from './halo-toast';

export function Toaster() {
  const isPlayerOpen = !!usePlayerStore((s) => s.audioUrl);

  return (
    <PolishedToaster
      position="bottom-right"
      offset={isPlayerOpen ? 150 : 24}
    />
  );
}
