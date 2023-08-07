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
      {#if data.profile}
        <div style="float: right; display: flex; align-items: center;">
          <p style="margin-right: 10px;">{data.profile[0].first_name} {data.profile[0].last_name}</p>
          <img src={data.profile[0].avatar_url} alt="Profile Image" style="width: 50px; height: 50px; border-radius: 50%;">
        </div>
      {/if}
  {:else}
    <a href="/login" class="btn btn-primary">Login</a>
    <a href="/signup" class="btn btn-secondary">Sign Up</a>
  {/if}
</nav>

<slot/>