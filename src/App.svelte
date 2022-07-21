<script lang="ts">
	import { onMount } from 'svelte'
	import charaterData from './assets/data/characters.json'
	import Characters from './layout/Characters.svelte'
	import Ressources from './layout/Ressources.svelte'
	import Tabs from './layout/Tabs.svelte'
	import { charactersStore } from './stores/store'

	console.clear()

	let layoutToShow = 'characters'

	onMount(() => {
		$charactersStore = charaterData
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
