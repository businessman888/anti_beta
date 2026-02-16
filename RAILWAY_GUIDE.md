# Guia de Deploy na Railway 🚀

Este guia cobre o passo a passo para colocar seu backend NestJS no ar usando a Railway.

## 1. Conectar Repositório (GitHub)

1.  Acesse o [Dashboard da Railway](https://railway.app/dashboard).
2.  Clique em **"New Project"** > **"Deploy from GitHub repo"**.
3.  Selecione o repositório `antibeta` (ou o nome que você deu ao seu projeto).
4.  **Importante:** Como é um monorepo, você precisa configurar o **Root Directory**:
    *   Vá em **Settings** do serviço criado.
    *   Encontre a seção **"Root Directory"**.
    *   Defina como: `anti_beta/backend` (ou o caminho relativo onde está o `package.json` do backend).
    *   A Railway deve detectar automaticamente o `Dockerfile` que criamos.

## 2. Variáveis de Ambiente

No painel do seu serviço na Railway, vá na aba **Variables** e adicione as seguintes chaves (copie os valores do seu `.env` local):

| Variável | Descrição | Exemplo |
| :--- | :--- | :--- |
| `DATABASE_URL` | String de conexão do Supabase (use a porta 6543/Pooler para produção se preferir, ou 5432/Direct para migrations) | `postgresql://postgres.[ref]:[pass]@aws-0-us-west-1.pooler.supabase.com:6543/postgres` |
| `SUPABASE_URL` | URL do seu projeto Supabase | `https://[project-ref].supabase.co` |
| `SUPABASE_ANON_KEY` | Chave pública anônima | `eyJ...` |
| `SUPABASE_SERVICE_KEY` | Chave secreta de serviço (Service Role) | `eyJ...` |
| `JWT_SECRET` | Segredo para assinar tokens JWT | `super-secret-jwt-key...` |
| `JWT_EXPIRES_IN` | Tempo de expiração do token | `7d` |
| `NODE_ENV` | Ambiente de execução | `production` |
| `PORT` | Porta da aplicação (A Railway injeta isso automaticamente, mas bom ter) | `3000` |
| `FRONTEND_URL` | URL do Frontend (CORS) | `*` (ou `https://seu-app.vercel.app`) |

> **Dica:** Para o `DATABASE_URL` em produção, recomendo usar a conexão **Transaction Pooler** (porta 6543) do Supabase para melhor performance com muitas conexões simultâneas.

## 3. Health Check

A Railway precisa saber se sua aplicação está rodando.
*   Vá em **Settings** > **Deployments**.
*   Procure por **"Health Check Path"**.
*   Defina como: `/health`.
*   A Railway fará requisições para essa rota. Se receber 200 OK, considera o deploy um sucesso.

## 4. Comandos de Build e Start

Como estamos usando Docker, a Railway usará as instruções do `Dockerfile` automaticamente.
*   **Build**: O Dockerfile já roda `npm run build` e `npx prisma generate`.
*   **Start**: O Dockerfile já define `CMD ["node", "dist/src/main"]`.

Se precisar rodar migrations em produção, você pode adicionar um comando de **Start Command** customizado nas configurações, mas com Docker é mais seguro rodar migrations via GitHub Actions ou manualmente via CLI conectado ao banco de produção.

## 5. Deploy

Após configurar as variáveis, a Railway deve disparar um novo deploy automaticamente. 
## 6. URL Pública (Domínio)

Para saber qual URL seu backend está usando:
1.  Vá no Dashboard do seu projeto na Railway.
2.  Clique no serviço do Backend.
3.  Vá na aba **Settings**.
4.  Role até **Networking** (ou **Domains**).
5.  Clique em **Generate Domain** (se não tiver um) ou copie o domínio existente (ex: `anti-beta-production.up.railway.app`).
6.  **Essa é a `BASE_URL` que o Mobile deve usar.**
