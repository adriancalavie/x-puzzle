# X-puzzle 🧩

This is a rewrite/rework attempt at another repo of mine, [AI-puzzle](https://github.com/adriancalavie/AI-puzzle).

If my first attempt featured a TUI, this one fully embraces the web, having an interactive UI written in React.

## Tech Stack

- ⚛️ React -> UI "framework"
- 🔷 TypeScript -> Programming Language
- ⚡ Vite -> Bundler
- 🔍 ESLint -> Linter
- 💎 Prettier -> Formatter
- 🍞 Bun -> JavaScript Runtime

## How to run

### Prerequisites

Make sure you have [Bun](https://bun.sh/) installed on your system.

### Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:adriancalavie/x-puzzle.git
   cd x-puzzle
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

### Development

To start the development server:

```bash
bun run dev
```

This will start the Vite development server, typically available at `http://localhost:5173`.

### Build

To build the project for production:

```bash
bun run build
```

The built files will be generated in the `dist` directory.

### Preview

To preview the production build locally:

```bash
bun run preview
```

### Linting

To run ESLint and check for code quality issues:

```bash
bun run lint
```
