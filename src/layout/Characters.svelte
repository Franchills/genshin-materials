<script lang="ts">
	import CharacterMaterials from '../components/CharacterMaterials.svelte'

	let selectBindValue = ''
	let selectedCharacters = [
		{
			id: 'kaedeharaKazuha',
			phase: [4, 5, 6],
			talents: {
				normalAttack: 6,
				skill: 7,
				burst: 4
			}
		}
	]

	let characterList = [
		{
			name: 'Kazuha',
			id: 'kaedeharaKazuha'
		},
		{ name: 'Hu Tao', id: 'huTao' }
	]

	function addCharacter() {
		if (selectBindValue !== '') {
			selectedCharacters.push({
				id: selectBindValue,
				phase: [1, 2, 3, 4, 5, 6],
				talents: {
					normalAttack: 1,
					skill: 1,
					burst: 1
				}
			})
			selectedCharacters = selectedCharacters
			selectBindValue = ''
		}
	}
</script>

<characters-svelte>
	<select bind:value={selectBindValue}>
		{#each characterList as character, index (index)}
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
