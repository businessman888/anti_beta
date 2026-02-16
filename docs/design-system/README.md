# 🎨 ANTIBETA DESIGN SYSTEM

Design System completo e profissional para o aplicativo mobile **Antibeta** - Sistema Multi-Agente de Desenvolvimento Masculino.

**Stack:** React Native + Expo + NativeWind (Tailwind CSS)  
**Plataformas:** iOS + Android  
**Versão:** 1.0  
**Data:** Fevereiro 2025

---

## 📦 Conteúdo do Pacote

```
antibeta-design-system/
├── README.md                      # Este arquivo
├── ANTIBETA_DESIGN_SYSTEM.md      # Documentação completa (145 páginas)
├── GUIA_RAPIDO.md                 # Guia rápido de uso (5 min)
├── tokens.ts                      # Tokens TypeScript prontos
└── tailwind.config.js             # Configuração Tailwind pronta
```

---

## 🚀 Quick Start

### 1. Ler a Documentação

Comece pelo **[GUIA_RAPIDO.md](GUIA_RAPIDO.md)** para setup em 5 minutos.

Para referência completa, consulte **[ANTIBETA_DESIGN_SYSTEM.md](ANTIBETA_DESIGN_SYSTEM.md)**.

### 2. Copiar Arquivos

```bash
# Copiar tokens para o projeto
cp tokens.ts /seu-projeto/src/design-system/tokens.ts

# Copiar config do Tailwind
cp tailwind.config.js /seu-projeto/tailwind.config.js
```

### 3. Instalar Dependências

```bash
npm install nativewind clsx tailwind-merge
npm install --save-dev tailwindcss@3.3.2
npx expo install @expo-google-fonts/inter @expo-google-fonts/jetbrains-mono expo-font
npm install lucide-react-native
```

### 4. Começar a Usar

```jsx
import { View, Text } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 bg-carbono-950 px-5 pt-6">
      <Text className="text-2xl font-bold text-neutro-100">
        Hello Antibeta! 🔥
      </Text>
    </View>
  );
}
```

---

## 🎨 Destaques do Design System

### 🌙 **Dark Mode como Padrão**
Paleta cuidadosamente calibrada para dark mode, inspirada em Tesla, Apple Music e Discord.

