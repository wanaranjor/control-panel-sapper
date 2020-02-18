<script>
  import { onMount } from 'svelte';
  import { onDestroy } from 'svelte';
  import { currentProjectId } from '../../stores/project'
  // import Project from '../Customers/Projects.svelte';

  export let customerId;

  let customerProjects = '';
  let observerCustomersProjects;

  function handleGetDedications(projectId) {
    currentProjectId.set(projectId);
    console.log(customerId, projectId);
  }

  onMount(async () => {
    observerCustomersProjects = await firebase.firestore()
      .collection('customers')
      .doc(customerId)
      .collection('projects').orderBy("name", "asc").onSnapshot(snapData =>{
            customerProjects = snapData.docs;
          })
  });

  onDestroy(() => {
    console.log('the component is being destroyed: observerCustomersProjects');
    observerCustomersProjects();
	});
</script>
<div class="w-full py3">
  <div class="bg-white border rounded w-full">
    <p class="bg-gray-100 px-4 py-1 text-lg font-semibold">Projects</p>
    <ul class="cursor-pointer py-3 text-gray-800 leading-normal">
      {#each customerProjects as project}
        <li class="px-3 hover:bg-blue-500 ">
        <!-- TODO: boton que actualiza el estado del project.id. Pendiente definir color fondo Hover -->
          <button on:click="{() =>{handleGetDedications(project.id)}}" class="bg-transparent text-blue-700 font-semibold hover:text-white py-2 px-4 hover:border-transparent">
            {project.data().name}
          </button>
        </li>
      {/each}
    </ul>
  </div>
</div>