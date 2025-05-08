FROM node:22-slim AS base

# Install tools we need
RUN apt-get update && \
    apt-get install -y git jq && \
    npm install -g pnpm && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# First stage: Setup and modify dependencies
FROM base AS setup
WORKDIR /app

# Copy the minimal files needed for dependency setup
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml* turbo.json ./
COPY apps/blog/package.json ./apps/blog/
COPY packages/*/package.json ./packages/*/

# Modify package.json to remove problematic workspace dependencies
RUN jq 'del(.dependencies["@repo/eslint-config"]) | del(.dependencies["@repo/typescript-config"])' ./apps/blog/package.json > /tmp/package.json && \
    mv /tmp/package.json ./apps/blog/package.json

# Copy fumadocs configuration files
COPY apps/blog/source.config.ts* apps/blog/fumadocs.js* ./apps/blog/

# Second stage: Builder
FROM setup AS builder
WORKDIR /app

# Copy the rest of the source code
COPY . .

# Install dependencies without frozen lockfile
RUN pnpm install --no-frozen-lockfile

# Initialize git repo
RUN git init && \
    git config --global user.email "docker@build.local" && \
    git config --global user.name "Docker Build" && \
    git add . && \
    git commit -m "Initial commit"

# Make sure class-variance-authority is installed
WORKDIR /app/apps/blog
RUN pnpm add class-variance-authority clsx tailwind-merge

# Build the app with type checking and linting disabled
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_SKIP_ESLINT_DURING_BUILDS=1
ENV NEXT_SKIP_TYPE_CHECK=1
RUN pnpm run build

# Final stage: Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy built app and necessary files
COPY --from=builder /app/apps/blog/.next ./apps/blog/.next
COPY --from=builder /app/apps/blog/public ./apps/blog/public
COPY --from=builder /app/apps/blog/next.config.js* ./apps/blog/

# Create a clean package.json without workspace dependencies for the runner
RUN echo '{"name":"blog","private":true,"version":"1.0.0","scripts":{"start":"next start"}}' > ./apps/blog/package.json

# Install only the necessary production dependencies
WORKDIR /app/apps/blog
COPY --from=builder /app/apps/blog/node_modules ./node_modules

# Expose port and start app
EXPOSE 3000
CMD ["pnpm", "start"]
