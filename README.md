# shadcn-ui-bundled

See [llm-example.html](./package/examples/llm-example.html).

**All 55 [shadcn/ui](https://ui.shadcn.com/) components in a single HTML file. No build step. No CLI. No node_modules.**

```html
<script type="importmap">
{
  "imports": {
    "react": "https://esm.sh/react@19",
    "react/jsx-runtime": "https://esm.sh/react@19/jsx-runtime",
    "react-dom/client": "https://esm.sh/react-dom@19/client",
    "shadcn": "https://esm.sh/shadcn-ui-bundled/standalone"
  }
}
</script>
```

```jsx
import { Button, Card, Input, Label } from "shadcn"
```

That's it. Open the HTML file in your browser.

---

## Quick Start — Copy This File

Save this as `app.html` and open it:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My App</title>

  <!-- Tailwind v4 (processes class names into CSS at runtime) -->
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  <style type="text/tailwindcss">
    @custom-variant dark (&:is(.dark *));
    @theme inline {
      --font-sans: ui-sans-serif, system-ui, sans-serif;
      --color-background: var(--background);
      --color-foreground: var(--foreground);
      --color-primary: var(--primary);
      --color-primary-foreground: var(--primary-foreground);
      --color-secondary: var(--secondary);
      --color-secondary-foreground: var(--secondary-foreground);
      --color-muted: var(--muted);
      --color-muted-foreground: var(--muted-foreground);
      --color-accent: var(--accent);
      --color-accent-foreground: var(--accent-foreground);
      --color-destructive: var(--destructive);
      --color-border: var(--border);
      --color-input: var(--input);
      --color-ring: var(--ring);
      --radius-sm: calc(var(--radius) * 0.6);
      --radius-md: calc(var(--radius) * 0.8);
      --radius-lg: var(--radius);
      --radius-xl: calc(var(--radius) * 1.4);
    }
    :root {
      --background: oklch(1 0 0);
      --foreground: oklch(0.145 0 0);
      --primary: oklch(0.205 0 0);
      --primary-foreground: oklch(0.985 0 0);
      --secondary: oklch(0.97 0 0);
      --secondary-foreground: oklch(0.205 0 0);
      --muted: oklch(0.97 0 0);
      --muted-foreground: oklch(0.556 0 0);
      --accent: oklch(0.97 0 0);
      --accent-foreground: oklch(0.205 0 0);
      --destructive: oklch(0.577 0.245 27.325);
      --border: oklch(0.922 0 0);
      --input: oklch(0.922 0 0);
      --ring: oklch(0.708 0 0);
      --radius: 0.625rem;
    }
    @layer base {
      * { @apply border-border outline-ring/50; }
      body { @apply bg-background text-foreground; }
    }
  </style>

  <!-- Import map: React + shadcn from CDN -->
  <script type="importmap">
  {
    "imports": {
      "react": "https://esm.sh/react@19",
      "react/jsx-runtime": "https://esm.sh/react@19/jsx-runtime",
      "react-dom/client": "https://esm.sh/react-dom@19/client",
      "shadcn": "https://esm.sh/shadcn-ui-bundled/standalone"
    }
  }
  </script>

  <!-- Babel: JSX/TSX → JS in the browser -->
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script>
    Babel.registerPreset("tsx", {
      presets: [
        [Babel.availablePresets["react"], { runtime: "automatic" }],
        [Babel.availablePresets["typescript"], { isTSX: true, allExtensions: true }],
      ],
    });
  </script>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel" data-type="module" data-presets="tsx">
    import { createRoot } from "react-dom/client";
    import { Button, Card, CardHeader, CardTitle, CardContent, Input, Label } from "shadcn";

    function App() {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label>Email</Label>
                <Input type="email" placeholder="you@example.com" />
              </div>
              <Button className="w-full">Continue</Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    createRoot(document.getElementById("root")!).render(<App />);
  </script>
</body>
</html>
```

### How it works

| Piece                             | What it does                                                  |
| --------------------------------- | ------------------------------------------------------------- |
| `@tailwindcss/browser@4`          | Scans the DOM for Tailwind classes, generates CSS at runtime  |
| `<style type="text/tailwindcss">` | Tailwind theme config + shadcn CSS variables (colors, radii)  |
| `<script type="importmap">`       | Maps `"react"` and `"shadcn"` to CDN URLs — no bundler needed |
| `@babel/standalone`               | Compiles JSX/TSX to JS in the browser                         |
| `shadcn-ui-bundled/standalone`    | All 55 components in one ESM file, React externalized         |

---

## Theming — Just CSS Variables

Every shadcn component reads from CSS custom properties. Change them and everything updates:

```css
:root {
  --primary: oklch(0.55 0.22 260);   /* blue */
  --radius: 1rem;                     /* rounder corners */
}
```

Pick colors at [oklch.com](https://oklch.com/) or grab presets from [ui.shadcn.com/themes](https://ui.shadcn.com/themes).

See [`examples/test-custom-theme.html`](package/examples/test-custom-theme.html) for a live theme picker with 5 color presets.

---

## Examples

| File                                                                         | Description                                                                    |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [`examples/test.html`](package/examples/test.html)                           | Component showcase — buttons, cards, tabs, accordion, inputs, badges, and more |
| [`examples/test-custom-theme.html`](package/examples/test-custom-theme.html) | Live theme switcher — pick from 5 color themes, toggle dark mode               |

Both are single HTML files. No server required (though some components may need HTTP due to ES module CORS — use `python3 -m http.server`).

---

## What's Inside

55 components, Base UI variant (not Radix):

**Form & Input** — Button · ButtonGroup · Checkbox · Combobox · Field · Input · InputGroup · InputOTP · Label · NativeSelect · RadioGroup · Select · Slider · Switch · Textarea

**Layout & Navigation** — Accordion · Breadcrumb · NavigationMenu · Pagination · Separator · ScrollArea · Sidebar · Tabs · Resizable

**Overlays & Dialogs** — AlertDialog · Command · ContextMenu · Dialog · Drawer · DropdownMenu · HoverCard · Menubar · Popover · Sheet · Tooltip

**Feedback & Status** — Alert · Badge · Empty · Progress · Skeleton · Spinner · Toaster (Sonner)

**Display & Media** — AspectRatio · Avatar · Calendar · Card · Carousel · Chart · Item · Kbd · Table · Toggle · ToggleGroup

**Utilities** — `cn()` · `useIsMobile` · `useDirection` · `DirectionProvider` · `TooltipProvider`

---

## Two Builds

| Build          | File                        | Size               | Use case                                                        |
| -------------- | --------------------------- | ------------------ | --------------------------------------------------------------- |
| **Standalone** | `dist/index.standalone.mjs` | 2.3 MB (460 KB gz) | CDN / single HTML file — all deps bundled, only React external  |
| **Lean**       | `dist/index.mjs`            | 179 KB (28 KB gz)  | npm + bundler (Vite, Next.js) — deps resolved from node_modules |

The standalone build bundles everything (@base-ui/react, lucide-react, recharts, date-fns, etc.) so your importmap only needs React + this one file.

### npm install (for bundler users)

```bash
npm install shadcn-ui-bundled
```

```tsx
import { Button, Card } from "shadcn-ui-bundled"
```

```css
/* tailwind v4 */
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn-ui-bundled/theme.css";
```

---

## How This Package is Built

The components come from the official `shadcn` CLI — not hand-written:

1. `scripts/regenerate.sh` scaffolds a throwaway Vite project
2. Runs `shadcn init --base=base` + `shadcn add --all`
3. Copies components to `package/src/`, rewrites `@/` imports to relative
4. Auto-generates the barrel export (`src/index.ts`)
5. Syncs dependency versions from the scaffold
6. Builds with tsup (dual lean + standalone output)
7. Validates: no `process.env`, no bundled React internals, no CJS `require("react")`

A [GitHub Action](.github/workflows/update.yml) runs this every Monday and auto-publishes to npm if components changed.

### Why a custom esbuild plugin?

Many shadcn dependencies (vaul, sonner, cmdk) use CJS `require("react")` internally. In a standalone ESM bundle for the browser, this breaks — `require` doesn't exist and `external: ["react"]` only catches ESM imports.

The build uses a custom esbuild plugin that intercepts all `react`/`react-dom` requires and rewrites them to ESM imports, ensuring a single React instance when loaded via importmap.

---

## License

MIT — Components sourced from [shadcn/ui](https://github.com/shadcn-ui/ui) (MIT).
