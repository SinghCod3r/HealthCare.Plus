# HealthCarePlus - Deployment Guide

## Local Development

```bash
cd web
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm start
```

## Environment Variables

Create a `.env` file with:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

## Deployment Options

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Railway / Render

1. Connect GitHub repo
2. Set build command: `npm run build`
3. Set start command: `npm start`
4. Add environment variables

## Database

For production, migrate from SQLite to PostgreSQL:

1. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

2. Run migrations:
   ```bash
   npx prisma migrate deploy
   ```
