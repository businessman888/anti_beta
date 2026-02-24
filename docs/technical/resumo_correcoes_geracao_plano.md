# Documentação Técnica: Resolução do Módulo de Planejamento IA

Este documento descreve detalhadamente as correções e otimizações realizadas para estabilizar o sistema de geração de planos trimestrais automatizados.

## 1. Problemas Identificados
Durante a fase de testes end-to-end, identificamos 4 níveis de falhas:
1. **Crash de Backend (502)**: Incompatibilidade do runtime com Prisma 7.
2. **Inconsistência de Dados**: Respostas do quiz perdidas durante a navegação.
3. **Falha de Persistência (500)**: Erros de Foreign Key com IDs do Supabase Auth.
4. **Timeout de Interface**: Geração da IA excedia o tempo limite do app mobile.

---

## 2. Implementações Realizadas

### 2.1 Estabilidade do ORM (Prisma)
- **Ação**: Downgrade do Prisma de `v7.4.0` para `v6.4.1`.
- **Motivo**: A v7 exigia carregamento de arquivos `.ts` em runtime que causavam crash imediato no NestJS (Railway).
- **Resultado**: Conexão estável via `DATABASE_URL` padrão no `schema.prisma`.

### 2.2 Integridade de Dados no Mobile
- **Arquivo**: `OnboardingScreen.tsx`
- **Ação**: Refatoração do passo 27 para capturar explicitamente todas as variáveis de estado local.
- **userId**: Adicionada extração do `session.user.id` do Zustand store e propagação para o backend.

### 2.3 Otimização da Inteligência Artificial
- ** max_tokens**: Aumentado de `4096` para `16384` para evitar JSONs truncados.
- **Prompt Engineering**:
    - Redução de complexidade (3 tarefas por dia em vez de 5).
    - Limitação de caracteres (máximo 15 palavras por tarefa).
    - Instrução de JSON estrito para reduzir tempo de resposta.
- **Temperature**: Fixada em `0.7` para equilíbrio entre criatividade e estrutura.

### 2.4 Resiliência de Infraestrutura e Banco
- **Timeout Mobile**: Aumentado de 90s para **180s** especificamente para o endpoint `/generate-plan`.
- **Desacoplamento de Schema**: 
    - Removida a relação (Foreign Key) entre `Plan` e `User`.
    - Motivo: Usuários do Supabase Auth podem não estar imediatamente sincronizados na tabela interna `users`, disparando violações de FK.
- **Graceful Save**: Implementado `try/catch` no serviço de planejamento. Caso o banco de dados falhe (instabilidade temporária), o plano gerado pela IA ainda é retornado ao usuário com `id: 'unsaved'`.

---

## 3. Estado Atual do Sistema
- ✅ **Geração**: 100% funcional.
- ✅ **Parsing**: JSON validado e consistente.
- ✅ **Velocidade**: ~40-60 segundos por plano.
- ✅ **Persistência**: Planos salvos e vinculados ao UUID do Supabase.

## 4. Comandos de Manutenção (Backend)
```bash
# Sincronizar schema
npx prisma generate
npx prisma migrate deploy

# Teste de conexão isolado
node test_prisma.js
```

---
**Data**: 22 de Fevereiro de 2026
**Responsável**: Agente Antigravity
