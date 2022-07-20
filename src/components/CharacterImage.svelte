<script lang="ts">
	import getCharacterImageFn from '../functions/getCharacterImage.fn'

	export let characterId
</script>

<img src={getCharacterImageFn(characterId)} alt="" />

<style>
	img {

		height: 200px;
	}
</style>
