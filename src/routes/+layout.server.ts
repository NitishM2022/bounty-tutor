// src/routes/+layout.server.ts
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { getSession, supabase } }) => {
	const session = await getSession();

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

	return {
		session,
		profile
	};
};
