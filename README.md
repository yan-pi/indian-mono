# BR2 Consulting Monorepo

This repository contains the codebase for BR2 Consulting's web applications and shared libraries.

## Repository Structure

```
br2-mono/
├── apps/
│   ├── admin/     # Admin panel built with Payload CMS
│   └── web/       # Client-facing website built with Next.js
├── packages/
│   ├── eslint-config/     # Shared ESLint configurations
│   ├── typescript-config/ # Shared TypeScript configurations
│   └── ui/               # Shared UI component library
└── [configuration files]
```

## Technology Stack

- **Package Management:** PNPM with Workspaces
- **Build System:** Turborepo
- **Frontend Framework:** Next.js
- **CMS:** Payload CMS
- **Styling:** Tailwind CSS
- **Components:** Shadcn UI
- **Language:** TypeScript

## Getting Started

### Prerequisites

- Node.js (v18+)
- PNPM
- Docker (for development)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/br2consulting/br2-mono.git
cd br2-mono
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development environment:

```bash
pnpm dev
```

## Applications

### Admin Panel

The admin application is located in `apps/admin` and is built with Payload CMS and Next.js. It provides content management capabilities for the website.

To run only the admin application:

```bash
pnpm --filter admin dev
```

The admin application will be available at `http://localhost:3000/admin`.

### Website

The web application is located in `apps/web` and is built with Next.js. It serves as the client-facing website.

To run only the website:

```bash
pnpm --filter web dev
```

The web application will be available at `http://localhost:3001`.

## Shared Packages

### UI Library

The UI package contains shared components using Shadcn UI and includes:

- Button
- Card
- Accordion
- Dialog
- Navigation Menu
- and more

To use these components in the applications:

```tsx
import { Button } from "@br2/ui";

export default function Example() {
  return <Button>Click me</Button>;
}
```

### Configuration Packages

- **eslint-config**: Shared ESLint rules
- **typescript-config**: Shared TypeScript configurations

## Development Workflow

1. **Feature Development**: Create a feature branch from `main` branch
2. **Development**: Make necessary code changes
3. **Testing**: Test changes locally
4. **Pull Request**: Create a pull request to merge changes into `main`

## Available Scripts

- `pnpm dev`: Start all applications in development mode
- `pnpm build`: Build all applications
- `pnpm lint`: Lint all applications and packages
- `pnpm test`: Run tests (if configured)

## Deployment

The project is configured to be deployed using Docker. A `Dockerfile` and `docker-compose.yml` are provided in the root directory.

```bash
# Build and start all services
docker-compose up -d
```

## License

This project is licensed under the terms specified in the `LICENSE.txt` file.

### TODO:

- [ ] Add instructions for setting up Payload CMS
