export function saveDataToLs(materialData, newAmount) {
	let lsData = JSON.parse(localStorage.getItem('ressources') || '{}')

	if (lsData[materialData.type] === undefined) {
		lsData[materialData.type] = []
	}

	if (lsData[materialData.type].find(item => item.name === materialData.name) === undefined) {
		lsData[materialData.type].push({
			name: materialData.name,
			amount: getBlankArray(materialData.type)
		})
	}

	lsData[materialData.type].find(item => item.name === materialData.name).amount[materialData.lvl] = +newAmount
	localStorage.setItem('ressources', JSON.stringify(lsData))
}

function getBlankArray(materialType: string) {
	if (materialType === 'mob') {
		return [0, 0, 0]
	} else if (['boss', 'bigBoss', 'crown'].includes(materialType)) {
		return [0]
	} else if (['weapon', 'gem'].includes(materialType)) {
		return [0, 0, 0, 0]
	}
}

export function getAllDataFromLs() {
	return new Promise(async (resolve, reject) => {
		let lsData = JSON.parse(localStorage.getItem('ressources') || '{}')
		let updatedList = await getDefaultList()

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


		resolve(lsData)
	})
}

function getDefaultList(): Promise<any> {
	return new Promise((resolve, reject) => {
		fetch('https://raw.githubusercontent.com/Franchills/genshin-db/main/materials.json')
			.then(res => res.json())
			.then(data => {
				resolve(data)
			})
			.catch(err => {
				console.log(err)
			})
	})
}
