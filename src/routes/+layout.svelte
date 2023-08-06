<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import { invalidate } from '$app/navigation';
  import { onMount } from 'svelte';
  import type { LayoutData } from './$types';

  export let data: LayoutData;

  $: ({ supabase, session } = data)

  onMount(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, _session) => {
      if (_session?.expires_at !== session?.expires_at) {
        invalidate('supabase:auth');
      }
    });

    return () => subscription.unsubscribe();
  });
</script>

<nav>
  <a href="/" class="btn btn-primary">Home</a> 
  {#if data.session}
    <a href="/countries" class="btn btn-secondary">Countries</a>
    <a href="/logout">Logout</a>
  {:else}
    <a href="/login" class="btn btn-primary">Login</a>
    <a href="/signup" class="btn btn-secondary">Sign Up</a>
  {/if}
</nav>

<slot/>