

import './app.css'
import App from './App.svelte'

declare namespace svelteHTML {
  interface HTMLAttributes<T> {
      "on:click_outside"?: CompositionEventHandler<T>;
  }
}

const app = new App({
  target: document.getElementById('app'),
})

export default app
