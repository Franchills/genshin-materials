<script lang="ts">
	import { onMount } from 'svelte'
	import getCharacterMaterialsFn from '../functions/getCharacterMaterials.fn'
	import { charactersStore } from '../stores/store'
	import CharacterImage from './CharacterImage.svelte'
	import CharacterOptionSelect from './CharacterOptionSelect.svelte'

	export let character
	let materials = []
	let materialGem
	let materialNatural
	let materialMob
	let materialBoss

	$: {
		console.log(character)
		loadMaterials()
	}

	function updateValue({ detail }) {
		if (detail.selectType === 'phase') {
			let currentPhaseValue = getProperPhaseValue(detail.value[0])
			let requiredPhaseValue = getProperPhaseValue(detail.value[1])

			console.log(currentPhaseValue, requiredPhaseValue)

			character[detail.selectType] = [currentPhaseValue, requiredPhaseValue]
		} else {
			character[detail.selectType][detail.selectId] = detail.value
		}
	}

	function getProperPhaseValue(value) {
		if (value <= 20) {
			return 0
		}

		if (value <= 40) {
			return 1
		}

		if (value <= 50) {
			return 2
		}
	}

	async function loadMaterials() {
		let characterStore = $charactersStore.find(char => char.id === character.id)
		// let materials = await getCharacterMaterialsFn(characterStore, character.phase, character.talents)

		console.log(materials)
	}

	onMount(async () => {})
</script>

<character-materials>
	<character-image>
		<CharacterImage characterId={character.id} />
	</character-image>

	<grid-header>
		<CharacterOptionSelect
			on:updateValue={updateValue}
			selectTitle="Normal Attack"
			selectType="talents"
			selectId="normalAttack"
			currentValue={character.talents.normalAttack[0]}
			requiredValue={character.talents.normalAttack[1]}
			minMaxValue={[1, 10]}
		/>
		<CharacterOptionSelect
			on:updateValue={updateValue}
			selectTitle="Skill"
			selectType="talents"
			selectId="skill"
			currentValue={character.talents.skill[0]}
			requiredValue={character.talents.skill[1]}
			minMaxValue={[1, 10]}
		/>
		<CharacterOptionSelect
			on:updateValue={updateValue}
			selectTitle="Burst"
			selectType="talents"
			selectId="burst"
			currentValue={character.talents.burst[0]}
			requiredValue={character.talents.burst[1]}
			minMaxValue={[1, 10]}
		/>
		<CharacterOptionSelect
			on:updateValue={updateValue}
			selectTitle="Ascension"
			selectType="phase"
			selectId={undefined}
			currentValue={character.phase[0]}
			requiredValue={character.phase[1]}
			minMaxValue={[1, 90]}
		/>
	</grid-header>
</character-materials>

<style>
	character-materials {
		display: grid;
	}
</style>
