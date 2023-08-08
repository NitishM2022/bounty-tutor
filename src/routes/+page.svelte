<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	export let data;
</script>

<main>
	{#if data.classes && data.classes[0]}
		<h2>Classes</h2>
		{#each data.classes as { title, description, id, profiles: { first_name, last_name } }}
			<h3>{title}</h3>
			<p>By {first_name} {last_name}</p>
			<p>{description}</p>
			{#if data.session}
				<form action="?/join" method="POST" use:enhance>
					<button class="btn btn-primary">Join</button>
					<input type="hidden" name="class_id" value={id} />
					<input type="hidden" name="person_id" value={data.session.user.id} />
				</form>
			{/if}
		{/each}
	{/if}
</main>
