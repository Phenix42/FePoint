declare module '*.mdx' {
  import type { ComponentType, HTMLAttributes } from 'react';

  const MdxComponent: ComponentType<{
    components?: Record<string, ComponentType<HTMLAttributes<HTMLElement>>>;
  }>;
  export default MdxComponent;
}
