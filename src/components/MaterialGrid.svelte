<script lang="ts">
	import Material from './Material.svelte'

	export let gridName
	export let materialData = []
	export let materialType
</script>

<h1>{gridName}</h1>
<mob-materials class="grid">
	{#each materialData as material, index (index)}
		{#each material.amount as mobMaterialAmount, index (index)}
			<Material materialData={{ name: material.name, type: materialType, lvl: index, amount: mobMaterialAmount }} />
		{/each}
	{/each}
</mob-materials>

<style>
	*.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(80px, 80px));
		gap: 0.25rem;
	}
</style>
