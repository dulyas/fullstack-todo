<script lang='ts'>
    import { writable } from "svelte/store";
    import { setContext } from "svelte";
    import type { IUser } from "@/models";

    const user = writable<IUser | null>(null)
    const userIsLoading = writable<boolean>(true)

        setTimeout(() => {
            $userIsLoading = false
        }, 5)

    setContext('user', user)
    setContext('userIsLoading', userIsLoading)

</script>


<slot />