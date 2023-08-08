// src/routes/+layout.ts
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
import type { Database } from '$lib/db/types.js';
import { AuthError } from '@supabase/supabase-js';

export const load = async ({ fetch, data, depends }) => {
	depends('supabase:auth');

	const supabase = createSupabaseLoadClient<Database>({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event: { fetch },
		serverSession: data.session
	});

	const {
		data: { session },
		error
	} = await supabase.auth.getSession();

	let profile = null;

	if (session) {
		const { data: profileData, error: profileErr } = await supabase
			.from('profiles')
			.select('avatar_url, first_name, last_name')
			.eq('id', session.user.id);

		if (!profileErr) {
			profile = profileData;
		}
	}

	const { data: classes, error: classesErr } = await supabase
		.from('classes')
		.select('title, description, profiles!classes_creator_id_fkey (first_name, last_name)');

	console.log(classesErr);
	console.log(classes);

	return {
		supabase,
		session,
		profile,
		classes
	};
};
