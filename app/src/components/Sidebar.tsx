import { Link, useMatchRoute } from '@tanstack/react-router';
import {
  AudioLines,
  Box,
  Captions,
  type LucideIcon,
  Mic,
  Settings,
  Volume2,
  Wand2,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import voiceboxLogo from '@/assets/voicebox-logo.png';
import { cn } from '@/lib/utils/cn';
import { usePlatform } from '@/platform/PlatformContext';
import type { UpdateStatus } from '@/platform/types';
import { usePlayerStore } from '@/stores/playerStore';
import { version } from '../../package.json';

interface SidebarProps {
  isMacOS?: boolean;
}

interface NavTab {
  id: string;
  path: string;
  icon: LucideIcon;
  labelKey?: string;
  label?: string;
}

// Core studio audio generation & editing tools
const primaryTabs: NavTab[] = [
  { id: 'main', path: '/', icon: Volume2, labelKey: 'nav.generate' },
  { id: 'stories', path: '/stories', icon: AudioLines, labelKey: 'nav.stories' },
  { id: 'captures', path: '/captures', icon: Captions, labelKey: 'nav.captures' },
  { id: 'voices', path: '/voices', icon: Mic, labelKey: 'nav.voices' },
  { id: 'effects', path: '/effects', icon: Wand2, labelKey: 'nav.effects' },
];

// System & model management tools
const secondaryTabs: NavTab[] = [
  { id: 'models', path: '/models', icon: Box, labelKey: 'nav.models' },
  { id: 'settings', path: '/settings', icon: Settings, labelKey: 'nav.settings' },
];

export function Sidebar({ isMacOS }: SidebarProps) {
  const { t } = useTranslation();
  const matchRoute = useMatchRoute();
  const isPlayerOpen = !!usePlayerStore((s) => s.audioUrl);
  const platform = usePlatform();

  const [updateStatus, setUpdateStatus] = useState<UpdateStatus>(platform.updater.getStatus());
  useEffect(() => platform.updater.subscribe(setUpdateStatus), [platform.updater]);

  const renderNavTab = (tab: NavTab) => {
    const Icon = tab.icon;
    const isActive =
      tab.path === '/'
        ? matchRoute({ to: '/', fuzzy: false })
        : matchRoute({ to: tab.path, fuzzy: true });

    return (
      <div key={tab.id} className="relative flex items-center justify-center w-full group">
        {/* Active vertical pill indicator */}
        {isActive && (
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-accent shadow-[0_0_8px_hsl(var(--accent)/0.6)]" />
        )}

        <Link
          to={tab.path}
          className={cn(
            'relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 outline-none',
            isActive
              ? 'bg-accent/15 text-accent font-medium shadow-xs border border-accent/25'
              : 'text-muted-foreground hover:text-foreground hover:bg-white/[0.06]',
          )}
          aria-label={tab.label ?? (tab.labelKey ? t(tab.labelKey) : tab.id)}
        >
          <Icon className="h-5 w-5 relative z-10" />
        </Link>

        {/* Hover Tooltip */}
        <span className="pointer-events-none absolute left-[calc(100%+12px)] whitespace-nowrap rounded-lg bg-popover text-popover-foreground px-3 py-1.5 text-xs font-medium border border-border shadow-xl opacity-0 scale-95 transition-all duration-150 group-hover:opacity-100 group-hover:scale-100 z-[99999] dark:border-white/10">
          {tab.label ?? (tab.labelKey ? t(tab.labelKey) : tab.id)}
        </span>
      </div>
    );
  };

  return (
    <div
      className={cn(
        'fixed left-0 top-0 h-full w-20 bg-sidebar border-r border-border flex flex-col items-center py-6 z-50',
        isMacOS && 'pt-14',
      )}
    >
      {/* Brand Logo */}
      <div className="mb-6 flex items-center justify-center">
        <img src={voiceboxLogo} alt="Voicebox" className="sidebar-logo w-10 h-10 object-contain drop-shadow-md" />
      </div>

      {/* Primary Studio Workflow Navigation */}
      <div className="flex flex-col gap-2 w-full px-2">
        {primaryTabs.map(renderNavTab)}
      </div>

      {/* Bottom Section: Utility Navigation & Version Footer */}
      <div
        className="mt-auto flex flex-col items-center gap-3 w-full px-2 transition-all duration-300"
        style={{ paddingBottom: isPlayerOpen ? '7rem' : undefined }}
      >
        <div className="w-8 h-px bg-border/60 my-1" />

        {/* Secondary System / Settings Navigation */}
        <div className="flex flex-col gap-2 w-full">
          {secondaryTabs.map(renderNavTab)}
        </div>

        {/* Version & Update Indicator */}
        <div className="flex flex-col items-center gap-1 mt-2">
          <span className="text-[10px] font-mono text-muted-foreground/60 tracking-wider">v{version}</span>
          {updateStatus.available && (
            <Link
              to="/settings"
              className="text-[9px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-accent/15 text-accent hover:bg-accent/25 transition-colors border border-accent/20"
            >
              {t('nav.updateBadge')}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
