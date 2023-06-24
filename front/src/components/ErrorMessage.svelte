<script lang='ts'>
    import { getContext, onMount } from "svelte";
    import type { Writable } from "svelte/store";
    import { fly, fade } from 'svelte/transition'


    const errorMessage = getContext<Writable<string>>('errorMessage')

    let cloneErrorMessage: string = $errorMessage

    onMount(() => setTimeout(() => {
        $errorMessage = ''
    }, 2000))

</script>

<div 
transition:fly|local={{x: 100, y: 0}} 
class="error-message">
    {cloneErrorMessage}
</div>

<style lang="scss">
    .error-message {
        position: absolute;
        background: rgb(255, 82, 82);
        padding: 8px;
        right: 20px;
        top: 10px;
        z-index: 2;
        border-radius: 10px;
        color: #FFF;
    }
</style>