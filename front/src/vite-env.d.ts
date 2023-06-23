declare module "*.svelte" {
    import type { ComponentType } from "svelte";
    const component: ComponentType;
    export default component;
}

/// <reference types="svelte" />
/// <reference types="vite/client" />
