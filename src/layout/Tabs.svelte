<script lang="ts">
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()
</script>

<tabs-svelte>
	<button on:click={() => dispatch('changeLayout', 'characters')}>Characters</button>
	<button on:click={() => dispatch('changeLayout', 'ressources')}>Ressources</button>
</tabs-svelte>

<style>
	tabs-svelte {
		display: flex;
		justify-content: space-around;
	}

	button {
    cursor: pointer;
		width: 100%;
		padding: 0.5rem;
		font-size: 1rem;
		border-radius: 0;
		border: solid 1px #ccc;
		background-color: #eee;
	}
</style>
