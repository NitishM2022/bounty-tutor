<script lang="ts">
	import { enhance } from '$app/forms';
	export let data;

	export let editingId: string | null = null;

	function startEdit(id) {
		editingId = id;
	}

	function cancelEdit(id) {
		editingId = null;
	}

	async function handleSave() {
		editingId = null;
	}

	console.log(data.classes);
</script>

<main>
	<h1>Tutor Dashboard</h1>

	<form action="?/add" method="POST" use:enhance>
		<label for=""> Title </label> <br />
		<input type="text" name="title" /><br />

		<label for=""> Description </label><br />
		<textarea type="text" name="description" /><br />

		<label for=""> Max Students </label><br />
		<input type="number" name="max_students" /><br />

		<button class="btn btn-primary">Create</button>
	</form>

	<!-- List of Classes -->

	{#if data.classes && data.classes[0]}
		<h2>Classes</h2>
		<div class="class-container">
			{#each data.classes as { id, title, description, current_students, max_students }}
				<div class="class-box">
					{#if editingId === id}
						<!-- Edit mode -->
						<form action="?/edit" method="POST" use:enhance on:submit={handleSave}>
							<input type="hidden" name="id" value={id} />
							<input type="text" name="title" value={title} /><br />

							<textarea name="description">{description}</textarea>
							<div class="edit-buttons">
								<button type="submit">Save</button>
								<button type="button" on:click={() => cancelEdit(id)}>Cancel</button>
							</div>
						</form>
					{:else}
						<!-- Display mode -->
						<h3>{title}</h3>
						<p>{current_students}/{max_students} Students</p>
						<p>{description}</p>
						<div class="edit-buttons">
							<button on:click={() => startEdit(id)}>Edit</button>
							<form action="?/delete" method="POST" use:enhance>
								<button>Delete</button>
								<input type="hidden" name="id" value={id} />
							</form>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</main>
