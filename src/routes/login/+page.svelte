<script lang="ts">
	import { enhance } from "$app/forms";
	import { page, updated } from "$app/stores";
	import { redirect } from "@sveltejs/kit";
	import type { SubmitFunction } from "./$types";
	import { goto } from "$app/navigation";


	export let redirectTo = $page.url.searchParams.get('redirectTo');
</script>

<main>
	<h1>Login</h1>
	<form action="?/login" method="POST" class="auth-form" use:enhance>
		<label for=""> Email </label>
		<input type="text" name="email" />
		<label for=""> Password </label>
		<input type="password" name="password" />
		<input type="hidden" name="redirect" value={redirectTo} />
		<button class="btn btn-primary">Login</button>
	</form>
</main>