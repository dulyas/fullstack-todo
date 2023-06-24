declare module "*.svelte" {
    import type { ComponentType } from "svelte";
    const component: ComponentType;
    export default component;
}

  
  
  declare namespace svelteHTML {
      interface HTMLAttributes<T> {
          "on:outclick"?: () => void
      }
  }

/// <reference types="svelte" />
/// <reference types="vite/client" />
