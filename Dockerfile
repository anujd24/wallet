FROM node:20.12.0-alpine3.19
WORKDIR /usr/src/app

# 1. Copy root config files
COPY package.json package-lock.json turbo.json tsconfig.json ./

# 2. Copy ALL config packages first
COPY packages/typescript-config/ packages/typescript-config/

# 3. Copy other package manifests
COPY packages/db/package.json packages/db/
COPY packages/ui/package.json packages/ui/
COPY packages/ui/tsconfig.json packages/ui/
COPY apps/user/package.json apps/user/
COPY apps/user/tsconfig.json apps/user/

# 4. Install dependencies
RUN npm install --legacy-peer-deps

RUN npm install @repo/typescript-config

# 5. Verify config files exist
RUN ls -la packages/typescript-config/base.json && \
    ls -la packages/typescript-config/nextjs.json

# 6. Fix paths in all tsconfig files
RUN find . \( -name tsconfig.json -o -name tsconfig.*.json \) -exec sed -i \
    's|@repo/typescript-config/|./packages/typescript-config/|g' {} +

# 7. Copy remaining files
COPY . .

# 8. Generate Prisma client
RUN npm run db:generate

# 9. Build with production settings
RUN npx turbo run build \
    --filter=./apps/user... \
    --env-mode=loose

WORKDIR /usr/src/app/apps/user
ENV PORT=3001
ENV NODE_ENV=production
CMD ["npm", "run", "start"]