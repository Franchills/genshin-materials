<script lang="ts">
	import { onMount } from 'svelte'
	import getCharacterMaterialsFn from '../functions/getCharacterMaterials.fn'
	import { getAllCharactersFromStorage, saveAllCharactersToStorage } from '../services/characterStorage.service'
	import { getAllDataFromLs } from '../services/materialStorage.service'
	import { charactersStore } from '../stores/store'
	import CharacterImage from './CharacterImage.svelte'
	import CharacterOptionSelect from './CharacterOptionSelect.svelte'

	// console.clear()

	export let character
	let materialData = getAllDataFromLs()
	let materialsDisplay = []

	$: {
		character
		loadMaterials()
	}

	function updateValue({ detail }) {
		if (detail.selectType === 'level') {
			character[detail.selectType] = detail.value
		} else {
			character[detail.selectType][detail.selectId] = detail.value
		}

		let characters = getAllCharactersFromStorage()

		characters[characters.findIndex(char => char.id === character.id)] = character

		saveAllCharactersToStorage(characters)
	}

	async function loadMaterials() {
		let characterStore = $charactersStore.find(char => char.id === character.id)
		let materials = await getCharacterMaterialsFn(characterStore, character.level, character.talents)

		console.clear()

		console.log(`------ ${character.id} ------`)

		materialsDisplay = []

		for (let materialType in materials) {
			materialsDisplay.push({
				type: materialType,
				name: materials[materialType].name,
				data: {
					inventory: materialData[materialType]
						.find(material => material.name === materials[materialType].name)
						?.amount.map((material, index) => {
							return {
								lvl: ['natural', 'crown', 'boss', 'bigBoss'].includes(materialType) ? undefined : index,
								qt: material
							}
						}),
					required: materials[materialType].data,
					totals: []
				}
			})
		}

		/*
			[
				{
					lvl:0,
					qt:0
				}
			]
		*/

		// console.dir(materialsDisplay)

		for (let material of materialsDisplay) {
			console.log(`--------- ${material.name} ---------`)
			let inventoryMaterials = material.data.inventory
			let requiredMaterials = material.data.required
			let totals = []

			requiredMaterials.forEach((requiredMaterial, index) => {
				let value = inventoryMaterials[index].qt - requiredMaterials[index].qt + (totals[index - 1] || 0) / 3

				totals.push(value)

				material.data.totals.push({
					lvl: index,
					qt: value
				})
			})
		}

		console.dir(materialsDisplay.find(material => material.type === 'mob').data.inventory)
		console.dir(materialsDisplay.find(material => material.type === 'mob').data.required)
		console.dir(materialsDisplay.find(material => material.type === 'mob').data.totals)
	}

	onMount(async () => {})
</script>

<character-materials>
	<character-header>
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
			selectType="level"
			selectId={undefined}
			currentValue={character.level[0]}
			requiredValue={character.level[1]}
			minMaxValue={[1, 90]}
		/>
	</character-header>

	<character-body>
		<character-image>
			<CharacterImage characterId={character.id} />
		</character-image>
		<character-materials-table />
	</character-body>
</character-materials>

<style>
	character-materials {
		display: flex;
		flex-direction: column;
	}

	character-header {
		display: flex;
		justify-content: space-around;
	}

	character-body {
		display: flex;
		flex-direction: row;
	}

	table {
		height: max-content;
		width: 100%;
		text-align: center;
	}

	table td {
		border: 1px solid #ccc;
	}
</style>
