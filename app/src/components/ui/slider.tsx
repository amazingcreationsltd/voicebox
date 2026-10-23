import * as React from 'react';
import { Slider as HeroSlider, Label } from '@heroui/react';
import { cn } from '@/lib/utils/cn';

export interface SliderProps {
  value?: number[] | number;
  defaultValue?: number[] | number;
  onValueChange?: (value: number[]) => void;
  onValueCommit?: (value: number[]) => void;
  onChange?: (value: number | number[]) => void;
  onChangeEnd?: (value: number | number[]) => void;
  min?: number;
  max?: number;
  minValue?: number;
  maxValue?: number;
  step?: number;
  disabled?: boolean;
  isDisabled?: boolean;
  className?: string;
  id?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-valuetext'?: string;
  orientation?: 'horizontal' | 'vertical';
  label?: React.ReactNode;
  showOutput?: boolean;
  children?: React.ReactNode;
}

const SliderComponent = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      onValueCommit,
      onChange,
      onChangeEnd,
      min = 0,
      max = 100,
      minValue,
      maxValue,
      step = 1,
      disabled = false,
      isDisabled,
      className,
      id,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-valuetext': ariaValueText,
      orientation = 'horizontal',
      label,
      showOutput,
      children,
      ...props
    },
    ref,
  ) => {
    const heroValue = Array.isArray(value)
      ? value.length === 1
        ? value[0]
        : value
      : value;

    const heroDefaultValue = Array.isArray(defaultValue)
      ? defaultValue.length === 1
        ? defaultValue[0]
        : defaultValue
      : defaultValue;

    const resolvedMin = minValue !== undefined ? minValue : min;
    const resolvedMax = maxValue !== undefined ? maxValue : max;
    const resolvedDisabled = isDisabled !== undefined ? isDisabled : disabled;

    const handleChange = (val: number | number[]) => {
      if (onValueChange) {
        onValueChange(Array.isArray(val) ? val : [val]);
      }
      if (onChange) {
        onChange(val);
      }
    };

    const handleChangeEnd = (val: number | number[]) => {
      if (onValueCommit) {
        onValueCommit(Array.isArray(val) ? val : [val]);
      }
      if (onChangeEnd) {
        onChangeEnd(val);
      }
    };

    return (
      <HeroSlider
        ref={ref as any}
        id={id}
        value={heroValue}
        defaultValue={heroDefaultValue}
        onChange={handleChange}
        onChangeEnd={handleChangeEnd}
        minValue={resolvedMin}
        maxValue={resolvedMax}
        step={step}
        isDisabled={resolvedDisabled}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-valuetext={ariaValueText}
        orientation={orientation}
        className={cn('w-full', className)}
        {...props}
      >
        {children ? (
          children
        ) : (
          <>
            {label && <Label>{label}</Label>}
            {showOutput && <HeroSlider.Output />}
            <HeroSlider.Track>
              {({ state }) => (
                <>
                  <HeroSlider.Fill />
                  {state.values.length > 1 ? (
                    state.values.map((_, i) => (
                      <HeroSlider.Thumb key={i} index={i} />
                    ))
                  ) : (
                    <HeroSlider.Thumb />
                  )}
                </>
              )}
            </HeroSlider.Track>
          </>
        )}
      </HeroSlider>
    );
  },
);
SliderComponent.displayName = 'Slider';

const Slider = Object.assign(SliderComponent, {
  Root: HeroSlider.Root,
  Track: HeroSlider.Track,
  Fill: HeroSlider.Fill,
  Thumb: HeroSlider.Thumb,
  Output: HeroSlider.Output,
  Marks: HeroSlider.Marks,
});

export { Slider };
export { Label } from '@heroui/react';
