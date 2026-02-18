---
trigger: always_on
---

# 🚀 WORKFLOW DE SETUP DE PROJETO MONOREPO - ANTIGRAVITY

## 📋 VISÃO GERAL

Este documento define o **workflow padrão e reutilizável** para inicialização de projetos no Antigravity seguindo arquitetura monorepo com separação entre **Backend (NestJS + Railway + Supabase)** e **Mobile (React Native/Expo)**.

Use este guia como **checklist obrigatório** ao iniciar qualquer novo projeto.

---

## 🏗️ ESTRUTURA PADRÃO DO MONOREPO

```
[nome-do-projeto]/
├── backend/                    # API NestJS hospedada no Railway
│   ├── src/
│   │   ├── modules/           # Módulos de domínio (users, auth, etc.)
│   │   ├── shared/            # Código compartilhado (decorators, filters)
│   │   ├── config/            # Configurações (database, jwt, etc.)
│   │   ├── common/            # DTOs, interfaces, enums globais
│   │   └── main.ts            # Entry point da aplicação
│   ├── prisma/                # Schema Prisma + Migrations
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── test/                  # Testes E2E
│   ├── .env.example           # Template de variáveis de ambiente
│   ├── .env                   # Variáveis locais (gitignored)
│   ├── package.json
│   ├── tsconfig.json
│   ├── nest-cli.json
│   └── README.md
│
├── mobile/                     # App React Native com Expo
│   ├── app/                   # Expo Router (file-based routing)
│   │   ├── (tabs)/           # Rotas com bottom tabs
│   │   ├── (auth)/           # Rotas de autenticação
│   │   ├── _layout.tsx       # Root layout
│   │   └── +not-found.tsx    # 404 screen
│   ├── components/            # Componentes de UI
│   │   ├── ui/               # Componentes atômicos (Button, Input)
│   │   ├── forms/            # Formulários compostos
│   │   └── layout/           # Containers, Headers
│   ├── hooks/                 # Custom hooks
│   │   ├── useQuery/         # Queries com TanStack Query
│   │   └── useMutation/      # Mutations
│   ├── services/              # Clientes de API
│   │   ├── api/              # Axios/Fetch configurado
│   │   └── supabase.ts       # Cliente Supabase
│   ├── store/                 # Zustand stores
│   │   ├── authStore.ts
│   │   └── appStore.ts
│   ├── types/                 # TypeScript types compartilhados
│   │   ├── api/              # DTOs (sincronizados com backend)
│   │   ├── models/           # Domain models
│   │   └── navigation.ts     # Tipos de navegação
│   ├── utils/                 # Funções utilitárias
│   ├── assets/                # Imagens, fontes, ícones
│   ├── constants/             # Constantes da aplicação
│   ├── app.json               # Configuração do Expo
│   ├── package.json
│   ├── tsconfig.json
│   └── tailwind.config.js     # NativeWind config
│
├── .gitignore                 # Git ignore global do monorepo
├── docker-compose.yml         # (Opcional) Setup local com Docker
├── package.json               # (Opcional) Root package.json para scripts
├── RAILWAY_ENV.md             # Documentação de variáveis Railway
├── [projeto]_architecture.md  # Documentação da arquitetura
├── [projeto]_dev_planning.md  # Planejamento de desenvolvimento
├── [projeto]_prd_complete.md  # PRD (Product Requirements Document)
└── documento_nova_feature.md  # Template para novas features
```

---

## ✅ FASE 1: INICIALIZAÇÃO DO REPOSITÓRIO

### 1.1 Criar Estrutura Base

**Instruções para o Agente Antigravity:**

```plaintext
TAREFA: Inicializar monorepo com nome "[NOME_DO_PROJETO]"

1. Criar pasta raiz do projeto
2. Inicializar Git com branch main
3. Criar subpastas: backend/ e mobile/
4. Criar .gitignore global seguindo o template fornecido
5. Gerar documentos de projeto (ver seção 1.2)
```

