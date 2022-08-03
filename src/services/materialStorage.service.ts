import materialsData from '../assets/data/materials.json'

export function saveDataToLs(materialData, newAmount) {
	return new Promise((resolve, reject) => {
		let lsData = JSON.parse(localStorage.getItem('ressources') || '{}')

		if (lsData[materialData.type] === undefined) {
			lsData[materialData.type] = []
		}

		if (lsData[materialData.type].find(item => item.name === materialData.name) === undefined) {
			lsData[materialData.type].push({
				name: materialData.name,
				amount: getBlankArray(materialData)
			})
		}

		lsData[materialData.type].find(item => item.name === materialData.name).amount[materialData.lvl] = +newAmount
		localStorage.setItem('ressources', JSON.stringify(lsData))

		resolve('')
	})
}

function getBlankArray(materialData: any) {
	if (['mob', 'talentBook'].includes(materialData.type)) {
		return [0, 0, 0]
	}

	if (['boss', 'bigBoss', 'natural'].includes(materialData.type) || materialData.name === 'crownOfInsight') {
		return [0]
	}

	if (['weapon', 'gem'].includes(materialData.type)) {
		return [0, 0, 0, 0]
	}
}

export function getAllDataFromLs() {
	let lsData = JSON.parse(localStorage.getItem('ressources') || '{}')
	let updatedList = getDefaultList()

	for (let key in updatedList) {
		if (lsData[key] === undefined) {
			lsData[key] = updatedList[key]
		}

		updatedList[key].forEach(item => {
			if (lsData[key].find(lsItem => lsItem.name === item.name) === undefined) {
				lsData[key].push(item)
			}
		})
	}

	return lsData
}

function getDefaultList() {
	return materialsData
}
