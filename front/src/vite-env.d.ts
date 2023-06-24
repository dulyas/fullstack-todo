declare module "*.svelte" {
    import type { ComponentType } from "svelte";
    const component: ComponentType;
    export default component;
}

declare namespace svelte.JSX {
    interface HTMLAttributes<T> {
        onclick_outside: () => void
    }
}

/// <reference types="svelte" />
/// <reference types="vite/client" />
