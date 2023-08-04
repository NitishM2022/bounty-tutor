import { AuthApiError } from "@supabase/supabase-js";
import type { Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";


export const load: PageLoad = async ({ locals: {supabase, getSession}}) => {
    const session = await getSession
    if(session){
        throw redirect(303, '/')
    }
};

export const actions: Actions = {
    signup:async ({request, locals}) => {
        const formData = await request.formData();
        const email = formData.get('email');
        const password = formData.get('password')

        const { data, error: err} = await locals.supabase.auth.signUp({
            email: email as string,
            password: password as string,
            options: {
                emailRedirectTo: `../auth/callback`,
            },
        })

        if(err){
            console.log(err)
            if(err instanceof AuthApiError && err.status == 400){
                return fail(400, {
                    error: 'Invalid email or password'
                })
            }
            return fail(500, {
                error: 'Server error. Plase try again later.'
            })
        }

        throw redirect(303, "/")
    }
};