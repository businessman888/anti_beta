# Contexto: Implementação de Sistema de Avatar e Refatoração de UI

Este documento resume as alterações técnicas, os problemas críticos enfrentados e as soluções iterativas aplicadas durante o desenvolvimento do sistema de foto de perfil.

## 1. Problemas Enfrentados e Soluções

### 1.1. Upload de Arquivos com 0 Bytes (Corrompidos)
- **Problema**: Ao tentar fazer o upload para o Supabase Storage, os arquivos apareciam com 0 bytes ou não carregavam (tela branca no navegador).
- **Causa**: O React Native não lida com URIs locais como arquivos binários automaticamente. O uso de `fetch(uri).blob()` em versões anteriores do Expo ou configurações incorretas geravam blobs vazios.
- **Tentativa 1 (Base64/ArrayBuffer)**: Tentamos converter via `expo-file-system` e `base64-arraybuffer`. Embora funcional em certas versões, é considerado um fluxo depreciado/legado.
- **Solução Definitiva**: Uso do padrão nativo **`fetch(uri).blob()`** com um **Protocolo de Segurança**:
    - Log mandatório do `blob.size`.
    - Lógica de erro que interrompe o processo caso o blob seja 0 bytes (`throw new Error`).
    - Passagem explícita de `contentType: 'image/jpeg'` no upload.

### 1.2. Fallback de Foto "Fantasma" (Mock Data)
- **Problema**: Novos usuários sem foto viam a imagem de um homem aleatório.
- **Causa**: O código da `ProfileScreen` continha um fallback para `homeMockData.user.avatar` que apontava para uma URL da Unsplash.
- **Solução**: Removido qualquer vínculo com mocks. O estado agora cai para `null`, permitindo que o componente `<Avatar />` gerencie o fallback visual correto.

### 1.3. Erro de Cache e Persistência Visual
- **Problema**: Após o upload, a foto não atualizava na UI ou voltava para o ícone padrão mesmo com o link no banco.
- **Causa**: 
    1. O componente `Avatar.tsx` não resetava seu estado interno de erro (`hasError`) ao receber uma nova URL.
    2. O navegador/WebView cacheava a URL antiga `${id}/profile.jpg`.
- **Solução**:
    - Adicionado `useEffect` no `Avatar` para resetar o erro ao mudar a prop `url`.
    - Implementado *cache busting* (`?t=timestamp`) na URL gravada no banco.

## 2. Detalhes da Implementação Atual

### Backend / Store (`authStore.ts`)
- **Fluxo**: Local URI -> Fetch -> Blob -> Liberação/Upload (Supabase) -> Public URL -> DB Sync.
- **Local State**: O profile no Zustand é atualizado instantaneamente após o upload bem-sucedido para evitar delay de rede.

### Componente `Avatar.tsx`
- Componente agnóstico que aceita `url` e `size`.
- Exibe o ícone `User2` da `lucide-react-native` em caso de erro ou URL ausente.

## 3. Mudanças na Interface (UI)

- **Home Header**: Removido nome estático "Lucas" e badge "BETA 01". Agora exibe o nome real do usuário e a foto processada.
- **Ranking**: Todos os itens da lista e pódios agora usam o componente `<Avatar />`.
- **Achievements**: Aplicada proteção de *null safety* para evitar crashes ao carregar categorias de conquistas indefinidas.

---
*Atualizado em: 12 de Março de 2026*
