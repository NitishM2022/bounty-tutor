import type { PageServerLoad, Actions } from "./$types";
import type { Database } from "$lib/db/types";
import { supabase } from "$lib/server/supabase";

export const load: PageServerLoad = async () => {
    let { data: countries, error } = await supabase
    .from('countries')
    .select('id, full_name')

    return{
        countries
    }
};

export const actions: Actions = {
    add: async ({ request }) => {
        const formData = await request.formData();
        const country = formData.get('country');
    
        if (typeof country === 'string') {
            const { data, error } = await supabase
            .from('countries')
            .insert([
              { full_name: country },
            ])
            .select()
        }
    },
    delete: async ({ request }) => {
        const formData = await request.formData();
        const countryId = formData.get('id');

        const { error } = await supabase
        .from('countries')
        .delete()
        .eq( 'id', countryId)
    },
};