<script lang="ts">
  import { Router, Route, navigate } from "svelte-routing";
  import { Todo, Login } from '@/routes'
  import { getContext, onMount } from "svelte";
  import { Loader } from "@/components";


  import type { IUser } from "@/models";
  import type { Writable } from "svelte/store";



  const user = getContext<Writable<IUser | null>>('user')
  const userIsLoading = getContext<Writable<boolean>>('userIsLoading')

  onMount(() => {
    if (!$user) navigate('/login')
  })

</script>




<Router url='/'>
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