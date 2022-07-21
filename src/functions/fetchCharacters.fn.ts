import type { CharacterType } from '../types/character.type'

export default function (): Promise<CharacterType[]> {
	return new Promise((resolve, reject) => {
		fetch('https://raw.githubusercontent.com/Franchills/genshin-db/main/characters.json')
			.then(res => res.json())
			.then(characters => {
				resolve(characters)
			})
			.catch(err => {
				console.log(err)
			})
	})
}