**Template do .gitignore:**
```gitignore
# === DEPENDENCIES ===
node_modules/
.pnp
.pnp.js
.yarn/

# === ENVIRONMENT VARIABLES ===
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# === LOGS ===
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# === BUILD OUTPUTS ===
dist/
build/
.expo/
.expo-shared/
*.tsbuildinfo
.turbo/

# === TESTING ===
coverage/
*.lcov

# === OS SPECIFIC ===
.DS_Store
Thumbs.db
*.swp
*.swo
*~

# === IDE ===
.vscode/
.idea/
*.iml

# === MISC ===
.cache/
.parcel-cache/
```

### 1.2 Criar Documentos Essenciais

**Instruções para o Agente:**

```plaintext
TAREFA: Gerar 4 documentos de projeto na raiz

1. [PROJETO]_architecture.md - Descrever stack e arquitetura
2. [PROJETO]_dev_planning.md - Planejamento em sprints
3. [PROJETO]_prd_complete.md - Product Requirements Document
4. documento_nova_feature.md - Template reutilizável
5. RAILWAY_ENV.md - Variáveis de ambiente
```

**Template: [PROJETO]_architecture.md**
```markdown
# Arquitetura do [PROJETO]

## Stack Tecnológico

### Backend
- **Framework**: NestJS
- **Hospedagem**: Railway
- **Database**: Supabase (PostgreSQL)
- **ORM**: Prisma
- **Autenticação**: Supabase Auth + JWT

### Mobile
- **Framework**: React Native (Expo SDK 51+)
- **Roteamento**: Expo Router v3
- **State Management**: Zustand + TanStack Query
- **Styling**: NativeWind (Tailwind CSS)
- **Listas**: FlashList

## Fluxo de Dados
Mobile → API (Railway) → Database (Supabase)

## Módulos Principais
[Listar módulos do sistema]
```

**Template: [PROJETO]_dev_planning.md**
```markdown
# Planejamento de Desenvolvimento

## Sprint 1: Fundação (Semana 1-2)
- [ ] Setup do monorepo (backend + mobile)
- [ ] Configuração Railway + Supabase
- [ ] Sistema de autenticação
- [ ] Tela de login/registro

## Sprint 2: Features Core (Semana 3-4)
- [ ] [Feature 1]
- [ ] [Feature 2]

## Sprint 3: Refinamento (Semana 5-6)
- [ ] Melhorias de UX
- [ ] Testes
- [ ] Performance
```

**Template: documento_nova_feature.md**
```markdown
# Template: Nova Feature

## Nome da Feature
[Nome descritivo]

## Contexto
[Por que essa feature é necessária?]

## Especificação Técnica

### Backend (NestJS)
**Endpoints necessários**:
- `POST /api/[recurso]` - [Descrição]
- `GET /api/[recurso]` - [Descrição]

**DTOs**:
\```typescript
interface CreateXDto {
  campo: string;
}
\```

### Mobile (Expo)
**Telas**: `app/[nome-tela].tsx`
**Hooks**: `hooks/useQuery/useX.ts`

### Database
\```prisma
model X {
  id    String @id @default(uuid())
  campo String
}
\```

## Critérios de Aceite
- [ ] [Critério 1]
- [ ] [Critério 2]
```

**Template: RAILWAY_ENV.md**
```markdown
# Variáveis de Ambiente - Railway

## Backend
\```bash
DATABASE_URL=postgresql://...
SUPABASE_URL=https://[ID].supabase.co
SUPABASE_ANON_KEY=[KEY]
JWT_SECRET=[SECRET]
PORT=3000
\```

## Mobile (app.config.js)
\```javascript
extra: {
  apiUrl: "https://[app].railway.app",
  supabaseUrl: process.env.SUPABASE_URL,
}
\```
```

---

## 🔧 FASE 2: SETUP DO BACKEND (NestJS)

### 2.1 Inicializar Projeto NestJS

**Instruções para o Agente:**

