import type { CharacterType } from '../types/character.type'
import type { MaterialsType } from '../types/materials.type'

export default function (
	character: CharacterType,
	levelsRequired: number[],
	talentsRequired: {
		normalAttack: number[]
		skill: number[]
		burst: number[]
	}
): Promise<MaterialsType> {
	return new Promise(async (resolve, reject) => {
		let materials: MaterialsType = {}

		levelsRequired = [getPhaseValueFromLevel(levelsRequired[0]), getPhaseValueFromLevel(levelsRequired[1])]

		let allMaterials = [
			mergeAscensionMaterials(character, levelsRequired),
			mergeTalentsMaterials(character, talentsRequired.normalAttack),
			mergeTalentsMaterials(character, talentsRequired.skill),
			mergeTalentsMaterials(character, talentsRequired.burst)
		]

		allMaterials.forEach(materialGroup => {
			for (let materialType in materialGroup) {
				let materialData = materials[materialType]?.data
				let talentMaterialData = materialGroup[materialType]?.data

				if (materialData === undefined) {
					materials[materialType] = {
						name: materialGroup[materialType].name,
						data: materialGroup[materialType].data
					}
				} else {
					talentMaterialData.forEach(talentMaterial => {
						let materialFound = materialData.find(mat => mat.lvl === talentMaterial.lvl)

						if (materialFound === undefined) {
							materials[materialType].data.push(talentMaterial)
						} else {
							materialFound.qt += talentMaterial.qt
						}
					})
				}
				materials[materialType].data = materials[materialType].data.sort((a, b) => a.lvl - b.lvl)
			}
		})

		resolve(materials)
	})
}

function getPhaseValueFromLevel(value) {
	if (value <= 20) {
		return 0
	} else if (value <= 40) {
		return 1
	} else if (value <= 50) {
		return 2
	} else if (value <= 60) {
		return 3
	} else if (value <= 70) {
		return 4
	} else if (value <= 80) {
		return 5
	} else if (value <= 90) {
		return 6
	}
}

function mergeTalentsMaterials(character, talentsRequiredValue) {
	let materials: MaterialsType = {}

	for (let i = talentsRequiredValue[0] + 1; i <= talentsRequiredValue[1]; i++) {
		let talent = talents.find(tal => tal.lvl === i)

		for (let talentType in talent?.materials) {
			let talentMaterial = talent.materials[talentType]
			let characterMaterial = character.talentMaterials[talentType]

			let material = materials[`${talentType}_${characterMaterial}`]

			if (material === undefined) {
				talentType = talentType.replace('crown', 'talentBook')

				materials[`${talentType}_${characterMaterial}`] = {
					name: characterMaterial,
					data: [
						{
							lvl: talentMaterial.lvl,
							qt: talentMaterial.qt
						}
					]
				}
			} else {
				let materialFound = material.data.find(mat => mat.lvl === talentMaterial.lvl)

				if (materialFound === undefined) {
					material.data.push({
						lvl: talentMaterial.lvl,
						qt: talentMaterial.qt
					})
				} else {
					materialFound.qt += talentMaterial.qt
				}
			}
		}
	}

	return materials
}

function mergeAscensionMaterials(character, levelsRequired) {
	let materials: MaterialsType = {}

	for (let i = levelsRequired[0] + 1; i <= levelsRequired[1]; i++) {
		let level = ascension.find(asc => asc.phaseNumber === i)

		for (let materialType in level?.materials) {
			let levelMaterial = level.materials[materialType]
			let characterMaterial = character.ascensionMaterials[materialType]

			let material = materials[`${materialType}_${characterMaterial}`]

			if (material === undefined) {
				materials[`${materialType}_${characterMaterial}`] = {
					name: characterMaterial,
					data: [
						{
							lvl: levelMaterial.lvl,
							qt: levelMaterial.qt
						}
					]
				}
			} else {
				let materialFound = material.data.find(mat => mat.lvl === levelMaterial.lvl)

				if (materialFound === undefined) {
					material.data.push({
						lvl: levelMaterial.lvl,
						qt: levelMaterial.qt
					})
				} else {
					materialFound.qt += levelMaterial.qt
				}
			}
		}
	}

	return materials
}

