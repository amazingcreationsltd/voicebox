import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader2, Play, Save, Trash2, Wand2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { EffectsChainEditor } from '@/components/Effects/EffectsChainEditor';
import { GenerationPicker } from '@/components/Effects/GenerationPicker';
import {
  Button as HeroButton,
  Chip,
  Input as HeroInput,
  Label as HeroLabel,
  Modal,
  TextArea as HeroTextArea,
  TextField as HeroTextField,
} from '@heroui/react';
import { useToast } from '@/components/ui/use-toast';
import { apiClient } from '@/lib/api/client';
import type { HistoryResponse } from '@/lib/api/types';
import { useHistory } from '@/lib/hooks/useHistory';
import { useEffectsStore } from '@/stores/effectsStore';
import { usePlayerStore } from '@/stores/playerStore';

export function EffectsDetail() {
  const { t } = useTranslation();
  const selectedPresetId = useEffectsStore((s) => s.selectedPresetId);
  const isCreatingNew = useEffectsStore((s) => s.isCreatingNew);
  const workingChain = useEffectsStore((s) => s.workingChain);
  const setWorkingChain = useEffectsStore((s) => s.setWorkingChain);
  const setSelectedPresetId = useEffectsStore((s) => s.setSelectedPresetId);
  const setIsCreatingNew = useEffectsStore((s) => s.setIsCreatingNew);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // "Save as Custom" dialog state
  const [saveAsDialogOpen, setSaveAsDialogOpen] = useState(false);
  const [saveAsName, setSaveAsName] = useState('');
  const [saveAsDescription, setSaveAsDescription] = useState('');

  // Preview state
  const [previewGenId, setPreviewGenId] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const blobUrlRef = useRef<string | null>(null);
  const setAudioWithAutoPlay = usePlayerStore((s) => s.setAudioWithAutoPlay);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Auto-select the most recent generation as preview source
  const { data: historyData } = useHistory({ limit: 1 });
  useEffect(() => {
    if (!previewGenId && historyData?.items?.length) {
      const first = historyData.items.find((g) => g.status === 'completed');
      if (first) setPreviewGenId(first.id);
    }
  }, [historyData, previewGenId]);

  const { data: preset } = useQuery({
    queryKey: ['effect-preset', selectedPresetId],
    queryFn: () =>
      selectedPresetId
        ? apiClient
            .listEffectPresets()
            .then((all) => all.find((p) => p.id === selectedPresetId) ?? null)
        : null,
    enabled: !!selectedPresetId,
    staleTime: 30_000,
  });

  // Sync name/description when selecting a preset
  useEffect(() => {
    if (preset) {
      setName(preset.name);
      setDescription(preset.description ?? '');
    } else if (isCreatingNew) {
      setName('');
      setDescription('');
    }
  }, [preset, isCreatingNew]);

  // Cleanup blob URL on unmount
  useEffect(() => {
    return () => {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, []);

  const isEditing = !!selectedPresetId || isCreatingNew;
  const isBuiltIn = preset?.is_builtin ?? false;
  const presetName = preset
    ? preset.is_builtin
      ? t(`effects.builtinPresets.${preset.name}.name`, { defaultValue: preset.name })
      : preset.name
    : '';
  const presetDescription = preset
    ? preset.is_builtin
      ? t(`effects.builtinPresets.${preset.name}.description`, {
          defaultValue: preset.description ?? '',
        })
      : preset.description
    : '';

  async function handlePreview() {
    if (!previewGenId || workingChain.length === 0) return;

    setPreviewLoading(true);
    try {
      const blob = await apiClient.previewEffects(previewGenId, workingChain);

      // Revoke old blob URL
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }

      const url = URL.createObjectURL(blob);
      blobUrlRef.current = url;

      // Play through the main audio player
      setAudioWithAutoPlay(url, `preview-${Date.now()}`, null, 'Effects Preview');
    } catch (error) {
      toast({
        title: t('effects.toast.previewFailed'),
        description: error instanceof Error ? error.message : t('common.unknownError'),
        variant: 'destructive',
      });
    } finally {
      setPreviewLoading(false);
    }
  }

  function handleSelectGeneration(gen: HistoryResponse) {
    setPreviewGenId(gen.id);
  }

  async function handleSaveNew() {
    if (!name.trim()) {
      toast({ title: t('effects.toast.nameRequired'), variant: 'destructive' });
      return;
    }
    setSaving(true);
    try {
      const created = await apiClient.createEffectPreset({
        name: name.trim(),
        description: description.trim() || undefined,
        effects_chain: workingChain,
      });
      queryClient.invalidateQueries({ queryKey: ['effect-presets'] });
      setIsCreatingNew(false);
      setSelectedPresetId(created.id);
      toast({
        title: t('effects.toast.saved'),
        description: t('effects.toast.createdDescription', { name: created.name }),
      });
    } catch (error) {
      toast({
        title: t('effects.toast.saveFailed'),
        description: error instanceof Error ? error.message : t('common.unknownError'),
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  }

  async function handleSaveExisting() {
    if (!selectedPresetId || !name.trim()) return;
    setSaving(true);
    try {
      await apiClient.updateEffectPreset(selectedPresetId, {
        name: name.trim(),
        description: description.trim() || undefined,
        effects_chain: workingChain,
      });
      queryClient.invalidateQueries({ queryKey: ['effect-presets'] });
      queryClient.invalidateQueries({ queryKey: ['effect-preset', selectedPresetId] });
      toast({ title: t('effects.toast.updated') });
    } catch (error) {
      toast({
        title: t('effects.toast.saveFailed'),
        description: error instanceof Error ? error.message : t('common.unknownError'),
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  }

  function handleSaveAsNew() {
    const sourceName = isBuiltIn ? presetName : name;
    setSaveAsName(t('effects.saveAs.suggestedName', { name: sourceName }));
    setSaveAsDescription(description);
    setSaveAsDialogOpen(true);
  }

  async function handleSaveAsConfirm() {
    if (!saveAsName.trim()) {
      toast({ title: t('effects.toast.nameRequired'), variant: 'destructive' });
      return;
    }
    setSaving(true);
    try {
      const created = await apiClient.createEffectPreset({
        name: saveAsName.trim(),
        description: saveAsDescription.trim() || undefined,
        effects_chain: workingChain,
      });
      queryClient.invalidateQueries({ queryKey: ['effect-presets'] });
      setSaveAsDialogOpen(false);
      setSelectedPresetId(created.id);
      toast({
        title: t('effects.toast.saved'),
        description: t('effects.toast.createdDescription', { name: created.name }),
      });
    } catch (error) {
      toast({
        title: t('effects.toast.saveFailed'),
        description: error instanceof Error ? error.message : t('common.unknownError'),
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!selectedPresetId) return;
    setDeleting(true);
    try {
      await apiClient.deleteEffectPreset(selectedPresetId);
      queryClient.invalidateQueries({ queryKey: ['effect-presets'] });
      setSelectedPresetId(null);
      setWorkingChain([]);
      toast({ title: t('effects.toast.deleted') });
    } catch (error) {
      toast({
        title: t('effects.toast.deleteFailed'),
        description: error instanceof Error ? error.message : t('common.unknownError'),
        variant: 'destructive',
      });
    } finally {
      setDeleting(false);
    }
  }

  if (!isEditing) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        <div className="text-center space-y-2">
          <Wand2 className="h-10 w-10 mx-auto opacity-30" />
          <p className="text-sm">{t('effects.placeholder')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-h-0 max-w-3xl w-full">
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-border/40">
        <div className="flex items-center gap-2.5">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            {isCreatingNew
              ? t('effects.detail.newTitle')
              : isBuiltIn
                ? presetName
                : t('effects.detail.editTitle')}
          </h2>
          {isCreatingNew && (
            <Chip size="sm" color="accent">
              {t('effects.sections.new')}
            </Chip>
          )}
          {isBuiltIn && (
            <Chip size="sm">
              {t('effects.badge.builtin')}
            </Chip>
          )}
          {!isBuiltIn && !isCreatingNew && (
            <Chip size="sm" color="success">
              {t('effects.sections.custom')}
            </Chip>
          )}
        </div>
        <div className="flex items-center gap-2">
          {!isBuiltIn && !isCreatingNew && (
            <>
              <HeroButton
                variant="ghost"
                size="sm"
                className="text-destructive gap-1.5"
                onPress={handleDelete}
                isDisabled={deleting}
              >
                <Trash2 className="h-3.5 w-3.5" />
                {deleting ? t('effects.detail.deleting') : t('common.delete')}
              </HeroButton>
              <HeroButton
                size="sm"
                variant="primary"
                className="gap-1.5"
                onPress={handleSaveExisting}
                isDisabled={saving || workingChain.length === 0}
              >
                {saving ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Save className="h-3.5 w-3.5" />
                )}
                {saving ? t('effects.detail.saving') : t('common.save')}
              </HeroButton>
            </>
          )}
          {isCreatingNew && (
            <HeroButton
              size="sm"
              variant="primary"
              className="gap-1.5"
              onPress={handleSaveNew}
              isDisabled={saving || workingChain.length === 0 || !name.trim()}
            >
              {saving ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Save className="h-3.5 w-3.5" />
              )}
              {saving ? t('effects.detail.saving') : t('effects.detail.savePreset')}
            </HeroButton>
          )}
          {isBuiltIn && (
            <HeroButton
              size="sm"
              variant="secondary"
              className="gap-1.5"
              onPress={handleSaveAsNew}
              isDisabled={saving}
            >
              <Save className="h-3.5 w-3.5" />
              {saving ? t('effects.detail.saving') : t('effects.detail.saveAsCustom')}
            </HeroButton>
          )}
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto space-y-5 pr-1.5">
        {(isCreatingNew || !isBuiltIn) && (
          <div className="rounded-2xl border border-border/50 bg-card/60 p-5 shadow-xs space-y-4">
            <HeroTextField className="w-full">
              <HeroLabel>{t('effects.fields.name')}</HeroLabel>
              <HeroInput
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('effects.fields.namePlaceholder')}
              />
            </HeroTextField>
            <HeroTextField className="w-full">
              <HeroLabel>{t('effects.fields.description')}</HeroLabel>
              <HeroTextArea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t('effects.fields.descriptionPlaceholder')}
                rows={2}
              />
            </HeroTextField>
          </div>
        )}

        {isBuiltIn && presetDescription && (
          <div className="rounded-2xl border border-border/50 bg-card/60 p-4">
            <p className="text-sm text-muted-foreground leading-relaxed">{presetDescription}</p>
          </div>
        )}

        <div className="rounded-2xl border border-border/50 bg-card/60 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t('effects.chain.title', { defaultValue: 'Effects Chain' })}
            </span>
            <span className="text-xs text-muted-foreground">
              {t('effects.effectCount', { count: workingChain.length })}
            </span>
          </div>
          <EffectsChainEditor value={workingChain} onChange={setWorkingChain} showPresets={false} />
        </div>

        {/* Preview section as clean dedicated deck */}
        <div className="rounded-2xl border border-border/50 bg-card/60 p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <Wand2 className="h-4 w-4 text-accent" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t('effects.preview.label')}
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <GenerationPicker
              selectedId={previewGenId}
              onSelect={handleSelectGeneration}
              className="flex-1"
            />
            <HeroButton
              variant="secondary"
              size="sm"
              className="gap-1.5 shrink-0"
              onPress={handlePreview}
              isDisabled={!previewGenId || workingChain.length === 0 || previewLoading}
            >
              {previewLoading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  {t('effects.preview.processing')}
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5" />
                  {t('effects.preview.button')}
                </>
              )}
            </HeroButton>
          </div>
          <p className="text-xs text-muted-foreground/80">{t('effects.preview.hint')}</p>
        </div>
      </div>

      {/* Save As Custom Modal */}
      <Modal.Backdrop
        isOpen={saveAsDialogOpen}
        onOpenChange={setSaveAsDialogOpen}
        variant="blur"
      >
        <Modal.Container size="sm">
          <Modal.Dialog className="border border-border/50 bg-background/95 backdrop-blur-xl sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header className="gap-1.5 pr-8">
              <Modal.Heading className="text-xl font-bold tracking-tight text-foreground">
                {t('effects.saveAs.title')}
              </Modal.Heading>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t('effects.saveAs.description')}
              </p>
            </Modal.Header>
            <Modal.Body className="space-y-4 py-3">
              <HeroTextField className="w-full">
                <HeroLabel>{t('effects.fields.name')}</HeroLabel>
                <HeroInput
                  value={saveAsName}
                  onChange={(e) => setSaveAsName(e.target.value)}
                  placeholder={t('effects.fields.namePlaceholder')}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && saveAsName.trim()) {
                      handleSaveAsConfirm();
                    }
                  }}
                />
              </HeroTextField>
              <HeroTextField className="w-full">
                <HeroLabel>{t('effects.fields.description')}</HeroLabel>
                <HeroTextArea
                  value={saveAsDescription}
                  onChange={(e) => setSaveAsDescription(e.target.value)}
                  placeholder={t('effects.fields.descriptionPlaceholder')}
                  rows={2}
                />
              </HeroTextField>
            </Modal.Body>
            <Modal.Footer className="flex justify-end gap-2.5 pt-3">
              <HeroButton
                variant="secondary"
                onPress={() => setSaveAsDialogOpen(false)}
                isDisabled={saving}
              >
                {t('common.cancel')}
              </HeroButton>
              <HeroButton
                variant="primary"
                onPress={handleSaveAsConfirm}
                isDisabled={saving || !saveAsName.trim()}
              >
                {saving ? (
                  <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                ) : (
                  <Save className="h-3.5 w-3.5 mr-1.5" />
                )}
                {saving ? t('effects.detail.saving') : t('common.save')}
              </HeroButton>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </div>
  );
}
