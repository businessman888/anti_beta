# ANTIBETA DESIGN SYSTEM

**Versão:** 1.0  
**Data:** Fevereiro 2025  
**Stack:** React Native + Expo + NativeWind (Tailwind CSS)  
**Plataformas:** iOS + Android  

---

## ÍNDICE

1. [Filosofia de Design](#1-filosofia-de-design)
2. [Paleta de Cores](#2-paleta-de-cores)
3. [Tipografia](#3-tipografia)
4. [Espaçamentos e Grid](#4-espaçamentos-e-grid)
5. [Componentes Base](#5-componentes-base)
6. [Iconografia](#6-iconografia)
7. [Animações e Transições](#7-animações-e-transições)
8. [Padrões de Navegação](#8-padrões-de-navegação)
9. [Estados de Interação](#9-estados-de-interação)
10. [Tokens de Design](#10-tokens-de-design)
11. [Implementação Técnica](#11-implementação-técnica)

---

## 1. FILOSOFIA DE DESIGN

### 1.1 Princípios Core

**Masculinidade Moderna**  
Design que transmite força, disciplina e sofisticação sem cair em estereótipos. Inspirado em apps de alto desempenho como WHOOP, Strava e Notion.

**Minimalismo Funcional**  
Cada elemento tem um propósito. Zero decorações desnecessárias. Foco total na funcionalidade e clareza de informação.

**Gamificação Elegante**  
Elementos de jogo integrados de forma natural, sem parecer infantil. Badges, ranking e progresso são tratados como conquistas sérias.

**Escuridão Premium**  
Dark mode como padrão, inspirado em Tesla, Apple Music e Discord. Preto profundo (#0d090a) como base para criar contraste dramático e foco.

### 1.2 Inspirações

**Apps de Referência:**
- **WHOOP:** Minimalismo, dados densos mas claros, dark mode sofisticado
- **Strava:** Gamificação adulta, ranking social, visualização de progresso
- **Notion:** Hierarquia visual clara, componentes bem definidos
- **Apple Fitness+:** Animações suaves, cores vibrantes em dark mode
- **Discord:** Cards bem estruturados, sistema de badges/achievements

**Design Systems:**
- **Material Design 3:** Elevation, motion principles
- **Apple HIG:** Typography scale, spacing system
- **Carbon Design System:** Token architecture

---

## 2. PALETA DE CORES

### 2.1 Cores Primárias

#### **Carbono (Branding)**
Base da identidade visual. Preto profundo que transmite sofisticação e poder.

```javascript
// Gradiente de Carbono
carbono: {
  950: '#0d090a',  // Brand Primary - Fundo principal
  900: '#1a1416',  // Surface Elevated
  800: '#2a2124',  // Surface Raised
  700: '#3a2e32',  // Surface Higher
  600: '#4a3a3f',  // Borders Dark
  500: '#5a474c',  // Borders
  400: '#6a5459',  // Subtle Text
  300: '#9d8a8f',  // Muted Text
  200: '#c4b6b9',  // Secondary Text
  100: '#e8e2e4',  // Light Text
  50:  '#f7f5f6',  // Lightest
}
```

#### **Brasa (Accent Principal)**
Laranja-avermelhado vibrante. Representa energia, testosterona, fogo interior. Usado para CTAs e elementos de destaque.

```javascript
brasa: {
  950: '#3d0f0a',
  900: '#5a1710',
  800: '#7a1f15',
  700: '#9a271a',
  600: '#ba2f1f',  
  500: '#ff4422',  // Main Accent - CTAs, Badges, Level Up
  400: '#ff6644',
  300: '#ff8866',
  200: '#ffaa88',
  100: '#ffccaa',
  50:  '#ffeecc',
}
```

### 2.2 Cores Funcionais

#### **Sucesso (Verde)**
Indicador de conquistas, metas completadas, streak mantido.

```javascript
sucesso: {
  950: '#0a2e23',
  900: '#0f4033',
  800: '#145243',
  700: '#1a6453',
  600: '#1f7663',
  500: '#10b981',  // Main Success
  400: '#34d399',
  300: '#6ee7b7',
  200: '#a7f3d0',
  100: '#d1fae5',
  50:  '#ecfdf5',
}
```

#### **Alerta (Amarelo)**
Avisos, notificações importantes, limites próximos.

```javascript
alerta: {
  950: '#451a03',
  900: '#78350f',
  800: '#92400e',
  700: '#b45309',
  600: '#d97706',
  500: '#fbbf24',  // Main Warning
  400: '#fcd34d',
  300: '#fde68a',
  200: '#fef3c7',
  100: '#fef9e7',
  50:  '#fffbeb',
}
```

#### **Erro (Vermelho)**
Falhas, vícios registrados, metas não cumpridas.

```javascript
erro: {
  950: '#450a0a',
  900: '#7f1d1d',
  800: '#991b1b',
  700: '#b91c1c',
  600: '#dc2626',
  500: '#ef4444',  // Main Error
  400: '#f87171',
  300: '#fca5a5',
  200: '#fecaca',
  100: '#fee2e2',
  50:  '#fef2f2',
}
```

#### **Info (Azul)**
Informações neutras, dicas, agente conversacional.

```javascript
info: {
  950: '#0c1929',
  900: '#172554',
  800: '#1e3a8a',
  700: '#1e40af',
  600: '#2563eb',
  500: '#3b82f6',  // Main Info
  400: '#60a5fa',
  300: '#93c5fd',
  200: '#bfdbfe',
  100: '#dbeafe',
  50:  '#eff6ff',
}
```

### 2.3 Cores Secundárias

#### **Testosterona (Dourado)**
Representa o nível de testo, conquistas premium, tier Alpha.

```javascript
testosterona: {
  950: '#422006',
  900: '#78350f',
  800: '#92400e',
  700: '#b45309',
  600: '#d97706',
  500: '#f59e0b',  // Main Gold
  400: '#fbbf24',
  300: '#fcd34d',
  200: '#fde68a',
  100: '#fef3c7',
  50:  '#fffbeb',
}
```

#### **Disciplina (Roxo)**
Representa foco, meditação, práticas de testo, streak longo.

```javascript
disciplina: {
  950: '#2e1065',
  900: '#4c1d95',
  800: '#5b21b6',
  700: '#6d28d9',
  600: '#7c3aed',
  500: '#8b5cf6',  // Main Purple
  400: '#a78bfa',
  300: '#c4b5fd',
  200: '#ddd6fe',
  100: '#ede9fe',
  50:  '#f5f3ff',
}
```

### 2.4 Escala de Cinzas (Neutros)

Sistema de tons neutros para textos, bordas e fundos.

```javascript
neutro: {
  // Dark Mode (Padrão)
  950: '#0a0a0a',  // Background Deep
  900: '#121212',  // Background Primary (Google Material)
  850: '#171717',  // Background Elevated
  800: '#1f1f1f',  // Surface
  750: '#262626',  // Surface Raised
  700: '#2d2d2d',  // Card Background
  650: '#3a3a3a',  // Card Elevated
  600: '#525252',  // Border
  500: '#737373',  // Border Light
  400: '#a3a3a3',  // Text Muted
  300: '#d4d4d4',  // Text Secondary
  200: '#e5e5e5',  // Text Primary
  100: '#f5f5f5',  // Text High Emphasis
  50:  '#fafafa',  // White
  
  // Light Mode (Invertido para fallback)
  light: {
    950: '#fafafa',
    900: '#f5f5f5',
    850: '#f0f0f0',
    800: '#e5e5e5',
    750: '#d4d4d4',
    700: '#c4c4c4',
    650: '#a3a3a3',
    600: '#8a8a8a',
    500: '#737373',
    400: '#525252',
    300: '#404040',
    200: '#262626',
    100: '#171717',
    50:  '#0a0a0a',
  }
}
```

### 2.5 Overlay e Transparências

```javascript
overlay: {
  // Para modals, bottom sheets, backdrop
  dark: 'rgba(13, 9, 10, 0.90)',      // carbono-950 + 90% opacity
  darker: 'rgba(13, 9, 10, 0.95)',    // para modals críticos
  medium: 'rgba(13, 9, 10, 0.70)',    // para tooltips
  light: 'rgba(13, 9, 10, 0.40)',     // para subtle overlays
  
  // Glass morphism (para cards especiais)
  glass: 'rgba(26, 20, 22, 0.60)',    // carbono-900 + blur
  glassLight: 'rgba(42, 33, 36, 0.40)', // carbono-800 + blur
}
```

### 2.6 Gradientes

```javascript
gradientes: {
  // Fundo Principal (sutil, quase imperceptível)
  backgroundMain: 'linear-gradient(180deg, #0d090a 0%, #1a1416 100%)',
  
  // Card Premium (para badges raros, tier Alpha)
  premium: 'linear-gradient(135deg, #f59e0b 0%, #ff4422 100%)',
  
  // Level Up (animação de conquista)
  levelUp: 'linear-gradient(135deg, #ff4422 0%, #8b5cf6 100%)',
  
  // Testosterona Progress
  testo: 'linear-gradient(90deg, #f59e0b 0%, #ff4422 100%)',
  
  // Background Sutil (para headers)
  headerSubtle: 'linear-gradient(180deg, #1a1416 0%, rgba(26, 20, 22, 0) 100%)',
}
```

### 2.7 Uso das Cores por Contexto

| Contexto | Cor Principal | Cor Secundária | Uso |
|----------|---------------|----------------|-----|
| **Background App** | carbono-950 | neutro-900 | Fundo global |
| **Cards** | carbono-900 | carbono-800 | Containers |
| **CTAs Primários** | brasa-500 | brasa-600 | Botões de ação |
| **CTAs Secundários** | carbono-700 | carbono-600 | Botões neutros |
| **Texto Principal** | neutro-100 | neutro-200 | Títulos, body |
| **Texto Secundário** | neutro-300 | neutro-400 | Subtexts, hints |
| **Badges Comuns** | sucesso-500 | info-500 | Conquistas básicas |
| **Badges Raros** | testosterona-500 | disciplina-500 | Conquistas premium |
| **Level Testo** | testosterona-500 | brasa-500 | Indicador principal |
| **Ranking** | disciplina-500 | info-500 | Posições, scores |
| **Quiz Vícios** | erro-500 | alerta-500 | Respostas negativas |
| **Metas Completadas** | sucesso-500 | sucesso-600 | Checkmarks, success |

---

## 3. TIPOGRAFIA

### 3.1 Família de Fontes

#### **Display & Headings: Inter**
Fonte moderna, geométrica, excelente legibilidade em telas. Usada para títulos e navegação.

```javascript
fonts: {
  display: 'Inter',      // Weights: 700, 800, 900
  heading: 'Inter',      // Weights: 600, 700
  body: 'Inter',         // Weights: 400, 500, 600
  mono: 'JetBrains Mono' // Weight: 500 (para números, stats)
}
```

**Instalação React Native:**
```bash
npx expo install @expo-google-fonts/inter
npx expo install @expo-google-fonts/jetbrains-mono
```

### 3.2 Escala de Tamanhos

Baseada em escala modular com ratio 1.250 (Major Third).

```javascript
fontSize: {
  // Display (Grandes títulos, onboarding)
  '5xl': 48,   // 48px - Hero titles
  '4xl': 40,   // 40px - Page titles
  '3xl': 32,   // 32px - Section headers
  
  // Headings
  '2xl': 28,   // 28px - H1
  'xl':  24,   // 24px - H2
  'lg':  20,   // 20px - H3
  
  // Body
  'base': 16,  // 16px - Body text (padrão)
  'sm':   14,  // 14px - Small text, captions
  'xs':   12,  // 12px - Tiny text, labels
  'xxs':  10,  // 10px - Micro text, badges count
}
```

### 3.3 Pesos (Font Weights)

```javascript
fontWeight: {
  normal:    400,  // Body regular
  medium:    500,  // Body emphasis
  semibold:  600,  // Subtitles, labels
  bold:      700,  // Headings, buttons
  extrabold: 800,  // Display, hero
  black:     900,  // Display emphasis
}
```

### 3.4 Altura de Linha (Line Height)

```javascript
lineHeight: {
  // Valores absolutos para controle preciso
  tight:   1.2,  // Headings, títulos
  snug:    1.375, // Body text curto
  normal:  1.5,   // Body text padrão
  relaxed: 1.625, // Parágrafos longos
  loose:   1.75,  // Texto denso, onboarding
}
```

### 3.5 Letter Spacing (Tracking)

```javascript
letterSpacing: {
  tighter: -0.05,  // Display, grandes títulos
  tight:   -0.025, // Headings
  normal:   0,     // Body (padrão)
  wide:     0.025, // Botões, labels em uppercase
  wider:    0.05,  // Labels pequenos
  widest:   0.1,   // Texto todo em maiúsculas
}
```

### 3.6 Estilos de Texto Pré-definidos

```javascript
textStyles: {
  // Display
  displayLarge: {
    fontFamily: 'Inter',
    fontSize: 48,
    fontWeight: '900',
    lineHeight: 1.2,
    letterSpacing: -0.05,
  },
  
  displayMedium: {
    fontFamily: 'Inter',
    fontSize: 40,
    fontWeight: '800',
    lineHeight: 1.2,
    letterSpacing: -0.025,
  },
  
  // Headings
  h1: {
    fontFamily: 'Inter',
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 1.2,
    letterSpacing: -0.025,
  },
  
  h2: {
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 1.2,
    letterSpacing: 0,
  },
  
  h3: {
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 1.375,
    letterSpacing: 0,
  },
  
  // Body
  bodyLarge: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 1.5,
    letterSpacing: 0,
  },
  
  body: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 1.5,
    letterSpacing: 0,
  },
  
  bodySmall: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 1.5,
    letterSpacing: 0,
  },
  
  // Labels & Captions
  label: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 1.375,
    letterSpacing: 0.025,
  },
  
  labelSmall: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 1.375,
    letterSpacing: 0.025,
  },
  
  caption: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 1.375,
    letterSpacing: 0,
  },
  
  // Monospace (Stats, números)
  stat: {
    fontFamily: 'JetBrains Mono',
    fontSize: 32,
    fontWeight: '500',
    lineHeight: 1.2,
    letterSpacing: -0.025,
  },
  
  statSmall: {
    fontFamily: 'JetBrains Mono',
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 1.2,
    letterSpacing: 0,
  },
  
  // Botões
  button: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 1.2,
    letterSpacing: 0.025,
  },
  
  buttonSmall: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 1.2,
    letterSpacing: 0.025,
  },
}
```

### 3.7 Hierarquia Visual de Textos

| Elemento | Estilo | Cor | Uso |
|----------|--------|-----|-----|
| **Page Title** | displayMedium | neutro-100 | Título principal da tela |
| **Section Header** | h1 | neutro-100 | Cabeçalhos de seção |
| **Card Title** | h2 | neutro-100 | Títulos de cards |
| **Card Subtitle** | h3 | neutro-200 | Subtítulos de cards |
| **Body Primary** | body | neutro-200 | Texto principal |
| **Body Secondary** | bodySmall | neutro-300 | Texto secundário |
| **Label** | label | neutro-300 | Labels de inputs, categorias |
| **Caption** | caption | neutro-400 | Hints, informações extras |
| **Stats** | stat | brasa-500 | Números, métricas |
| **Button Text** | button | neutro-100 ou carbono-950 | Texto de botões |

---

## 4. ESPAÇAMENTOS E GRID

### 4.1 Sistema de Espaçamento

Baseado em escala de 4px (similar ao Material Design e Tailwind).

```javascript
spacing: {
  0:   0,    // 0px
  1:   4,    // 4px
  2:   8,    // 8px
  3:   12,   // 12px
  4:   16,   // 16px
  5:   20,   // 20px
  6:   24,   // 24px
  7:   28,   // 28px
  8:   32,   // 32px
  10:  40,   // 40px
  12:  48,   // 48px
  14:  56,   // 56px
  16:  64,   // 64px
  20:  80,   // 80px
  24:  96,   // 96px
  28:  112,  // 112px
  32:  128,  // 128px
}
```

### 4.2 Padding e Margin Padrões

```javascript
// Padding de Containers
containerPadding: {
  screen: 20,      // Padding lateral das telas (spacing-5)
  card: 16,        // Padding interno de cards (spacing-4)
  cardLarge: 20,   // Cards maiores (spacing-5)
  button: 16,      // Padding interno de botões (spacing-4)
  input: 16,       // Padding de inputs (spacing-4)
}

// Gaps entre elementos
gap: {
  xs: 4,    // spacing-1 - Entre ícone e texto
  sm: 8,    // spacing-2 - Entre elementos inline
  md: 12,   // spacing-3 - Entre cards pequenos
  lg: 16,   // spacing-4 - Entre cards médios
  xl: 20,   // spacing-5 - Entre seções
  '2xl': 24, // spacing-6 - Entre seções grandes
  '3xl': 32, // spacing-8 - Entre blocos principais
}
```

### 4.3 Tamanhos de Componentes

```javascript
sizes: {
  // Botões
  buttonHeight: {
    sm: 36,   // Botão pequeno
    md: 44,   // Botão padrão (touch target mínimo iOS)
    lg: 52,   // Botão grande
  },
  
  // Inputs
  inputHeight: {
    sm: 40,
    md: 48,
    lg: 56,
  },
  
  // Icons
  icon: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 40,
    '2xl': 48,
  },
  
  // Avatar
  avatar: {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 48,
    xl: 64,
    '2xl': 80,
  },
  
  // Cards
  cardMinHeight: {
    sm: 80,
    md: 120,
    lg: 160,
    xl: 200,
  },
  
  // Bottom Sheet / Modal
  bottomSheetHandle: {
    width: 40,
    height: 4,
  },
}
```

### 4.4 Larguras e Limites

```javascript
maxWidth: {
  // Largura máxima de conteúdo (para tablets/landscape)
  content: 640,    // ~iPhone 14 Pro Max landscape
  
  // Cards especiais
  cardMedium: 400,
  cardLarge: 600,
  
  // Modals
  modalSmall: 320,
  modalMedium: 480,
  modalLarge: 640,
}
```

### 4.5 Border Radius

```javascript
borderRadius: {
  none: 0,
  sm: 4,      // Labels, badges pequenos
  md: 8,      // Inputs, botões pequenos
  lg: 12,     // Botões padrão, cards pequenos
  xl: 16,     // Cards médios
  '2xl': 20,  // Cards grandes
  '3xl': 24,  // Cards especiais, modals
  full: 9999, // Pills, avatares circulares
}
```

### 4.6 Elevação (Shadows)

Dark mode usa menos sombras e mais bordas/elevação por cor.

```javascript
elevation: {
  // Sombras sutis para dark mode
  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  
  md: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  
  lg: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  
  xl: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  
  // Glow para elementos especiais (badges raros, level up)
  glow: {
    shadowColor: '#ff4422', // brasa-500
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 12,
  },
}
```

### 4.7 Safe Areas

```javascript
safeArea: {
  // Padding extra para safe areas iOS
  top: 44,      // Status bar + notch
  bottom: 34,   // Home indicator
  
  // Android
  statusBar: 24, // Status bar height
}
```

---

## 5. COMPONENTES BASE

### 5.1 Buttons

#### **Primary Button**
```jsx
// Exemplo de uso
<Button variant="primary" size="lg">
  Começar Agora
</Button>

// Estilo
{
  backgroundColor: brasa-500,
  paddingHorizontal: spacing-6,
  paddingVertical: spacing-4,
  borderRadius: borderRadius-lg,
  height: buttonHeight-lg,
  
  // Texto
  color: carbono-950,
  fontSize: fontSize-base,
  fontWeight: fontWeight-semibold,
  
  // Interação
  pressedBackgroundColor: brasa-600,
  disabledBackgroundColor: neutro-700,
  disabledColor: neutro-400,
}
```

#### **Secondary Button**
```jsx
{
  backgroundColor: carbono-700,
  borderWidth: 1,
  borderColor: carbono-600,
  color: neutro-100,
  
  pressedBackgroundColor: carbono-600,
  pressedBorderColor: carbono-500,
}
```

#### **Ghost Button**
```jsx
{
  backgroundColor: transparent,
  borderWidth: 1,
  borderColor: neutro-600,
  color: neutro-200,
  
  pressedBackgroundColor: carbono-800,
  pressedBorderColor: neutro-500,
}
```

#### **Icon Button**
```jsx
{
  width: sizes-icon-lg,
  height: sizes-icon-lg,
  borderRadius: borderRadius-md,
  backgroundColor: carbono-800,
  
  // Ícone centralizado
  justifyContent: 'center',
  alignItems: 'center',
}
```

### 5.2 Cards

#### **Card Base**
```jsx
{
  backgroundColor: carbono-900,
  borderRadius: borderRadius-xl,
  padding: spacing-5,
  borderWidth: 1,
  borderColor: carbono-800,
  
  // Elevação sutil
  ...elevation.sm,
}
```

#### **Card Elevated**
```jsx
{
  backgroundColor: carbono-800,
  borderRadius: borderRadius-2xl,
  padding: spacing-6,
  borderWidth: 1,
  borderColor: carbono-700,
  ...elevation.md,
}
```

#### **Card Premium (Badges raros, tier Alpha)**
```jsx
{
  backgroundColor: carbono-800,
  borderRadius: borderRadius-2xl,
  padding: spacing-6,
  borderWidth: 2,
  borderColor: testosterona-500,
  ...elevation.glow, // Glow dourado
}
```

### 5.3 Inputs

#### **Text Input**
```jsx
{
  backgroundColor: carbono-800,
  borderWidth: 1,
  borderColor: carbono-600,
  borderRadius: borderRadius-lg,
  padding: spacing-4,
  height: inputHeight-md,
  
  // Texto
  color: neutro-100,
  fontSize: fontSize-base,
  fontWeight: fontWeight-normal,
  
  // Placeholder
  placeholderColor: neutro-400,
  
  // Focus
  focusBorderColor: brasa-500,
  focusBorderWidth: 2,
}
```

#### **Search Input**
```jsx
{
  backgroundColor: carbono-800,
  borderRadius: borderRadius-full,
  paddingLeft: spacing-12, // Espaço para ícone de lupa
  height: inputHeight-sm,
  borderWidth: 0,
}
```

### 5.4 Checkboxes & Radio

#### **Checkbox**
```jsx
{
  width: 24,
  height: 24,
  borderRadius: borderRadius-sm,
  borderWidth: 2,
  borderColor: neutro-600,
  backgroundColor: transparent,
  
  // Checked
  checkedBackgroundColor: sucesso-500,
  checkedBorderColor: sucesso-500,
}
```

#### **Radio Button**
```jsx
{
  width: 24,
  height: 24,
  borderRadius: borderRadius-full,
  borderWidth: 2,
  borderColor: neutro-600,
  backgroundColor: transparent,
  
  // Selected (dot interno)
  selectedBorderColor: brasa-500,
  selectedDotSize: 12,
  selectedDotColor: brasa-500,
}
```

### 5.5 Switches

```jsx
{
  width: 48,
  height: 28,
  borderRadius: borderRadius-full,
  backgroundColor: neutro-700, // Off
  
  // Thumb (bolinha)
  thumbSize: 24,
  thumbColor: neutro-100,
  thumbShadow: elevation.sm,
  
  // On
  onBackgroundColor: sucesso-500,
  onThumbColor: neutro-50,
}
```

### 5.6 Sliders

```jsx
{
  height: 4,
  borderRadius: borderRadius-full,
  backgroundColor: carbono-700, // Track
  
  // Filled track
  filledTrackColor: brasa-500,
  
  // Thumb
  thumbSize: 24,
  thumbColor: brasa-500,
  thumbBorderWidth: 4,
  thumbBorderColor: carbono-950,
  thumbShadow: elevation.md,
}
```

### 5.7 Progress Bars

#### **Linear Progress**
```jsx
{
  height: 8,
  borderRadius: borderRadius-full,
  backgroundColor: carbono-800, // Background
  
  // Fill
  fillColor: brasa-500,
  
  // Com gradiente (para testosterona)
  fillGradient: gradientes.testo,
}
```

#### **Circular Progress**
```jsx
{
  size: 120,
  strokeWidth: 8,
  backgroundColor: carbono-800,
  fillColor: brasa-500,
  
  // Texto central
  centerTextSize: fontSize-3xl,
  centerTextColor: neutro-100,
  centerTextWeight: fontWeight-bold,
}
```

### 5.8 Badges

#### **Badge Pequeno (count)**
```jsx
{
  minWidth: 20,
  height: 20,
  borderRadius: borderRadius-full,
  backgroundColor: brasa-500,
  paddingHorizontal: spacing-1,
  
  // Texto
  color: neutro-50,
  fontSize: fontSize-xxs,
  fontWeight: fontWeight-bold,
}
```

#### **Badge Label**
```jsx
{
  paddingHorizontal: spacing-3,
  paddingVertical: spacing-1,
  borderRadius: borderRadius-md,
  backgroundColor: carbono-700,
  borderWidth: 1,
  borderColor: carbono-600,
  
  // Texto
  color: neutro-200,
  fontSize: fontSize-xs,
  fontWeight: fontWeight-semibold,
}
```

#### **Badge Conquista (Achievement)**
```jsx
{
  width: 64,
  height: 64,
  borderRadius: borderRadius-xl,
  backgroundColor: carbono-800,
  borderWidth: 2,
  borderColor: sucesso-500, // Muda por raridade
  
  // Icon centralizado
  justifyContent: 'center',
  alignItems: 'center',
  
  // Raro: borderColor testosterona-500 + glow
  // Épico: borderColor disciplina-500 + glow
}
```

### 5.9 Modals e Bottom Sheets

#### **Modal Overlay**
```jsx
{
  backgroundColor: overlay.dark,
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
}
```

#### **Modal Container**
```jsx
{
  backgroundColor: carbono-900,
  borderRadius: borderRadius-3xl,
  padding: spacing-6,
  maxWidth: maxWidth.modalMedium,
  ...elevation.xl,
}
```

#### **Bottom Sheet**
```jsx
{
  backgroundColor: carbono-900,
  borderTopLeftRadius: borderRadius-3xl,
  borderTopRightRadius: borderRadius-3xl,
  paddingTop: spacing-4,
  paddingHorizontal: spacing-5,
  paddingBottom: safeArea.bottom + spacing-5,
  
  // Handle
  handleWidth: bottomSheetHandle.width,
  handleHeight: bottomSheetHandle.height,
  handleColor: neutro-600,
  handleBorderRadius: borderRadius-full,
}
```

### 5.10 Toasts e Notifications

```jsx
{
  backgroundColor: carbono-800,
  borderRadius: borderRadius-lg,
  padding: spacing-4,
  borderLeftWidth: 4,
  borderLeftColor: sucesso-500, // Muda por tipo
  ...elevation.lg,
  
  // Tipos
  success: { borderLeftColor: sucesso-500 },
  error: { borderLeftColor: erro-500 },
  warning: { borderLeftColor: alerta-500 },
  info: { borderLeftColor: info-500 },
}
```

---

## 6. ICONOGRAFIA

### 6.1 Biblioteca de Ícones

**Lucide React Native** - Moderna, consistente, open-source.

```bash
npm install lucide-react-native
```

### 6.2 Tamanhos de Ícones

```javascript
iconSizes: {
  xs: 16,   // Labels, inline text
  sm: 20,   // Inputs, small buttons
  md: 24,   // Botões padrão, cards
  lg: 32,   // Headers, grandes ações
  xl: 40,   // Features, onboarding
  '2xl': 48, // Hero icons
  '3xl': 64, // Ilustrações inline
}
```

### 6.3 Ícones Principais por Contexto

```javascript
icons: {
  // Navegação
  home: 'Home',
  ranking: 'TrendingUp',
  profile: 'User',
  agent: 'MessageCircle',
  scanner: 'Scan', // Fase 2
  
  // Ações
  add: 'Plus',
  edit: 'Edit',
  delete: 'Trash2',
  check: 'Check',
  close: 'X',
  search: 'Search',
  filter: 'Filter',
  settings: 'Settings',
  
  // Metas e Progresso
  target: 'Target',
  trophy: 'Trophy',
  medal: 'Medal',
  star: 'Star',
  flame: 'Flame', // Streak
  zap: 'Zap', // Energia
  
  // Treino
  dumbbell: 'Dumbbell',
  timer: 'Timer',
  play: 'Play',
  pause: 'Pause',
  repeat: 'Repeat',
  
  // Alimentação
  utensils: 'Utensils',
  apple: 'Apple',
  coffee: 'Coffee',
  
  // Testosterona
  activity: 'Activity',
  heartPulse: 'HeartPulse',
  droplet: 'Droplet', // Hidratação
  
  // Social
  users: 'Users',
  share: 'Share2',
  bell: 'Bell',
  
  // Informações
  info: 'Info',
  alertCircle: 'AlertCircle',
  alertTriangle: 'AlertTriangle',
  helpCircle: 'HelpCircle',
  
  // Navegação App
  chevronRight: 'ChevronRight',
  chevronLeft: 'ChevronLeft',
  chevronDown: 'ChevronDown',
  chevronUp: 'ChevronUp',
  
  // Badges
  shield: 'Shield',
  award: 'Award',
  crown: 'Crown',
  gem: 'Gem',
  
  // Voz (Agente)
  mic: 'Mic',
  micOff: 'MicOff',
  volume: 'Volume2',
  volumeX: 'VolumeX',
}
```

### 6.4 Cores de Ícones por Contexto

| Contexto | Cor | Uso |
|----------|-----|-----|
| **Default** | neutro-300 | Ícones neutros, navegação |
| **Active** | brasa-500 | Navegação ativa, CTAs |
| **Success** | sucesso-500 | Ações positivas, checkmarks |
| **Warning** | alerta-500 | Avisos, atenção |
| **Error** | erro-500 | Erros, delete |
| **Info** | info-500 | Informações, dicas |
| **Muted** | neutro-500 | Ícones desabilitados |

---

## 7. ANIMAÇÕES E TRANSIÇÕES

### 7.1 Durações

```javascript
duration: {
  instant: 0,      // Sem animação
  fast: 150,       // Interações rápidas (hover, press)
  normal: 250,     // Transições padrão
  slow: 400,       // Modals, page transitions
  slower: 600,     // Animações complexas
  slowest: 1000,   // Animações de conquista
}
```

### 7.2 Easing Functions

```javascript
easing: {
  // React Native Animated
  easeInOut: Easing.inOut(Easing.ease),
  easeOut: Easing.out(Easing.ease),
  easeIn: Easing.in(Easing.ease),
  
  // Bounces
  bounce: Easing.bounce,
  elastic: Easing.elastic(1),
  
  // Custom (para animações especiais)
  spring: { tension: 100, friction: 8 },
}
```

### 7.3 Animações de Componentes

#### **Button Press**
```jsx
// Scale down ao pressionar
scale: {
  from: 1,
  to: 0.96,
  duration: duration.fast,
  easing: easing.easeOut,
}
```

#### **Card Appear**
```jsx
// Fade in + slide up
opacity: { from: 0, to: 1, duration: duration.normal },
translateY: { from: 20, to: 0, duration: duration.normal },
```

#### **Modal Enter**
```jsx
// Overlay fade + content slide up
overlay: {
  opacity: { from: 0, to: 1, duration: duration.normal },
},
content: {
  translateY: { from: 300, to: 0, duration: duration.slow },
  opacity: { from: 0, to: 1, duration: duration.normal },
}
```

#### **Badge Unlock (Conquista)**
```jsx
// Scale bounce + glow pulse
scale: {
  from: 0,
  to: 1,
  duration: duration.slower,
  easing: easing.elastic,
},
glow: {
  shadowOpacity: [0, 0.8, 0],
  duration: duration.slowest,
  loop: true,
}
```

#### **Level Up**
```jsx
// Partículas + gradiente animado + scale
particles: { 
  count: 20, 
  spread: 360, 
  duration: duration.slowest 
},
gradient: {
  colors: [brasa-500, disciplina-500, testosterona-500],
  duration: duration.slowest,
  loop: false,
},
scale: {
  from: 0.8,
  to: 1.2,
  to: 1,
  duration: duration.slower,
}
```

### 7.4 Micro-interações

```javascript
microInteractions: {
  // Checkbox check
  checkmark: {
    strokeDashoffset: { from: 100, to: 0 },
    duration: duration.fast,
  },
  
  // Progress bar fill
  progressFill: {
    width: { from: '0%', to: '100%' },
    duration: duration.slow,
    easing: easing.easeInOut,
  },
  
  // Slider thumb
  sliderThumb: {
    scale: { from: 1, to: 1.2, to: 1 },
    duration: duration.fast,
  },
  
  // Notification badge pulse
  badgePulse: {
    scale: [1, 1.1, 1],
    duration: duration.normal,
    loop: true,
  },
}
```

### 7.5 Page Transitions

```javascript
pageTransitions: {
  // Stack Navigator (Android-like)
  slide: {
    in: { translateX: { from: screenWidth, to: 0 } },
    out: { translateX: { from: 0, to: -screenWidth / 3 } },
    duration: duration.normal,
  },
  
  // Modal (iOS-like)
  modal: {
    in: { 
      translateY: { from: screenHeight, to: 0 },
      opacity: { from: 0, to: 1 },
    },
    out: { 
      translateY: { from: 0, to: screenHeight },
      opacity: { from: 1, to: 0 },
    },
    duration: duration.slow,
  },
  
  // Fade (para tabs)
  fade: {
    in: { opacity: { from: 0, to: 1 } },
    out: { opacity: { from: 1, to: 0 } },
    duration: duration.fast,
  },
}
```

---

## 8. PADRÕES DE NAVEGAÇÃO

### 8.1 Estrutura de Navegação

```
Root Navigator (Stack)
├─ Auth Stack
│  ├─ Sign In
│  ├─ Sign Up
│  └─ Forgot Password
│
├─ Onboarding Stack
│  ├─ Welcome
│  ├─ Quiz (28 perguntas)
│  └─ Plan Preview
│
├─ Paywall Modal
│
└─ Main Tabs (Bottom)
   ├─ Home (Stack)
   │  ├─ Dashboard
   │  ├─ Workout Detail
   │  ├─ Meal Plan
   │  └─ Goal Details
   │
   ├─ Ranking (Stack)
   │  ├─ Ranking List
   │  └─ Profile View
   │
   ├─ Agent (Stack)
   │  ├─ Conversation
   │  └─ History
   │
   └─ Profile (Stack)
      ├─ Profile View
      ├─ Settings
      ├─ Badges Gallery
      └─ Subscription
```

### 8.2 Bottom Tab Bar

```jsx
{
  height: 72 + safeArea.bottom,
  backgroundColor: carbono-900,
  borderTopWidth: 1,
  borderTopColor: carbono-800,
  paddingBottom: safeArea.bottom,
  paddingTop: spacing-3,
  
  // Tab Item
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing-1,
  },
  
  // Icon
  icon: {
    size: sizes.icon.md,
    color: neutro-400, // Inactive
    activeColor: brasa-500, // Active
  },
  
  // Label
  label: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    color: neutro-400, // Inactive
    activeColor: neutro-100, // Active
  },
  
  // Active indicator (linha superior)
  activeIndicator: {
    width: 32,
    height: 3,
    backgroundColor: brasa-500,
    borderRadius: borderRadius.full,
    position: 'absolute',
    top: 0,
  },
}
```

### 8.3 Header / App Bar

```jsx
{
  height: 56 + safeArea.top,
  backgroundColor: carbono-950,
  paddingTop: safeArea.top,
  paddingHorizontal: spacing-5,
  flexDirection: 'row',
  alignItems: 'center',
  borderBottomWidth: 1,
  borderBottomColor: carbono-800,
  
  // Título
  title: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: neutro-100,
  },
  
  // Ícones (botões laterais)
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    backgroundColor: carbono-800,
    justifyContent: 'center',
    alignItems: 'center',
  },
}
```

### 8.4 Floating Action Button (FAB)

```jsx
{
  position: 'absolute',
  bottom: safeArea.bottom + spacing-5 + 72, // Acima do tab bar
  right: spacing-5,
  
  width: 56,
  height: 56,
  borderRadius: borderRadius.full,
  backgroundColor: brasa-500,
  ...elevation.lg,
  
  // Ícone
  justifyContent: 'center',
  alignItems: 'center',
  iconSize: sizes.icon.lg,
  iconColor: carbono-950,
}
```

---

## 9. ESTADOS DE INTERAÇÃO

### 9.1 Estados de Botões

```javascript
buttonStates: {
  // Default
  default: {
    backgroundColor: brasa-500,
    borderColor: transparent,
    color: carbono-950,
  },
  
  // Hover (web only, não aplicável a mobile)
  // Usar visual feedback via Pressable
  
  // Pressed
  pressed: {
    backgroundColor: brasa-600,
    scale: 0.96,
  },
  
  // Focused (teclado/acessibilidade)
  focused: {
    borderWidth: 2,
    borderColor: info-500,
    outlineWidth: 4,
    outlineColor: rgba(info-500, 0.3),
  },
  
  // Disabled
  disabled: {
    backgroundColor: neutro-700,
    color: neutro-400,
    opacity: 0.6,
  },
  
  // Loading
  loading: {
    backgroundColor: brasa-500,
    opacity: 0.8,
    // Spinner interno
  },
}
```

### 9.2 Estados de Inputs

```javascript
inputStates: {
  // Default
  default: {
    borderColor: carbono-600,
    backgroundColor: carbono-800,
  },
  
  // Focus
  focused: {
    borderColor: brasa-500,
    borderWidth: 2,
    backgroundColor: carbono-750,
  },
  
  // Error
  error: {
    borderColor: erro-500,
    borderWidth: 2,
  },
  
  // Success
  success: {
    borderColor: sucesso-500,
    borderWidth: 2,
  },
  
  // Disabled
  disabled: {
    backgroundColor: neutro-800,
    color: neutro-500,
    opacity: 0.5,
  },
}
```

### 9.3 Estados de Cards

```javascript
cardStates: {
  // Default
  default: {
    backgroundColor: carbono-900,
    borderColor: carbono-800,
  },
  
  // Hover/Pressed (se clicável)
  pressed: {
    backgroundColor: carbono-850,
    borderColor: carbono-700,
    scale: 0.98,
  },
  
  // Selected (em listas)
  selected: {
    backgroundColor: carbono-800,
    borderColor: brasa-500,
    borderWidth: 2,
  },
  
  // Disabled
  disabled: {
    opacity: 0.5,
  },
}
```

### 9.4 Loading States

```javascript
loadingStates: {
  // Skeleton (placeholder loading)
  skeleton: {
    backgroundColor: neutro-800,
    animation: {
      shimmer: {
        colors: [neutro-800, neutro-700, neutro-800],
        duration: duration.slower,
        loop: true,
      },
    },
  },
  
  // Spinner
  spinner: {
    color: brasa-500,
    size: sizes.icon.lg,
  },
  
  // Progress Bar (para operações longas)
  progressBar: {
    backgroundColor: carbono-800,
    fillColor: brasa-500,
    height: 4,
  },
}
```

### 9.5 Empty States

```javascript
emptyState: {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing-8,
  },
  
  icon: {
    size: sizes.icon['2xl'],
    color: neutro-600,
    marginBottom: spacing-4,
  },
  
  title: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold,
    color: neutro-100,
    textAlign: 'center',
    marginBottom: spacing-2,
  },
  
  description: {
    fontSize: fontSize.sm,
    color: neutro-400,
    textAlign: 'center',
    marginBottom: spacing-6,
  },
}
```

---

## 10. TOKENS DE DESIGN

### 10.1 Estrutura de Tokens

Os tokens são a **fonte única de verdade** para todos os valores de design. Devem ser usados em toda a aplicação para garantir consistência.

```typescript
// tokens.ts
export const tokens = {
  colors: { /* ver seção 2 */ },
  fonts: { /* ver seção 3 */ },
  spacing: { /* ver seção 4 */ },
  borderRadius: { /* ver seção 4 */ },
  elevation: { /* ver seção 4 */ },
  sizes: { /* ver seção 4 */ },
  duration: { /* ver seção 7 */ },
  easing: { /* ver seção 7 */ },
}
```

### 10.2 Semantic Tokens

Tokens semânticos que mapeiam tokens primitivos para contextos específicos.

```typescript
// semanticTokens.ts
export const semanticTokens = {
  // Backgrounds
  bg: {
    primary: tokens.colors.carbono[950],
    secondary: tokens.colors.carbono[900],
    tertiary: tokens.colors.carbono[800],
    elevated: tokens.colors.carbono[800],
    overlay: tokens.colors.overlay.dark,
  },
  
  // Text
  text: {
    primary: tokens.colors.neutro[100],
    secondary: tokens.colors.neutro[200],
    tertiary: tokens.colors.neutro[300],
    muted: tokens.colors.neutro[400],
    disabled: tokens.colors.neutro[500],
    inverse: tokens.colors.carbono[950],
  },
  
  // Borders
  border: {
    default: tokens.colors.carbono[600],
    subtle: tokens.colors.carbono[700],
    strong: tokens.colors.carbono[500],
    accent: tokens.colors.brasa[500],
  },
  
  // Actions
  action: {
    primary: tokens.colors.brasa[500],
    primaryHover: tokens.colors.brasa[600],
    secondary: tokens.colors.carbono[700],
    secondaryHover: tokens.colors.carbono[600],
  },
  
  // Feedback
  feedback: {
    success: tokens.colors.sucesso[500],
    error: tokens.colors.erro[500],
    warning: tokens.colors.alerta[500],
    info: tokens.colors.info[500],
  },
  
  // Special
  special: {
    testo: tokens.colors.testosterona[500],
    discipline: tokens.colors.disciplina[500],
    brasa: tokens.colors.brasa[500],
  },
}
```

### 10.3 Component Tokens

Tokens específicos para componentes, facilitando customização global.

```typescript
// componentTokens.ts
export const componentTokens = {
  button: {
    primary: {
      bg: semanticTokens.action.primary,
      bgPressed: semanticTokens.action.primaryHover,
      text: semanticTokens.text.inverse,
      borderRadius: tokens.borderRadius.lg,
      paddingX: tokens.spacing[6],
      paddingY: tokens.spacing[4],
      height: tokens.sizes.buttonHeight.lg,
    },
    secondary: {
      bg: semanticTokens.action.secondary,
      bgPressed: semanticTokens.action.secondaryHover,
      text: semanticTokens.text.primary,
      borderRadius: tokens.borderRadius.lg,
      borderWidth: 1,
      borderColor: semanticTokens.border.default,
    },
  },
  
  card: {
    default: {
      bg: semanticTokens.bg.secondary,
      borderRadius: tokens.borderRadius.xl,
      padding: tokens.spacing[5],
      borderWidth: 1,
      borderColor: semanticTokens.border.subtle,
      elevation: tokens.elevation.sm,
    },
    elevated: {
      bg: semanticTokens.bg.elevated,
      borderRadius: tokens.borderRadius['2xl'],
      padding: tokens.spacing[6],
      borderWidth: 1,
      borderColor: semanticTokens.border.default,
      elevation: tokens.elevation.md,
    },
  },
  
  input: {
    default: {
      bg: semanticTokens.bg.tertiary,
      borderRadius: tokens.borderRadius.lg,
      padding: tokens.spacing[4],
      height: tokens.sizes.inputHeight.md,
      borderWidth: 1,
      borderColor: semanticTokens.border.default,
      text: semanticTokens.text.primary,
      placeholder: semanticTokens.text.muted,
    },
  },
}
```

---

## 11. IMPLEMENTAÇÃO TÉCNICA

### 11.1 Setup Inicial

#### **Instalar Dependências**

```bash
# React Native + Expo
npx create-expo-app antibeta --template blank-typescript

# NativeWind (Tailwind CSS para React Native)
npm install nativewind
npm install --save-dev tailwindcss@3.3.2

# Navegação
npm install @react-navigation/native
npm install @react-navigation/native-stack
npm install @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context

# Fontes
npx expo install @expo-google-fonts/inter
npx expo install @expo-google-fonts/jetbrains-mono
npx expo install expo-font

# Ícones
npm install lucide-react-native

# Animações
npm install react-native-reanimated
npm install react-native-gesture-handler

# State Management
npm install zustand

# Utils
npm install clsx
npm install tailwind-merge
```

#### **Configurar Tailwind**

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Importar do design system
        carbono: {
          950: '#0d090a',
          900: '#1a1416',
          // ... resto
        },
        brasa: {
          500: '#ff4422',
          // ... resto
        },
        // ... todas as outras cores
      },
      fontFamily: {
        inter: ['Inter'],
        mono: ['JetBrains Mono'],
      },
      spacing: {
        // Usando escala de 4px
        1: '4px',
        2: '8px',
        // ... resto
      },
      borderRadius: {
        // Customizado
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '20px',
        '3xl': '24px',
        full: '9999px',
      },
    },
  },
  plugins: [],
}
```

#### **Configurar NativeWind**

```javascript
// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel',
      'react-native-reanimated/plugin',
    ],
  };
};
```

### 11.2 Estrutura de Pastas

```
src/
├── components/           # Componentes reutilizáveis
│   ├── base/            # Componentes base (Button, Card, Input)
│   ├── composite/       # Componentes compostos (GoalCard, BadgeItem)
│   └── layout/          # Layout components (Screen, Container)
│
├── design-system/       # Design System
│   ├── tokens.ts        # Tokens primitivos
│   ├── semanticTokens.ts # Tokens semânticos
│   ├── componentTokens.ts # Tokens de componentes
│   ├── theme.ts         # Theme provider
│   └── utils.ts         # Utilitários (cn, etc)
│
├── screens/             # Telas do app
│   ├── auth/
│   ├── onboarding/
│   ├── main/
│   └── profile/
│
├── navigation/          # Navegação
│   ├── RootNavigator.tsx
│   ├── AuthNavigator.tsx
│   └── MainNavigator.tsx
│
├── hooks/               # Custom hooks
├── services/            # API calls, integrations
├── store/               # Zustand stores
├── utils/               # Utility functions
├── types/               # TypeScript types
└── assets/              # Imagens, fontes
```

### 11.3 Exemplos de Implementação

#### **Botão Base**

```typescript
// src/components/base/Button.tsx
import React from 'react';
import { Pressable, Text, ActivityIndicator } from 'react-native';
import { componentTokens } from '@/design-system/componentTokens';
import { cn } from '@/design-system/utils';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'lg',
  children,
  onPress,
  disabled,
  loading,
  icon,
  fullWidth,
  className,
}) => {
  const baseStyles = 'flex-row items-center justify-center rounded-lg';
  
  const variantStyles = {
    primary: 'bg-brasa-500 active:bg-brasa-600',
    secondary: 'bg-carbono-700 border border-carbono-600 active:bg-carbono-600',
    ghost: 'bg-transparent border border-neutro-600 active:bg-carbono-800',
  };
  
  const sizeStyles = {
    sm: 'h-9 px-4',
    md: 'h-11 px-5',
    lg: 'h-[52px] px-6',
  };
  
  const textVariantStyles = {
    primary: 'text-carbono-950',
    secondary: 'text-neutro-100',
    ghost: 'text-neutro-200',
  };
  
  const textSizeStyles = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-base',
  };
  
  const disabledStyles = disabled ? 'opacity-60 bg-neutro-700' : '';
  const widthStyles = fullWidth ? 'w-full' : '';
  
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        disabledStyles,
        widthStyles,
        className
      )}
      style={({ pressed }) => ({
        transform: [{ scale: pressed ? 0.96 : 1 }],
      })}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'primary' ? '#0d090a' : '#f5f5f5'} 
        />
      ) : (
        <>
          {icon && <View className="mr-2">{icon}</View>}
          <Text 
            className={cn(
              'font-semibold',
              textVariantStyles[variant],
              textSizeStyles[size]
            )}
          >
            {children}
          </Text>
        </>
      )}
    </Pressable>
  );
};
```

#### **Card Base**

```typescript
// src/components/base/Card.tsx
import React from 'react';
import { View, ViewProps } from 'react-native';
import { cn } from '@/design-system/utils';

