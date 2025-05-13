<script setup lang="ts">
import DummyGame from '@/components/DummyGame.vue'
import ParsedGame from '@/components/ParsedGame.vue'
import { useGamesStore } from '@/stores/games'
import type { GameWinner } from '@/entities/game'

const gamesStore = useGamesStore()

const { showResults = true } = defineProps<{
  showResults: boolean
}>()
</script>
<template>
  <div class="flex flex-col items-center gap-4 p-4 border-2 rounded-lg col-span-3 mt-4">
    <p v-if="!gamesStore.hasGames" class="text-gray-500 dark:text-gray-400">
      No games selected yet.
    </p>
    <component
      v-else
      v-for="(game, index) in gamesStore.games"
      :key="game.id"
      class="w-full p-6 bg-white border border-gray-200 rounded-lg shadow-xs dark:bg-gray-800 dark:border-gray-700 relative"
      :is="game.isDummy() ? DummyGame : ParsedGame"
      :game="game"
      :index="index"
      :num-games="gamesStore.realGamesCount"
      :show-results="showResults"
      @set-winner="(winner: GameWinner) => (game.winner = winner)"
      @move="(direction: 'up' | 'down') => gamesStore.moveGame(index, direction == 'up' ? -1 : 1)"
    >
    </component>
  </div>
</template>
