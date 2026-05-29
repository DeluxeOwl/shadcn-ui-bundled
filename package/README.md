# shadcn-ui-bundled

All 55 [shadcn/ui](https://ui.shadcn.com/) components (Base UI variant) bundled as a single ESM package. **Zero CLI, CDN-ready.**

- ✅ 312 exports — every component, hook, and utility
- ✅ Base UI variant — `@base-ui/react` primitives, not Radix
- ✅ 179KB bundle (28KB gzipped) — deps resolved externally
- ✅ Full TypeScript declarations
- ✅ Tailwind CSS v4 compatible
- ✅ Works with esm.sh, jsDelivr, or any ESM CDN
- ✅ Tree-shakeable — import only what you need

## Install (npm)

```bash
npm install shadcn-ui-bundled
```

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from "shadcn-ui-bundled"

function App() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hello</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  )
}
```

### CSS Setup (Tailwind v4)

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn-ui-bundled/theme.css";
```

## Usage via CDN (no build step)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>shadcn via CDN</title>
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
      --color-popover: var(--popover);
      --color-popover-foreground: var(--popover-foreground);
      --color-card: var(--card);
      --color-card-foreground: var(--card-foreground);
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
      --popover: oklch(1 0 0);
      --popover-foreground: oklch(0.145 0 0);
      --card: oklch(1 0 0);
      --card-foreground: oklch(0.145 0 0);
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
  <script type="importmap">
  {
    "imports": {
      "react": "https://esm.sh/react@19",
      "react/jsx-runtime": "https://esm.sh/react@19/jsx-runtime",
      "react-dom/client": "https://esm.sh/react-dom@19/client",
      "shadcn-ui-bundled": "https://esm.sh/shadcn-ui-bundled"
    }
  }
  </script>
</head>
<body>
  <div id="root"></div>
  <script type="module">
    import React from "react"
    import { createRoot } from "react-dom/client"
    import { Button, Card, CardHeader, CardTitle, CardContent, Input, Label } from "shadcn-ui-bundled"

    function App() {
      return React.createElement(Card, { className: "w-96 mx-auto mt-20" },
        React.createElement(CardHeader, null,
          React.createElement(CardTitle, null, "Hello from shadcn CDN")
        ),
        React.createElement(CardContent, { className: "space-y-4" },
          React.createElement("div", null,
            React.createElement(Label, null, "Email"),
            React.createElement(Input, { placeholder: "you@example.com" })
          ),
          React.createElement(Button, { className: "w-full" }, "Submit")
        )
      )
    }

    createRoot(document.getElementById("root")).render(React.createElement(App))
  </script>
</body>
</html>
```

## Components included

### Form & Input
`Button` · `ButtonGroup` · `Checkbox` · `Combobox` · `Field` · `Input` · `InputGroup` · `InputOTP` · `Label` · `NativeSelect` · `RadioGroup` · `Select` · `Slider` · `Switch` · `Textarea`

### Layout & Navigation
`Accordion` · `Breadcrumb` · `NavigationMenu` · `Pagination` · `Separator` · `ScrollArea` · `Sidebar` · `Tabs` · `Resizable`

### Overlays & Dialogs
`AlertDialog` · `Command` · `ContextMenu` · `Dialog` · `Drawer` · `DropdownMenu` · `HoverCard` · `Menubar` · `Popover` · `Sheet` · `Tooltip`

### Feedback & Status
`Alert` · `Badge` · `Empty` · `Progress` · `Skeleton` · `Spinner` · `Toaster` (Sonner)

### Display & Media
`AspectRatio` · `Avatar` · `Calendar` · `Card` · `Carousel` · `Chart` · `Item` · `Kbd` · `Table` · `Toggle` · `ToggleGroup`

### Utilities
`cn` · `useIsMobile` · `useSidebar` · `useCarousel` · `useComboboxAnchor` · `useDirection` · `DirectionProvider` · `TooltipProvider`

## Dependencies

React is a peer dependency. All other deps are bundled or listed as dependencies:

| Dependency | Purpose |
|---|---|
| `@base-ui/react` | UI primitives |
| `class-variance-authority` | Variant styling |
| `clsx` + `tailwind-merge` | Class merging |
| `lucide-react` | Icons |
| `cmdk` | Command palette |
| `vaul` | Drawer |
| `sonner` | Toast |
| `recharts` | Charts |
| `react-day-picker` | Calendar |
| `embla-carousel-react` | Carousel |
| `react-resizable-panels` | Resizable |
| `input-otp` | OTP input |
| `next-themes` | Theme switching |
| `date-fns` | Date utilities |

## Building from source

```bash
git clone https://github.com/user/shadcn-ui-bundled
cd shadcn-ui-bundled/package
npm install
npm run build
```

## License

MIT — Components sourced from [shadcn/ui](https://github.com/shadcn-ui/ui) (MIT).
