<script lang='ts'>
import { writable } from "svelte/store";
import { setContext } from "svelte";

const user = writable(null)

setContext('user', user)

</script>


<slot />