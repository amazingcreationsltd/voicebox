import {
  forwardRef,
  type ComponentProps,
  type ReactNode,
} from "react"
import {
  motion,
  useReducedMotion,
} from "motion/react"
import type { ExternalToast } from "sonner"
import { toast as sonnerToast, Toaster as SonnerToaster } from "sonner"

import "sonner/dist/styles.css"

import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils/cn"
import { Button } from "@/components/ui/button"

const paddingClass = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
} as const

export type RimVariant = "default" | "success" | "destructive"

interface ToastHaloCardProps extends ComponentProps<"div"> {
  children: ReactNode
  translucent?: boolean
  interactive?: boolean
  borderTrail?: boolean
  padding?: keyof typeof paddingClass
  rimVariant?: RimVariant
}

export const HaloCard = forwardRef<HTMLDivElement, ToastHaloCardProps>(
  function HaloCard(
    {
      children,
      className,
      padding = "md",
      rimVariant = "default",
      "aria-label": ariaLabel = "Card",
      ...props
    },
    ref
  ) {
    return (
      <div
        aria-label={ariaLabel}
        className={cn("relative w-full max-w-full", className)}
        data-slot="toast-halo-card"
        ref={ref}
        role="group"
        {...props}
      >
        <div
          className={cn(
            "relative z-0 flex flex-col gap-6 rounded-2xl border transition-all duration-200",
            // Adaptive colors: white for light mode, darker gray for dark mode
            "bg-white text-zinc-950 border-zinc-200/90 shadow-[0_10px_38px_-10px_rgba(22,23,24,0.12),0_10px_20px_-15px_rgba(22,23,24,0.08)]",
            "dark:bg-[#161618] dark:text-zinc-50 dark:border-white/10 dark:shadow-[0_10px_38px_-10px_rgba(0,0,0,0.6),0_10px_20px_-15px_rgba(0,0,0,0.4)]",
            rimVariant === "destructive" && "border-red-500/50 dark:border-red-500/40",
            padding !== "none" && paddingClass[padding]
          )}
          data-slot="toast-halo-card-surface"
        >
          {children}
        </div>
      </div>
    )
  }
)

HaloCard.displayName = "HaloCard"

/* ─── Toast copy + Sonner ─── */

export interface PolishedToastSurfaceProps {
  title: string
  description?: string
  messageKey?: string
  politeness?: "status" | "alert"
  translucent?: boolean
  rimVariant?: RimVariant
  /** Sonner toast id from `toast.custom((id) => …)`; required for the dismiss control. */
  toastId?: number | string
  /** When true (default with {@link showPolishedToast}), renders a Dismiss control. */
  closeButton?: boolean
  className?: string
}

/**
 * Card + title/body with smooth opacity fade-in — for Sonner `toast.custom`.
 */
export function PolishedToastSurface({
  title,
  description,
  politeness = "status",
  translucent = true,
  rimVariant = "default",
  toastId,
  closeButton = false,
  className,
}: PolishedToastSurfaceProps) {
  const reduceMotion = useReducedMotion() ?? false
  const ariaLive = politeness === "alert" ? "assertive" : "polite"

  return (
    <div
      aria-live={ariaLive}
      className={cn("w-full", className)}
      role={politeness === "alert" ? "alert" : "status"}
    >
      <HaloCard
        aria-label={politeness === "alert" ? "Alert" : "Notification"}
        className="text-left"
        interactive
        padding="sm"
        rimVariant={rimVariant}
        translucent={translucent}
      >
        <div className="flex items-start gap-2">
          <motion.div
            initial={{ opacity: reduceMotion ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="min-w-0 flex-1 space-y-1.5"
          >
            <p className="text-balance font-semibold text-zinc-950 dark:text-zinc-100 text-sm leading-snug antialiased">
              {title}
            </p>
            {description ? (
              <p className="text-pretty text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                {description}
              </p>
            ) : null}
          </motion.div>
          {closeButton && toastId != null ? (
            <Button
              className="-mt-1 size-7 rounded-full border border-zinc-200/80 dark:border-white/10 bg-zinc-50/60 dark:bg-white/[0.04] text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100 p-0"
              onClick={() => {
                sonnerToast.dismiss(toastId)
              }}
              size="icon"
              type="button"
              variant="ghost"
            >
              <XIcon className="size-3.5" />
            </Button>
          ) : null}
        </div>
      </HaloCard>
    </div>
  )
}

export type PolishedToastOptions = Omit<ExternalToast, "description"> & {
  title: string
  description?: string
  messageKey?: string
  politeness?: "status" | "alert"
  rimVariant?: RimVariant
}

function buildMessageKey(o: PolishedToastOptions) {
  return o.messageKey ?? `${o.title}\0${o.description ?? ""}`
}

export function showPolishedToast(options: PolishedToastOptions) {
  const {
    title,
    description,
    messageKey,
    politeness = "status",
    rimVariant = "default",
    duration,
    closeButton = true,
    className: toastClassName,
    ...rest
  } = options

  const mk = buildMessageKey({ ...options, messageKey })

  return sonnerToast.custom(
    (id) => (
      <PolishedToastSurface
        closeButton={closeButton}
        description={description}
        messageKey={mk}
        politeness={politeness}
        rimVariant={rimVariant}
        title={title}
        toastId={id}
      />
    ),
    {
      duration: duration ?? 4000,
      ...rest,
      className: cn(
        "flex w-full max-w-md border-none bg-transparent p-0 shadow-none",
        "[&_[data-content]]:w-full [&_[data-title]]:w-full",
        toastClassName
      ),
    }
  )
}

/**
 * Sonner host for polished custom toasts and standard `toast()` calls.
 * Transparent host chrome for {@link showPolishedToast} is applied per toast in
 * {@link showPolishedToast} so default success/error toasts keep normal styling.
 */
export function PolishedToaster({
  className,
  ...props
}: ComponentProps<typeof SonnerToaster>) {
  return (
    <>
      <SonnerToaster
        className={cn("toaster group polished-sonner", className)}
        closeButton
        gap={12}
        position="bottom-right"
        theme="system"
        {...props}
      />
      <style>{`
        /*
         * Contained Sonner overrides for polished custom toasts.
         * Keep slide/height animation, disable host opacity premultiply flash.
         */
        [data-sonner-toaster].polished-sonner [data-sonner-toast] {
          opacity: 1 !important;
          transition:
            transform 400ms cubic-bezier(0.16, 1, 0.3, 1),
            height 400ms cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 200ms;
        }
        [data-sonner-toaster].polished-sonner
          [data-sonner-toast][data-removed="true"] {
          opacity: 0 !important;
          transition:
            transform 400ms cubic-bezier(0.16, 1, 0.3, 1),
            opacity 200ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        [data-sonner-toaster].polished-sonner [data-sonner-toast] > * {
          transition: none !important;
        }
      `}</style>
    </>
  )
}
