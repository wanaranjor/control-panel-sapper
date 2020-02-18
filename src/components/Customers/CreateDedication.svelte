<script>
	import { fade } from 'svelte/transition';
	import { isEmpty } from "../../helpers/validations";
	import { isNotZero } from "../../helpers/validations";
	import { currentCustomerId } from '../../stores/customer'
	import { currentProjectId } from '../../stores/project'

  let dateDedication = '';
	let hoursDedication = 0;
	let activityDedication = '';
	let comentsDedication = '';

	$: dateDedicationValid = !isEmpty(dateDedication);
	$: hoursDedicationValid = isNotZero(hoursDedication);
	$: activityDedicationValid = !isEmpty(activityDedication);
	$: commentsDedicationValid = !isEmpty(comentsDedication);

	$: formIsValid = dateDedicationValid && hoursDedicationValid && activityDedicationValid && commentsDedicationValid;

  function submitForm() {
		let date = new Date(dateDedication);
		firebase.firestore().collection('customers')
		.doc($currentCustomerId)
		.collection('projects')
		.doc($currentProjectId)
		.collection('dedications')
		.add({
				date: date,
				hours: hoursDedication,
				activity: activityDedication,
				comments: comentsDedication
				})
		.then(function() {
				console.log("Document successfully written!");
				// TODO: mejorar reset del formulario
				dateDedication = '';
				hoursDedication = 0;
				activityDedication = '';
				comentsDedication = '';
		})
		.catch(function(error) {
				console.error("Error writing document: ", error);
		});
	}
</script>

{#if $currentProjectId && $currentProjectId}
<div class="flex flex-wrap" transition:fade>
	<div class="w-full py-3">
		<div class="bg-white border rounded p-2">
			<h3 class="pt-3 text-lg text-center font-semibold">Create Dedications</h3>
			<form on:submit|preventDefault={submitForm} novalidate class="px-4 pt-3 pb-3 rounded">
				<div class="mb-4">
					<label class="block mb-2 text-sm font-bold text-gray-700" for="date">
						Fecha
					</label>
					<input
						class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
						id="nameproject"
						type="date"
						bind:value={dateDedication}
						placeholder="Date"
						required
					/>
				</div>
				<div class="mb-4">
					<label class="block mb-2 text-sm font-bold text-gray-700" for="hours">
					Hours
					</label>
					<input
						class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
						id="hours"
						type="number"
						min="0"
						bind:value={hoursDedication}
						placeholder="Hours"
						required
					/>
				</div>
				<div class="mb-4">
					<label class="block mb-2 text-sm font-bold text-gray-700" for="activity">
					Activity
					</label>
					<textarea
						class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
						id="activity"
						bind:value={activityDedication}
						placeholder="Activity"
						required
					/>
				</div>
				<div class="mb-4">
					<label class="block mb-2 text-sm font-bold text-gray-700" for="comments">
					Comments
					</label>
					<textarea
						class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
						id="comments"
						bind:value={comentsDedication}
						placeholder="Comments"
						required
					/>
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
{/if}