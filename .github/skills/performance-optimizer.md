name: react-performance-optimizer
 
description: >
  Analyzes and optimizes React/Next.js components for performance by reducing
  unnecessary re-renders, improving state management, and applying best practices.
 
when_to_use:
  - When a component is slow or laggy
  - When there are unnecessary re-renders
  - When optimizing large lists or heavy UI
  - Before production or performance audits
 
context:
  tech_stack:
    - React
    - Next.js
    - TypeScript
 
instructions:
  - Identify unnecessary re-renders
  - Use React.memo where beneficial
  - Use useCallback for stable function references
  - Use useMemo for expensive computations
  - Avoid inline object/array creation in JSX
  - Suggest code splitting (dynamic imports) if needed
  - Optimize list rendering (keys, virtualization if large)
  - Minimize prop drilling if possible
  - Suggest proper state placement (avoid global overuse)
  - Optimize API calls (debounce, caching)
 
edge_cases:
  - Overuse of memoization (avoid premature optimization)
  - Stale closures in hooks
  - Missing dependency arrays
  - Large lists causing DOM overload
 
output_format:
  - Provide:
      1. Identified issues
      2. Optimized code
      3. Explanation of improvements