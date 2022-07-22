<script lang="ts">
	import { onMount } from 'svelte'
	import CharacterMaterials from '../components/CharacterMaterials.svelte'
	import { getAllCharactersFromStorage, saveAllCharactersToStorage } from '../services/characterStorage.service'
	import { charactersStore } from '../stores/store'

	let selectBindValue = ''

	let characters = []

	onMount(() => {
		characters = getAllCharactersFromStorage()
	})

	function addCharacter() {
		if (selectBindValue !== '') {
			characters.push({
				id: selectBindValue,
				level: [1, 90],
				talents: {
					normalAttack: [1, 10],
					skill: [1, 10],
					burst: [1, 10]
				}
			})
			characters = characters
			selectBindValue = ''
			saveAllCharactersToStorage(characters)
		}
	}
</script>

<characters-svelte>
	<select bind:value={selectBindValue}>
		{#each $charactersStore as character, index (index)}
			<option value={character.id} disabled={characters.find(char => char.id === character.id) === undefined ? false : true}
				>{character.name}</option
			>
		{/each}
	</select>

	<button on:click={() => addCharacter()}>Add</button>

	<br />

	{#each characters as character, index (index)}
		<CharacterMaterials {character} />
	{/each}
</characters-svelte>

<style>
</style>
