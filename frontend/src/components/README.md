# Component Structure

This project follows the Atomic Design methodology for component organization:

## Atomic Design Principles

1. **Atoms**: Basic building blocks (buttons, inputs, labels)
2. **Molecules**: Simple combinations of atoms (search forms, navigation items)
3. **Organisms**: Complex combinations of molecules (headers, footers, sidebars)
4. **Templates**: Page layouts without real content
5. **Pages**: Specific instances of templates with real content

## Directory Structure

```
components/
├── atoms/           # Basic UI elements
│   ├── Button/
│   ├── Input/
│   ├── Typography/
│   └── ...
├── molecules/       # Combinations of atoms
│   ├── SearchBar/
│   ├── ProductCard/
│   ├── FormField/
│   └── ...
├── organisms/       # Complex UI sections
│   ├── Header/
│   ├── Footer/
│   ├── Sidebar/
│   └── ...
├── templates/       # Page layouts
│   ├── MainTemplate/
│   ├── AdminTemplate/
│   └── ...
└── common/          # Shared components
    ├── Loading/
    ├── ErrorBoundary/
    └── ...
```

## Component Guidelines

1. Each component should have its own directory with:

   - `index.jsx` - Main component file
   - `styles.js` - Styled components or styles
   - `types.ts` - TypeScript types/interfaces (if using TS)
   - `utils.js` - Component-specific utilities
   - `tests/` - Component tests

2. Use functional components with hooks
3. Implement proper prop validation
4. Follow a consistent naming convention
5. Keep components focused on a single responsibility
6. Extract reusable logic into custom hooks
