<script>
	import { goto } from '@sapper/app';
	import Login from './login.svelte';
	import Navbar from '../components/UI/Navbar.svelte';
	import Footer from '../components/UI/Footer.svelte';
	import UserObserver from '../components/UserObserver.svelte';
	import { currentUser } from '../stores/user.js';

</script>

<UserObserver />

{#if $currentUser}
<Navbar />
{/if}

<main class="flex-grow mx-auto w-full bg-gray-100">
	<slot></slot>
</main>

{#if $currentUser}
	<Footer />
{/if}