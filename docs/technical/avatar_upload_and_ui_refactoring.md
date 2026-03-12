# Contexto: Implementação de Sistema de Avatar e Refatoração de UI

Este documento resume as alterações técnicas realizadas para a implementação do sistema de upload de fotos de perfil, criação de componente reutilizável e atualização das telas Home, Perfil e Ranking.

## 1. Sistema de Upload de Avatar

### Backend / Store (`authStore.ts`)
- **Problema Inicial**: O uso de caminhos locais ou abordagens baseadas em base64 podiam gerar arquivos corrompidos ou 0 bytes.
- **Solução (Fetch/Blob)**: Implementada conversão da URI local diretamente para `Blob` via `fetch(imageUri).blob()`. Esta é a abordagem recomendada no Expo v54 para garantir integridade binária.
- **Validação**: Adicionado log de `blob.size` para garantir que o arquivo não tenha 0 bytes antes do envio.
- **Persistência**:
    - Upload para o bucket `avatars` no caminho `${userId}/profile.jpg`.
    - Uso de `{ upsert: true, contentType: 'image/jpeg' }` para garantir substituição e tipagem correta.
    - Atualização sincronizada das tabelas `profiles` e `user_profiles`.
- **Cache**: Implementado *cache busting* adicionando `?t=timestamp` na URL pública para garantir atualização visual imediata no aplicativo.

## 2. Componente de UI: `Avatar.tsx`

- **Funcionalidade**: Componente centralizado para exibição de fotos de usuário.
- **Fallback**: Caso a URL seja nula ou ocorra erro de carregamento (ex: imagem corrompida ou rede), exibe automaticamente o ícone `User2` da biblioteca `lucide-react-native`.
- **Fix de Estado**: Corrigido bug onde o estado de erro (`hasError`) não resetava ao trocar de URL. Adicionado `useEffect` vinculado à `url`.

## 3. Refatorações de Telas

### Home (`HomeScreen.tsx` & `HomeHeader.tsx`)
- Removido nome estático "Lucas" e a categoria "BETA 01".
- Integrado nome real do perfil (ou prefixo do e-mail como fallback).
- Substituído ícone estático pelo componente `<Avatar />`.

### Perfil (`ProfileScreen.tsx`)
- **Remoção de Mock**: Retirada a foto de fallback aleatória da Unsplash que aparecia para novos usuários.
- **Fluxo de Seleção**: Integrado `expo-image-picker` para abrir a galeria.
- **Integração com Store**: Ação do lápis chama `uploadAvatar` do store de autenticação e gerencia estado de carregamento local (`isUploading`).

### Ranking (`rankingStore.ts` & componentes)
- **Limpeza de Dados**: Removido `DEFAULT_AVATAR` que continha URL do Pravatar/Unsplash.
- **Componentes Refatorados**: `RankingListItem`, `RankingPodium` e `UserPositionCard` agora utilizam `<Avatar />`, garantindo padronização e fim de imagens quebradas na listagem.

## 4. Correções de Conquistas (`AchievementsScreen.tsx`)

- Implementada segurança contra `TypeError` ao tentar usar `.toUpperCase()` em categorias nulas/indefinidas.
- Refatorada lógica de agrupamento para garantir que as conquistas vindas do banco sejam categorizadas corretamente (Treino, Disciplina, Comunidade).

---
*Data: 12 de Março de 2026*
