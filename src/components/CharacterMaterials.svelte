<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import getCharacterMaterialsFn from '../functions/getCharacterMaterials.fn'
	import { getAllCharactersFromStorage, saveAllCharactersToStorage } from '../services/characterStorage.service'
	import { getAllDataFromLs, saveDataToLs } from '../services/materialStorage.service'
	import { charactersStore } from '../stores/store'
	import CharacterImage from './CharacterImage.svelte'
	import CharacterOptionSelect from './CharacterOptionSelect.svelte'

	export let character

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
		let inventoryMaterials = getAllDataFromLs()
		let characterStore = $charactersStore.find(char => char.id === character.id)
		let materials = await getCharacterMaterialsFn(characterStore, character.level, character.talents)

		materialsDisplay = []

		for (let materialType in materials) {
			if (materialType.split('_')[1] !== 'undefined') {
				let inventoryMaterial = inventoryMaterials[materialType.split('_')[0]].find(
					mat => mat.name === materialType.split('_')[1]
				)

				inventoryMaterial.amount.map((amount, index, self) => {
					return {
						lvl: self.length > 1 ? index : '',
						qt: amount
					}
				})

				materialsDisplay.push({
					type: materialType,
					name: materials[materialType].name,
					data: {
						inventory: inventoryMaterial.amount.map((amount, index, self) => {
							return {
								lvl: self.length > 1 ? index : '',
								qt: amount
							}
						}),
						required: materials[materialType].data,
						totals: []
					}
				})
			}
		}

		for (let material of materialsDisplay) {
			let characterRequiredMaterials = material.data.required
			let totals = []

			let inventoryMaterial = inventoryMaterials[material.type.split('_')[0]].find(
				mat => mat.name === material.type.split('_')[1]
			)

			inventoryMaterial.amount.forEach((amount, index) => {
				let requiredMaterial = characterRequiredMaterials.find(mat => mat.lvl === index || mat.lvl === undefined)

				let qtDifference = amount - (requiredMaterial?.qt || 0) + (totals[index - 1] || 0) / 3

				totals.push(qtDifference >= 0 ? qtDifference : 0)

				if (requiredMaterial?.qt !== undefined) {
					material.data.totals.push({
						lvl: requiredMaterial.lvl,
						qt: Number(qtDifference.toFixed(2))
					})
				}
			})
		}

		materialsDisplay = materialsDisplay.sort((a, b) => {
			let weights = ['gem', 'mob', 'talentBook', 'boss', 'bigBoss', 'natural']

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

	function clickHandler(evt, material) {
		let materialQtElement = evt.target.closest('material').querySelector('material-qt')

		if (evt.shiftKey === true) {
			let result = prompt('Enter amount:', materialQtElement.innerText)

			if (result !== null) {
				let value = Number(result)
				if (!isNaN(value)) {
					if (value >= 0) {
						material.amount = value
					} else {
						material.amount = 0
					}
				} else {
					material.amount = 0
				}
			}
		} else {
			material.amount = Number(materialQtElement.innerText) + 1
		}

		materialQtElement.innerText = material.amount

		saveDataToLs(material, material.amount).then(() => {
			loadMaterials()
		})
	}

	function rightClickHandler(evt, material) {
		evt.preventDefault()
		let materialQtElement = evt.target.closest('material').querySelector('material-qt')

		if (Number(materialQtElement.innerText) - 1 < 0) return

		material.amount = Number(materialQtElement.innerText) - 1

		materialQtElement.innerText = material.amount

		saveDataToLs(material, material.amount).then(() => {
			loadMaterials()
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
			selectTitle="Level"
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
				<grid-title>Inventory</grid-title>
				{#each materialsDisplay as materialType, index (index)}
					<grid-section>
						{#each materialType.data.inventory as material, index (index)}
							<material
								on:click={evt =>
									clickHandler(evt, {
										name: materialType.name,
										type: materialType.type.split('_')[0],
										lvl: material.lvl === '' ? 0 : material.lvl,
										amount: material.qt
									})}
								on:contextmenu={evt =>
									rightClickHandler(evt, {
										name: materialType.name,
										type: materialType.type.split('_')[0],
										lvl: material.lvl === '' ? 0 : material.lvl,
										amount: material.qt
									})}
							>
								<img
									src="/images/materials/{materialType.type.split('_')[0]}/{materialType.name}{isNaN(material.lvl)
										? ''
										: material.lvl}.webp"
									alt=""
								/>
								<material-qt>{material.qt}</material-qt></material
							>
						{/each}
					</grid-section>
				{/each}
			</inventory-materials>

			<required-grid class="grid">
				<grid-title>Required</grid-title>
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
				<grid-title>Totals</grid-title>
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

								{#if material.qt < 0}
									<bold>{material.qt}</bold>
								{:else}
									{material.qt}
								{/if}
							</material>
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
		font-size: 1rem;
	}

	grid-title {
		display: flex;
		align-items: center;
		justify-content: center;
		border: #ddd 1px solid;
		font-variation-settings: 'wght' 700;
		font-size: 0.9rem;
	}
	character-materials {
		display: flex;
		flex-direction: column;
		margin-bottom: 1rem;
		border: 2px solid #aaa;

		margin: 0 auto;
		margin-bottom: 1rem;

		max-width: 1280px;
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
	grid-section material {
		padding-right: 0.75rem;
	}

	grid-section material bold {
		font-variation-settings: 'wght' 800;
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
		width: 2.5rem;
		height: 2.5rem;
	}
</style>