interface CardProps extends ViewProps {
  variant?: 'default' | 'elevated' | 'premium';
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  children,
  className,
  ...props
}) => {
  const baseStyles = 'rounded-xl p-5 border';
  
  const variantStyles = {
    default: 'bg-carbono-900 border-carbono-800',
    elevated: 'bg-carbono-800 border-carbono-700',
    premium: 'bg-carbono-800 border-2 border-testosterona-500',
  };
  
  return (
    <View 
      className={cn(
        baseStyles, 
        variantStyles[variant], 
        className
      )}
      {...props}
    >
      {children}
    </View>
  );
};
```

#### **Theme Provider**

```typescript
// src/design-system/theme.ts
import React, { createContext, useContext } from 'react';
import { tokens } from './tokens';
import { semanticTokens } from './semanticTokens';
import { componentTokens } from './componentTokens';

interface Theme {
  tokens: typeof tokens;
  semanticTokens: typeof semanticTokens;
  componentTokens: typeof componentTokens;
  mode: 'dark' | 'light';
}

const ThemeContext = createContext<Theme | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const theme: Theme = {
    tokens,
    semanticTokens,
    componentTokens,
    mode: 'dark', // Dark mode como padrão
  };
  
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
```

#### **Utility Function (cn)**

```typescript
// src/design-system/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind classes with proper conflict resolution
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### 11.4 Uso no App

