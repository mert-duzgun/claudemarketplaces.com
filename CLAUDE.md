# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application built with TypeScript, React 19, and Tailwind CSS v4. The project uses the Next.js App Router architecture with Turbopack for fast development builds. **Bun is the package manager for this project.**

## Development Commands

### Running the Development Server
```bash
bun dev
```
Uses Turbopack for faster development builds. The application runs on http://localhost:3000 by default.

### Building for Production
```bash
bun run build
```
Creates an optimized production build using Turbopack.

### Starting Production Server
```bash
bun start
```
Runs the production build locally.

### Linting
```bash
bun run lint
```
Uses ESLint with Next.js TypeScript configuration (next/core-web-vitals and next/typescript).

### Installing Dependencies
```bash
bun install
```

### Adding shadcn/ui Components
```bash
bunx shadcn@latest add <component-name>
```
Example: `bunx shadcn@latest add button form table`

## Architecture

### Framework & Routing
- **Next.js 15** with App Router (app directory structure)
- File-based routing in `app/` directory
- Server Components by default (use "use client" directive for client components)

### Styling
- **Tailwind CSS v4** with PostCSS integration
- Global styles in `app/globals.css`
- Custom CSS variables for theming:
  - `--background` and `--foreground` for color scheme
  - `--font-geist-sans` and `--font-geist-mono` for typography
- Dark mode support via `prefers-color-scheme` media query
- Tailwind theme customization via `@theme inline` directive

### TypeScript Configuration
- Strict mode enabled
- Path alias: `@/*` maps to project root
- Module resolution: bundler
- Target: ES2017

### Font Loading
- Uses `next/font/google` for optimized font loading
- Geist and Geist Mono fonts loaded via CSS variables
- Font variables applied to body element in root layout

### Project Structure
```
app/
  ├── layout.tsx      # Root layout with fonts and metadata
  ├── page.tsx        # Home page component
  └── globals.css     # Global styles and Tailwind imports
public/               # Static assets (SVG icons, etc.)
```

### Layout System
- Root layout (`app/layout.tsx`) defines:
  - Document structure (html, body)
  - Font loading and CSS variable injection
  - Global metadata (title, description)
- Nested layouts can be created in subdirectories

### Image Optimization
- Use `next/image` component for all images
- Static assets in `public/` directory
- Supports automatic optimization and responsive images

## Key Technologies

- **Package Manager**: Bun
- **React**: 19.1.0 (latest)
- **Next.js**: 15.5.4
- **TypeScript**: 5.x
- **Tailwind CSS**: 4.x (with @tailwindcss/postcss plugin)
- **Build Tool**: Turbopack (via --turbopack flag)

## ESLint Configuration

The project uses flat config format (`eslint.config.mjs`) with:
- `next/core-web-vitals` preset
- `next/typescript` preset
- Ignores: node_modules, .next, out, build, next-env.d.ts
