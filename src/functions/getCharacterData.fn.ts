import type { CharacterType } from '../types/character.type'

export default function (characterId: string): Promise<CharacterType> {
	return new Promise((resolve, reject) => {
		fetch('http://localhost:3000')
			.then(res => res.json())
			.then(data => {
				let character = data.find(char => char.id === characterId)
				resolve(character)
			})
			.catch(err => {
				console.log(err)
			})
	})
}
