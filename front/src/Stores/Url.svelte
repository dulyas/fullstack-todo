<script lang="ts">

    import { setContext } from 'svelte';


    const baseUrl = window.location.protocol + '//' + window.location.host + window.location.pathname;
    

    const generateQuery = (key, value) =>  {
        let searchParams = new URLSearchParams(window.location.search);
        
        if(value) {
            searchParams.set(key, value);
        } else if(searchParams.has(key)) {
            searchParams.delete(key);
        }

		return searchParams;
    }
    
    const getQueryValue = (key: string) => {
        let searchParams = new URLSearchParams(window.location.search);
        if(searchParams.has(key)) return searchParams.get(key);

        return false;
    }

    const replaceQuery = (key: string, value: string) => {
        history.replaceState(null, null, baseUrl + '?' + generateQuery(key, value));
    }

    const pushQuery = (key: string, value: string) => {
        history.pushState(null, null, baseUrl + '?' + generateQuery(key, value));
    }




    setContext<{
        getQueryValue: (key: any) => string | false;
        replaceQuery: (key: any, value: any) => void;
        pushQuery: (key: any, value: any) => void;
    }>('url', {
        getQueryValue,
        replaceQuery,
        pushQuery,
    });
</script>

<slot />
