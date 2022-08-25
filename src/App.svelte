<script lang="ts">
	import { onMount } from 'svelte'
	import charaterData from './assets/data/characters.json'
	import Characters from './layout/Characters.svelte'
	import Ressources from './layout/Ressources.svelte'
	import Tabs from './layout/Tabs.svelte'
	import { charactersStore } from './stores/store'

	console.clear()

	let layoutToShow = 'characters'
	// let layoutToShow = 'ressources'

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

	<app-version>3.0.0</app-version>
</main>

<style>
	app-version {
		position: fixed;
		bottom: 0;
		right: 0;
		background-color: rgb(80, 168, 255);
		color: aliceblue;
		padding: 0.25rem 0.75rem;
		margin: 0.5rem;
		border-radius: 50px;
		font-weight: 700;
	}
</style>
