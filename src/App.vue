<script setup lang="ts">
import PackerInstructions from '@/components/packer/PackerInstructions.vue'
import PackerForm from '@/components/packer/PackerForm.vue'
import BaseCard from '@/components/common/BaseCard.vue'
import tournamentsData from 'virtual:tournaments-data'
import type { Tournament } from 'virtual:tournaments-data'

const getPresets = (
  params: URLSearchParams,
  tournament?: Tournament
): [string[] | null, string[] | null] => {
  const civDraftPresets = params.get('civpresets')?.split(',') || []
  const mapDraftPresets = params.get('mappresets')?.split(',') || []
  if (tournament) {
    civDraftPresets.push(...Object.values(tournament.civs).flat())
    mapDraftPresets.push(...Object.values(tournament.maps).flat())
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
  <div :class="$style.container">
    <main :class="$style.main">
      <PackerInstructions :tournament-title="tournamentTitle" />
      <PackerForm
        :civ-presets="civDraftPresets"
        :map-presets="mapDraftPresets"
        :tournament="tournament"
      />
    </main>
    <footer>
      <BaseCard align="center" spacing="top">
        <p>
          Created by <a :class="$style.link" href="https://github.com/ZetaTwo">ZetaTwo</a> &amp;
          <a :class="$style.link" href="https://github.com/Kjir">Beargwyn</a> -
          <a :class="$style.link" href="https://github.com/ZetaTwo/aoe2replaypacker">Source code</a>
          -
          <a :class="$style.link" href="https://forms.gle/NDKqE8acLdYR2JrKA">Report an issue</a>
        </p>
      </BaseCard>
    </footer>
  </div>
</template>

<style module>
@media (min-width: 1024px) {
  .container {
    margin-left: auto;
    margin-right: auto;
    max-width: var(--container-max-width);
  }
}
.main {
  margin-top: var(--space-10);
}
.link {
  text-decoration: underline;
}
</style>
