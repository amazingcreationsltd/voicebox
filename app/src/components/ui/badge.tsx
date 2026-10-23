import * as React from 'react';
import { Chip as HeroChip, type ChipRootProps } from '@heroui/react';
import { cn } from '@/lib/utils/cn';

export interface BadgeProps extends Omit<ChipRootProps, 'color' | 'variant' | 'children'> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  color?: ChipRootProps['color'];
  children?: React.ReactNode;
}

function Badge({ className, variant = 'default', color, children, ...props }: BadgeProps) {
  let mappedVariant: 'primary' | 'secondary' | 'tertiary' = 'secondary';
  let mappedColor = color;

  if (variant === 'default') {
    mappedVariant = 'primary';
    mappedColor = color ?? 'accent';
  } else if (variant === 'destructive') {
    mappedVariant = 'primary';
    mappedColor = color ?? 'danger';
  } else if (variant === 'outline') {
    mappedVariant = 'tertiary';
  } else if (variant === 'secondary') {
    mappedVariant = 'secondary';
    mappedColor = color ?? 'default';
  }

  return (
    <HeroChip
      variant={mappedVariant}
      color={mappedColor}
      className={cn(className)}
      {...props}
    >
      {children}
    </HeroChip>
  );
}

export { Badge, Badge as Chip };
