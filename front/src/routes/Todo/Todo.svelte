<script lang="ts">
    import { getContext } from "svelte";
    import type { IUser, UserService } from "@/models";
    import type { Writable } from "svelte/store";
    import Todos from "./components/Todos.svelte";

    const user = getContext<Writable<IUser>>('user')
    const { logout } = getContext<UserService>('userService')

    const onClickLogout = () => {
        logout($user.email)
    }

</script>

<div class='todo'>
    <header>
        <div class="user">
            {$user.email}
        </div>
    
        <button on:click={onClickLogout} class="logout blue-btn">
            Logout   
        </button>
    </header>
    <div class="todos">
        <Todos />
    </div>
</div>

<style lang="scss">

    :global(.blue-btn)   {
        background: rgb(36, 36, 255);
        padding: 10px;
        border-radius: 5px;
        color: #FFF;
        transition: .3s;
        cursor: pointer;
        &:hover {
            background: blue;
        }
    }

    .todo {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        header {
            width: 100%;
            height: 60px;
            background: rgb(53, 49, 49);
            // position: absolute;
            top: 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0px 20px;
            .user {
                color: #FFF;
            }

        }

        .todos {
            
            margin-block-start: 50px;
            max-width: 400px;
            width: 100%;
            // padding: 20px;
            // height: 100%;
            border: 2px grey solid;
        }
    }
</style>