```typescript
// App.tsx
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { JetBrainsMono_500Medium } from '@expo-google-fonts/jetbrains-mono';
import { ThemeProvider } from '@/design-system/theme';
import { RootNavigator } from '@/navigation/RootNavigator';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    JetBrainsMono_500Medium,
  });
  
  if (!fontsLoaded) {
    return null; // ou <SplashScreen />
  }
  
  return (
    <ThemeProvider>
      <StatusBar style="light" />
      <RootNavigator />
    </ThemeProvider>
  );
}
```

```typescript
// Exemplo de uso em uma tela
import { View, Text, ScrollView } from 'react-native';
import { Button } from '@/components/base/Button';
import { Card } from '@/components/base/Card';

export const HomeScreen = () => {
  return (
    <ScrollView className="flex-1 bg-carbono-950 px-5 pt-6">
      <Text className="text-3xl font-bold text-neutro-100 mb-6">
        Suas Metas Hoje
      </Text>
      
      <Card variant="elevated" className="mb-4">
        <Text className="text-xl font-semibold text-neutro-100 mb-2">
          Nível de Testosterona
        </Text>
        <Text className="text-4xl font-mono text-testosterona-500">
          758
        </Text>
      </Card>
      
      <Button 
        variant="primary" 
        size="lg" 
        fullWidth
        onPress={() => console.log('Começar Treino')}
      >
        Começar Treino
      </Button>
    </ScrollView>
  );
};
```

