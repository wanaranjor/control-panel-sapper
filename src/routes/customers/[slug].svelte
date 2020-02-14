<script context="module">
  export function	preload({ params }) {
      const { slug } = params;
      const query = firebase.firestore().collection("customers").doc(slug);
      return query.get().then( doc => {
        if (doc.exists) {
          const customerData = doc.data();
          const customerId = doc.id;
          return { customerId, customerData };
            } else {
              // doc.data() will be undefined in this case
            console.log("No such document!");
            }
          }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }
</script>

<script>
  import { onMount } from 'svelte';
  import { currentCustomerId } from '../../stores/customer.js'
  import CreateProjects from "../../components/Customers/CreateProjects.svelte";
  import CustomerProjects from "../../components/Customers/CustomerProjects.svelte";
  import ProjectDedications from "../../components/Customers/ProjectDedications.svelte";
  import CreateDedication from '../../components/Customers/CreateDedication.svelte';

  export let customerData;
  export let customerId;

  onMount(()=>{
    currentCustomerId.set(customerId);
    console.log($currentCustomerId);
  })
</script>

<svelte:head>
	<title>{customerData.name}</title>
</svelte:head>

<div class="flex mx-auto pt-20 w-full">
  <div class="w-full md:w-1/4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">
    <div class="flex-col justify-between items-center">
      <div class="flex flex-wrap">
          <div class="w-full py-3">
            <div class="bg-white border rounded p-2">
              <div class="flex flex-col items-center">
                <div class="flex-shrink">
                  <div class="p-3 text-orange-600"><i class="far fa-address-card fa-2x fa-fw"></i></div>
                </div>
                <div class="flex-1 text-right md:text-center">
                  <h3 class="font-bold uppercase text-orange-600">{customerData.name}</h3>
                  <h5 class="font-bold">{customerData.nit}</h5>
                  <h6 class="uppercase text-gray-500">{customerData.address}</h6>
                </div>
              </div>
            </div>
          </div>
      </div>
      <CustomerProjects {customerId}/>
      <CreateProjects {customerId}/>
    </div>
  </div>
  <div class="w-full md:w-2/4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">
    <svelte:component this={ProjectDedications} />
  </div>
  <div class="w-full md:w-1/4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">
  <CreateDedication />
  </div>
</div>