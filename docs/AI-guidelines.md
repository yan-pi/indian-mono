# AI Development Guidelines for BR2 Consulting Monorepo

## Project Architecture Overview

BR2 Consulting's monorepo is structured to provide a clear separation between the admin panel (Payload CMS) and the client-facing website (Next.js). This document outlines the development workflow for implementing new features, particularly focusing on adding new content blocks that can be used in pages.

### Repository Structure

```
br2-mono/
├── apps/
│   ├── admin/     # Admin panel built with Payload CMS
│   └── web/       # Client-facing website built with Next.js
├── packages/
│   ├── eslint-config/     # Shared ESLint configurations
│   ├── typescript-config/ # Shared TypeScript configurations
│   └── ui/               # Shared UI component library
└── [configuration files]
```

## Development Workflow

### Page Content System

The project uses Payload CMS to manage page content. The key concepts are:

1. **Pages Collection**: Defined in `apps/admin/src/collections/Pages.ts`, this is where content editors create and manage pages.
2. **Blocks**: Pages are constructed using blocks (hero sections, content sections, CTAs, etc.) that are added to a page's `layout` array.
3. **Page Builder**: The `PageBuilder` component in `apps/web/components/page-builder/page-builder.tsx` dynamically renders blocks based on their type.

### Adding a New Block Type

To add a new block type to the system, follow these steps:

#### 1. Define the Block Schema in Payload CMS

Add the block definition to the `blocks` array in `apps/admin/src/collections/Pages.ts`:

```typescript
{
  slug: 'newBlockType',
  imageAltText: 'Description for admin UI',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    // Add more fields as needed
  ],
}
```

#### 2. Create the Block Component

Create a new file in `apps/web/components/blocks/` (e.g., `new-block-type.tsx`):

```typescript
import { FC } from "react";
import { renderField } from "../../lib/utils/cms-renderer";

interface NewBlockTypeProps {
  title?: string;
  // Add other props based on your schema
}

const NewBlockType: FC<NewBlockTypeProps> = ({ title }) => {
  return (
    <section className="container mx-auto py-12">
      {title && <h2 className="text-3xl font-bold mb-6">{renderField(title)}</h2>}
      {/* Add your component JSX here */}
    </section>
  );
};

export default NewBlockType;
```

#### 3. Register the Block Component

Update `apps/web/components/blocks/index.tsx` to include your new component:

```typescript
import NewBlockType from "./new-block-type";

type BlockComponentsMap = {
  // Existing components...
  newBlockType: typeof NewBlockType;
};

export const blockComponents: BlockComponentsMap = {
  // Existing mappings...
  newBlockType: NewBlockType,
};
```

### Data Flow

1. **Data Source**: Payload CMS stores page data including blocks configuration
2. **API Client**: React Query fetches data via REST API calls
3. **Page Builder**: Renders blocks based on their type using the components from `blockComponents`
4. **Block Components**: Render content based on the data they receive

### API Client Usage

The project uses React Query to fetch data from Payload. API queries are centralized and follow a pattern:

```typescript
// Example of a hook for fetching page data
export const usePageByPath = (path: string) => {
  return useQuery({
    queryKey: ["page", path],
    queryFn: async () => {
      // API call to fetch page by path
      return await fetchPageByPath(path);
    },
  });
};
```

## Guidelines for Creating New Features

### Best Practices

1. **Component Structure**:

   - Keep components focused on a single responsibility
   - Use the `renderField` utility for handling content from Payload
   - Leverage UI components from the shared `ui` package

2. **TypeScript Usage**:

   - Define clear interfaces for your component props
   - Use the generated types from `apps/admin/src/payload-types.ts` when applicable

3. **Styling**:

   - Use Tailwind CSS for styling
   - Maintain consistency with the existing design system
   - Use the `ui` package components when possible

4. **Error Handling**:
   - Add loading states and error handling in components
   - Provide fallback UI when data is not available

### Testing New Features

1. Define the block in Payload CMS
2. Create a test page in the admin panel using the new block
3. Verify that the block renders correctly on the frontend
4. Check responsiveness on different screen sizes

## Examples

### Example Block Component: Feature Grid

```tsx
// apps/web/components/blocks/feature-grid.tsx
"use client";

import { FC } from "react";
import { renderField } from "../../lib/utils/cms-renderer";

interface FeatureGridBlockProps {
  title?: string;
  subtitle?: string;
  features?: {
    featureTitle: string;
    featureDescription?: string;
    featureIcon?: string;
  }[];
  columns?: number;
  bgColor?: string;
  iconBgColor?: string;
  iconTextColor?: string;
}

const FeatureGrid: FC<FeatureGridBlockProps> = ({
  title,
  subtitle,
  features = [],
  columns = 3,
  bgColor = "transparent",
  iconBgColor = "bg-primary/10",
  iconTextColor = "text-primary",
}) => {
  // Implementation...
};

export default FeatureGrid;
```

### Example Block Registration

```tsx
// apps/web/components/blocks/index.tsx
import FeatureGrid from "./feature-grid";

type BlockComponentsMap = {
  // Other components...
  featureGrid: typeof FeatureGrid;
};

export const blockComponents: BlockComponentsMap = {
  // Other mappings...
  featureGrid: FeatureGrid,
};
```

## Summary

The development workflow for this project focuses on creating modular block components that can be composed in the CMS to build pages. By following this pattern, you can extend the system with new block types while maintaining a consistent architecture and user experience.

When adding new features, always consider:

1. How content editors will interact with the block in the CMS
2. How the block will be styled and rendered on the frontend
3. How the block fits into the overall design system and user experience