const talents = [
	{
		lvl: 2,
		materials: {
			mob: {
				lvl: 0,
				qt: 6
			},
			talentBook: {
				lvl: 0,
				qt: 3
			}
		}
	},
	{
		lvl: 3,
		materials: {
			mob: {
				lvl: 1,
				qt: 3
			},
			talentBook: {
				lvl: 1,
				qt: 2
			}
		}
	},
	{
		lvl: 4,
		materials: {
			mob: {
				lvl: 1,
				qt: 4
			},
			talentBook: {
				lvl: 1,
				qt: 4
			}
		}
	},
	{
		lvl: 5,
		materials: {
			mob: {
				lvl: 1,
				qt: 6
			},
			talentBook: {
				lvl: 1,
				qt: 6
			}
		}
	},
	{
		lvl: 6,
		materials: {
			mob: {
				lvl: 1,
				qt: 9
			},
			talentBook: {
				lvl: 1,
				qt: 9
			}
		}
	},
	{
		lvl: 7,
		materials: {
			mob: {
				lvl: 2,
				qt: 4
			},
			talentBook: {
				lvl: 2,
				qt: 4
			},
			bigBoss: {
				qt: 1
			}
		}
	},
	{
		lvl: 8,
		materials: {
			mob: {
				lvl: 2,
				qt: 6
			},
			talentBook: {
				lvl: 2,
				qt: 6
			},
			bigBoss: {
				qt: 1
			}
		}
	},
	{
		lvl: 9,
		materials: {
			mob: {
				lvl: 2,
				qt: 9
			},
			talentBook: {
				lvl: 2,
				qt: 12
			},
			bigBoss: {
				qt: 2
			}
		}
	},
	{
		lvl: 10,
		materials: {
			mob: {
				lvl: 2,
				qt: 12
			},
			talentBook: {
				lvl: 2,
				qt: 16
			},
			bigBoss: {
				qt: 2
			},
			crown: {
				qt: 1
			}
		}
	}
]

const ascension = [
	{
		phaseNumber: 1,
		materials: {
			gem: {
				lvl: 0,
				qt: 1
			},
			natural: {
				qt: 3
			},
			mob: {
				lvl: 0,
				qt: 3
			}
		}
	},
	{
		phaseNumber: 2,
		materials: {
			gem: {
				lvl: 1,
				qt: 3
			},
			natural: {
				qt: 10
			},
			mob: {
				lvl: 0,
				qt: 15
			},
			boss: {
				qt: 2
			}
		}
	},
	{
		phaseNumber: 3,
		materials: {
			gem: {
				lvl: 1,
				qt: 6
			},
			natural: {
				qt: 20
			},
			mob: {
				lvl: 1,
				qt: 12
			},
			boss: {
				qt: 4
			}
		}
	},
	{
		phaseNumber: 4,
		materials: {
			gem: {
				lvl: 2,
				qt: 3
			},
			natural: {
				qt: 30
			},
			mob: {
				lvl: 1,
				qt: 18
			},
			boss: {
				qt: 8
			}
		}
	},
	{
		phaseNumber: 5,
		materials: {
			gem: {
				lvl: 2,
				qt: 6
			},
			natural: {
				qt: 45
			},
			mob: {
				lvl: 2,
				qt: 12
			},
			boss: {
				qt: 12
			}
		}
	},
	{
		phaseNumber: 6,
		materials: {
			gem: {
				lvl: 3,
				qt: 6
			},
			natural: {
				qt: 60
			},
			mob: {
				lvl: 2,
				qt: 24
			},
			boss: {
				qt: 20
			}
		}
	}
]
