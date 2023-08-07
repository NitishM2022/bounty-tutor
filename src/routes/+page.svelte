<script lang="ts">
	import { enhance } from "$app/forms";
    import type { PageData } from "./$types";

    export let data
</script>

<main>
    {#if data.session}
        {#each data.profile as {avatar_url, first_name, last_name}}
            <p>{first_name} {last_name}</p>
            <img src={avatar_url} alt="Profile Image" width="200" height="200">
        {/each}
    {/if}
</main>