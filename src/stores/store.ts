import { writable, type Writable } from 'svelte/store'
import type { CharacterType } from '../types/character.type'

export let charactersStore: Writable<CharacterType[]> = writable([])
