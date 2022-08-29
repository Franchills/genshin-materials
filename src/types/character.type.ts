export type CharacterType = {
	id: string
	name: string
	ascensionMaterials: AscensionMaterialsType
	talentMaterials: TalentMaterialsType
}

export type AscensionMaterialsType = {
	gem?: string
	natural?: string
	mob?: string
	boss?: string
}

export type TalentMaterialsType = [
	{
		type: string[]
		materials: [
			{
				talentBook: string
				mob: string
				bigBoss: string
				crown: string
			}
		]
	}
]