---

## 12. CHECKLIST DE IMPLEMENTAÇÃO

### 12.1 Setup (Sprint 0)

- [ ] Instalar todas as dependências
- [ ] Configurar Tailwind + NativeWind
- [ ] Configurar fontes (Inter + JetBrains Mono)
- [ ] Criar estrutura de pastas
- [ ] Implementar tokens primitivos
- [ ] Implementar tokens semânticos
- [ ] Implementar ThemeProvider
- [ ] Testar tema em tela básica

### 12.2 Componentes Base (Sprint 1-2)

- [ ] Button (3 variantes)
- [ ] Card (3 variantes)
- [ ] Input (text, search)
- [ ] Checkbox
- [ ] Radio Button
- [ ] Switch
- [ ] Slider
- [ ] Progress Bar (linear, circular)
- [ ] Badge (count, label, achievement)

### 12.3 Componentes de Layout (Sprint 2-3)

- [ ] Screen container
- [ ] Header / App Bar
- [ ] Bottom Tab Bar
- [ ] Modal
- [ ] Bottom Sheet
- [ ] Toast / Notification

### 12.4 Navegação (Sprint 3)

- [ ] Stack Navigator
- [ ] Tab Navigator
- [ ] Modal apresentação
- [ ] Deep linking
- [ ] Page transitions

