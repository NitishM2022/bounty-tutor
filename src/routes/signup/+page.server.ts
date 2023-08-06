import { AuthApiError } from "@supabase/supabase-js";
import type { Actions, PageServerLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { supabase } from "$lib/server/supabase";

export const load: PageServerLoad = async ({ parent }) => {
    const {session} = await parent()
    if(session){
        console.log("Logged in, redirecting you to home page")
        throw redirect(303, '/')
    }
};

export const actions: Actions = {
    signup:async ({request, locals}) => {
        const formData = await request.formData();

        const email = formData.get('email')
        const password = formData.get('password')
        const firstname = formData.get('firstname')
        const lastname = formData.get('lastname')

        const dateInputValue = formData.get('dob'); // '1999-01-01'
        const [year, month, day] = dateInputValue.split('-');
        console.log(year)
        console.log(month)
        console.log(day)

        const dob = new Date(
            parseInt(year, 10),
            parseInt(month, 10) - 1,
            parseInt(day, 10)
        );
        const username = formData.get('username')
        const avatar_url = formData.get('avatar-url')
        
        
        const { data, error: err} = await supabase.auth.signUp({
            email: email as string,
            password: password as string,
            options: {
                data: {
                    emailRedirectTo: `../auth/callback`,
                    first_name: firstname as string,
                    last_name: lastname as string,
                    username: username as string,
                    avatar_url: avatar_url as string,
                    date_of_birth: dob 
                },
            },
        })

        console.log("NOT INVISIBLE ERROR")
        console.log(err)
        console.log("ERROR ENDED")
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