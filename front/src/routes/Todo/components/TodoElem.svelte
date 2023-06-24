<script lang="ts">
    import DeleteIcon from "./svgs/DeleteIcon.svelte";
    import EditIcon from "./svgs/EditIcon.svelte";
    import { clickOutside } from "@/utils";
    import SaveIcon from "./svgs/SaveIcon.svelte";
    import MiniLoader from "./svgs/MiniLoader.svelte";
    import {fade} from 'svelte/transition'
    import {resize} from '@/transition'
    import { updateTodoDone, updateTodoTitle } from "@/services/todo";
    import {getContext, createEventDispatcher} from 'svelte'
    import type { Writable } from "svelte/store";


    const dispatch = createEventDispatcher()

    export let title: string 

    let startTitle: string = title

    export let done: boolean
    export let id: number
    


    const errorMessage = getContext<Writable<string>>('errorMessage')

    let loading: boolean = false


    let onEdit: boolean = false
    let inputTitle: HTMLInputElement

    const onClickEdit = async () => {
        if (!onEdit) {
            onEdit = true
            inputTitle.focus()
        } else {
            if (title !== startTitle) {
                try {
                    loading = true
                    await updateTodoTitle(id, title)
                    loading = false
                    startTitle = title
                } catch (e) {
                    $errorMessage = e.response.data.message
                }
            }
            onEdit = false
            inputTitle.blur()
        }
    }

    const onOutClick = () => {
        onEdit = false
        title = startTitle
        inputTitle.blur()
    }

    const onClickDone = async () => {
        try {
            loading = true
            await updateTodoDone(id, done)
        } catch (e) {
            $errorMessage = e.response.data.message
        } finally {
            loading = false
        }

    }

    const onClickDelete = () => {

        dispatch('deleteTodo', {id})
    }


</script>

<div 
use:clickOutside
on:outclick={onOutClick}
transition:resize|local={{}}
class="todo">

    <div class="left">
        <input 
        bind:checked={done} 
        on:change={onClickDone}
        type="checkbox">
        <input bind:this={inputTitle} bind:value={title} class:on-edit={onEdit} class="title" type="text" placeholder={title}>
    </div>
    {#if loading}
        <div transition:fade|local class="mini-loader">
            <MiniLoader />
        </div>
    {/if}
    <div class="icons">
        <button 
        on:click={onClickEdit}
        class="edit">
            {#if !onEdit}
                <EditIcon />
            {:else}
                <SaveIcon />
            {/if}
        </button>
        <button 
        on:click={onClickDelete}
        class="delete">
            <DeleteIcon />
        </button>
    </div>
</div>

<style lang="scss">
 .todo {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    position: relative;


    .mini-loader {

        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2;
        pointer-events: all;
        background: rgba(0, 0, 0, 0.178)  ;
        :global(svg) {
            height: 20px;
        }
    }

    input {
        // display: block;
        width: 15px;
        height: 15px;
        margin-inline-end: 10px;
    }
    &:first-child {
        border-block-start: 1px solid grey;
    }
    &:nth-child(odd) {
        background: rgb(231, 231, 231);
    }
    border-block-end: 1px solid grey;
    border-inline-start: 1px solid grey;
    border-inline-end: 1px solid grey;

    .left {
        display: flex;
        align-items: center;
        .title {
            background: none;
            width: 100%;
            pointer-events: none;
            padding: 10px;
            border-radius: 5px;
            &::placeholder {
                color: black;
            }
            &.on-edit {
                pointer-events: all;
                background: #FFF;
            }
        }
    }

    .icons {
        justify-self: flex;
        display: flex;
        align-items: center;
        button {
            width: 30px;
            height: 30px;
            padding: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            opacity: .8;
            transition: .3s opacity;
            &:hover {
                opacity: 1;
            }
            &.edit {
                background: green;
                border-radius: 5px;
                :global(svg) {
                    stroke: #FFF;
                }
            }
            &.delete {
                margin-inline-start: 5px;
                background: red;
                border-radius: 5px;
                :global(svg) {
                    fill: #FFF;
                }
            }
        }
    }
 }
</style>