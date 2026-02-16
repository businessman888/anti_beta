# Relatório de Handover para o Agente Mobile 📱

Este documento serve como guia completo para a integração do frontend (React Native/Expo) com a infraestrutura Backend atual (NestJS + Supabase).

## 1. Infraestrutura & Conectividade 🌐

*   **Ambiente de Produção (Railway)**
    *   **Base URL:** `https://antibeta-production.up.railway.app`
    *   **Health Check:** `GET /health` (Retorna `{ "status": "ok" }`). Use isso para validar conexão.
    *   **Swagger:** Desativado em produção por segurança.

*   **Ambiente Local (Desenvolvimento)**
    *   **Base URL:** `http://localhost:3000` (Use o IP da sua máquina se rodar no emulador/dispositivo físico).

## 2. Autenticação (Fluxo Híbrido) 🔐

O Backend **não** possui endpoints de login (`/auth/login`). A autenticação deve ser feita diretamente pelo Mobile via SDK do Supabase.

### Fluxo Recomendado:
1.  **Login no Mobile:** O app usa `supabase.auth.signInWithPassword({ email, password })`.
2.  **Obtenção do Token:** O Supabase retorna um `session.access_token` (JWT).
3.  **Chamadas ao Backend:** O app envia esse token no Header de **todas** as requisições para nossa API.
    ```http
    Authorization: Bearer <SEU_JWT_AQUI>
    ```
4.  **Validação:** O Backend (NestJS) valida esse token automaticamente.

### Credenciais Supabase (Para o Mobile):
*   Você precisará das chaves `EXPO_PUBLIC_SUPABASE_URL` e `EXPO_PUBLIC_SUPABASE_ANON_KEY` no seu `.env` do mobile. Elas são seguras para uso no client.

## 3. Banco de Dados & Conteúdo (Onboarding) 📝

O banco de dados já está populado com o conteúdo necessário para o Quiz de entrada.

### Tabela `Question` (Já Populada)
*   Contém **28 perguntas** divididas em 4 seções:
    1.  Identificação e Contexto Pessoal
    2.  Diagnóstico Comportamental e Vícios
    3.  Estado Físico e Atividades
    4.  Relacionamentos e Interações Sociais

### Schema dos Dados (Para Tipagem no Mobile):
```typescript
interface Question {
  id: string;
  text: string;     // Ex: "Qual seu objetivo?"
  type: string;     // TEXT, NUMBER, SINGLE_CHOICE, MULTIPLE_CHOICE, SCALE
  options: string[]; // ["Opção A", "Opção B"] (pode ser null se for TEXT/NUMBER)
  section: string;  // Título da seção
  order: number;    // Ordem de exibição (1 a 28)
}
```

## 4. Próximos Passos de Desenvolvimento 🚀

O Backend está infraestruturado, mas os **Controllers de Negócio** ainda precisam ser criados. O Agente Mobile (ou você, no chapéu de Backend) precisará implementar:

1.  **Endpoint de Listagem:** `GET /onboarding/questions`
    *   **Objetivo:** Retornar as 28 perguntas ordenadas para o Mobile renderizar.
    *   **Status Atual:** *Pendente de implementação no Controller.*

2.  **Endpoint de Envio:** `POST /onboarding/submit`
    *   **Objetivo:** Receber o JSON com todas as respostas do usuário e salvar na tabela `OnboardingResponse`.
    *   **Payload Esperado:** Array de `{ questionId: string, answer: any }`.
    *   **Status Atual:** *Pendente de implementação no Controller.*

## Resumo para o Mobile:
> "A infra está pronta. O banco tem as perguntas. A autenticação é via Supabase direto. Agora precisamos criar as rotas no NestJS para *servir* essas perguntas e *receber* as respostas."
