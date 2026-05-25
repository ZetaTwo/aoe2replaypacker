<script setup lang="ts">
import GameActions from './GameActions.vue'
import type { Game } from '@/entities/game'

const props = defineProps<{
  index: number
  numGames: number
  game: Game
}>()
</script>
<template>
  <div>
    <GameActions class="absolute right-0 top-1" :game-index="props.index" :show-clear="false" />
    <h3 class="text-center text-2xl">Game {{ props.index + 1 }}</h3>
    <h4 class="text-center text-lg">Placeholder game</h4>
    <p class="text-center text-sm text-gray-500 dark:text-gray-400">
      This is a placeholder for a game not played, e.g. because of an admin win, or because the set
      already has a winner from the previous games.
    </p>
    <p class="text-center text-sm text-gray-500 dark:text-gray-400">
      <strong
        >The replay packer will automatically generate a savegame to avoid spoilers for
        casters.</strong
      >
    </p>
  </div>
</template>
