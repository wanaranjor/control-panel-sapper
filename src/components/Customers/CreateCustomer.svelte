<script>
	import { isEmpty } from "../../helpers/validations";

  let name = '';
  let address = '';
	let nit = '';

	let formIsValid = false;

	$: nameValid = !isEmpty(name);
	$: addressValid = !isEmpty(address);
	$: nitValid = !isEmpty(nit);

	$: formIsValid = nameValid && addressValid && nitValid;

  function submitForm() {

		firebase.firestore().collection("customers").add({
				name: name,
				address: address,
				nit: nit
		})
		.then(function() {
				console.log("Document successfully written!");
				// TODO: mejorar reset del formulario
				name = '';
  			address = '';
				nit = '';
		})
		.catch(function(error) {
				console.error("Error writing document: ", error);
		});
	}
</script>

<div class="bg-white border rounded p-2">
<h3 class="pt-4 text-2xl text-center">Create Customer</h3>
<form on:submit|preventDefault={submitForm} novalidate class="px-8 pt-6 pb-8 mb-4 bg-white rounded">
	<div class="mb-4">
		<label class="block mb-2 text-sm font-bold text-gray-700" for="customername">
			Name
		</label>
		<input
			class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
			id="name"
			type="text"
			bind:value={name}
			placeholder="Name"
			required
		/>
	</div>
	<div class="mb-4">
		<label class="block mb-2 text-sm font-bold text-gray-700" for="address">
			Address
		</label>
		<input
			class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
			id="address"
			type="text"
			bind:value={address}
			placeholder="Address"
			required
		/>

	</div>
	<div class="mb-4">
		<label class="block mb-2 text-sm font-bold text-gray-700" for="nit">
			Nit
		</label>
		<input
			class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
			id="nit"
			type="text"
			bind:value={nit}
			placeholder="Nit"
			required
		/>
	</div>
	<div class="mb-6 text-center">
		<button
			class={formIsValid
				? 'w-full px-4 py-2 font-bold text-white bg-orange-600 rounded hover:bg-orange-700 focus:outline-none focus:shadow-outline'
				: 'w-full px-4 py-2 font-bold text-white bg-orange-600 rounded opacity-50 cursor-not-allowed'
				}
			type="submit"
		>
		Save
		</button>
	</div>
</form>
</div>