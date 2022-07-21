<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	export let minMaxValue
	export let currentValue
	export let requiredValue
	export let selectId
	export let selectType
	export let selectTitle

	let isMounting = true

	let values = []
	/*
    Lvl 1 - 20 Phase 0
    Lvl 21 - 40 Phase 1
    Lvl 41 - 50 Phase 2
    Lvl 51 - 60 Phase 3
    Lvl 61 - 70 Phase 4
    Lvl 71 - 80 Phase 5
    Lvl 81 - 90 Phase 6
  */

	$: {
		currentValue
		requiredValue
		updateValue()
	}

	onMount(() => {
		calculateArrayValues()
	})

	function calculateArrayValues() {
		for (let i = 0; i < minMaxValue[1]; i++) {
			values.push(i + 1)
		}
		values = values
	}

	function updateValue() {
		if (isMounting) {
			return
		}

		dispatch('updateValue', {
			selectId,
			selectType,
			value: [currentValue, requiredValue]
		})
	}

	onMount(() => {
		isMounting = false
	})
</script>

<option-select>
	{selectTitle}
	<select bind:value={currentValue}>
		{#each values as value, index (index)}
			<option {value} selected={currentValue === value}>{value}</option>
		{/each}
	</select>
	-
	<select bind:value={requiredValue}>
		{#each values.slice(currentValue) as value, index (index)}
			<option {value} selected={requiredValue === value}>{value}</option>
		{/each}
	</select>
</option-select>

<style>
</style>
