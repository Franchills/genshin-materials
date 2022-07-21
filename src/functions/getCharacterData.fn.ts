import type { CharacterType } from '../types/character.type'

export default function (characterId: string): Promise<CharacterType> {
	return new Promise((resolve, reject) => {
		fetch('https://raw.githubusercontent.com/Franchills/genshin-db/main/characters.json')
			.then(res => res.json())
			.then(data => {
				console.log(data)
				let character = data.find(char => char.id === characterId)
				resolve(character)
			})
			.catch(err => {
				console.log(err)
			})
	})
}
