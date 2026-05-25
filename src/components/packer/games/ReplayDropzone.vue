<script setup lang="ts">
import { useGamesStore } from '@/stores/games'

const gamesStore = useGamesStore()

function changeReplay(event: Event) {
  const target = event.target as HTMLInputElement
  if (!target.files) {
    return
  }
  addFiles(target.files)
  target.value = ''
}

function handleDrop(event: DragEvent) {
  if (!event?.dataTransfer?.files) {
    return
  }
  addFiles(event.dataTransfer.files)
}

function addFiles(files: FileList) {
  for (const file of files) {
    if (file.name.endsWith('.aoe2record')) {
      gamesStore.addRec(file)
    } else {
      gamesStore.expandArchive(file)
    }
  }
}
</script>
<template>
  <div
    class="flex items-center justify-center w-full mt-4"
    @dragenter.prevent
    @dragover.prevent
    @drop.prevent="handleDrop($event)"
  >
    <label
      for="dropzone-file"
      class="flex flex-col items-center justify-center w-full border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 border-gray-300 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
    >
      <div class="flex flex-col items-center justify-center pt-5 pb-6">
        <svg
          class="w-12 h-12 mb-4 text-gray-500 dark:text-gray-400"
          fill="currentColor"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            stroke="currentColor"
            d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M384,277.333H277.333V384 c0,11.776-9.557,21.333-21.333,21.333s-21.333-9.557-21.333-21.333V277.333H128.043c-11.776,0-21.333-9.557-21.333-21.333 s9.557-21.333,21.333-21.333h106.624V128c0-11.776,9.557-21.333,21.333-21.333s21.333,9.557,21.333,21.333v106.667H384 c11.776,0,21.333,9.557,21.333,21.333S395.776,277.333,384,277.333z"
          ></path>
        </svg>
        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
          <span class="font-semibold">Click to add replay(s)</span> or drag and drop
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400">One or multiple aoe2record savegames</p>
      </div>
      <input
        id="dropzone-file"
        accept=".aoe2record, .zip, .rar, .7z"
        multiple
        type="file"
        class="hidden"
        @change="changeReplay($event)"
      />
    </label>
  </div>
</template>
