<script lang="ts">
	import { onMount } from 'svelte'
	import getCharacterDataFn from '../functions/getCharacterData.fn'
	import getCharacterMaterialsFn from '../functions/getCharacterMaterials.fn'
	import CharacterImage from './CharacterImage.svelte'

	export let character
	let materials = []
	let materialGem
	let materialNatural
	let materialMob
	let materialBoss

	onMount(async () => {
		getCharacterDataFn(character.id).then(async data => {
			let materials = await getCharacterMaterialsFn(data, character.phase, character.talents)
		})
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