### 12.5 Componentes Específicos (Sprint 4-6)

- [ ] Goal Card
- [ ] Workout Exercise Item
- [ ] Badge Item (galeria)
- [ ] Ranking Item
- [ ] Testo Level Gauge
- [ ] Daily Quiz Card
- [ ] Conversation Bubble (Agent)
- [ ] Stat Card (números + gráfico simples)

### 12.6 Animações (Sprint 5-6)

- [ ] Button press feedback
- [ ] Card appear
- [ ] Modal enter/exit
- [ ] Page transitions
- [ ] Badge unlock (conquista)
- [ ] Level up animation
- [ ] Progress bar fill
- [ ] Skeleton loading

### 12.7 Testes e Refinamento (Sprint 6)

- [ ] Testar em iOS (físico + simulador)
- [ ] Testar em Android (físico + emulador)
- [ ] Testar acessibilidade (VoiceOver, TalkBack)
- [ ] Testar performance (60fps)
- [ ] Ajustar contrastes (WCAG AAA)
- [ ] Validar consistência visual
- [ ] Documentar componentes
- [ ] Criar Storybook (opcional)

---

## 13. REFERÊNCIAS E RECURSOS

### 13.1 Design Systems Consultados

- **Material Design 3** - https://m3.material.io/
- **Apple Human Interface Guidelines** - https://developer.apple.com/design/human-interface-guidelines/
- **Carbon Design System** - https://carbondesignsystem.com/
- **NativeCN** - https://nativecn.mintlify.app/
- **Dribbble** - https://dribbble.com/ (para inspirações visuais)

