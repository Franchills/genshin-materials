<script lang="ts">
	export let materialData

	function getLvlImage() {
		if (['bigBoss', 'boss', 'natural'].includes(materialData.type) || materialData.name === 'crownOfInsight') {
			return ''
		} else {
			return materialData.lvl
		}
	}
</script>

<img src="/images/materials/{materialData.type}/{materialData.name}{getLvlImage()}.webp" alt="" />

<style>
	img {
		width: 64px;
		height: 64px;
	}
</style>
