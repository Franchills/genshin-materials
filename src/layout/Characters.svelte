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

	function removeCharacter({ detail }) {
		let characterId = detail.id

		characters = characters.filter(char => char.id !== characterId)

		saveAllCharactersToStorage(characters)
	}
</script>

<characters-svelte>
	<character-select>
		<select bind:value={selectBindValue}>
			{#each $charactersStore.slice(35) as character, index (index)}
				<option value={character.id} disabled={characters.find(char => char.id === character.id) === undefined ? false : true}
					>{character.name}</option
				>
			{/each}
		</select>

		<button on:click={() => addCharacter()}>Add</button>
	</character-select>
	<characters-list>
		{#each characters as character, index (index)}
			<CharacterMaterials on:removeCharacter={removeCharacter} {character} />
		{/each}
	</characters-list>
</characters-svelte>

<style>
	character-select {
		display: flex;
		width: 100%;
		justify-content: center;
		margin: 1rem;
	}

	character-select select {
		margin-right: 1rem;
	}
	character-select button {
		margin-left: 1rem;
	}
</style>
