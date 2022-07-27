<script lang="ts">
	import { onMount } from 'svelte'
	import CharacterMaterials from '../components/CharacterMaterials.svelte'
	import { getAllCharactersFromStorage, saveAllCharactersToStorage } from '../services/characterStorage.service'
	import { charactersStore } from '../stores/store'

	let characters = []

	onMount(() => {
		characters = getAllCharactersFromStorage()
	})

	function addCharacter() {
		let selecteElement = document.querySelector('character-select select') as HTMLSelectElement
		let selectValue = selecteElement.value

		characters.push({
			id: selectValue,
			level: [1, 90],
			talents: {
				normalAttack: [1, 10],
				skill: [1, 10],
				burst: [1, 10]
			}
		})
		characters = characters

		saveAllCharactersToStorage(characters)
	}

	function removeCharacter({ detail }) {
		let characterId = detail.id

		characters = characters.filter(char => char.id !== characterId)

		saveAllCharactersToStorage(characters)
	}

	function moveCharacter({ detail }) {
		let characterId = detail.id
		let direction = detail.direction

		let characterIndex = characters.findIndex(char => char.id === characterId)
		let currentCharacter = characters[characterIndex]

		if (direction === 'up') {
			let previousCharacterIndex = characterIndex - 1

			if (characters[previousCharacterIndex] !== undefined) {
				let previousCharacter = characters[previousCharacterIndex]

				characters[previousCharacterIndex] = currentCharacter
				characters[characterIndex] = previousCharacter
			}
		} else if (direction === 'down') {
			let nextCharacterIndex = characterIndex + 1

			if (characters[nextCharacterIndex] !== undefined) {
				let nextCharacter = characters[nextCharacterIndex]

				characters[nextCharacterIndex] = currentCharacter
				characters[characterIndex] = nextCharacter
			}
		}

		saveAllCharactersToStorage(characters)
	}
</script>

<characters-svelte>
	<character-select>
		<select>
			{#each $charactersStore as character, index (index)}
				{#if characters.find(char => char.id === character.id) === undefined}
					<option value={character.id}>{character.name}</option>
				{/if}
			{/each}
		</select>

		<button on:click={() => addCharacter()}>Add</button>
	</character-select>
	<characters-list>
		{#each characters as character, index (index)}
			<CharacterMaterials on:removeCharacter={removeCharacter} on:moveCharacter={moveCharacter} {character} />
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
