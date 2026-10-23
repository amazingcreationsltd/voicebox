import { useEffect } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { HiCheck } from 'react-icons/hi';
import { HiChevronUpDown } from 'react-icons/hi2';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FormControl } from '@/components/ui/form';
import type { VoiceProfileResponse } from '@/lib/api/types';
import { getLanguageOptionsForEngine } from '@/lib/constants/languages';
import type { GenerationFormValues } from '@/lib/hooks/useGenerationForm';
import { cn } from '@/lib/utils/cn';
import { getEngineLogo } from './ModelLogos';

/**
 * Engine/model options and their display metadata.
 * Adding a new engine means adding one entry here.
 */
const ENGINE_OPTIONS = [
  { value: 'qwen:1.7B', label: 'Qwen3-TTS 1.7B', engine: 'qwen' },
  { value: 'qwen:0.6B', label: 'Qwen3-TTS 0.6B', engine: 'qwen' },
  { value: 'qwen_custom_voice:1.7B', label: 'Qwen CustomVoice 1.7B', engine: 'qwen_custom_voice' },
  { value: 'qwen_custom_voice:0.6B', label: 'Qwen CustomVoice 0.6B', engine: 'qwen_custom_voice' },
  { value: 'qwen_voice_design', label: 'Qwen VoiceDesign 1.7B', engine: 'qwen_voice_design' },
  { value: 'luxtts', label: 'LuxTTS', engine: 'luxtts' },
  { value: 'chatterbox', label: 'Chatterbox', engine: 'chatterbox' },
  { value: 'chatterbox_turbo', label: 'Chatterbox Turbo', engine: 'chatterbox_turbo' },
  { value: 'tada:1B', label: 'TADA 1B', engine: 'tada' },
  { value: 'tada:3B', label: 'TADA 3B Multilingual', engine: 'tada' },
  { value: 'kokoro', label: 'Kokoro 82M', engine: 'kokoro' },
  { value: 'omnivoice', label: 'OmniVoice (non-commercial)', engine: 'omnivoice' },
] as const;

const ENGINE_DESCRIPTIONS: Record<string, string> = {
  qwen: 'Multi-language, two sizes',
  qwen_custom_voice: '9 preset voices, instruct control',
  qwen_voice_design: 'Voices described in plain language',
  luxtts: 'Fast, English-focused',
  chatterbox: '23 languages, incl. Hebrew',
  chatterbox_turbo: 'English, [laugh] [cough] tags',
  tada: 'HumeAI, 700s+ coherent audio',
  kokoro: '82M params, CPU realtime, 8 langs',
  omnivoice: '23 languages, voice design. CC-BY-NC weights: non-commercial use only',
};

/** Engines that only support English and should force language to 'en' on select. */
const ENGLISH_ONLY_ENGINES = new Set(['luxtts', 'chatterbox_turbo']);

/** Engines that support cloned (reference audio) profiles. */
const CLONING_ENGINES = new Set([
  'qwen',
  'luxtts',
  'chatterbox',
  'chatterbox_turbo',
  'tada',
  'omnivoice',
]);

/** Engines that synthesise a voice from a written description. */
export const DESIGN_ENGINES = new Set(['qwen_voice_design']);

function getAvailableOptions(selectedProfile?: VoiceProfileResponse | null) {
  if (!selectedProfile) return ENGINE_OPTIONS;
  return ENGINE_OPTIONS.filter((opt) => isProfileCompatibleWithEngine(selectedProfile, opt.engine));
}

function getSelectValue(engine: string, modelSize?: string): string {
  if (engine === 'qwen') return `qwen:${modelSize || '1.7B'}`;
  if (engine === 'qwen_custom_voice') return `qwen_custom_voice:${modelSize || '1.7B'}`;
  if (engine === 'tada') return `tada:${modelSize || '1B'}`;
  return engine;
}

export function applyEngineSelection(form: UseFormReturn<GenerationFormValues>, value: string) {
  if (value.startsWith('qwen_custom_voice:')) {
    const [, modelSize] = value.split(':');
    form.setValue('engine', 'qwen_custom_voice');
    form.setValue('modelSize', modelSize as '1.7B' | '0.6B');
    const currentLang = form.getValues('language');
    const available = getLanguageOptionsForEngine('qwen_custom_voice');
    if (!available.some((l) => l.value === currentLang)) {
      form.setValue('language', available[0]?.value ?? 'en');
    }
  } else if (value.startsWith('qwen:')) {
    const [, modelSize] = value.split(':');
    form.setValue('engine', 'qwen');
    form.setValue('modelSize', modelSize as '1.7B' | '0.6B');
    // Validate language is supported by Qwen
    const currentLang = form.getValues('language');
    const available = getLanguageOptionsForEngine('qwen');
    if (!available.some((l) => l.value === currentLang)) {
      form.setValue('language', available[0]?.value ?? 'en');
    }
  } else if (value.startsWith('tada:')) {
    const [, modelSize] = value.split(':');
    form.setValue('engine', 'tada');
    form.setValue('modelSize', modelSize as '1B' | '3B');
    // TADA 1B is English-only; 3B is multilingual
    if (modelSize === '1B') {
      form.setValue('language', 'en');
    } else {
      const currentLang = form.getValues('language');
      const available = getLanguageOptionsForEngine('tada');
      if (!available.some((l) => l.value === currentLang)) {
        form.setValue('language', available[0]?.value ?? 'en');
      }
    }
  } else {
    form.setValue('engine', value as GenerationFormValues['engine']);
    form.setValue('modelSize', undefined as unknown as '1.7B' | '0.6B');
    if (ENGLISH_ONLY_ENGINES.has(value)) {
      form.setValue('language', 'en');
    } else {
      // If current language isn't supported by the new engine, reset to first available
      const currentLang = form.getValues('language');
      const available = getLanguageOptionsForEngine(value);
      if (!available.some((l) => l.value === currentLang)) {
        form.setValue('language', available[0]?.value ?? 'en');
      }
    }
  }
}