```plaintext
TAREFA: Criar projeto NestJS na pasta backend/

1. Navegar para pasta backend/
2. Executar: npx @nestjs/cli new . --skip-git --package-manager npm
3. Instalar dependências essenciais (ver lista abaixo)
4. Criar estrutura de pastas (ver seção 2.2)
5. Configurar Prisma (ver seção 2.3)
6. Criar .env.example e .env
```

**Dependências Essenciais:**
```bash
# Core
npm install @nestjs/config @nestjs/swagger @nestjs/throttler

# Autenticação
npm install @nestjs/jwt @nestjs/passport passport passport-jwt
npm install -D @types/passport-jwt

# Validação
npm install class-validator class-transformer

# Database
npm install prisma @prisma/client

# Integração Supabase
npm install @supabase/supabase-js

# Segurança
npm install bcrypt
npm install -D @types/bcrypt
```

### 2.2 Estrutura de Pastas do Backend

**Instruções para o Agente:**

```plaintext
TAREFA: Criar estrutura de pastas em backend/src/

Executar comandos:
mkdir -p src/modules/{auth,users}
mkdir -p src/shared/{decorators,filters,guards,interceptors}
mkdir -p src/config
mkdir -p src/common/{dto,enums,interfaces}
```

**Estrutura resultante:**
```
backend/src/
├── modules/
│   ├── auth/
│   └── users/
├── shared/
│   ├── decorators/
│   ├── filters/
│   ├── guards/
│   └── interceptors/
├── config/
│   └── app.config.ts
├── common/
│   ├── dto/
│   ├── enums/
│   └── interfaces/
├── app.module.ts
└── main.ts
```

### 2.3 Configurar Prisma

**Instruções para o Agente:**

```plaintext
TAREFA: Setup Prisma ORM

1. Executar: npx prisma init
2. Substituir conteúdo de prisma/schema.prisma pelo template
3. Executar: npx prisma migrate dev --name init
4. Executar: npx prisma generate
```

**Template prisma/schema.prisma:**
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Modelo base de exemplo
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
}
```

### 2.4 Configurar Arquivo de Configuração

**Arquivo: backend/src/config/app.config.ts**
```typescript
export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  database: {
    url: process.env.DATABASE_URL,
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    anonKey: process.env.SUPABASE_ANON_KEY,
    serviceKey: process.env.SUPABASE_SERVICE_KEY,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
});
```

### 2.5 Configurar main.ts para Produção

**Arquivo: backend/src/main.ts**
```typescript
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS para mobile
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger (apenas em dev)
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('API Documentation')
      .setDescription('API endpoints description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 Application running on: http://localhost:${port}`);
}
bootstrap();
```

### 2.6 Criar .env.example

**Arquivo: backend/.env.example**
```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/database"

# Supabase
SUPABASE_URL="https://[PROJECT_ID].supabase.co"
SUPABASE_ANON_KEY="your_anon_key"
SUPABASE_SERVICE_KEY="your_service_key"

# JWT
JWT_SECRET="your_jwt_secret_key_min_256_bits"
JWT_EXPIRES_IN="7d"

# App
NODE_ENV="development"
PORT=3000
```

**Instruções para o Agente:**
```plaintext
Após criar .env.example:
1. Copiar para .env: cp .env.example .env
2. Informar ao desenvolvedor para preencher as credenciais reais
```

---

## 📱 FASE 3: SETUP DO MOBILE (EXPO)

### 3.1 Criar Projeto Expo

**Instruções para o Agente:**

```plaintext
TAREFA: Criar projeto Expo na pasta mobile/

1. Navegar para pasta mobile/
2. Executar: npx create-expo-app@latest . --template blank-typescript
3. Instalar todas as dependências essenciais (ver lista abaixo)
4. Configurar NativeWind (ver seção 3.2)
5. Configurar Expo Router (ver seção 3.3)
```
**Dependências Essenciais:**
```bash
# Expo Router
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar

# Storage e Imagem
npx expo install expo-secure-store expo-image

# State Management
npm install zustand @tanstack/react-query

# HTTP Client
npm install axios

# Supabase
npm install @supabase/supabase-js

# Styling (NativeWind)
npm install nativewin