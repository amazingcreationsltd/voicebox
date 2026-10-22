---
name: Voicebox
description: The open-source AI voice studio design tokens and visual language
colors:
  background: "#0f0f0f"
  foreground: "#f2f2f2"
  card: "#141414"
  card-foreground: "#f2f2f2"
  popover: "#141414"
  popover-foreground: "#f2f2f2"
  primary: "#2e2e2e"
  primary-foreground: "#f2f2f2"
  secondary: "#1f1f1f"
  secondary-foreground: "#f2f2f2"
  muted: "#1f1f1f"
  muted-foreground: "#999999"
  accent: "#ae8f37"
  accent-foreground: "#f2f2f2"
  destructive: "#d13838"
  border: "hsl(var(--border))"
rounded:
  sm: "calc(var(--radius) - 4px)"
  md: "calc(var(--radius) - 2px)"
  lg: "var(--radius)"
typography:
  display:
    fontFamily: "system-ui, -apple-system, sans-serif"
    fontWeight: 600
    lineHeight: 1.2
  body:
    fontFamily: "system-ui, -apple-system, sans-serif"
    fontSize: "14px"
    lineHeight: 1.5
---

# Design System

<!-- impeccable:design-schema 1 -->

## Overview

Voicebox uses a focused, high-contrast dark studio aesthetic optimized for sustained audio work, waveform inspection, model orchestration, and generation monitoring.

## Colors

- **Dark Studio Foundation:** Near-black background (`#0f0f0f`) paired with low-contrast elevated cards (`#141414`) to keep visual fatigue low.
- **Warm Gold Accent:** (`#ae8f37`) used sparingly for focus states, brand glow, audio wave playback heads, and key call-to-actions.
- **High-legibility foreground:** Crisp light text (`#f2f2f2`) with muted labels (`#999999`) for non-critical secondary details.
- **Status colors:** Destructive red (`#d13838`) reserved strictly for destructive actions and model failure states.

## Typography

System-native sans-serif stack (`system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`). Compact, readable, interface-first type scale with strict tabular numbers for audio timestamps and generation latencies.

## Layout

- Desktop/Studio dashboard structure with fixed sidebar navigation and fluid workspace panels.
- Tightly packed audio controls with dedicated regions for waveform scrubbers and parameter grids.
- Responsive container queries adapting from compact sidecar windows to multi-column wide studio displays.

## Elevation & Depth

- Low-elevation surfaces layered using subtle borders and translucent surface tinting rather than heavy drop shadows.
- Glow effects (`drop-shadow` with accent tint) reserved exclusively for active playback, recording states, and brand marks.

## Shapes

- Restrained corner radii across control inputs and buttons (`sm: 4px`, `md: 6px`, `lg: 8px`).
- Pill shapes reserved for playback controls, badges, and status pills.

## Components

- **Buttons:** Low-contrast neutral surfaces for secondary actions; solid accent / elevated surface for primary generation actions.
- **Waveform Viewers:** Embedded Wavesurfer canvases with high-contrast playback indicators and selection regions.
- **Sliders & Inputs:** Compact, scrubbable numeric controls with inline reset affordances.

## Do's and Don'ts

- **Do:** Keep the dark studio feel consistent across all modal sheets and flyouts.
- **Do:** Make audio controls instantly discoverable and keyboard-accessible.
- **Don't:** Introduce loud saturated neon accents that clash with the warm gold audio palette.
- **Don't:** Use slow spring transitions on essential audio scrub or trigger actions.
