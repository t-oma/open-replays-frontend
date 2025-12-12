# Agent Guidelines for Open Replays Frontend

## Commands

- **Build**: `pnpm build`
- **Dev server**: `pnpm dev`
- **Start production**: `pnpm start`
- **Type check**: `pnpm typecheck`
- **Lint**: `npx eslint .` (no dedicated script)
- **Format**: `npx prettier --write .`

## Code Style

- **Language**: TypeScript with strict mode enabled
- **Framework**: React with JSX (react-jsx)
- **Imports**: Sorted automatically by Prettier plugin (React → builtins → third-party → local with `~/`)
- **Naming**: PascalCase for components, camelCase for functions/variables
- **Types**: Explicit typing required, use Zod for form validation
- **Formatting**: 2 spaces, 80 width, semicolons, double quotes
- **Path aliases**: `~/` maps to `./src/`
- **Error handling**: Type-safe with Zod schemas, minimal try/catch
- **Components**: Feature-based organization under `src/features/`

## Architecture

- **Routing**: React Router v7
- **Styling**: Tailwind CSS with shadcn/ui components
- **State**: React hooks (useState, useEffect)
- **API**: Fetch with typed responses
