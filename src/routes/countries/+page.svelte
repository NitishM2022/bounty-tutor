<script>
  import { enhance } from '$app/forms';
  export let data
</script>

<main>
  <h1>Countries</h1>
  <form method="POST" action="?/add" use:enhance>
    <label>
      Add a Country
      <input type="text"
      autocomplete="off"
      name="country"
      />
    </label>
  </form>
    
  {#if data.countries != null}
    {#if data.countries.length > 0}
      <h2>Country List</h2>
        {#each data.countries as {id, full_name}, index}
          <form method="POST" action="?/delete" use:enhance>
            <input type="hidden" name="id" value="{id}"/>
            <span>{index + 1}. {full_name}</span>
            <button>Delete</button>
          </form>
        {/each}
    {:else}
      <p>No countries added yet.</p>
    {/if}
  {/if}
</main>