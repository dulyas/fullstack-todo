<script lang="ts">
import { resize } from "@/transition";
import { getContext } from "svelte";
import type { Writable } from "svelte/store";
import type { UserService } from "@/models";

type LoginRegister = 'login' | 'register'


const errorMessage = getContext<Writable<string>>('errorMessage')
const userService = getContext<UserService>('userService')

let selectedTab: LoginRegister = 'login'
let email: string = ''
let password: string = ''
let confirmPassword: string = ''
let keepMeCheckBoxValue: boolean = false

const tabs: {code: LoginRegister, title: string}[] = [
    {
        code: 'login',
        title: 'SIGN IN'
    }, 
    {
        code: 'register',
        title: 'SIGN UP'
    }, 
]

const sendForm = async () => {



    if (selectedTab === 'login') {
        
        await userService.login(email, password, keepMeCheckBoxValue)

    } else {
        if (email.length < 6 || email.length > 50) return $errorMessage = 'Email должен быть длиннее 6 символов и короче 50'
        if (password.length < 6 || password.length > 50) return $errorMessage = 'Password должен быть длиннее 6 символов и короче 50'

        if (password !== confirmPassword) return $errorMessage = 'Пароли должны совпадать'

        await userService.registration(email, password, keepMeCheckBoxValue)
    }

    // password = ''
    // email = ''
    // confirmPassword = ''

}



</script>

<div class="lay">
    <div class="login">
        <div class="tabs selected-{selectedTab}">
            {#each tabs as { code, title } }
                <button
                on:click={() => selectedTab = code}
                class="tab">{title}</button>
            {/each}
    
        </div>
    
        <form on:submit|preventDefault>
            <label>
                <div>Email</div>
                <input bind:value={email} type="text">
            </label>
            <label>
                <div>Password</div>
                <input type="password" bind:value={password} >
            </label>
            {#if selectedTab === 'register'}
                <label transition:resize|local={{}}>
                    <div>Сonfirm Password</div>
                    <input type="password" bind:value={confirmPassword} >
                </label>
            {/if}
            <div class="checkbox-wrap">
                <button
                class:active={keepMeCheckBoxValue}
                on:click={() => keepMeCheckBoxValue = !keepMeCheckBoxValue}
                class="fake-checkbox" />
                <span>
                    Keep Me Signed In
                </span>
            </div>
            <button 
            on:click={sendForm}
            class:disabled={(selectedTab === 'login' && (!email || !password)) || (selectedTab === 'register' && (!email || !password || !confirmPassword))}
            class="submit-btn">
                {selectedTab === 'login' ? "SIGN IN" : "SIGN UP"}
            </button>

        </form>
        <div class="line" />
        <button 

        class="forgot">
            Forgot Password
        </button>
    </div>
</div>


<style lang="scss">
    .lay {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(135deg, #0b0736 0%,#603a66 100%);

        .login {
            margin-block-start: 25%;
            max-width: 400px;
            width: 100%;
            padding: 20px;
            height: 100%;

            .tabs {
                width: 50%;
                display: flex;
                // justify-content: center;
                // align-items: center;
                position: relative;
                padding-block-end: 5px;

                &.selected-register {
                    &::after {
                        transform: translateX(125%);
                    }
                }
                &::after {
                    content: '';
                    position: absolute;
                    bottom: 0%;
                    left: 5%;
                    width: 40%;
                    // height: 100%;
                    border-bottom: 2px rgb(202, 202, 0) solid;
                    // background: #262626;
                    transition: transform .5s;
                }
                button {
                    color: #FFFFFF;
                    font-size: 20px;
                    width: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    &:last-child {
                        margin-inline-start: 10px;
                    }
                    cursor: pointer;
                }
            }

            form {
                margin-block-start: 40px;
                label {
                    font-size: 15px;
                    color: rgb(175, 169, 182);
                    display: block;
                    &:not(:first-child) {
                        margin-block-start: 20px;
                    }
                    input {
                        margin-block-start: 10px;
                        padding: 10px 10px 10px 15px;
                        border-radius: 25px;
                        box-shadow: inset 0 0 0 50px rgb(97, 94, 100);
                        -webkit-text-fill-color: #fff;
                    }
                }

                .submit-btn {
                    background: rgb(202, 202, 0);
                    border-radius: 20px;
                    padding: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    margin-block-start: 15px;
                    color: #FFFFFF;
                    font-weight: 700;
                    transition: .3s;
                    cursor: pointer;
                    &:hover {
                        background: rgb(146, 146, 2);
                    }
                    &.disabled {
                        pointer-events: none;
                        opacity: .7;
                    }
                }
            }

            .checkbox-wrap {
                margin-block-start: 15px;
                display: flex;
                // justify-content: center;
                align-items: center;
                .fake-checkbox {
                    width: 20px;
                    height: 20px;
                    background: rgb(202, 202, 0);
                    border-radius: 5px;
                    cursor: pointer;
                    margin-inline-end: 10px;
                    position: relative;
                    overflow: hidden;

                    &::after, &::before {
                        opacity: 0;
                        transition: .3s;
                        content: "";
                    }

                    &.active {
                        
                        &::before {
                            position: absolute;
                            opacity: 1;
                            left: 0;
                            top: 50%;
                            height: 30%;
                            width: 3px;
                            background-color: #000000;

                            transform: translateX(6px) rotate(-45deg);
                            transform-origin: left bottom;        
                        }
                        &::after {
                            position: absolute;
                            opacity: 1;
                            left: 0;
                            bottom: 15%;
                            height: 3px;
                            width: 80%;
                            background-color: #000000;

                            transform: translateX(8px) rotate(-45deg);
                            transform-origin: left bottom;      
                        }
                    }
                }
                
                span {
                        line-height: 0;
                        font-size: 12px;
                        color: #FFFFFF;
                    }
            }

            .line {
                width: 80%;
                height: 2px;
                background: rgb(175, 169, 182);
                margin-block-start: 20px;
                position: relative;
                left: 50%;
                transform: translateX(-50%);
            }

            .forgot {
                margin-block-start: 15px;
                text-align: center;
                position: relative;
                left: 50%;
                transform: translateX(-50%);
                cursor: pointer;
                color: rgb(175, 169, 182);
            }

        }
    }
    
</style>