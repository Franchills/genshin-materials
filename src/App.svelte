<script lang="ts">
	import { onMount } from 'svelte'
	import fetchCharactersFn from './functions/fetchCharacters.fn'
	import Characters from './layout/Characters.svelte'
	import Ressources from './layout/Ressources.svelte'
	import Tabs from './layout/Tabs.svelte'
	import { charactersStore } from './stores/store'

	console.clear()

	let layoutToShow = 'ressources'

	onMount(() => {
		fetchCharactersFn().then(data => {
			$charactersStore = data
		})
	})
</script>

<main>
	<Tabs on:changeLayout={evt => (layoutToShow = evt.detail)} />

	{#if layoutToShow === 'characters'}
		{#if $charactersStore.length > 0}
			<Characters />
		{/if}
	{:else if layoutToShow === 'ressources'}
		<Ressources />
	{/if}
</main>

<style>
</style>
