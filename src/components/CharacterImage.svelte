<script lang="ts">
	export let characterId
</script>

<character-image>
	<img src="/images/characters/{characterId}.webp" alt="" />
</character-image>

<style>

	character-image{
		display: flex;
		align-self: end;
		width: 100px;
	}
	img {
		width: 100%;
	}
</style>
