<script lang="ts">
	console.clear()
	import Characters from './layout/Characters.svelte'
	import Ressources from './layout/Ressources.svelte'
	import Tabs from './layout/Tabs.svelte'

	let layoutToShow = 'characters'
</script>

<main>
	<Tabs on:changeLayout={evt => (layoutToShow = evt.detail)} />

	{#if layoutToShow === 'characters'}
		<Characters />
	{:else if layoutToShow === 'ressources'}
		<Ressources />
	{/if}
</main>

<style>
</style>