interface EngineModelSelectorProps {
  form: UseFormReturn<GenerationFormValues>;
  compact?: boolean;
  selectedProfile?: VoiceProfileResponse | null;
}

export function EngineModelSelector({ form, compact, selectedProfile }: EngineModelSelectorProps) {
  const engine = form.watch('engine') || 'qwen';
  const modelSize = form.watch('modelSize');
  const selectValue = getSelectValue(engine, modelSize);
  const availableOptions = getAvailableOptions(selectedProfile);

  const currentEngineAvailable = availableOptions.some((opt) => opt.value === selectValue);

  useEffect(() => {
    if (!currentEngineAvailable && availableOptions.length > 0) {
      applyEngineSelection(form, availableOptions[0].value);
    }
  }, [availableOptions, currentEngineAvailable, form]);

  const currentOption =
    availableOptions.find((opt) => opt.value === selectValue) || availableOptions[0];

  return (
    <DropdownMenu>
      <FormControl>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            className={cn(
              'h-9.5 text-xs bg-muted/40 hover:bg-muted/70 border border-border/60 hover:border-border rounded-xl transition-all pl-2.5 pr-2.5 font-normal flex items-center justify-between w-full gap-2 shadow-2xs group focus-visible:ring-1 focus-visible:ring-accent',
              compact && 'h-9.5 text-xs',
            )}
          >
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <div className="bg-surface/90 text-foreground/80 group-hover:text-foreground border border-border/40 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-semibold overflow-hidden p-1 transition-colors">
                {getEngineLogo(currentOption?.engine || engine, 'size-4') || (
                  <span className="text-[10px] font-semibold">{currentOption?.label.slice(0, 2).toUpperCase() || 'TT'}</span>
                )}
              </div>
              <div className="flex flex-col text-left leading-tight min-w-0 flex-1">
                <span className="text-xs font-medium truncate text-foreground">
                  {currentOption?.label || selectValue}
                </span>
                <span className="text-muted-foreground/80 text-[10px] truncate leading-none mt-0.5">
                  {ENGINE_DESCRIPTIONS[engine] || 'TTS Engine'}
                </span>
              </div>
            </div>
            <HiChevronUpDown className="size-3.5 opacity-60 shrink-0 text-muted-foreground group-hover:opacity-100 transition-opacity" />
          </Button>
        </DropdownMenuTrigger>
      </FormControl>
      <DropdownMenuContent
        align="center"
        side={compact ? 'top' : undefined}
        className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-[220px] rounded-2xl p-1 bg-popover/95 backdrop-blur-md border border-border/70 shadow-xl overflow-hidden flex flex-col z-[9999]"
      >
        {/* Subtle pinned header */}
        <div className="px-2.5 py-1.5 flex items-center justify-between border-b border-border/40 mb-1 shrink-0">
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
            TTS Engine & Model
          </span>
          <span className="text-[10px] text-muted-foreground/70">
            {availableOptions.length} available
          </span>
        </div>

        {/* Scrollable list area */}
        <div className="overflow-y-auto max-h-[260px] p-0.5 space-y-0.5">
          {availableOptions.map((opt) => {
            const isSelected = opt.value === selectValue;
            return (
              <DropdownMenuItem
                key={opt.value}
                onClick={() => applyEngineSelection(form, opt.value)}
                className={cn(
                  'group flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs cursor-pointer transition-colors focus:outline-none',
                  isSelected
                    ? 'bg-accent/15 text-accent font-medium'
                    : 'text-foreground/90 hover:bg-muted/60 focus:bg-muted/60 focus:text-foreground',
                )}
              >
                <div
                  className={cn(
                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[10px] font-semibold transition-colors overflow-hidden p-1',
                    isSelected
                      ? 'bg-accent/25 text-accent'
                      : 'bg-muted/70 text-muted-foreground group-hover:bg-muted group-hover:text-foreground group-focus:text-foreground',
                  )}
                >
                  {getEngineLogo(opt.engine, 'size-3.5') || (
                    <span>{opt.label.slice(0, 2).toUpperCase()}</span>
                  )}
                </div>

                <div className="flex flex-col min-w-0 flex-1">
                  <span className="truncate text-xs">{opt.label}</span>
                  <span
                    className={cn(
                      'text-[10px] truncate transition-colors leading-tight',
                      isSelected
                        ? 'text-accent/80'
                        : 'text-muted-foreground/80 group-hover:text-muted-foreground group-focus:text-muted-foreground',
                    )}
                  >
                    {ENGINE_DESCRIPTIONS[opt.engine] || opt.engine}
                  </span>
                </div>

                {isSelected && <HiCheck className="size-3.5 shrink-0 ml-auto text-accent" />}
              </DropdownMenuItem>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/** Returns a human-readable description for the currently selected engine. */
export function getEngineDescription(engine: string): string {
  return ENGINE_DESCRIPTIONS[engine] ?? '';
}

/**
 * Check if a profile is compatible with the currently selected engine.
 * Useful for UI hints.
 */
export function isProfileCompatibleWithEngine(
  profile: VoiceProfileResponse,
  engine: string,
): boolean {
  const voiceType = profile.voice_type || 'cloned';
  if (voiceType === 'preset') return profile.preset_engine === engine;
  if (voiceType === 'cloned') return CLONING_ENGINES.has(engine);
  if (voiceType === 'designed') return DESIGN_ENGINES.has(engine);
  return true;
}
