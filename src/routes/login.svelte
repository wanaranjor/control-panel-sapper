<script>
  import { goto } from '@sapper/app';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { isEmpty, isValidEmail } from "../helpers/validations.js";
  import { getImgUnsplash } from '../helpers/unsplash.js';
  import UserObserver from '../components/UserObserver.svelte';
	import Spinner from '../components/UI/Spinner.svelte';
	import { currentUser } from '../stores/user.js';

	let unsplashPhoto = '';
	let imageForm = '';
	let isLoading;

	onMount(async () => {
		if($currentUser) {
			goto('/customers')
		} else {
			unsplashPhoto = await getImgUnsplash();
			imageForm = unsplashPhoto.urls.custom;
			isLoading = true;
		}
	});

  let email = '';
  let password = '';
	let formIsValid = false;
	let firebaseUser = '';


  $: emailValid = isValidEmail(email);
	$: passwordValid = !isEmpty(password);
  $: formIsValid = emailValid && passwordValid;

  function submitForm() {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function(){
        goto('/customers');
      })
      .catch(function(error) {
				console.log(error.code, error.message);
				email = '';
				password = '';
      });
	}
</script>

<svelte:head>
	<title>WANR - Login</title>
</svelte:head>

{#if !$currentUser}
	<div class="h-screen w-screen">
	<div class="container mx-auto h-full flex justify-center items-center">
		<div class="w-full xl:w-3/4 lg:w-11/12 flex shadow-2xl">
			<div class="bg-gray-400 hidden lg:block lg:w-1/2 bg-cover">
				{#if !isLoading}
					<Spinner />
				{:else}
					<img class="w-full h-full" src="{imageForm}" alt="imageForm" />
				{/if}
			</div>
			<!-- Col -->
			<div class="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
				<h3 class="pt-4 text-2xl text-center">Bienvenido de nuevo!</h3>
				<form on:submit|preventDefault={submitForm} novalidate class="px-8 pt-6 pb-8 mb-4 bg-white rounded">
					<div class="mb-4">
						<label class="block mb-2 text-sm font-bold text-gray-700" for="username">
							Usuario
						</label>
						<input
							class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
							id="username"
							type="email"
							bind:value={email}
							placeholder="Usuario"
							required
						/>
					</div>
					<div class="mb-4">
						<label class="block mb-2 text-sm font-bold text-gray-700" for="password">
							Contraseña
						</label>
						<input
							class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
							id="password"
							type="password"
							bind:value={password}
							placeholder="******************"
							required
						/>
						<p class="text-xs italic text-orange-600">Por favor ingrese una contraseña.</p>
					</div>
					<div class="mb-6 text-center">
						<button
							class={formIsValid
								? 'w-full px-4 py-2 font-bold text-white bg-orange-600 rounded hover:bg-orange-700 focus:outline-none focus:shadow-outline'
								: 'w-full px-4 py-2 font-bold text-white bg-orange-600 rounded opacity-50 cursor-not-allowed'
								}
							type="submit"
						>
							Ingresar
						</button>
					</div>
					<hr class="mb-6 border-t" />
					<div class="text-center">
						<a
							class="inline-block text-sm text-orange-600 align-baseline hover:text-orange-700"
							href="./register.html"
						>
							Create an Account!
						</a>
					</div>
					<div class="text-center">
						<a
							class="inline-block text-sm text-orange-600 align-baseline hover:text-orange-700"
							href="./forgot-password.html"
						>
							Forgot Password?
						</a>
					</div>
				</form>
			</div>
		</div>
	</div>
	</div>
{/if}