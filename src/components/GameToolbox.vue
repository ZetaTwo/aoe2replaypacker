<script setup lang="ts">
import { useGamesStore } from '@/stores/games'

const gamesStore = useGamesStore()

const { gameIndex, showClear = true } = defineProps<{
  gameIndex: number
  showClear?: boolean
}>()
</script>
<template>
  <div class="flex justify-end">
    <button
      v-if="showClear"
      class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-hidden focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
      type="button"
      title="Clear info"
      @click="gamesStore.clearGame(gameIndex)"
    >
      <svg
        class="w-6 h-6 inline-block"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 1920 1920"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M790.589 1750.588v56.471h56.47V1920H677.647v-169.412h112.942Zm417.794 56.471V1920h-180.662v-112.941h180.662Zm361.433 0V1920h-180.662v-112.941h180.662ZM1920 1750.588V1920h-169.412v-112.941h56.471v-56.471H1920ZM1581.177 338.824v225.882h-112.942V451.765H451.765v1016.47h112.941v112.942H338.824V338.824h1242.353ZM1920 1389.265v180.662h-112.941v-180.662H1920Zm-1129.412-.111v180.662H677.647v-180.662h112.941ZM1242.353 0v225.882h-112.941v-112.94H112.941v1016.47h112.941v112.94H0V0h1242.353ZM1920 1027.831v180.661h-112.941v-180.661H1920Zm-1129.412-.11v180.662H677.647v-180.662h112.941ZM1920 677.647v169.412h-112.941v-56.47h-56.471V677.647H1920Zm-1072.942 0v112.942h-56.47v56.47h-112.94V677.647h169.41Zm361.434 0v112.941h-180.661V677.647h180.661Zm361.435 0v112.941h-180.662V677.647h180.662Z"
          fill-rule="evenodd"
        ></path>
      </svg>
      <span class="h-6 p-3">Clear info</span>
    </button>
    <button
      class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-hidden focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
      type="button"
      title="Remove game"
      @click="gamesStore.removeGame(gameIndex)"
    >
      <svg
        class="w-6 h-6 text-red-400 dark:text-red-300 inline-block"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M4 7H20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        <path
          d="M6 10L7.70141 19.3578C7.87432 20.3088 8.70258 21 9.66915 21H14.3308C15.2974 21 16.1257 20.3087 16.2986 19.3578L18 10"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
        <path
          d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
      <span class="h-6 p-3">Remove game</span>
    </button>
  </div>
</template>
