# GitHub Copilot Instructions for React/Vite Project

## Project Stack
*   **Framework:** React 18 with TypeScript
*   **Build Tool:** Vite
*   **Language:** TypeScript (strict mode enabled)
*   **Styling:** Tailwind CSS
*   **State Management:** Use `useState` for local state and React Context API for global state. Avoid prop drilling.
*   **UI Library:** Use [shadcn/ui](https://ui.shadcn.com/) for building UI components.

## Project Structure
*   `src/`: Source code
*   `src/components/`: Reusable UI components
*   `src/pages/`: Application pages/routes
*   `src/hooks/`: Custom React hooks
*   `src/utils/`: Utility functions
*   `src/types/`: TypeScript type definitions/interfaces

## Code Style
*   **Components:** Use functional components and arrow functions.
*   **Props:** Use `camelCase` for prop names and provide explicit TypeScript interface definitions.
*   **Immutability:** Never mutate props or state directly. Always create new objects or arrays for updates.
*   **Fragments:** Use `<>...</>` to avoid unnecessary DOM wrapper elements.
*   **ESLint/Prettier:** Adhere to project-specific ESLint and Prettier rules (refer to the config files in the root directory).

## Commands
*   **Install Dependencies:** `npm install` or `pnpm install`
*   **Run Development Server:** `npm run dev` or `pnpm run dev`
*   **Build for Production:** `npm run build` or `pnpm run build`
*   **Run Tests:** `npm test` or `pnpm test` (uses Vitest and React Testing Library)
*   **Run Lint:** `npm run lint` or `pnpm run lint`

## Boundaries
*   Never commit secrets or production configuration files.
*   Ensure all new code includes relevant tests and passes linting checks.
*   Prioritize web accessibility (WCAG 2.1 AA, ARIA).

## Operational Guidelines
*   **Plan first:** Before suggesting a large code change, propose an execution plan as a list of steps.
*   **Context:** When referencing code, include the filename and line numbers.
*   **Tests:** Add or update tests for any code changes, following the Arrange-Act-Assert pattern.

DO NOT REINVENT THE WHEEL: Prefer using existing libraries and components over creating new ones from scratch, unless there is a compelling reason to do so.

PUT ALL .md in .github FOLDER: All markdown documentation files should be stored in the .github directory at the root of the project.