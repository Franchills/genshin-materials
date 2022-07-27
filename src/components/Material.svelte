<script lang="ts">
	import ArrowDown from '../icons/ArrowDown.svelte'
	import ArrowUp from '../icons/ArrowUp.svelte'
	import { saveDataToLs } from '../services/materialStorage.service'
	import MaterialImage from './MaterialImage.svelte'

	export let materialData

	function saveAmount(newAmount: number) {
		saveDataToLs(materialData, newAmount)
	}

	function showManualInput() {
		let result = prompt('Enter amount:', materialData.amount)

		if (result !== null) {
			let value = Number(result)
			if (!isNaN(value)) {
				saveAmount(value)
				materialData.amount = value
			}
		}
	}

	function shiftValue(shift: 'up' | 'down') {
		if (shift === 'up') {
			materialData.amount = materialData.amount + 1
		} else if (shift === 'down' && materialData.amount - 1 >= 0) {
			materialData.amount = materialData.amount - 1
		}

		saveAmount(materialData.amount)
	}
</script>

<material-svelte>
	<material-image on:dblclick={() => showManualInput()}>
		<MaterialImage {materialData} />
	</material-image>
	<material-amount>{materialData.amount}</material-amount>
	<controls>
		<shift-value on:click={() => shiftValue('down')}><ArrowDown style="height: 1.5rem;" /></shift-value>
		<shift-value on:click={() => shiftValue('up')}><ArrowUp style="height: 1.5rem;" /></shift-value>
	</controls>
</material-svelte>

<style>
	material-svelte {
		width: 80px;
		display: flex;
		flex-direction: column;
		background-color: hsl(0, 0%, 98%);
		border: 2px solid hsl(0, 0%, 90%);
		padding: 0.5rem;
	}

	material-image {
		cursor: pointer;
	}

	material-amount {
		text-align: center;
		padding: 0.25rem 0.5rem;
	}
	controls {
		display: flex;
		width: 100%;
		justify-content: space-around;
	}

	controls shift-value {
		cursor: pointer;

		transition: transform 50ms ease-in-out;
	}

	controls shift-value:active {
		transform: scale(0.8);
	}
</style>
