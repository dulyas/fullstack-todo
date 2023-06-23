<script lang="ts">
   import { Router, Route } from "svelte-routing";
   import { Todo, Login } from '@/routes'
   
</script>


<Router url='/'>
      <Route path="/">
        <Todo />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
</Router>