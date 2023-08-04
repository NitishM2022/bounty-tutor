import { AuthApiError } from "@supabase/supabase-js";
import { fail, type Actions, redirect } from "@sveltejs/kit";

export const actions: Actions = {
    login: async({request, locals, url}) => {
        const formData = await request.formData();
        const email = formData.get('email');
        const password = formData.get('password')
        const redirectTo = formData.get('redirect')

        const { data, error: err} = await locals.supabase.auth.signInWithPassword({
            email: email as string,
            password: password as string,
        })

        if(err){
            console.log(err)
            if(err instanceof AuthApiError && err.status == 400){
                return fail(400, {
                    error: 'Invalid credentials'
                })
            }
            return fail(500, {
                error: 'Server error. Plase try again later.'
            })
        }		

        // console.log(url.pathname)
        // if (url.searchParams.has('redirectTo')) {
        //     console.log(url.pathname)
		// 	throw redirect(303, url.searchParams.get('redirectTo'));
		// }

        //prevent phishing
        if(redirectTo){
            throw redirect(302, `/${redirectTo.slice(1)}`)
        }
        throw redirect(303, '/')
        return{ success: true }
    }
};