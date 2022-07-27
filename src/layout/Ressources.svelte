<script>
	import { getAllDataFromLs } from '../services/materialStorage.service'

	import MaterialGrid from '../components/MaterialGrid.svelte'

	let materialData = getAllDataFromLs()
</script>

<MaterialGrid gridName="Mob Materials" materialData={materialData.mob} materialType="mob" />
<MaterialGrid gridName="Weekly Boss Materials" materialData={materialData.bigBoss} materialType="bigBoss" />
<MaterialGrid gridName="Boss Materials" materialData={materialData.boss} materialType="boss" />
<MaterialGrid gridName="Gem Materials" materialData={materialData.gem} materialType="gem" />
<MaterialGrid gridName="Talent Materials" materialData={materialData.talentBook} materialType="talentBook" />

<MaterialGrid gridName="Natural Materials" materialData={materialData.natural} materialType="natural" />
