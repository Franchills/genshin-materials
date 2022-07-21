<script lang="ts">
	import { onMount } from 'svelte'
	import getCharacterMaterialsFn from '../functions/getCharacterMaterials.fn'
	import { charactersStore } from '../stores/store'
	import CharacterImage from './CharacterImage.svelte'

	export let character
	let materials = []
	let materialGem
	let materialNatural
	let materialMob
	let materialBoss

	onMount(async () => {
		let characterStore = $charactersStore.find(char => char.id === character.id)

		let materials = await getCharacterMaterialsFn(characterStore, character.phase, character.talents)
	})
</script>

<character-materials>
	<character-image>
		<CharacterImage characterId={character.id} />
	</character-image>
</character-materials>

<style>
	character-materials {
		display: grid;
	}
</style>
