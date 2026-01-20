# Contributing to JSON Indenter Pro

Thank you for your interest in contributing! We welcome bug reports, feature requests, and pull requests from the community.

## Code of Conduct

Please review our [Code of Conduct](./CODE_OF_CONDUCT.md) before contributing. We expect all contributors to follow our community standards.

## Getting Started

### Prerequisites
- Node.js 18+
- Git
- npm or pnpm

### Setting Up Your Development Environment

1. **Fork the repository**
   ```bash
   Click "Fork" on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/jsonindenter.git
   cd jsonindenter
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/tahmidh/jsonindenter.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## Development Workflow

### Creating a Feature Branch

```bash
# Update your local main branch
git checkout main
git pull upstream main

# Create a new branch for your feature
git checkout -b feature/your-feature-name
# or for bug fixes
git checkout -b fix/bug-description
```

### Making Changes

1. **Code Style**
   - Use TypeScript for all new code
   - Follow ESLint rules (run `npm run lint`)
   - Use functional components with hooks
   - Keep components focused and reusable

2. **File Naming**
   - Components: PascalCase (e.g., `JsonFormatter.tsx`)
   - Utilities: camelCase (e.g., `jsonParser.ts`)
   - Types: PascalCase (e.g., `JsonOptions.ts`)

3. **Commit Messages**
   ```
   feat: Add new feature description
   fix: Fix bug description
   docs: Update documentation
   style: Format or style changes
   refactor: Code restructuring without behavior change
   test: Add or update tests
   ```

### Running Linter

```bash
npm run lint
```

Fix any issues with:
```bash
npm run lint -- --fix
```

### Testing Your Changes

```bash
# Build the project
npm run build

# Preview the build locally
npm run preview
```

## Submitting a Pull Request

1. **Push your changes**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create a Pull Request**
   - Go to GitHub and click "New Pull Request"
   - Fill out the PR template with:
     - Clear description of changes
     - Link to related issues
     - Screenshots for UI changes
     - Testing checklist

3. **PR Requirements**
   - [ ] Code follows project style guide
   - [ ] ESLint passes (`npm run lint`)
   - [ ] Build succeeds (`npm run build`)
   - [ ] Changes are tested
   - [ ] Commit messages are clear
   - [ ] No console errors or warnings

4. **Review Process**
   - Maintainers will review your PR
   - Address feedback or questions
   - Keep commits clean and meaningful

## Types of Contributions

### Bug Reports

Found a bug? Please open an issue with:

```markdown
**Description:**
Clear description of what's wrong

**Steps to Reproduce:**
1. ...
2. ...
3. ...

**Expected Behavior:**
What should happen

**Actual Behavior:**
What actually happens

**Environment:**
- Browser: Chrome 120
- OS: macOS 14.2
- Node version (if relevant): 20.x
```

### Feature Requests

Have an idea? Share it with:

```markdown
**Description:**
Clear description of the feature

**Use Case:**
Why would this be useful?

**Example:**
```bash
# If applicable, show example usage
```

**Alternatives:**
Any alternative approaches you've considered
```

### Documentation Improvements

Found a typo or unclear documentation?

```markdown
**Location:**
Which file/section needs improvement?

**Suggestion:**
Your proposed improvement

**Reasoning:**
Why this would be better
```

## Project Structure

Understanding the codebase:

```
src/
├── components/          # Reusable UI components
│   ├── EditorPanel.tsx
│   ├── Toolbar.tsx
│   └── Footer.tsx
├── pages/              # Page components
│   ├── IndenterPage.tsx
│   ├── ValidatorPage.tsx
│   └── ...
├── hooks/              # Custom React hooks
│   └── useEditorTheme.ts
├── utils/              # Utility functions
│   ├── jsonFormatter.ts
│   ├── editor.ts
│   └── analytics.ts
├── store/              # State management (Zustand)
│   ├── editorStore.ts
│   └── themeStore.ts
├── config/             # Configuration
│   ├── seo.ts
│   └── pageEnhancements.ts
├── constants/          # Constants
│   └── routes.ts
└── types/              # TypeScript types
```

## Code Style Guide

### TypeScript

- Use strict mode (already enabled)
- Explicitly type function parameters and return values
- Avoid `any` type
- Use interfaces for object shapes

```typescript
interface JsonOptions {
    indent: number;
    sortKeys: boolean;
}

const formatJson = (data: string, options: JsonOptions): string => {
    // implementation
};
```

### Components

- Use functional components with hooks
- Extract reusable logic into custom hooks
- Use TypeScript interfaces for props

```typescript
interface ButtonProps {
    onClick: () => void;
    label: string;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, label, disabled = false }) => {
    return (
        <button onClick={onClick} disabled={disabled}>
            {label}
        </button>
    );
};
```

### State Management

- Use Zustand for global state
- Use React Context for feature-specific state
- Avoid prop drilling

```typescript
import { create } from 'zustand';

interface EditorStore {
    content: string;
    setContent: (content: string) => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
    content: '',
    setContent: (content) => set({ content }),
}));
```

## Common Issues

### TypeScript Errors

If you get TypeScript errors after changes:

```bash
npm run build  # Full rebuild
```

### ESLint Issues

Fix formatting issues:

```bash
npm run lint -- --fix
```

### Module Not Found

Clear node_modules and reinstall:

```bash
rm -rf node_modules
npm install
```

## Questions?

- Check existing issues/discussions
- Open a new discussion on GitHub
- Ask in pull request comments
- Email: support@jsonindenter.com

## Thank You!

We appreciate all contributions, whether they're code, bug reports, documentation, or feature ideas. Every contribution helps make JSON Indenter better for everyone!

---

**Happy Contributing! 🎉**
