<script setup lang="ts">
import { ref } from 'vue'
import ExpandButton from '@/components/common/ExpandButton.vue'

const expanded = ref(false)
defineProps<{
  tournamentTitle: string | null
}>()
</script>

<template>
  <div class="p-4 border-2 rounded-lg col-span-3 mb-4">
    <h1 class="text-3xl text-center">AoE2 Replay Pack Generator</h1>
    <h2 v-if="tournamentTitle" class="text-2xl text-center">{{ tournamentTitle }}</h2>
    <p>
      This page will help you create a zip file of replays for submitting your AoE2 match results.
    </p>
    <expand-button v-model="expanded" open-text="Show Help" close-text="Hide Help" />
    <div
      :class="expanded ? ['max-h-screen'] : ['max-h-0']"
      class="mt-2 transition-max-height overflow-hidden duration-1000"
    >
      <p>To use it follow, these simple steps:</p>
      <ol class="mt-2 list-decimal list-inside">
        <li>If applicable, fill out map and civ drafts</li>
        <li>Unless already done via the draft, fill out the player names</li>
        <li>
          Add replays by clicking the add replay button and navigating to the replay directory
          <ol class="list-decimal list-inside ml-4" type="a">
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
      <p class="mt-2">
        Note: You only need to select actual game replays. The tool will add automatically generate
        dummy files as needed.
      </p>
      <p class="mt-2">
        Technical note: All of this is done in your browser, no data is uploaded anywhere.
      </p>
    </div>
  </div>
</template>