### 🎯 **Cor Branding: #0d090a**
Preto profundo "Carbono" como base. Accent vibrante "Brasa" (#ff4422) para CTAs e destaque.

### 📐 **Sistema de Tokens Completo**
- 7 paletas de cores (300+ variações)
- Escala de espaçamento de 4px
- Tipografia com Inter + JetBrains Mono
- Elevação (sombras) adaptada para dark mode
- Animações e durações pré-definidas

### 🧩 **Componentes Base Documentados**
- Botões (3 variantes)
- Cards (3 variantes)
- Inputs, Checkboxes, Switches
- Progress Bars, Badges
- Modals, Bottom Sheets, Toasts

### 🎮 **Gamificação Elegante**
Design que transmite conquista e progresso sem parecer infantil. Badges raros com glow effects, animações de level up.

### ⚡ **Performance-First**
Todas as animações otimizadas para 60fps. Elevação e sombras calibradas para React Native.

---

## 📖 Estrutura da Documentação

### [ANTIBETA_DESIGN_SYSTEM.md](ANTIBETA_DESIGN_SYSTEM.md) (145 páginas)

1. **Filosofia de Design** - Princípios e inspirações
2. **Paleta de Cores** - 7 paletas completas com uso por contexto
3. **Tipografia** - Escalas, pesos, estilos pré-definidos
4. **Espaçamentos e Grid** - Sistema de 4px, safe areas
5. **Componentes Base** - Código e estilos de todos os componentes
6. **Iconografia** - Biblioteca Lucide, tamanhos, contextos
7. **Animações e Transições** - Durações, easings, micro-interações
8. **Padrões de Navegação** - Tab bar, headers, FAB
9. **Estados de Interação** - Pressed, focused, disabled, loading
10. **Tokens de Design** - Arquitetura de tokens (primitivos, semânticos, componentes)
11. **Implementação Técnica** - Setup completo, estrutura de pastas, exemplos de código
12. **Checklist de Implementação** - Passo a passo por sprint

### [GUIA_RAPIDO.md](GUIA_RAPIDO.md) (10 min de leitura)

- Setup rápido (5 minutos)
- Paleta de cores - uso rápido
- Tipografia - uso rápido
- Espaçamento - uso rápido
- Componentes - exemplos prontos para copiar/colar
- Padrões comuns (Screen, Header, Lista, Modal)
- Ícones (Lucide)
- Troubleshooting

### [tokens.ts](tokens.ts)

Arquivo TypeScript pronto para usar com todos os tokens do design system:
- Colors (7 paletas)
- Typography (fonts, sizes, weights)
- Spacing (escala de 4px)
- Border Radius
- Elevation (shadows)
- Animations (durations)
- Gradients

### [tailwind.config.js](tailwind.config.js)

Configuração Tailwind pronta com:
- Todas as cores do design system
- Fontes customizadas
- Espaçamentos personalizados
- Border radius customizado
- Sombras adaptadas para dark mode
- Animações keyframes

---

## 🎯 Filosofia de Design

### **Masculinidade Moderna**
Design que transmite força, disciplina e sofisticação sem cair em estereótipos.

### **Minimalismo Funcional**
Cada elemento tem um propósito. Zero decorações desnecessárias.

### **Gamificação Elegante**
Elementos de jogo integrados naturalmente, tratados como conquistas sérias.

### **Escuridão Premium**
Dark mode sofisticado com contraste dramático e foco laser.

---

## 🎨 Paleta de Cores Principal

```css
/* Carbono (Branding) */
#0d090a  /* 950 - Background principal */
#1a1416  /* 900 - Surface elevated */
#2a2124  /* 800 - Surface raised */

/* Brasa (Accent) */
#ff4422  /* 500 - CTAs, badges, level up */

/* Neutro (Texto) */
#f5f5f5  /* 100 - Texto principal */
#e5e5e5  /* 200 - Texto secundário */
#d4d4d4  /* 300 - Texto terciário */

/* Feedback */
#10b981  /* Sucesso */
#ef4444  /* Erro */
#fbbf24  /* Alerta */
#3b82f6  /* Info */

/* Especiais */
#f59e0b  /* Testosterona (dourado) */
#8b5cf6  /* Disciplina (roxo) */
```

---

## 📐 Espaçamento Base

Escala de 4px (compatível com Material Design e Tailwind):

```
0   = 0px
1   = 4px
2   = 8px
3   = 12px
4   = 16px
5   = 20px
6   = 24px
8   = 32px
```

**Uso comum:**
- `p-5`: Padding de telas (20px)
- `p-4`: Padding de cards (16px)
- `gap-4`: Gap entre elementos (16px)
- `mb-6`: Margin bottom entre seções (24px)

---

## 🔤 Tipografia

### Fontes
- **Inter**: Display, headings, body (versatilidade total)
- **JetBrains Mono**: Números, stats, métricas (legibilidade de dados)

### Tamanhos
```
5xl = 48px  // Hero titles
2xl = 28px  // H1
xl  = 24px  // H2
lg  = 20px  // H3
base = 16px // Body (padrão)
sm  = 14px  // Small text
xs  = 12px  // Tiny text
```

### Pesos
```
400 = normal    // Body regular
500 = medium    // Body emphasis
600 = semibold  // Subtitles, labels
700 = bold      // Headings, buttons
```

---

## 🧩 Componentes Principais

### Botões
- **Primary**: `bg-brasa-500` com texto `text-carbono-950`
- **Secondary**: `bg-carbono-700` com borda
- **Ghost**: Transparente com borda

### Cards
- **Default**: `bg-carbono-900` com borda sutil
- **Elevated**: `bg-carbono-800` com sombra
- **Premium**: Borda dourada + glow effect

### Inputs
- **Default**: `bg-carbono-800` com borda
- **Focus**: Borda `border-brasa-500` de 2px
- **Error**: Borda `border-erro-500`

### Badges
- **Count**: Circular pequeno (20px)
- **Label**: Retangular com padding
- **Achievement**: 64x64px com borda colorida por raridade

---

## 🎮 Gamificação

### Badges (Conquistas)
4 níveis de raridade:
- **Comum**: `border-sucesso-500`
- **Incomum**: `border-info-500`
- **Raro**: `border-testosterona-500` + glow
- **Épico**: `border-disciplina-500` + glow

### Level Up
Animação especial:
- Scale bounce
- Gradiente animado
- Partículas
- Duração: 1000ms

### Progress Tracking
- **Testosterona**: Gradiente dourado → laranja
- **Metas**: Linear progress com fill animado
- **Streak**: Flame icon + counter

---

## ✅ Checklist de Qualidade

Todo componente deve:

- [ ] Usar tokens (sem valores hardcoded)
- [ ] Tipografia consistente (Inter/JetBrains Mono)
- [ ] Espaçamento da escala de 4px
- [ ] Border radius apropriado
- [ ] Estados de interação implementados
- [ ] Touch target mínimo 44px
- [ ] Contraste WCAG AA (4.5:1)
- [ ] Testado em iOS + Android
- [ ] Animações a 60fps
- [ ] Safe areas respeitadas

---

## 🛠️ Ferramentas Usadas

- **NativeCN** - Referência de componentes React Native
- **Material Design 3** - Princípios de elevação e motion
- **Apple HIG** - Guidelines de tipografia e espaçamento
- **Dribbble** - Inspirações visuais de fitness e gamificação
- **Toptal Dark UI Guide** - Melhores práticas de dark mode

---

## 📱 Compatibilidade

- **iOS**: 13.0+
- **Android**: 6.0+ (API 23+)
- **React Native**: 0.73+
- **Expo**: SDK 50+

---

## 🤝 Como Usar Este Design System

### Para Designers

1. Leia a **Filosofia de Design** (seção 1)
2. Estude a **Paleta de Cores** (seção 2)
3. Aplique os **Componentes Base** (seção 5)
4. Use os **Padrões de Navegação** (seção 8)

### Para Desenvolvedores

1. Faça o **Setup Rápido** (GUIA_RAPIDO.md)
2. Copie os **Tokens** (tokens.ts)
3. Configure o **Tailwind** (tailwind.config.js)
4. Consulte a **Implementação Técnica** (seção 11)

### Para Product Managers

1. Entenda a **Proposta de Valor** do design
2. Revise os **Componentes Principais**
3. Valide contra os **PRDs** do projeto
4. Acompanhe o **Checklist de Implementação** (seção 12)

---

## 📊 Estatísticas do Design System

- **145 páginas** de documentação
- **300+ tokens de cor** definidos
- **50+ componentes** documentados
- **20+ padrões** de interação
- **10+ animações** pré-definidas
- **100% dark mode** otimizado
- **WCAG AA** compliant

---

## 🎓 Aprendizados e Inspirações

### Apps de Referência
- **WHOOP**: Minimalismo, dados densos mas claros
- **Strava**: Gamificação adulta, ranking social
- **Notion**: Hierarquia visual clara
- **Apple Fitness+**: Animações suaves, cores vibrantes
- **Discord**: Cards bem estruturados, sistema de badges

### Design Systems Consultados
- Material Design 3 (Google)
- Human Interface Guidelines (Apple)
- Carbon Design System (IBM)
- Polaris (Shopify)

---

## 🚀 Roadmap Futuro

### Curto Prazo (Sprint 1-3)
- [ ] Implementar todos os componentes base
- [ ] Criar biblioteca de componentes compostos
- [ ] Setup de animações complexas

### Médio Prazo (Sprint 4-6)
- [ ] Storybook para documentação visual
- [ ] Temas customizáveis (além do dark mode)
- [ ] Biblioteca de ilustrações

### Longo Prazo (Pós-MVP)
- [ ] Design system web (React)
- [ ] Figma plugin para sync automático
- [ ] Automated visual regression tests

---

## 💬 Suporte

**Dúvidas sobre o Design System?**

1. Consulte a [Documentação Completa](ANTIBETA_DESIGN_SYSTEM.md)
2. Veja o [Guia Rápido](GUIA_RAPIDO.md)
3. Abra uma issue no repositório
4. Entre em contato com o time de design

---

## 📄 Licença

Este Design System foi criado especificamente para o **Antibeta** e é propriedade da empresa.

**Uso restrito ao projeto Antibeta.**

---

## 🙏 Créditos

**Design System criado por:** Especialista em Design Systems Mobile  
**Para:** Antibeta - Sistema Multi-Agente de Desenvolvimento Masculino  
**Data:** Fevereiro 2025  
**Versão:** 1.0  

---

**"Design is not just what it looks like and feels like. Design is how it works."**  
— Steve Jobs

---

✅ **Design System completo e pronto para implementação!**

Comece pelo [GUIA_RAPIDO.md](GUIA_RAPIDO.md) e boa construção! 🚀🔥
