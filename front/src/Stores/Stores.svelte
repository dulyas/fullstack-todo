<script lang="ts">
import User from "./User.svelte";
import Error from "./Error.svelte";
import Loading from "./Loading.svelte";
import Url from "./Url.svelte";
</script>

<Error>
    <Loading>
        <User>
            <Url>
                <slot />
            </Url>
        </User>
    </Loading>
</Error>