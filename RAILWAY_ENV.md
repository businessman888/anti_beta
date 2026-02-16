# Variáveis de Ambiente - Railway

## Backend
```bash
DATABASE_URL=postgresql://...
SUPABASE_URL=https://[ID].supabase.co
SUPABASE_ANON_KEY=[KEY]
JWT_SECRET=[SECRET]
PORT=3000
```

## Mobile (app.config.js)
```javascript
extra: {
  apiUrl: "https://[app].railway.app",
  supabaseUrl: process.env.SUPABASE_URL,
}
```
