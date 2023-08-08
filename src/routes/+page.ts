export const load = async ({ data }) => {
	return {
		session: data.session,
		classes: data.classes
	};
};
