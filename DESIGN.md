---
name: Cyber-Tech Interface
colors:
  surface: '#121318'
  surface-dim: '#121318'
  surface-bright: '#38393f'
  surface-container-lowest: '#0d0e13'
  surface-container-low: '#1a1b21'
  surface-container: '#1e1f25'
  surface-container-high: '#292a2f'
  surface-container-highest: '#34343a'
  on-surface: '#e3e1e9'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#e3e1e9'
  inverse-on-surface: '#2f3036'
  outline: '#849495'
  outline-variant: '#3b494b'
  surface-tint: '#00dbe9'
  primary: '#dbfcff'
  on-primary: '#00363a'
  primary-container: '#00f0ff'
  on-primary-container: '#006970'
  inverse-primary: '#006970'
  secondary: '#f5fff4'
  on-secondary: '#003920'
  secondary-container: '#0affa1'
  on-secondary-container: '#007145'
  tertiary: '#fff2fd'
  on-tertiary: '#520071'
  tertiary-container: '#f4ccff'
  on-tertiary-container: '#9900d0'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#7df4ff'
  primary-fixed-dim: '#00dbe9'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#54ffaa'
  secondary-fixed-dim: '#00e38e'
  on-secondary-fixed: '#002110'
  on-secondary-fixed-variant: '#005230'
  tertiary-fixed: '#f8d8ff'
  tertiary-fixed-dim: '#ebb2ff'
  on-tertiary-fixed: '#320047'
  on-tertiary-fixed-variant: '#74009f'
  background: '#121318'
  on-background: '#e3e1e9'
  surface-variant: '#34343a'
typography:
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.02em
  body-base:
    fontFamily: Space Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0.01em
  label-mono:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 16px
  margin: 24px
---

## Brand & Style

This design system is engineered to evoke the precision of a high-performance terminal and the immersive depth of futuristic head-up displays (HUDs). It targets power users, developers, and tech enthusiasts who value data density and a sense of "operating" rather than just "browsing." 

The visual style is a hybrid of **Glassmorphism** and **High-Contrast Terminal** aesthetics. It utilizes deep, multi-layered dark backgrounds to create a sense of infinite space, contrasted by razor-sharp, glowing interactive elements. The emotional response is one of authority, innovation, and technical mastery. Use subtle motion and luminescent transitions to simulate a living, breathing machine.

## Colors

The palette is anchored in a "Void" neutral—a deep, desaturated navy-black that prevents pure black crushing while providing maximum contrast for neon accents. 

- **Primary (Electric Blue):** Used for primary actions, focus states, and essential data paths.
- **Secondary (Cyber Teal):** Reserved for success states, active system health, and secondary navigational cues.
- **Tertiary (Neon Purple):** Used sparingly for highlighting discovery features, special notifications, or complex data visualizations.

Backgrounds should use a tiered approach: Surface (deepest), Layer 1 (elevated), and Layer 2 (interactive). Accent colors must always be accompanied by a subtle 0.15 opacity glow (outer shadow) to simulate light emission.

## Typography

**Space Grotesk** serves as the sole typeface for this design system, chosen for its geometric rigor and technical quirks that mimic monospaced fonts while maintaining superior legibility. 

Headlines should be bold and tightly tracked to create a modular, "blocky" feel. Labels and small data points should utilize the upper-case treatment with increased letter spacing to emulate terminal command lines. For numeric data, ensure the use of tabular lining figures to maintain vertical alignment in data grids.

## Layout & Spacing

This design system employs a **Fixed Grid** model based on an 8px rhythmic unit. All layouts should align to a 12-column grid for desktop and a 4-column grid for mobile. 

The spacing philosophy emphasizes "Data Density." Gutters are kept tight (16px) to maximize the information displayed on screen. Use margins of 24px to define the primary viewport boundaries. Elements should feel grouped into logical "modules" or "nodes," separated by clear, consistent vertical rhythm.

## Elevation & Depth

Depth is not communicated through traditional shadows, but through **Tonal Layering** and **Luminescent Outlines**. 

1.  **Surfaces:** The base layer is the darkest. Elevated panels use a slightly lighter hex with a 10% opacity increase.
2.  **Backdrop Blurs:** Use `backdrop-filter: blur(12px)` for any floating modals or dropdowns to simulate semi-transparent glass.
3.  **Glow Borders:** Instead of drop shadows, active or elevated cards use a 1px inner or outer border in a primary or secondary color with a soft 4px to 8px box-shadow blur of the same color at 30% opacity. This creates a "light-pipe" effect common in high-tech instrumentation.

## Shapes

The shape language balances technical rigidity with modern ergonomics. A standard **8px (0.5rem)** radius is the default for all containers, buttons, and inputs. This "Medium-Sharp" approach ensures the UI feels precise without being hostile.

Buttons and active tabs may use "clipped corner" masks (45-degree cuts) sparingly to reinforce the futuristic military-grade aesthetic. Icons should be stroke-based with a 2px weight, matching the sharp-to-medium curves of the UI components.

## Components

- **Buttons:** Solid primary color for main actions, with a high-contrast black label. Secondary buttons use a 1px primary border with a transparent background and a subtle hover glow.
- **Input Fields:** Styled like terminal prompts. Use a dark background with a 1px bottom-border by default, turning into a full glowing stroke on focus. Include a flashing "cursor" underscore in the active state.
- **Chips:** Small, rectangular tags with 4px border-radius. Use desaturated versions of the accent colors with high-contrast text for status indicators.
- **Cards:** Use a "Glass-Panel" effect: dark background (80% opacity), 1px subtle border (#FFFFFF at 10% opacity), and a blur filter.
- **Lists:** Rows should be separated by 1px dividers. Hover states should trigger a "scanning" effect—a subtle horizontal highlight moving across the row.
- **Progress Indicators:** Use the Cyber Teal for progress bars, incorporating a "scanline" pattern overlay to add texture and movement.