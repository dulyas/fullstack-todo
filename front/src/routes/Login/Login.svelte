<script lang="ts">

type LoginRegister = 'login' | 'register'

let selectedTab: LoginRegister = 'login'
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

</script>

<div class="login">
    <div class="tabs selected-{selectedTab}">
        {#each tabs as { code, title } }
            <button
            class:active={selectedTab === code}
            on:click={() => selectedTab = code}
            class="tab">{title}</button>
        {/each}

    </div>

    <form on:submit|preventDefault>
        <label>
            <div>Username</div>
            <input type="text">
        </label>
        <label>
            <div>Password</div>
            <input type="text">
        </label>
        <div class="checkbox-wrap">
            <div class="fake-checkbox" />
            <span>
                Keep Me Signed In
            </span>
        </div>
        <button>
            {selectedTab === 'login' ? "Sign In" : "Register"}
        </button>
        <div class="line" />
        <button class="forgot">
            Forgot Password
        </button>
    </form>

</div>


<style lang="scss">
    .login {
        max-width: 400px;
        width: 100%;
        padding: 20px;

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
                left: 2.5px;
                width: 25%;
                // height: 100%;
                border-bottom: 2px #FFFFFF solid;
                // background: #262626;
                transition: transform .5s;
            }
            button {
                color: #FFFFFF;
                &:last-child {
                    margin-inline-start: 10px;
                }
                cursor: pointer;

                &.active {

                }
            }
        }
    }
</style>