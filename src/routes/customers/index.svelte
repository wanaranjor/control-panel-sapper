<script>
  import { currentUser } from '../../stores/user.js';
  import { onMount } from 'svelte';
  import { onDestroy } from 'svelte';
  import CreateCustomer from '../../components/Customers/CreateCustomer.svelte';
  import Customer from "../../components/Customers/Customer.svelte";
  import { currentCustomerId }from '../../stores/customer.js'

  let customersData = [];
  let observerCustomers;

  onMount( async () => {
    const query = await firebase.firestore().collection("customers").orderBy("name", "asc");
    return observerCustomers = query.onSnapshot(querySnapshot =>{
      customersData = querySnapshot.docs;
      return (customersData);
    }, err => {
      console.log(`Encountered error observerCustomers: ${err}`);
    });
  });

  onDestroy(() => {
    console.log('set null: currentProjectId');
    currentCustomerId.set(null);
    console.log('the component is being destroyed: observerCustomers');
    observerCustomers();
  });
</script>

<svelte:head>
	<title>WANR - Home</title>
</svelte:head>

<div class="container flex mx-auto pt-20 w-full">
  <div class="w-full md:w-1/4 px-4 py-3 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">
    <CreateCustomer />
  </div>
  <div class="w-full md:w-3/4 px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">
    <div class="flex flex-wrap">
      {#each customersData as customerData}
        <Customer {customerData} />
      {/each}
    </div>
  </div>
</div>