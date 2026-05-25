<script setup lang="ts">
import CivIcon from '@/components/common/CivIcon.vue'
import PlayerColor from '@/components/common/PlayerColor.vue'
import type { Team } from '@/entities/game'

const { team } = defineProps<{
  team: Team
  position: 'left' | 'right'
}>()
</script>

<template>
  <div class="rounded-lg flex flex-col justify-stretch">
    <template v-if="position == 'left'">
      <div
        v-for="player in team.players"
        :key="player.profile"
        class="flex items-center justify-end gap-4"
      >
        <div class="grow text-center overflow-hidden text-ellipsis font-medium dark:text-white">
          <a
            :href="`https://aoe2insights.com/user/relic/${player.profile}`"
            class="text-blue-500 dark:text-blue-400 hover:underline"
            target="_blank"
            >{{ player.name }}</a
          >
        </div>
        <CivIcon :civ="player.civ.toLowerCase()" class="w-10 h-10 rounded-full" />
        <PlayerColor :color="player.color ?? 0" class="w-9 h-9" />
      </div>
    </template>
    <template v-if="position == 'right'">
      <div
        v-for="player in team.players"
        :key="player.profile"
        class="flex justify-start items-center gap-4"
      >
        <PlayerColor :color="player.color ?? 0" class="w-9 h-9" />
        <CivIcon :civ="player.civ.toLowerCase()" class="w-10 h-10 rounded-full" />
        <div class="grow text-center overflow-hidden text-ellipsis font-medium dark:text-white">
          <a
            :href="`https://aoe2insights.com/user/relic/${player.profile}`"
            class="text-blue-500 dark:text-blue-400 hover:underline"
            target="_blank"
            >{{ player.name }}</a
          >
        </div>
      </div>
    </template>
  </div>
</template>
