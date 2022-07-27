<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import getCharacterMaterialsFn from '../functions/getCharacterMaterials.fn'
	import ArrowDown from '../icons/ArrowDown.svelte'
	import ArrowUp from '../icons/ArrowUp.svelte'
	import { getAllCharactersFromStorage, saveAllCharactersToStorage } from '../services/characterStorage.service'
	import { getAllDataFromLs } from '../services/materialStorage.service'
	import { charactersStore } from '../stores/store'
	import CharacterImage from './CharacterImage.svelte'
	import CharacterOptionSelect from './CharacterOptionSelect.svelte'

	export let character
	let materialData = getAllDataFromLs()
	let materialsDisplay = []

	let dispatch = createEventDispatcher()

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

		materialsDisplay = []

		for (let materialType in materials) {
			if (materialType.split('_')[1] !== 'undefined') {
				materialsDisplay.push({
					type: materialType,
					name: materials[materialType].name,
					data: {
						inventory: materialData[materialType.split('_')[0]]
							.find(material => material.name === materials[materialType].name)
							?.amount.map((material, index) => {
								return {
									lvl: ['natural', 'crown', 'boss', 'bigBoss'].includes(materialType.split('_')[0]) ? undefined : index,
									qt: material
								}
							}),
						required: materials[materialType].data,
						totals: []
					}
				})
			}
		}

		for (let material of materialsDisplay) {
			let inventoryMaterials = material.data.inventory
			let requiredMaterials = material.data.required
			let totals = []

			requiredMaterials.forEach((requiredMaterial, index) => {
				let qtDifference = inventoryMaterials[index].qt - requiredMaterials[index].qt + (totals[index - 1] || 0) / 3

				totals.push(qtDifference >= 0 ? qtDifference : 0)

				material.data.totals.push({
					lvl: requiredMaterial.lvl,
					qt: Number(qtDifference.toFixed(2))
				})
			})
		}

		materialsDisplay = materialsDisplay.sort((a, b) => {
			let weights = ['gem', 'mob', 'talentBook', 'boss', 'bigBoss', 'natural', 'crown']

			return weights.indexOf(a.type.split('_')[0]) - weights.indexOf(b.type.split('_')[0])
		})
	}

	function removeCharacter() {
		let result = confirm('Are you sure you want to remove this character?')

		if (result === true) {
			dispatch('removeCharacter', {
				id: character.id
			})
		}
	}

	function moveCharacter(direction: 'up' | 'down') {
		dispatch('moveCharacter', {
			id: character.id,
			direction
		})
	}
</script>

<character-materials>
	<character-header>
		<button on:click={() => moveCharacter('up')}>Move Up</button>
		<button on:click={() => moveCharacter('down')}>Move Down</button>
		<button on:click={() => removeCharacter()}>Delete</button>
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
		<character-materials-table>
			<inventory-materials class="grid">
				{#each materialsDisplay as materialType, index (index)}
					<grid-section>
						{#each materialType.data.inventory as material, index (index)}
							<material>
								<img
									src="/images/materials/{materialType.type.split('_')[0]}/{materialType.name}{isNaN(material.lvl)
										? ''
										: material.lvl}.webp"
									alt=""
								/>
								{material.qt}</material
							>
						{/each}
					</grid-section>
				{/each}
			</inventory-materials>

			<required-grid class="grid">
				{#each materialsDisplay as materialType, index (index)}
					<grid-section>
						{#each materialType.data.required as material, index (index)}
							<material>
								<img
									src="/images/materials/{materialType.type.split('_')[0]}/{materialType.name}{isNaN(material.lvl)
										? ''
										: material.lvl}.webp"
									alt=""
								/>
								{material.qt}</material
							>
						{/each}
					</grid-section>
				{/each}
			</required-grid>

			<totals-grid class="grid">
				{#each materialsDisplay as materialType, index (index)}
					<grid-section>
						{#each materialType.data.totals as material, index (index)}
							<material>
								<img
									src="/images/materials/{materialType.type.split('_')[0]}/{materialType.name}{isNaN(material.lvl)
										? ''
										: material.lvl}.webp"
									alt=""
								/>
								{material.qt}</material
							>
						{/each}
					</grid-section>
				{/each}
			</totals-grid>
		</character-materials-table>
	</character-body>
</character-materials>

<style>
	*.grid {
		display: flex;
		width: 100%;
		height: 100%;
		flex-direction: column;
		justify-content: space-around;
	}
	character-materials {
		display: flex;
		flex-direction: column;
		margin-bottom: 1rem;
		border: 2px solid #aaa;

		margin: 0 auto;

		width: 1000px;
	}

	character-materials-table {
		width: 100%;
		display: flex;
		flex-direction: row;
	}

	character-header {
		display: flex;
		justify-content: space-around;
		padding: 1rem;
	}

	character-body {
		display: flex;
		flex-direction: row;
	}

	character-image {
		border: 1px solid #ddd;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	grid-section {
		display: flex;
		width: 100%;
		justify-content: space-around;
		/* border-bottom: 1px solid #ddd; */
	}

	grid-section:nth-child(even) {
		background-color: hsla(0, 0%, 0%, 0.05);
	}

	grid-section:nth-child(odd) {
		background-color: hsla(0, 0%, 0%, 0.025);
	}
	material {
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid #ddd;
		width: 100%;
	}

	material img {
		width: 30px;
		height: 30px;
	}
</style>
