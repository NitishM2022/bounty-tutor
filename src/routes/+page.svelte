<script lang="ts">
	import { enhance } from "$app/forms";
    import type { PageData } from "./$types";

    export let data
</script>

<main>
    {#if data.session}
        <p>Welcome, {data.session.user.email}</p>
    {/if}
</main>