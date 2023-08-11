<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import '../app.css';

	export let data;
</script>

<div class="w-full">
	<div class="flex mx-4 mt-4 p-4">
		<iconify-icon
			class=" text-third text-2xl bg-prim rounded-l-xl pt-3 px-4 border-t-[1px] border-line"
			icon="material-symbols:search"
		/>
		<input
			class="flex-grow font-medium text-white mr-4 rounded-r-xl bg-prim py-3 border-t-[1px] border-r-[1px] border-line"
			type="text"
			name="email"
		/>
		<select
			class="font-medium rounded-xl p-2 pr-32 bg-prim text-white border-t-[1px] border-r-[1px] border-line"
			name="Sort"
			id="cars"
		>
			<option selected="volvo">Sort</option>
			<option value="saab">Saab</option>
			<option value="mercedes">Mercedes</option>
			<option value="audi">Audi</option>
		</select>
	</div>
	<div
		class="flex flex-row mt-3 m-8 bg-prim rounded-[1rem] border-t-[1px] border-r-[1px] border-line"
	>
		<h2 class="text-2xl text-white ml-6 mt-4 mb-6">Classes</h2>
		{#if data.classes && data.classes[0]}
			<div class="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 w-full ml-20 gap-4 p-4">
				{#each data.classes as { title, description, id, profiles: { first_name, last_name } }}
					<div
						class="flex flex-col justify-between bg-second rounded-lg border-t-[1px] border-r-[1px] border-line"
					>
						<div class="p-4">
							<p class="text-lg text-white font-semibold">{title}</p>
							<p class="text-sm text-third mb-2">By {first_name} {last_name}</p>
							<p class=" h-full truncate text-third font-light">{description}</p>
						</div>
						<div class="p-2">
							{#if data.session}
								<form action="?/join" method="POST" use:enhance>
									<button
										class="text-white font-semibold w-full rounded-lg bg-black hover:bg-neutral-900 duration-75 py-2"
										>Explore</button
									>
									<input type="hidden" name="class_id" value={id} />
									<input type="hidden" name="person_id" value={data.session.user.id} />
								</form>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
