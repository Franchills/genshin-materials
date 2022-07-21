<script lang="ts">
	import CharacterMaterials from '../components/CharacterMaterials.svelte'
	import { charactersStore } from '../stores/store'

	let selectBindValue = ''

	let selectedCharacters = [
		{
			id: 'kaedeharaKazuha',
			phase: [3, 6],
			talents: {
				normalAttack: [1, 6],
				skill: [4, 7],
				burst: [2, 4]
			}
		}
	]

	function addCharacter() {
		if (selectBindValue !== '') {
			selectedCharacters.push({
				id: selectBindValue,
				phase: [1, 6],
				talents: {
					normalAttack: [1, 10],
					skill: [1, 10],
					burst: [1, 10]
				}
			})
			selectedCharacters = selectedCharacters
			selectBindValue = ''
		}
	}
</script>

<characters-svelte>
	<select bind:value={selectBindValue}>
		{#each $charactersStore as character, index (index)}
			<option
				value={character.id}
				disabled={selectedCharacters.find(char => char.id === character.id) === undefined ? false : true}
				>{character.name}</option
			>
		{/each}
	</select>

	<button on:click={() => addCharacter()}>Add</button>

	<br />

	{#each selectedCharacters as character, index (index)}
		<CharacterMaterials {character} />
	{/each}
</characters-svelte>

<style>
</style>
