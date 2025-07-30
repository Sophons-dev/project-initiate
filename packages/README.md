# Shared Packages

This directory contains shared packages used across the monorepo. These packages are designed to be reused by multiple applications and services within the repository.

## What are Shared Packages?

Shared packages are reusable pieces of code that can be imported and used across different applications in the monorepo. They help maintain consistency, reduce code duplication, and make it easier to maintain common functionality.

## Available Packages

### 1. `@repo/typescript-config`

Shared TypeScript configuration that provides consistent type checking and compilation settings across the monorepo.

**Usage in your project's `tsconfig.json`:**

```json
{
  "extends": "@repo/typescript-config/base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### 2. `@repo/eslint-config`

Shared ESLint configurations for consistent code style and best practices.

**Available configurations:**

- `@repo/eslint-config/base` - Base configuration for all projects
- `@repo/eslint-config/next-js` - Configuration for Next.js projects
- `@repo/eslint-config/react-internal` - Configuration for React components

**Usage in your project's `.eslintrc.js`:**

```javascript
module.exports = {
  extends: [
    '@repo/eslint-config/base',
    // For Next.js projects:
    '@repo/eslint-config/next-js',
    // For React components:
    '@repo/eslint-config/react-internal',
  ],
};
```

### 3. `@repo/ui`

Shared UI components library that can be used across different applications.

**Usage in your project:**

```typescript
import { Button } from '@repo/ui';

function MyComponent() {
  return <Button>Click me</Button>;
}
```

## Creating a New Shared Package

1. **Create a new directory** in the `packages/` folder:

   ```bash
   mkdir packages/your-package-name
   cd packages/your-package-name
   ```

2. **Initialize `package.json`** with the following structure:

   ```json
   {
     "name": "@repo/your-package-name",
     "version": "0.1.0",
     "private": true,
     "main": "./dist/index.js",
     "types": "./dist/index.d.ts",
     "scripts": {
       "build": "tsc",
       "dev": "tsc --watch --preserveWatchOutput",
       "lint": "eslint . --max-warnings 0",
       "check-types": "tsc --noEmit"
     },
     "dependencies": {
       // Your package dependencies
     },
     "devDependencies": {
       "@repo/eslint-config": "workspace:*",
       "@repo/typescript-config": "workspace:*",
       "typescript": "^5.0.0"
     }
   }
   ```

3. **Create TypeScript configuration** (`tsconfig.json`):

   ```json
   {
     "extends": "@repo/typescript-config/base.json",
     "compilerOptions": {
       "outDir": "./dist",
       "rootDir": "./src"
     },
     "include": ["src/**/*"],
     "exclude": ["node_modules", "dist"]
   }
   ```

4. **Create source files** in the `src/` directory.

5. **Link the package** in the root `package.json` if needed.

## Using Packages in Applications

To use a shared package in your application:

1. **Import directly** using the package name:

   ```typescript
   import { something } from '@repo/package-name';
   ```

2. **For development**, use the `workspace:*` protocol in your application's `package.json`:

   ```json
   {
     "dependencies": {
       "@repo/package-name": "workspace:*"
     }
   }
   ```

## Development Workflow

1. **Linking**: All packages are automatically linked in the workspace.
2. **Versioning**: Use changesets for version management.
3. **Publishing**: Configure `publishConfig` in `package.json` when ready to publish.

## Best Practices

1. **Keep packages focused**: Each package should have a single responsibility.
2. **Document your package**: Include a README.md in each package directory.
3. **Version carefully**: Use semantic versioning for changes.
4. **Test thoroughly**: Include tests for your package.
5. **Minimize dependencies**: Only include what's necessary.

## Troubleshooting

- **Package not found**: Run `pnpm install` in the root directory.
- **Type errors**: Ensure your `tsconfig.json` extends the shared config.
- **Build issues**: Check the package's build script and dependencies.

## Learn More

- [Turborepo Documentation](https://turborepo.org/)
- [pnpm Workspaces](https://pnpm.io/workspaces)
- [TypeScript Project References](https://www.typescriptlang.org/docs/handbook/project-references.html)
