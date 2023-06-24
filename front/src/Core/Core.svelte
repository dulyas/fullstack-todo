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

  onMount(() => {
    if (!$user) navigate('/login')
  })

</script>




<Router url='/'>
    {#if $errorMessage}
      <ErrorMessage/>
    {/if}
    {#if $userIsLoading} 
      <Loader />
    {:else}
      <Route path="/">
        <Todo />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
    {/if}

</Router>