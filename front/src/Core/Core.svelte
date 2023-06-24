<script lang="ts">
  import { Router, Route, navigate } from "svelte-routing";
  import { Todo, Login } from '@/routes'
  import { getContext, onMount } from "svelte";
  import { Loader } from "@/components";


  import type { IUser } from "@/models";
  import type { Writable } from "svelte/store";
  import ErrorMessage from "@/components/ErrorMessage.svelte";



  const user = getContext<Writable<IUser | null>>('user')
  const userIsLoading = getContext<Writable<boolean>>('userIsLoading')
  const errorMessage = getContext<Writable<string>>('errorMessage')
  const isLoading = getContext<Writable<boolean>>('isLoading')

  $: if (!$user && !$userIsLoading) navigate('/login')


</script>




<Router url='/'>
    {#if $errorMessage}
      <ErrorMessage/>
    {/if}
    {#if $userIsLoading} 
      <Loader />
    {:else}
      {#if $isLoading}
        <div class='loader'>
            <Loader />
        </div>
       {/if}
      <Route path="/">
        <Todo />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
    {/if}

</Router>

<style>
  .loader {
    background: rgba(0, 0, 0, 0.281);
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
}
</style>