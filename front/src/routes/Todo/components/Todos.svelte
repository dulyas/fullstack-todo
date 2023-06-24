<script lang="ts">
    import { createTodo, deleteTodo, getTodosByUserId } from "@/services/todo";
    import TodoElem from "./TodoElem.svelte";
    import type { IUser, TodoType } from "@/models";
    import { getContext, onMount } from "svelte";
    import type { Writable } from "svelte/store";
    import { resize } from "@/transition";

    const { getQueryValue, replaceQuery, pushQuery} = getContext<{
        getQueryValue: (key: any) => string | false;
        replaceQuery: (key: any, value: any) => void;
        pushQuery: (key: any, value: any) => void;
    }>('url')

    let limit = +getQueryValue('limit') || 5
    let offset = +getQueryValue('offset') || 0

    $: replaceQuery('limit', limit)
    $: replaceQuery('offset', offset)

    let disableLoadBtn: boolean = false

    const isLoading = getContext<Writable<boolean>>('isLoading')
    const user = getContext<Writable<IUser>>('user')
    const errorMessage = getContext<Writable<string>>('errorMessage')
    
    let newTodoTitle: string = ''

    let todos: TodoType[] = []

    onMount(async () => {
        $isLoading = true
        try {
            todos = (await getTodosByUserId($user.id, limit, offset)).data
            if (todos.length < 5) disableLoadBtn = true
        } catch (e) {
            $errorMessage = e.response.data.message
        }
        $isLoading = false
    })

    const onClickCreateTodo = async () => {
        $isLoading = true
        try {
            await createTodo($user.id, newTodoTitle)
            todos = (await getTodosByUserId($user.id)).data
        } catch (e) {
            $errorMessage = e.response.data.message
        }
        newTodoTitle = ''
        $isLoading = false
    }

    const onClickLoadMore = async () => {
        offset = offset + limit
        $isLoading = true
        try {
            const newTodos = (await getTodosByUserId($user.id, limit, offset)).data
            if (newTodos.length < 5) disableLoadBtn = true

            todos = [...todos, ...newTodos]
        } catch (e) {
            $errorMessage = e.response.data.message
        }
        $isLoading = false
    }

    const onDeleteTodo = async (e: {detail: {id: number}}) => {
        $isLoading = true
        try {
            await deleteTodo(e.detail.id)
            todos = (await getTodosByUserId($user.id, limit, offset)).data
        } catch (e) {
            $errorMessage = e.response.data.message
        }
        $isLoading = false
    }




</script>

<div class="header">
    Todos ({todos.length})
</div>
<div class="content">
    <div class="add">
        <input bind:value={newTodoTitle} type="text">
        <button 
        on:click={onClickCreateTodo}
        class="blue-btn submit">
            Submit
        </button>
    </div>

        <div class="list">
            {#each todos as {title, id, done} (id)}
                <TodoElem on:deleteTodo={onDeleteTodo} {title} {id} {done} />
            {/each}
        </div>

    <div class="footer">
        <button 
        class:disabled={disableLoadBtn || todos.length < limit}
        on:click={onClickLoadMore}
        class="blue-btn">
            Load more
        </button>
    </div>
</div>

<style lang="scss">
    .header {
        background: rgb(231, 231, 231);
        padding: 20px;
    }

    .footer {
        margin-block-start: 10px;
        width: 100%;
        button {
            width: 100%;
            &.disabled {
                pointer-events: none;
                opacity: .4;
            }
        }
    }

    .content {
        padding: 20px;

        .add {
            display: flex;

            input {
                box-shadow: inset 0 0 0 50px #FFF;
                border: 1px rgb(180, 180, 180) solid;
                border-inline-end: none;
                padding: 5px 10px;
                color: black;
                border-radius: 5px 0px 0px 5px;
            }

            .submit {
                border-radius: 0px 5px 5px 0px;
            }
        }

        .list {
            margin-block-start: 5px;
        }
    }
</style>