<script>
	import { getAllDataFromLs } from '../services/localStorage.service'

	import { onMount } from 'svelte'
	import MaterialGrid from '../components/MaterialGrid.svelte'

	let materialData = undefined

	onMount(() => {
		getAllDataFromLs().then(data => {
			materialData = data
		})
	})
</script>

{#if materialData}
	<MaterialGrid gridName="Mob Materials" materialData={materialData.mob} materialType="mob" />
	<MaterialGrid gridName="Boss Materials" materialData={materialData.boss} materialType="boss" />
	<MaterialGrid gridName="Natural Materials" materialData={materialData.natural} materialType="natural" />
	<MaterialGrid gridName="Weekly Boss Materials" materialData={materialData.bigBoss} materialType="bigBoss" />
	<MaterialGrid gridName="Gem Materials" materialData={materialData.gem} materialType="gem" />
	<MaterialGrid gridName="Talent Materials" materialData={materialData.talentBook} materialType="talentBook" />
	<MaterialGrid gridName="Crown Materials" materialData={materialData.crown} materialType="crown" />
{/if}