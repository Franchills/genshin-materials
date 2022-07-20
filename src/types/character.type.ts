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

export type TalentMaterialsType = {
	talent?: string
	mob?: string
	boss?: string
}
