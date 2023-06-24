<script lang="ts">
    import TodoElem from "./TodoElem.svelte";
    import type { TodoType } from "@/models";



    const generateTodos = (length): TodoType[] => {
        const todos = []

        for (let i = 1; i<= length; i++) {
            todos.push({
                id: i,
                title: `title ${i}`,
                done: i % 2 ? true : false
            })
        }
        return todos
    }
</script>

<div class="header">
    Todos (5)
</div>
<div class="content">
    <div class="add">
        <input type="text">
        <button class="blue-btn submit">
            Submit
        </button>
    </div>
    <div class="list">
        {#each generateTodos(5) as {title, done, id} (id)}
            <TodoElem {title} {done} />
        {/each}
    </div>
</div>

<style lang="scss">
    .header {
        background: rgb(231, 231, 231);
        padding: 20px;
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