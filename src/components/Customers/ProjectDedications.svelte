<script>
  import { beforeUpdate } from 'svelte';
  import { onDestroy } from 'svelte';
  import moment from 'moment';
  import { currentCustomerId } from '../../stores/customer';
  import { currentProjectId } from '../../stores/project';
  import CreateDedication from '../Customers/CreateDedication.svelte';

  let dedicationsData = '';
  let observerDedications;
  let currentProjectDedications;
  let showModal = false;

  $:currentProjectIdDedications = $currentProjectId;

  beforeUpdate(async () => {
    // console.log('the component just updated: ProjectDedications');
    // console.log(currentProjectIdDedications);
    // TODO: cargar tabla de dedicaciones.
    if(currentProjectIdDedications != null){
      const query = await firebase.firestore()
      .collection('customers')
      .doc($currentCustomerId)
      .collection('projects')
      .doc(currentProjectIdDedications)
      .collection('dedications').orderBy("date", "desc");

    return observerDedications = query.onSnapshot(querySnapshot =>{
      dedicationsData = querySnapshot.docs;
      return (dedicationsData);
      }, err => {
        console.log(`Encountered error observerDedications: ${err}`);
      });
    }
  });

  onDestroy(() => {
    console.log('set null: currentProjectId');
    currentProjectId.set(null);
    if(currentProjectIdDedications != null){
    console.log('the component is being destroyed: ProjectDedications');
    observerDedications();
    }
  });

  function convertDate(fecha){
      // let date = moment(dateDedication).format('DD/MM/YYYY, h:mm:ss a');
      // console.log(date, '-', dateDedication);
   
      
      console.log(fecha);
      return;
    }
</script>
<style>
/* TODO: verificar por que no aplica pre-wrap desde tailwindcss */
  .whitespace-pre-wrap {
    white-space: pre-wrap;
  }
</style>

<div class="flex flex-wrap">
  <div class="w-full">
    <div class="sm:-mx-8 px-4 sm:px-8 py-3 overflow-x-auto">
      <div class="inline-block w-full rounded overflow-hidden border">
        <table class="w-full leading-normal">
          <thead>
            <tr>
              <th class="px-5 py-3 border-gray-100 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date
              </th>
              <th class="px-5 py-3 border-gray-100 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Time
              </th>
              <th class="px-5 py-3 border-gray-100 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Hours
              </th>
              <th class="px-5 py-3 border-gray-100 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Activity
              </th>
              <th class="px-5 py-3 border-gray-100 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Comments
              </th>
            </tr>
          </thead>
          <tbody>
            {#each dedicationsData as dedication}
              <tr>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {moment.unix(dedication.data().date.seconds).format('DD/MM/YYYY')}
                  </p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {moment.unix(dedication.data().date.seconds).format('hh:mm a')}
                  </p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {dedication.data().hours}
                  </p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-gray-900 whitespace-pre-wrap">
                    {dedication.data().activity}
                  </p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-gray-900 whitespace-pre-wrap">
                    {dedication.data().comments}
                  </p>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>