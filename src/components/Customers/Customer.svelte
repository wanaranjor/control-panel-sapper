<script>
  export let customerData;

  function handleDeleteCustumer(customerId) {
    console.log(customerId);

// firebase.firestore()
    //   .collection('customers')
    //   .doc(customerId)
    //   .get()
    //   .then((snapshot) => console.log(snapshot.size));

    // let query = firebase.firestore().collection('customers');

    // query.get().then(querySnapshot => {
    //   if (querySnapshot.docs.length) {
    //     console.log('No documents found.', querySnapshot.docs.length);
    //   }
    // });



  firebase.firestore().collection("customers")
    .doc(customerId)
    .delete().then(() => {
      console.log("Document successfully deleted:", customerId);
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }
</script>

<div class="w-full md:w-1/2 xl:w-1/3 p-3">
  <div class="bg-white border rounded p-2">
    <div class="flex flex-row items-center">
      <div class="flex-shrink pr-4">
        <div class="p-3 text-orange-600"><i class="far fa-address-card fa-3x fa-fw"></i></div>
      </div>
      <div class="flex-1 text-right md:text-center">
        <h3 class="font-bold uppercase text-orange-600">{customerData.data().name}</h3>
        <h5 class="font-bold">{customerData.data().nit}</h5>
        <h6 class="uppercase text-gray-500">{customerData.data().address}</h6>
      </div>
      <div class="flex flex-col text-right md:text-right">
        <a rel='prefetch' href='customers/{customerData.id}'><i class="fas fa-sun text-orange-600 pr-3"></i></a>
      </div>
    </div>
  </div>
</div>