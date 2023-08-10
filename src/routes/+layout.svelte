<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import '../app.css';

	export let data: LayoutData;

	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				console.log('auth state changed');
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

{#if data.session}
	<div class="flex">
		<div class="h-screen flex flex-col justify-between w-1/12 bg-gray-200">
			<div class="flex flex-col items-center p-2 text-center">
				<a href="/" class="w-full py-3 text-gray-900 rounded-lg hover:bg-gray-100"> Home </a>
				<a href="/tutor" class="w-full py-3 text-gray-900 rounded-lg hover:bg-gray-100"> Create </a>
				<a href="/logout" class="w-full py-3 text-gray-900 rounded-lg hover:bg-gray-100">
					Log Out
				</a>
			</div>
			<img
				src={data.profile[0].avatar_url}
				alt="Profile Picture"
				class="mx-auto w-16 rounded-full hover:w-20 duration-75"
			/>
		</div>
		<slot />
	</div>
{:else}
	<a href="/" class="btn btn-primary">Home</a>
	<a href="/login" class="btn btn-primary">Login</a>
	<a href="/signup" class="btn btn-secondary">Sign Up</a>
	<slot />
{/if}
