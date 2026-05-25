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
  <div :class="$style.team">
    <template v-if="position == 'left'">
      <div v-for="player in team.players" :key="player.profile" :class="$style.rowLeft">
        <div :class="$style.name">
          <a
            :href="`https://aoe2insights.com/user/relic/${player.profile}`"
            :class="$style.link"
            target="_blank"
            >{{ player.name }}</a
          >
        </div>
        <CivIcon :civ="player.civ.toLowerCase()" :class="$style.civ" />
        <PlayerColor :color="player.color ?? 0" :class="$style.color" />
      </div>
    </template>
    <template v-if="position == 'right'">
      <div v-for="player in team.players" :key="player.profile" :class="$style.rowRight">
        <PlayerColor :color="player.color ?? 0" :class="$style.color" />
        <CivIcon :civ="player.civ.toLowerCase()" :class="$style.civ" />
        <div :class="$style.name">
          <a
            :href="`https://aoe2insights.com/user/relic/${player.profile}`"
            :class="$style.link"
            target="_blank"
            >{{ player.name }}</a
          >
        </div>
      </div>
    </template>
  </div>
</template>

<style module>
.team {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  border-radius: var(--radius-lg);
}
.rowLeft,
.rowRight {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}
.rowLeft {
  justify-content: flex-end;
}
.rowRight {
  justify-content: flex-start;
}
.name {
  flex-grow: 1;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
}
.link {
  color: var(--color-accent-text);
}
.link:hover {
  text-decoration: underline;
}
.civ {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
}
.color {
  width: 2.25rem;
  height: 2.25rem;
}
</style>
