<script lang="ts">
	import { enhance } from "$app/forms";
    import type { PageData } from "./$types";

    export let data
</script>

<main>
    {#if data.session}
        <p>Welcome, {data.session.user.email}</p>
        <form action="/logout" method="GET">
            <button type="submit" class="btn-primary">Logout</button>
        </form>
        <a href="/countries" class="btn btn-secondary">Countries</a>
    {:else}
	<div class="auth-buttons">
		<a href="/login" class="btn btn-primary">Login</a>
		<a href="/signup" class="btn btn-secondary">Sign Up</a>
	</div>
    {/if}
</main>