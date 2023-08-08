import type { Database } from '$lib/db/types.js';

export const load: PageLoad = async ({ parent, data, locals: { supabase } }) => {
	const { session } = await parent();

	const { data: classes, error: classesErr } = await supabase
		.from('classes')
		.select('title, description, id, profiles!classes_creator_id_fkey (first_name, last_name)')
		.order('id', { ascending: true });

	return {
		session,
		classes
	};
};

export const actions: Actions = {
	join: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const class_id = formData.get('class_id');
		const person_id = formData.get('person_id');

		const { data: classes, error } = await supabase
			.from('participants')
			.insert([{ class_id: class_id as string, person_id: person_id as string }])
			.select();
	}
};
