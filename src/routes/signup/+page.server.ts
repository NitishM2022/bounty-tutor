import { AuthApiError } from "@supabase/supabase-js";
import type { Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";


export const load: PageLoad = async ({ parent }) => {
    const {session} = await parent()
    if(session){
        console.log("Logged in, redirecting you to home page")
        throw redirect(303, '/')
    }
};

export const actions: Actions = {
    signup:async ({request, locals}) => {
        const formData = await request.formData();
        const firstname = formData.get('firstname')
        const lastname = formData.get('lastname')
        const dob = formData.get('dob')
        // const username = formData.get('username')
        // const avatar_url = formData.get('avatar_url')
        const email = formData.get('email');
        const password = formData.get('password')

        const { data, error: err} = await locals.supabase.auth.signUp({
            email: email as string,
            password: password as string,
            options: {
                emailRedirectTo: `../auth/callback`,
                data: {
                    first_name: firstname,
                    last_name: lastname,
                    date_of_birth: dob,
                },
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