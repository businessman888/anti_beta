# GUIA RÁPIDO - ANTIBETA DESIGN SYSTEM

## 🚀 Setup Rápido (5 minutos)

### 1. Instalar Dependências

```bash
# Core
npx create-expo-app antibeta --template blank-typescript

# NativeWind (Tailwind para React Native)
npm install nativewind
npm install --save-dev tailwindcss@3.3.2

# Fontes
npx expo install @expo-google-fonts/inter
npx expo install @expo-google-fonts/jetbrains-mono
npx expo install expo-font

# Ícones
npm install lucide-react-native

# Navegação
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context

# Animações
npm install react-native-reanimated react-native-gesture-handler

# Utils
npm install clsx tailwind-merge zustand
```

### 2. Copiar Arquivos

```
antibeta-design-system/
├── tokens.ts              → src/design-system/tokens.ts
├── tailwind.config.js     → tailwind.config.js (raiz)
└── ANTIBETA_DESIGN_SYSTEM.md → docs/design-system.md
```

### 3. Configurar Babel

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

### 4. Criar Utility Function

```typescript
// src/design-system/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## 🎨 Paleta de Cores - Uso Rápido

### Backgrounds
```jsx
// Principal
className="bg-carbono-950"

// Cards
className="bg-carbono-900"
className="bg-carbono-800" // Elevated

// Overlays
className="bg-carbono-950/90" // Modal backdrop
```

### Texto
```jsx
// Principal
className="text-neutro-100"

// Secundário
className="text-neutro-200"
className="text-neutro-300"

// Muted
className="text-neutro-400"
```

### Accent (CTAs)
```jsx
// Botão Primário
className="bg-brasa-500 active:bg-brasa-600"

// Badge de Sucesso
className="bg-sucesso-500"

// Testosterona
className="text-testosterona-500"
```

### Bordas
```jsx
className="border border-carbono-600"
className="border-2 border-brasa-500" // Accent
```

---

## 📝 Tipografia - Uso Rápido

### Tamanhos
```jsx
className="text-5xl" // 48px - Hero
className="text-2xl" // 28px - H1
className="text-xl"  // 24px - H2
className="text-base" // 16px - Body (padrão)
className="text-sm"  // 14px - Small
className="text-xs"  // 12px - Tiny
```

### Pesos
```jsx
className="font-bold"      // 700
className="font-semibold"  // 600
className="font-medium"    // 500
className="font-normal"    // 400
```

### Fontes
```jsx
className="font-inter" // Padrão (body, headings)
className="font-mono"  // JetBrains Mono (números, stats)
```

---

## 📦 Espaçamento - Uso Rápido

### Padding
```jsx
className="p-5"  // 20px - Padrão de telas
className="p-4"  // 16px - Cards
className="px-5 py-3" // Combinado
```

### Margin
```jsx
className="mb-4" // 16px - Entre elementos
className="mb-6" // 24px - Entre seções
className="mt-2" // 8px - Inline
```

### Gap (Flexbox)
```jsx
className="flex gap-2" // 8px - Pequeno
className="flex gap-4" // 16px - Médio
className="flex gap-6" // 24px - Grande
```

---

## 🔘 Componentes - Exemplos Prontos

### Button
```jsx
// Primário
<Pressable className="h-[52px] bg-brasa-500 active:bg-brasa-600 rounded-lg px-6 flex-row items-center justify-center">
  <Text className="text-base font-semibold text-carbono-950">
    Começar Agora
  </Text>
</Pressable>

// Secundário
<Pressable className="h-[52px] bg-carbono-700 border border-carbono-600 active:bg-carbono-600 rounded-lg px-6 flex-row items-center justify-center">
  <Text className="text-base font-semibold text-neutro-100">
    Cancelar
  </Text>
</Pressable>
```

### Card
```jsx
// Card Padrão
<View className="bg-carbono-900 border border-carbono-800 rounded-xl p-5">
  <Text className="text-xl font-semibold text-neutro-100 mb-2">
    Título do Card
  </Text>
  <Text className="text-sm text-neutro-300">
    Descrição ou conteúdo
  </Text>
</View>

// Card Elevated
<View className="bg-carbono-800 border border-carbono-700 rounded-2xl p-6 shadow-md">
  {/* Conteúdo */}
</View>
```

### Input
```jsx
<TextInput
  className="bg-carbono-800 border border-carbono-600 rounded-lg px-4 h-12 text-neutro-100"
  placeholderTextColor="#a3a3a3"
  placeholder="Digite algo..."
/>

// Com foco
<TextInput
  className="bg-carbono-800 border-2 border-brasa-500 rounded-lg px-4 h-12 text-neutro-100"
  placeholderTextColor="#a3a3a3"
  placeholder="Digite algo..."
