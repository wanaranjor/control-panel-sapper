<script>
	import { isEmpty } from "../../helpers/validations";

	export let customerId;

  let nameProject = '';
  // let typeProject = '';

	const optionsProject = [
			{ type: 'Hours',  },
			{ type: 'Project', }
		];

	let typeProject = optionsProject[0];

	let formIsValid = false;

	$: nameProjectValid = !isEmpty(nameProject);
	// $: typeProjectValid = !isEmpty(typeProject);

	$: formIsValid = nameProjectValid;

  function submitForm() {
		firebase.firestore().collection('customers')
		.doc(customerId)
		.collection('projects')
		.add({
				name: nameProject,
				type: typeProject
				})
		.then(function() {
				console.log("Document successfully written!");
				// TODO: mejorar reset del formulario
				nameProject = '';
  			typeProject = '';
		})
		.catch(function(error) {
				console.error("Error writing document: ", error);
		});
	}
</script>
<div class="flex flex-wrap">
	<div class="w-full py-3">
		<div class="bg-white border rounded p-2">
			<h3 class="pt-3 text-lg text-center font-semibold">Create Projects</h3>
			<form on:submit|preventDefault={submitForm} novalidate class="px-4 pt-3 pb-3 rounded">
				<div class="mb-4">
					<label class="block mb-2 text-sm font-bold text-gray-700" for="nameproject">
						Name
					</label>
					<input
						class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
						id="nameproject"
						type="text"
						bind:value={nameProject}
						placeholder="Name"
						required
					/>
				</div>
				<div class="mb-4">
					<label class="block mb-2 text-sm font-bold text-gray-700" for="typeproject">
					Type
					</label>
					<!-- <input
						class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
						id="typeproject"
						type="text"
						bind:value={typeProject}
						placeholder="Type"
						required
					/> -->
					<select bind:value={typeProject}>
						{#each optionsProject as option}
							<option value={option}>{option.type}</option>
						{/each}
					</select>
				</div>
				<div class="mb-3 text-center">
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
	</div>
</div>