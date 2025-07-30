# Adding New Projects to the Repository

This guide explains how to add new projects to this Turborepo monorepo, including examples for different types of projects such as web scrapers, APIs, CLIs, and more.

## Repository Structure

This monorepo is organized as follows:

- `apps/` - Contains standalone applications
- `packages/` - Contains shared libraries and utilities
- `pnpm-workspace.yaml` - Defines workspace packages
- `turbo.json` - Turborepo configuration

## Adding a New App Project

### Step 1: Create Project Directory

Create a new directory in the `apps/` folder:

```bash
mkdir apps/your-project-name
cd apps/your-project-name
```

### Step 2: Initialize Package.json

Create a `package.json` file with the following structure:

```json
{
  "name": "your-project-name",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "your-dev-command",
    "build": "your-build-command",
    "start": "your-start-command",
    "lint": "eslint .",
    "check-types": "tsc --noEmit"
  },
  "dependencies": {
    // Your project dependencies
  },
  "devDependencies": {
    // Your dev dependencies
  }
}
```

### Step 3: Update Workspace Configuration

The `pnpm-workspace.yaml` already includes `apps/*`, so your new project will be automatically included.

### Step 4: Update Turbo Configuration (if needed)

If your project has specific build requirements, update `turbo.json` in the root directory to include your project's tasks.

## Example: Adding a Web Scraper Project

Here's a complete example of adding a web scraper project:

### 1. Create the scraper directory

```bash
mkdir apps/scraper
cd apps/scraper
```

### 2. Create package.json

```json
{
  "name": "scraper",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "lint": "eslint src --ext .ts",
    "check-types": "tsc --noEmit"
  },
  "dependencies": {
    "puppeteer": "^21.0.0",
    "cheerio": "^1.0.0-rc.12",
    "axios": "^1.6.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0",
    "tsx": "^4.0.0",
    "eslint": "^8.0.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0"
  }
}
```

### 3. Create TypeScript configuration (If applicable)

Create `tsconfig.json`:

```json
{
  "extends": "../../packages/typescript-config/base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### 4. Create source structure

```bash
mkdir src
touch src/index.ts
touch src/scraper.ts
```

### 5. Add basic scraper code

Create `src/index.ts`:

```typescript
import { WebScraper } from './scraper';

async function main() {
  const scraper = new WebScraper();
  await scraper.run();
}

main().catch(console.error);
```

### 6. Install dependencies

From the root directory:

```bash
pnpm install
```

## Example: Adding Other Project Types

### Node.js API Server

```json
{
  "name": "api-server",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "lint": "eslint src --ext .ts",
    "check-types": "tsc --noEmit"
  },
  "dependencies": {
    "express": "^4.18.0",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "@types/express": "^4.17.0",
    "@types/cors": "^2.8.0",
    "typescript": "^5.0.0",
    "tsx": "^4.0.0"
  }
}
```

### CLI Tool

```json
{
  "name": "cli-tool",
  "version": "0.1.0",
  "private": true,
  "bin": {
    "cli-tool": "./dist/cli.js"
  },
  "scripts": {
    "dev": "tsx src/cli.ts",
    "build": "tsc",
    "start": "node dist/cli.js",
    "lint": "eslint src --ext .ts",
    "check-types": "tsc --noEmit"
  },
  "dependencies": {
    "commander": "^11.0.0",
    "inquirer": "^9.0.0"
  },
  "devDependencies": {
    "@types/inquirer": "^9.0.0",
    "typescript": "^5.0.0",
    "tsx": "^4.0.0"
  }
}
```

## Running Your New Project

### Development

From the root directory:

```bash
# Run specific project
pnpm --filter your-project-name dev

# Run all projects
pnpm dev
```

### Building

```bash
# Build specific project
pnpm --filter your-project-name build

# Build all projects
pnpm build
```

### Using Turbo

```bash
# Run with Turbo (faster, with caching)
turbo run dev --filter=your-project-name
turbo run build --filter=your-project-name
```

## Best Practices

1. **Naming**: Use kebab-case for project names
2. **Dependencies**: Share common dependencies through workspace packages when possible
3. **TypeScript**: Extend the shared TypeScript configuration
4. **Linting**: Use consistent ESLint configuration across projects
5. **Scripts**: Follow the standard script naming convention (dev, build, start, lint, check-types)
6. **Documentation**: Add a README.md to each project explaining its purpose and usage

## Shared Packages

Consider creating shared packages in the `packages/` directory for:

- Common utilities
- Shared types/interfaces
- Database connections
- Authentication helpers
- Configuration management

## Troubleshooting

### Common Issues

1. **Dependencies not found**: Run `pnpm install` from the root directory
2. **TypeScript errors**: Ensure your `tsconfig.json` extends the shared configuration
3. **Build failures**: Check that all required scripts are defined in `package.json`
4. **Turbo cache issues**: Run `turbo run build --force` to bypass cache

### Getting Help

- Check the [Turborepo documentation](https://turborepo.com/docs)
- Review existing projects in the `apps/` directory for examples
- Ensure your project follows the established patterns in the repository
