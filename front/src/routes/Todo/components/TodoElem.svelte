<script lang="ts">
    import DeleteIcon from "./svgs/DeleteIcon.svelte";
    import EditIcon from "./svgs/EditIcon.svelte";
    import { clickOutside } from "@/utils";

    export let title: string 
    export let done: boolean



    let onEdit: boolean = false
    let inputTitle: HTMLInputElement

    const onClickEdit = () => {
        onEdit = true
        inputTitle.focus()
    }

    const onOutClick = () => {
        onEdit = false
        inputTitle.blur()
    }

</script>

<div 
use:clickOutside
on:outclick={onOutClick}
class="todo">

    <div class="left">
        <input bind:checked={done} type="checkbox">
        <input bind:this={inputTitle} class:on-edit={onEdit} class="title" type="text" placeholder={title}>
    </div>
    <div class="icons">
        <button 
        on:click={onClickEdit}
        class="edit">
            <EditIcon />
        </button>
        <button class="delete">
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