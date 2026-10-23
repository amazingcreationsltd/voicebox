import * as React from 'react';
import {
  Tabs as HeroTabs,
  type TabsRootProps,
  type TabListProps,
  type TabProps,
  type TabPanelProps,
} from '@heroui/react';
import { cn } from '@/lib/utils/cn';

export interface ExtendedTabsProps extends Omit<TabsRootProps, 'children'> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children?: React.ReactNode;
}

const TabsComponent = React.forwardRef<HTMLDivElement, ExtendedTabsProps>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      selectedKey,
      defaultSelectedKey,
      onSelectionChange,
      className,
      children,
      variant = 'secondary',
      ...props
    },
    ref,
  ) => {
    const activeKey = selectedKey !== undefined ? selectedKey : value;
    const defActiveKey = defaultSelectedKey !== undefined ? defaultSelectedKey : defaultValue;

    const handleSelectionChange = (key: any) => {
      onSelectionChange?.(key);
      onValueChange?.(String(key));
    };

    return (
      <HeroTabs
        ref={ref as any}
        variant={variant}
        selectedKey={activeKey}
        defaultSelectedKey={defActiveKey}
        onSelectionChange={handleSelectionChange}
        className={cn('w-full', className)}
        {...props}
      >
        {children}
      </HeroTabs>
    );
  },
);
TabsComponent.displayName = 'Tabs';

const TabsList = React.forwardRef<HTMLDivElement, TabListProps>(
  ({ className, children, ...props }, ref) => (
    <HeroTabs.ListContainer>
      <HeroTabs.List ref={ref as any} className={cn(className)} {...props}>
        {children}
      </HeroTabs.List>
    </HeroTabs.ListContainer>
  ),
);
TabsList.displayName = 'TabsList';

export interface ExtendedTabTriggerProps extends Omit<TabProps, 'id'> {
  value?: string;
  id?: string;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, ExtendedTabTriggerProps>(
  ({ value, id, className, children, ...props }, ref) => {
    const tabId = id || value || '';
    return (
      <HeroTabs.Tab
        ref={ref as any}
        id={tabId}
        className={cn(
          'text-muted-foreground hover:text-foreground data-[selected=true]:text-foreground transition-colors',
          className,
        )}
        {...props}
      >
        {typeof children === 'function'
          ? (values: any) => (
              <>
                {children(values)}
                <HeroTabs.Indicator />
              </>
            )
          : (
              <>
                {children}
                <HeroTabs.Indicator />
              </>
            )}
      </HeroTabs.Tab>
    );
  },
);
TabsTrigger.displayName = 'TabsTrigger';

export interface ExtendedTabContentProps extends Omit<TabPanelProps, 'id'> {
  value?: string;
  id?: string;
}

const TabsContent = React.forwardRef<HTMLDivElement, ExtendedTabContentProps>(
  ({ value, id, className, children, ...props }, ref) => {
    const panelId = id || value || '';
    return (
      <HeroTabs.Panel ref={ref as any} id={panelId} className={cn('pt-4', className)} {...props}>
        {children}
      </HeroTabs.Panel>
    );
  },
);
TabsContent.displayName = 'TabsContent';

const Tabs = Object.assign(TabsComponent, {
  Root: HeroTabs.Root,
  ListContainer: HeroTabs.ListContainer,
  List: HeroTabs.List,
  Tab: HeroTabs.Tab,
  Indicator: HeroTabs.Indicator,
  Separator: HeroTabs.Separator,
  Panel: HeroTabs.Panel,
});

export { Tabs, TabsList, TabsTrigger, TabsContent };
