import type { CharacterType } from '../types/character.type'

export function getAllCharactersFromStorage() {
	let characters = JSON.parse(localStorage.getItem('characters') || '[]')
	return characters
}

export function saveAllCharactersToStorage(characters: CharacterType[]) {
	localStorage.setItem('characters', JSON.stringify(characters))
}
