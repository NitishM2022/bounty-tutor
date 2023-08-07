import type { PageServerLoad, Actions } from "./$types";
import type { Database } from "$lib/db/types";
import { supabase } from "$lib/server/supabase";

export const load: PageServerLoad = async ({ parent }) => {
    const {session} = await parent()


    let { data: classes, error } = await supabase
    .from('classes')
    .select('title, description, id')
    .eq('creator_id',session?.user.id)

    return{
        classes
    }
};

export const actions: Actions = {
    add: async ({ request, locals: {supabase}}) => {
        const formData = await request.formData();
        const title = formData.get('title');
        const description = formData.get('description')

    
        if (typeof title === 'string') {
            const { data: { user } } = await supabase.auth.getUser()

            const { data: classes, error:err } = await supabase
            .from('classes')
            .insert([
              { title: title as string, description: description as string, creator_id: user.id},
            ])
            .select()
        }
    },
    delete: async ({ request, locals: {supabase}}) => {
        const formData = await request.formData();
        const id = formData.get('id');
        console.log(id)
    
            const { error } = await supabase
            .from('countries')
            .delete()
            .eq('id', id)
            console.log(error)

    }
};