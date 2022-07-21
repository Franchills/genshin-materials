<script lang="ts">
	import { saveDataToLs } from '../services/localStorage.service'
	import MaterialImage from './MaterialImage.svelte'

	export let materialData

	function saveAmount(newAmount: number) {
		saveDataToLs(materialData, newAmount)
	}

	function showManualInput() {
		let result = Number(prompt('Enter amount:'))

		if (!isNaN(result)) {
			saveAmount(result)
			materialData.amount = result
		}
	}

	function shiftValue(shift: 'up' | 'down') {
		if (shift === 'up') {
			materialData.amount = materialData.amount + 1
		} else if (shift === 'down' && materialData.amount - 1 >= 0) {
			materialData.amount = materialData.amount - 1
		}
	}
</script>

<material-svelte>
	<material-image on:dblclick={() => showManualInput()}>
		<MaterialImage {materialData} />
	</material-image>
	<material-amount>{materialData.amount}</material-amount>
	<controls>
		<button on:click={() => shiftValue('down')}>˅</button>
		<button on:click={() => shiftValue('up')}>˄</button>
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

	controls button {
		width: 1.5rem;
		height: 1.5rem;

		cursor: pointer;
		font-weight: bold;
		font-size: 1rem;
	}
</style>
