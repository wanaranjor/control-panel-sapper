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

<div class="grid grid-cols-3 gap-4">
  <div>
    <div class="hidden md:block">
        <a href="/login" class="inline-block py-1 md:py-4 text-gray-500 hover:text-gray-100 mr-6">Login</a>
        <!-- <a href="/login" class="inline-block py-2 px-4 text-gray-700 bg-white hover:bg-gray-100 rounded-lg">Sign Up</a > -->
    </div>
  </div>
  <!-- ... -->
  <div>9</div>
</div>
{/if}