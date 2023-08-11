<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import 'iconify-icon';
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
	<div class="flex bg-black">
		<nav
			class="h-screen flex flex-col gap-y-3 justify-between w-24 bg-nav border-r-[1px] border-line active:"
		>
			<div class="flex flex-col items-center my-4 text-center px-3">
				<iconify-icon class="text-5xl text-fuchsia-500 mt-4 mb-8" icon="carbon:logo-npm" />

				<a href="/" class="w-full py-3">
					<iconify-icon
						class="text-2xl text-white hover:text-fuchsia-500 duration-75"
						icon="material-symbols:other-houses"
					/>
				</a>
				<a href="/tutor" class="w-full py-3">
					<iconify-icon
						class="text-3xl text-white hover:text-fuchsia-500 duration-75"
						icon="material-symbols:add"
					/>
				</a>
			</div>
			<div class="flex flex-col justify-self-center my-4 text-center px-3">
				<a href="/logout" class="w-full py-3 pr-2">
					<iconify-icon
						class="text-3xl text-white hover:text-fuchsia-500 duration-75"
						icon="material-symbols:login"
					/>
				</a>
				<img
					src={data.profile[0].avatar_url}
					alt="Profile Picture"
					class="w-12 rounded-2xl border-[2px] border-line hover:border-white duration-75"
				/>
			</div>
		</nav>
		<slot />
	</div>
{:else}
	<a href="/" class="btn btn-primary">Home</a>
	<a href="/login" class="btn btn-primary">Login</a>
	<a href="/signup" class="btn btn-secondary">Sign Up</a>
	<slot />
{/if}
