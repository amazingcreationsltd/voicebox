import * as React from 'react';
import { Switch as HeroSwitch, type SwitchRootProps } from '@heroui/react';
import { cn } from '@/lib/utils/cn';

export interface ToggleProps extends Omit<SwitchRootProps, 'children' | 'onChange'> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
  'aria-label'?: string;
  children?: React.ReactNode;
  onChange?: (checked: boolean) => void;
}

const ToggleComponent = React.forwardRef<HTMLDivElement, ToggleProps>(
  (
    {
      checked,
      defaultChecked,
      isSelected,
      defaultSelected,
      onCheckedChange,
      onChange,
      disabled = false,
      isDisabled,
      className,
      id,
      'aria-label': ariaLabel,
      children,
      size,
      ...props
    },
    ref,
  ) => {
    const selected = isSelected !== undefined ? isSelected : checked;
    const defSelected = defaultSelected !== undefined ? defaultSelected : defaultChecked;
    const disabledState = isDisabled !== undefined ? isDisabled : disabled;

    const handleChange = (val: boolean) => {
      onCheckedChange?.(val);
      onChange?.(val);
    };

    return (
      <HeroSwitch
        ref={ref as any}
        id={id}
        isSelected={selected}
        defaultSelected={defSelected}
        onChange={handleChange}
        isDisabled={disabledState}
        aria-label={ariaLabel}
        size={size}
        className={cn('inline-flex items-center cursor-pointer', className)}
        {...props}
      >
        <HeroSwitch.Content>
          <HeroSwitch.Control>
            <HeroSwitch.Thumb />
          </HeroSwitch.Control>
          {children}
        </HeroSwitch.Content>
      </HeroSwitch>
    );
  },
);
ToggleComponent.displayName = 'Toggle';

const Toggle = Object.assign(ToggleComponent, {
  Root: HeroSwitch.Root,
  Content: HeroSwitch.Content,
  Control: HeroSwitch.Control,
  Thumb: HeroSwitch.Thumb,
  Icon: HeroSwitch.Icon,
});

export { Toggle, Toggle as Switch };
