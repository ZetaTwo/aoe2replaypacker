<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { Game } from '../entities/game'

defineProps<{
  replayNumber: number
  game: Game
}>()

const emit = defineEmits<{
  removeReplay: []
  updateReplay: [file: File | null]
}>()

const replayFile: Ref<File | null> = ref(null)
const fileInput = ref<HTMLInputElement | null>(null)

function changeReplay(event: Event) {
  const files = (event.target as HTMLInputElement).files
  if (!files) {
    replayFile.value = null
    return
  }
  const file = files[0]
  replayFile.value = file
  emit('updateReplay', file)
}
function clearFile() {
  replayFile.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
  emit('updateReplay', null)
}
</script>

<template>
  <div class="grid grid-cols-3 divide-x-2">
    <div class="p-4 col-span-2">
      <input ref="fileInput" accept=".aoe2record" type="file" @change="changeReplay($event)" />
    </div>
    <div class="p-4 col-span-1">
      <button v-if="replayFile" @click="clearFile" class="btn btn-gray">Clear file</button>
      <button
        v-else-if="game.replays.length == 1"
        @click="$emit('removeReplay')"
        class="btn btn-gray"
      >
        Remove game
      </button>
      <button v-else @click="$emit('removeReplay')" class="btn btn-gray">Remove replay</button>
    </div>
  </div>
</template>