### 13.2 Ferramentas Recomendadas

- **Figma** - Design e prototipagem
- **ColorBox by Lyft** - Geração de paletas acessíveis
- **Atmos** - Criação de paletas dark mode
- **WebAIM Contrast Checker** - Validação de contraste
- **React Native Debugger** - Debug de componentes
- **Storybook** - Documentação de componentes (opcional)

### 13.3 Bibliotecas Complementares

```bash
# Gestos avançados
npm install react-native-gesture-handler

# Animações complexas
npm install lottie-react-native

# Bottom Sheets
npm install @gorhom/bottom-sheet

# Haptic Feedback
npx expo install expo-haptics

# Linear Gradient
npx expo install expo-linear-gradient

# Blur View
npx expo install expo-blur

# SVG
npm install react-native-svg
```

---

## 14. MANUTENÇÃO E EVOLUÇÃO

### 14.1 Versionamento

Este Design System segue **Semantic Versioning**:

- **MAJOR** (1.x.x): Mudanças que quebram compatibilidade (ex: renomear tokens)
- **MINOR** (x.1.x): Novas features sem quebrar compatibilidade (ex: novos componentes)
- **PATCH** (x.x.1): Bug fixes e melhorias (ex: ajuste de cor)

### 14.2 Processo de Atualização

