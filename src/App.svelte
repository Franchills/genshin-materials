<script lang="ts">
	import { onMount } from 'svelte'
	import charaterData from './assets/data/characters.json'
	import Characters from './layout/Characters.svelte'
	import Ressources from './layout/Ressources.svelte'
	import Tabs from './layout/Tabs.svelte'
	import { charactersStore } from './stores/store'

	// console.clear()

	//@ts-expect-error
	const version = __version__
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

	<app-version>{version}</app-version>
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

		animation: cycleColor 600s infinite;
	}

	@keyframes cycleColor {
		from {
			filter: hue-rotate(0deg);
		}
		to {
			filter: hue-rotate(360deg);
		}
	}
</style>
