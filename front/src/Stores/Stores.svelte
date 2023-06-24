<script lang="ts">
import User from "./User.svelte";
import Error from "./Error.svelte";
import Loading from "./Loading.svelte";
</script>

<Error>
    <Loading>
        <User>
            <slot />
        </User>
    </Loading>
</Error>