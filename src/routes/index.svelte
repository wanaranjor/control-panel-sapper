<script>
	import { onMount } from 'svelte';
  import { currentUser } from '../stores/user.js';
  import { goto } from '@sapper/app';

  onMount(() => {
    if($currentUser) {goto('/customers')};
  });
</script>

<svelte:head>
	<title>WANR - Home</title>
</svelte:head>

{#if !$currentUser}
  <div class="px-8 py-12 max-w-md mx-auto sm:max-w-xl">
    <img class="h-32" src="https://picsum.photos/400/100" alt="2020">
    <img class="mt-6 rounded-lg shadow-xl sm:mt-8 sm:h-64 sm:w-full sm:object-cover sm:object-center" src="https://picsum.photos/1600/300" alt="tools">
    <h1 class="mt-6 text-2xl font-bold text-gray-900 leading-tight sm:mt-8 sm:text-4xl ">Quiero ir a la playa a 
      <span class="text-orange-700">el mar azul.</span>
    </h1>
    <p class="mt-2 text-gray-700 sm:mt-4 sm:text-xl">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae velit nostrum totam aperiam dicta, adipisci, obcaecati provident consequatur nesciunt harum ipsum assumenda, pariatur quidem vitae libero modi tempora. At, inventore.
    </p>
    <div class="mt-4 sm:mt-6">
      <a href="/login" class="inline-block px-5 py-3 rounded-lg shadow-lg bg-orange-600 text-sm text-white uppercase tracking-wider font-semibold sm:text-base"> Contacteme</a>
    </div>
  </div>
{/if}