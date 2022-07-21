<script>
	import Material from '../components/Material.svelte'
</script>

<h1>Mob Materials</h1>

<mob-materials class="grid">
	<Material materialData={{ name: 'slime', type: 'mob', lvl: 0 }} />
	<Material materialData={{ name: 'slime', type: 'mob', lvl: 1 }} />
	<Material materialData={{ name: 'slime', type: 'mob', lvl: 2 }} />
</mob-materials>

<style>
	*.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(80px, 80px));
	}
</style>
