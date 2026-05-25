<script setup lang="ts">
import { useGamesStore } from '@/stores/games'
import BaseDropzone from '@/components/common/BaseDropzone.vue'

const gamesStore = useGamesStore()

function onFiles(files: FileList) {
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
  <BaseDropzone @files="onFiles" />
</template>