1. **Proposta de Mudança**: Issue no GitHub com justificativa
2. **Review**: Time de design + tech lead aprovam
3. **Implementação**: Criar branch, implementar, testar
4. **Documentação**: Atualizar este documento
5. **Release**: Merge + bump de versão
6. **Comunicação**: Anunciar mudanças para o time

### 14.3 Contribuindo

Para contribuir com o Design System:

1. Leia este documento completo
2. Verifique issues existentes
3. Crie proposta detalhada
4. Implemente seguindo padrões
5. Teste em iOS + Android
6. Documente mudanças
7. Submeta PR com screenshots

---

## CONCLUSÃO

Este Design System foi criado para ser a **fundação sólida** do aplicativo Antibeta. Ele combina as melhores práticas do mercado com a identidade única do produto: **masculinidade moderna, minimalismo funcional e gamificação elegante**.

**Princípios para lembrar sempre:**

✅ **Consistência acima de tudo** - Use os tokens, não valores hardcoded  
✅ **Dark mode é o padrão** - Pense em contraste e legibilidade  
✅ **Performance importa** - 60fps é obrigatório  
✅ **Acessibilidade não é opcional** - WCAG AA mínimo  
✅ **Mobile-first sempre** - Toque, gestos, thumb-friendly  

**Este documento é vivo.** Conforme o produto evolui, o Design System evolui junto. Mantenha-o atualizado e trateo como código de produção.

---

**Documento criado por:** Especialista em Design Systems Mobile  
**Para:** Antibeta - Sistema Multi-Agente de Desenvolvimento Masculino  
**Data:** Fevereiro 2025  
**Versão:** 1.0  

**"Design is not just what it looks like and feels like. Design is how it works."** - Steve Jobs
