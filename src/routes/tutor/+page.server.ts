import type { PageServerLoad, Actions } from './$types';
import type { Database } from '$lib/db/types';

export const load: PageServerLoad = async ({ parent, locals: { supabase } }) => {
	const { session } = await parent();

	let { data: classes, error } = await supabase
		.from('classes')
		.select('id, title, description, current_students, max_students')
		.eq('creator_id', session?.user.id)
		.order('id', { ascending: true });

	return {
		classes
	};
};

export const actions: Actions = {
	add: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const title = formData.get('title');
		const description = formData.get('description');

		if (typeof title === 'string') {
			const {
				data: { user }
			} = await supabase.auth.getUser();

			const { data: classes, error } = await supabase
				.from('classes')
				.insert([
					{ title: title as string, description: description as string, creator_id: user?.id }
				])
				.select();
		}
	},
	edit: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		const title = formData.get('title');
		const description = formData.get('description');

		const { error } = await supabase
			.from('classes')
			.update({ title: title as string, description: description as string })
			.eq('id', id);
	},
	delete: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const id = formData.get('id');

		const { error } = await supabase.from('classes').delete().eq('id', id);
		console.log(error);
	}
};
