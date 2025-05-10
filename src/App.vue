<script setup lang="ts">
import InstructionBox from '@/components/InstructionBox.vue'
import ReplayForm from '@/components/ReplayForm.vue'
import tournamentsData from 'virtual:tournaments-data'
import type { Tournament } from 'virtual:tournaments-data'

const getPresets = (
  params: URLSearchParams,
  tournament?: Tournament
): [string[] | null, string[] | null] => {
  const civDraftPresets = params.get('civpresets')?.split(',') || []
  const mapDraftPresets = params.get('mappresets')?.split(',') || []
  if (tournament) {
    civDraftPresets.push(...Object.values(tournament.civs))
    mapDraftPresets.push(...Object.values(tournament.maps))
  }
  return [
    civDraftPresets.length > 0 ? civDraftPresets : null,
    mapDraftPresets.length > 0 ? mapDraftPresets : null
  ]
}

const getTournament = (params: URLSearchParams): Tournament | undefined => {
  const tournamentId = params.get('tournament')
  if (!tournamentId) {
    return
  }
  return tournamentsData[tournamentId]
}

const getTournamentTitle = (tournament?: Tournament) => {
  if (!tournament) {
    return null
  }
  return tournament.name
}

const urlParams = new URLSearchParams(window.location.search)
const tournament: Tournament | undefined = getTournament(urlParams)
const [civDraftPresets, mapDraftPresets] = getPresets(urlParams, tournament)
const tournamentTitle = getTournamentTitle(tournament)
</script>

<template>
  <div class="lg:container lg:mx-auto lg:max-w-(--breakpoint-lg)">
    <main class="mt-10">
      <InstructionBox :tournament-title="tournamentTitle" />
      <ReplayForm
        :civ-presets="civDraftPresets"
        :map-presets="mapDraftPresets"
        :tournament="tournament"
      />
    </main>
    <footer>
      <div class="text-center p-4 border-2 rounded-lg col-span-3 mt-4">
        <p>
          Created by <a class="underline" href="https://github.com/ZetaTwo">ZetaTwo</a> &amp;
          <a class="underline" href="https://github.com/Kjir">Beargwyn</a> -
          <a class="underline" href="https://github.com/ZetaTwo/aoe2replaypacker">Source code</a> -
          <a class="underline" href="https://forms.gle/NDKqE8acLdYR2JrKA">Report an issue</a>
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped></style>
