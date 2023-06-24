<script lang='ts'>
    import { writable, type Writable } from "svelte/store";
    import { getContext, onMount, setContext } from "svelte";
    import type { IUser } from "@/models";
    import * as AuthService from "@/services/user";
    import { navigate } from "svelte-routing";

    const user = writable<IUser | null>(null)
    const userIsLoading = writable<boolean>(true)


    const errorMessage = getContext<Writable<string>>('errorMessage')
    const isLoading = getContext<Writable<boolean>>('isLoading')

    

    const checkAuth = async () => {
        // $userIsLoading = false
        try {
            // this.setLoading(true)
            const response = await AuthService.refresh()
            localStorage.setItem('token', response.data.refreshToken)
            $user = response.data.user
            navigate('/')
        } catch (error: any) {
            
            console.log(error?.response?.data?.message || error)
        } finally {
            $userIsLoading = false
        }
    }

    const login = async (email: string, password: string, keepMeCheckBoxValue: boolean) => {
        $isLoading = true
        try {
            const response = await AuthService.login(email, password)

            if (keepMeCheckBoxValue) {
                localStorage.setItem('token', response.data.accessToken)
            }

            $user = response.data.user
            navigate('/')

        } catch (error: any) {
            console.log(error)
            $errorMessage = error?.response?.data?.message || error
        } finally {
            $isLoading = false
        }
    }

    const registration = async (email: string, password: string, keepMeCheckBoxValue: boolean) => {
        $isLoading = true
        try {
            const response = await AuthService.registration(email, password)
            
            if (keepMeCheckBoxValue) {
                localStorage.setItem('token', response.data.accessToken)
            }

            $user = response.data.user
            navigate('/')
        } catch (error: any) {
            $errorMessage = error?.response?.data?.message || error
        } finally {
            $isLoading = false
        }
    }

    const logout = async (email: string) => {
        $isLoading = true
        try {
            navigate('/login')
            await AuthService.logout(email)
            localStorage.removeItem('token')
            $user = null

        } catch (error: any) {
            $errorMessage = error.response?.data?.message || error
        } finally {
            $isLoading = false
        }
    }




    onMount(() => {
        if (localStorage.getItem('token')) {
            checkAuth()
        } else {
            $userIsLoading = false
        }
    })

    setContext('user', user)
    setContext('userIsLoading', userIsLoading)
    setContext('userService', {
        login,
        logout,
        registration
    })

</script>


<slot />