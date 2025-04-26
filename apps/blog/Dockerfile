FROM node:22-slim AS builder

# Install pnpm and git
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*
RUN npm install -g pnpm

WORKDIR /app

# Copy pnpm lockfile and workspace config
COPY pnpm-lock.yaml ./
COPY package.json turbo.json ./
COPY pnpm-workspace.yaml* ./

# Copy the blog package.json and fumadocs configuration files first
COPY apps/blog/package.json ./apps/blog/
COPY apps/blog/*.ts apps/blog/*.js ./apps/blog/

# Install dependencies using pnpm with frozen lockfile
RUN pnpm install --frozen-lockfile --filter=blog...

# Now copy the rest of the source code
COPY . .

# Initialize git repo and make initial commit to satisfy any git operations during build
RUN git init && \
    git config --global user.email "docker@build.local" && \
    git config --global user.name "Docker Build" && \
    git add . && \
    git commit -m "Initial commit"

# Build the blog app with Next.js directly
WORKDIR /app/apps/blog
RUN pnpm run build

FROM node:22-slim

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy built files and dependencies from builder
COPY --from=builder /app/apps/blog/.next ./apps/blog/.next
COPY --from=builder /app/apps/blog/public ./apps/blog/public
COPY --from=builder /app/apps/blog/package.json ./apps/blog/
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/pnpm-lock.yaml ./

# Set working directory to the blog app
WORKDIR /app/apps/blog

# Expose the port the app will run on
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]
