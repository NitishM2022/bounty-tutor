<script lang="ts">
	import { enhance } from "$app/forms";
	import { goto } from "$app/navigation";
	import type { SubmitFunction } from "@sveltejs/kit";

	const register: SubmitFunction = ({form, data, action, cancel}) => {
		return async({result, update}) => {
			switch(result.type){
				case 'failure':
					alert("Please correctly fill out all fields")
					break
				case 'success':
					goto('/')
					break
				default:
					await update();
			}
		}
	}
</script>

<main>
	<h1>Sign Up</h1>
	<form action="?/signup" class="auth-form" method="POST" use:enhance={register}>
		<label for=""> First Name </label>
		<input type="text" name="firstname" />

		<label for=""> Last Name </label>
		<input type="text" name="lastname" />

		<label for="dob">Date of Birth:</label>
		<input type="date" id="dob" name="dob" /><br>

		<label for=""> Username </label>
		<input type="text" name="username" /><br>

		<label for=""> Avatar Url </label>
		<input type="text" name="avatar-url" /><br>

		<label for=""> Email </label>
		<input type="text" name="email" /><br>

		<label for=""> Password </label>
		<input type="password" name="password" /><br>

		<button class="btn btn-primary">Register</button>
	</form>
</main>
