<script lang="ts">
	import { onMount } from 'svelte'
	import charaterData from './assets/data/characters.json'
	import Characters from './layout/Characters.svelte'
	import Ressources from './layout/Ressources.svelte'
	import Tabs from './layout/Tabs.svelte'
	import { charactersStore, layoutToShow } from './stores/store'

	// console.clear()

	//@ts-expect-error
	const version = __version__
	// let layoutToShow = 'characters'
	// let layoutToShow = 'ressources'

	onMount(() => {
		$charactersStore = charaterData as any
	})
</script>

<main>
	<Tabs />

	{#if $layoutToShow === 'characters'}
		{#if $charactersStore.length > 0}
			<Characters />
		{/if}
	{:else if $layoutToShow === 'ressources'}
		<Ressources />
	{/if}

	<a href="https://github.com/Franchills/genshin-materials/blob/master/CHANGELOG.md#changelog" target="_blank">
		<app-version>{version} <change-log>?</change-log></app-version>
	</a>
</main>

<style>
	app-version {
		display: flex;
		position: fixed;
		bottom: 0;
		right: 0;
		background-color: rgb(80, 168, 255);
		color: aliceblue;
		padding: 0.25rem 0.75rem;
		margin: 0.5rem;
		border-radius: 50px;
		font-weight: 700;

		padding-right: 6px;

		align-items: center;
		justify-content: center;

		cursor: pointer;

		animation: cycleColor 600s infinite;
	}

	change-log {
		border: 3px solid #fff;
		border-radius: 50px;
		height: 24px;
		width: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: 0.5rem;
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
