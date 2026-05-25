<script setup lang="ts">
import { ref } from 'vue'
import ExpandButton from '@/components/common/ExpandButton.vue'
import BaseCard from '@/components/common/BaseCard.vue'

const expanded = ref(false)
defineProps<{
  tournamentTitle: string | null
}>()
</script>

<template>
  <BaseCard spacing="bottom">
    <h1 :class="$style.title">AoE2 Replay Pack Generator</h1>
    <h2 v-if="tournamentTitle" :class="$style.subtitle">{{ tournamentTitle }}</h2>
    <p>
      This page will help you create a zip file of replays for submitting your AoE2 match results.
    </p>
    <ExpandButton v-model="expanded" open-text="Show Help" close-text="Hide Help" />
    <div :class="[$style.collapse, expanded ? $style.open : $style.closed]">
      <p>To use it follow, these simple steps:</p>
      <ol :class="$style.steps">
        <li>If applicable, fill out map and civ drafts</li>
        <li>Unless already done via the draft, fill out the player names</li>
        <li>
          Add replays by clicking the add replay button and navigating to the replay directory
          <ol :class="$style.substeps" type="a">
            <li>Go to "%USERPROFILE%\Games\Age of Empires 2 DE"</li>
            <li>Click the folder with a bunch of numbers</li>
            <li>Go to the "savegame" folder</li>
          </ol>
        </li>
        <li>For each game, check that the game info is correct and select the correct winner</li>
        <li>
          Now you can download the zip file with your replays as well as copy the Discord message
          template for easy reporting of the results
        </li>
      </ol>
      <p :class="$style.note">
        Note: You only need to select actual game replays. The tool will add automatically generate
        dummy files as needed.
      </p>
      <p :class="$style.note">
        Technical note: All of this is done in your browser, no data is uploaded anywhere.
      </p>
    </div>
  </BaseCard>
</template>

<style module>
.title {
  font-size: var(--font-size-3xl);
  text-align: center;
}
.subtitle {
  font-size: var(--font-size-2xl);
  text-align: center;
}
.collapse {
  margin-top: var(--space-2);
  overflow: hidden;
  transition: max-height 1s;
}
.open {
  max-height: 100vh;
}
.closed {
  max-height: 0;
}
.steps {
  margin-top: var(--space-2);
  list-style: decimal;
  list-style-position: inside;
}
.substeps {
  list-style: decimal;
  list-style-position: inside;
  margin-left: var(--space-4);
}
.note {
  margin-top: var(--space-2);
}
</style>
