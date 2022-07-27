<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import DownloadFile from '../icons/DownloadFile.svelte'
	import UploadFile from '../icons/UploadFile.svelte'

	const dispatch = createEventDispatcher()

	function exportData() {
		let data = {
			ressources: JSON.parse(localStorage.getItem('ressources')) || {},
			characters: JSON.parse(localStorage.getItem('characters')) || []
		}

		const anchor = document.createElement('a')
		anchor.href = URL.createObjectURL(new Blob([JSON.stringify(data)], { type: 'text/json' }))
		anchor.download = `genshinRessources_${new Date().getFullYear()}${
			new Date().getMonth() + 1
		}${new Date().getDate()}_${new Date().getHours()}${new Date().getMinutes()}${new Date().getSeconds()}.json`
		anchor.click()
	}

	function importData() {
		let fileInputElement = document.querySelector('#fileInput') as HTMLInputElement
		let file = fileInputElement.files[0]

		parseJsonFile(file).then((data: any) => {
			localStorage.setItem('ressources', JSON.stringify(data.ressources))
			localStorage.setItem('characters', JSON.stringify(data.characters))
			window.location.reload()
		})
	}

	function clickFileInput() {
		let fileInputElement = document.querySelector('#fileInput') as HTMLInputElement

		fileInputElement.click()
	}

	function parseJsonFile(file) {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader()
			//@ts-ignore
			fileReader.onload = event => resolve(JSON.parse(event.target.result))
			fileReader.onerror = error => reject(error)
			fileReader.readAsText(file)
		})
	}
</script>

<input type="file" id="fileInput" accept=".json" on:change={importData} />
<tabs-svelte>
	<button on:click={() => dispatch('changeLayout', 'characters')}>Characters</button>
	<button on:click={() => dispatch('changeLayout', 'ressources')}>Ressources</button>
	<button class="small" on:click={() => exportData()}>Export Data <UploadFile style="fille:#000;height: 20px;" /> </button>
	<button class="small" on:click={() => clickFileInput()}>Import Data <DownloadFile style="fille:#000;height: 20px;" /></button>
</tabs-svelte>

<style>
	tabs-svelte {
		display: flex;
	}

	button {
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		width: 100%;
		padding: 0.5rem;
		font-size: 1rem;
		border-radius: 0;
		border: solid 1px #ccc;
		background-color: #eee;
	}

	button.small {
		width: min-content;
		white-space: nowrap;
	}

	input[type='file'] {
		display: none;
	}
</style>
