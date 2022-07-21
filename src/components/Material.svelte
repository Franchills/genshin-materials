<script lang="ts">
	import MaterialImage from './MaterialImage.svelte'

	export let materialData

	let saveNewValueDebounce = undefined

	function saveNewValue(newValue: number) {
		if (saveNewValueDebounce) {
			clearTimeout(saveNewValueDebounce)
		}
		saveNewValueDebounce = setTimeout(() => {
			saveNewValueDebounce = undefined

			console.log('save new value', newValue)
		}, 2000)
	}
</script>

<material-svelte>
	<material-image>
		<MaterialImage {materialData} />
	</material-image>

	<input
		type="number"
		value="0"
		min="0"
		on:change={evt => {
			//@ts-ignore
			saveNewValue(evt.target.value)
		}}
	/>
</material-svelte>

<style>
	material-svelte {
		width: 80px;
		display: flex;
		flex-direction: column;
	}

	input {
		width: 80px;
		text-align: center;
	}
</style>
