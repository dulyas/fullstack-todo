<script lang='ts'>
import { setContext } from "svelte";
import { writable } from "svelte/store";

const errorMessage = writable<string>('')

setContext('errorMessage', errorMessage)

</script>


<slot />