/>
```

### Badge
```jsx
// Count Badge
<View className="min-w-[20px] h-5 bg-brasa-500 rounded-full px-1 items-center justify-center">
  <Text className="text-[10px] font-bold text-neutro-50">
    3
  </Text>
</View>

// Label Badge
<View className="px-3 py-1 bg-carbono-700 border border-carbono-600 rounded-md">
  <Text className="text-xs font-semibold text-neutro-200">
    Novo
  </Text>
</View>
```

### Progress Bar
```jsx
<View className="h-2 bg-carbono-800 rounded-full overflow-hidden">
  <View 
    className="h-full bg-brasa-500 rounded-full" 
    style={{ width: '65%' }}
  />
</View>
```

---

## 🎯 Padrões Comuns

### Screen Container
```jsx
<SafeAreaView className="flex-1 bg-carbono-950">
  <ScrollView className="flex-1 px-5 pt-6">
    {/* Conteúdo */}
  </ScrollView>
</SafeAreaView>
```

### Header
```jsx
<View className="h-14 bg-carbono-950 border-b border-carbono-800 px-5 flex-row items-center justify-between">
  <Text className="text-xl font-bold text-neutro-100">
    Título
  </Text>
  <Pressable className="w-10 h-10 bg-carbono-800 rounded-md items-center justify-center">
    {/* Ícone */}
  </Pressable>
</View>
```

### Lista de Cards
```jsx
<ScrollView className="flex-1 px-5">
  {items.map((item) => (
    <View 
      key={item.id} 
      className="bg-carbono-900 border border-carbono-800 rounded-xl p-5 mb-4"
    >
      {/* Conteúdo do card */}
    </View>
  ))}
</ScrollView>
```

### Modal
```jsx
<Modal transparent animationType="fade">
  <View className="flex-1 bg-carbono-950/90 items-center justify-center">
    <View className="bg-carbono-900 rounded-3xl p-6 w-[90%] max-w-[480px]">
      {/* Conteúdo do modal */}
    </View>
  </View>
</Modal>
```

---

## 🎨 Ícones (Lucide)

### Importar
```jsx
import { Home, TrendingUp, User, Target, Trophy } from 'lucide-react-native';
```

### Usar
```jsx
<Home size={24} color="#f5f5f5" />
<Trophy size={32} color="#ff4422" />
<Target size={20} color="#a3a3a3" />
```

### Tamanhos Comuns
- **16px**: Labels inline
- **20px**: Inputs, botões pequenos
- **24px**: Botões padrão, navegação
- **32px**: Headers, destaque
- **40px+**: Hero icons, onboarding

---

## ✅ Checklist de Qualidade

Antes de considerar um componente pronto:

- [ ] Usa tokens de cor (sem hex hardcoded)
- [ ] Tipografia consistente (Inter/JetBrains Mono)
- [ ] Espaçamento da escala de 4px
- [ ] Border radius apropriado
- [ ] Estados de interação (pressed, disabled)
- [ ] Touch target mínimo 44px (iOS)
- [ ] Contraste WCAG AA (mínimo 4.5:1)
- [ ] Testado em iOS + Android
- [ ] Animações suaves (60fps)
- [ ] Safe areas respeitadas

---

## 🐛 Troubleshooting

### Tailwind não funciona
```bash
# 1. Verificar babel.config.js
# 2. Limpar cache
npx expo start -c

# 3. Reinstalar
rm -rf node_modules
npm install
```

### Fontes não carregam
```jsx
// Adicionar no App.tsx
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';

const [fontsLoaded] = useFonts({
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
});

if (!fontsLoaded) return null;
```

### Sombras não aparecem no Android
```jsx
// Usar elevation em vez de shadow
className="elevation-md" // ou manualmente:
style={{
  elevation: 3,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.22,
  shadowRadius: 2.22,
}}
```

---

## 📚 Recursos

- **Documentação Completa**: `ANTIBETA_DESIGN_SYSTEM.md`
- **Tokens**: `tokens.ts`
- **Tailwind Config**: `tailwind.config.js`
- **NativeWind Docs**: https://www.nativewind.dev/
- **Lucide Icons**: https://lucide.dev/icons/

---

## 🎯 Próximos Passos

1. ✅ Setup completo
2. ⏭️ Criar componentes base (Button, Card, Input)
3. ⏭️ Implementar navegação
4. ⏭️ Construir telas principais
5. ⏭️ Adicionar animações
6. ⏭️ Testar em dispositivos

---

**Dúvidas?** Consulte a documentação completa em `ANTIBETA_DESIGN_SYSTEM.md`
