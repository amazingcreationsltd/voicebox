import { Tabs } from '@heroui/react';
import { Outlet, useMatchRoute, useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { BOTTOM_SAFE_AREA_PADDING } from '@/lib/constants/ui';
import { cn } from '@/lib/utils/cn';
import { usePlatform } from '@/platform/PlatformContext';
import { usePlayerStore } from '@/stores/playerStore';

interface SettingsTab {
  labelKey?: string;
  label?: string;
  path:
    | '/settings'
    | '/settings/generation'
    | '/settings/captures'
    | '/settings/mcp'
    | '/settings/gpu'
    | '/settings/logs'
    | '/settings/changelog'
    | '/settings/about';
  tauriOnly?: boolean;
}

const tabs: SettingsTab[] = [
  { labelKey: 'settings.tabs.general', path: '/settings' },
  { labelKey: 'settings.tabs.generation', path: '/settings/generation' },
  { labelKey: 'settings.tabs.captures', path: '/settings/captures' },
  { labelKey: 'settings.tabs.mcp', path: '/settings/mcp' },
  { labelKey: 'settings.tabs.gpu', path: '/settings/gpu', tauriOnly: true },
  { labelKey: 'settings.tabs.logs', path: '/settings/logs', tauriOnly: true },
  { labelKey: 'settings.tabs.changelog', path: '/settings/changelog' },
  { labelKey: 'settings.tabs.about', path: '/settings/about' },
];

export function SettingsLayout() {
  const { t } = useTranslation();
  const platform = usePlatform();
  const isPlayerVisible = !!usePlayerStore((state) => state.audioUrl);
  const matchRoute = useMatchRoute();
  const navigate = useNavigate();

  const currentTab = tabs.find((tab) =>
    tab.path === '/settings'
      ? matchRoute({ to: tab.path, fuzzy: false })
      : matchRoute({ to: tab.path }),
  );
  const activeKey = currentTab?.path ?? '/settings';

  return (
    <div className="flex flex-col h-full min-h-0">
      <Tabs
        variant="secondary"
        selectedKey={activeKey}
        onSelectionChange={(key) => navigate({ to: key as any })}
        className="w-full shrink-0"
      >
        <Tabs.ListContainer>
          <Tabs.List aria-label={t('settings.tabs.general') || 'Settings'}>
            {tabs.map((tab) => {
              if (tab.tauriOnly && !platform.metadata.isTauri) return null;

              return (
                <Tabs.Tab
                  key={tab.path}
                  id={tab.path}
                  className="px-4 py-2 text-sm font-medium transition-colors text-muted-foreground hover:text-foreground data-[selected=true]:text-foreground"
                >
                  {tab.label ?? (tab.labelKey ? t(tab.labelKey) : '')}
                  <Tabs.Indicator />
                </Tabs.Tab>
              );
            })}
          </Tabs.List>
        </Tabs.ListContainer>
      </Tabs>

      <div
        className={cn(
          'flex-1 overflow-y-auto pt-6 pb-6 px-2 -mx-2',
          isPlayerVisible && BOTTOM_SAFE_AREA_PADDING,
        )}
      >
        <Outlet />
      </div>
    </div>
  );
}
