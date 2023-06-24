<script lang="ts">
import { writable } from "svelte/store";
import { setContext } from "svelte";


const isLoading = writable<boolean>(false)


setContext('isLoading', isLoading)


</script>

<slot />



