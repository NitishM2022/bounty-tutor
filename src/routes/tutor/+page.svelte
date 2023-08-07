<script lang="ts">
    import { enhance } from "$app/forms";
    export let data

</script>
  
<main>
    <h1>Tutor Dashboard</h1>
    

	<form action="?/add" method="POST" use:enhance>
		<label for=""> Title </label>
		<input type="text" name="title" /><br>

		<label for=""> Description </label>
		<input type="text" name="description" /><br>

		<button class="btn btn-primary">Create</button>
	</form>
 
  
    <!-- List of Classes --> 
    <p>Classes</p>

    <ul>
    {#if data.classes}
        {#each data.classes as {title, description, id}}
            <form action="?/delete" method="POST" use:enhance>
                <h2>{title}</h2>
                <p>{description}</p>
                <input type="hidden" name="id" value="{id}"/>
                <button>Delete</button>
            </form>
        {/each}
      {/if}
    </ul>
</main>
  