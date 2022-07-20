import deepmerge from 'deepmerge'

import type { CharacterType } from '../types/character.type'
import type { MaterialsType } from '../types/materials.type'

export default function (
	character: CharacterType,
	phasesRequired: number[],
	talentsRequired: {
		normalAttack: number
		skill: number
		burst: number
	}
): Promise<MaterialsType> {
	return new Promise(async (resolve, reject) => {
		console.clear()

		let materials: MaterialsType = {}

		let ascensionMaterials: MaterialsType = mergeAscensionMaterials(character, phasesRequired)
		let talentsNormalAttackMaterial = mergeTalentsMaterials(character, talentsRequired.normalAttack)
		let talentsSkillMaterial = mergeTalentsMaterials(character, talentsRequired.skill)
		let talentsBurstMaterial = mergeTalentsMaterials(character, talentsRequired.burst)

		materials=ascensionMaterials

		for (let materialType in talentsNormalAttackMaterial) {

			console.log(materialType,talentsNormalAttackMaterial[materialType])
			console.log(materialType,materials[materialType])

		}

		resolve(materials)
	})
}

function mergeTalentsMaterials(character, talentsRequiredValue) {
	let materials: MaterialsType = {}

	for (let i = 1; i <= talentsRequiredValue; i++) {
		let talent = talents.find(tal => tal.lvl === i)

		for (let talentType in talent?.materials) {
			let talentMaterial = talent.materials[talentType]
			let characterMaterial = character.talentMaterials[talentType]

			let material = materials[talentType]

			if (material === undefined) {
				materials[talentType] = {
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

function mergeAscensionMaterials(character, phasesRequired) {
	let phases = phasesRequired.map(phase => ascension.find(asc => asc.phaseNumber === phase))
	let materials: MaterialsType = {}

	phases.forEach(phase => {
		for (let materialType in phase.materials) {
			let phaseMaterial = phase.materials[materialType]
			let characterMaterial = character.ascensionMaterials[materialType]

			let material = materials[materialType]

			if (material === undefined) {
				materials[materialType] = {
					name: characterMaterial,
					data: [
						{
							lvl: phaseMaterial.lvl,
							qt: phaseMaterial.qt
						}
					]
				}
			} else {
				let materialFound = material.data.find(mat => mat.lvl === phaseMaterial.lvl)

				if (materialFound === undefined) {
					material.data.push({
						lvl: phaseMaterial.lvl,
						qt: phaseMaterial.qt
					})
				} else {
					materialFound.qt += phaseMaterial.qt
				}
			}
		}
	})

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
