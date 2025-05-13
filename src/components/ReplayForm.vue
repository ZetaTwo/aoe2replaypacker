<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Ref } from 'vue'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import type { Tournament } from 'virtual:tournaments-data'

import GameInfo from './GameInfo.vue'
import SetInfo from './SetInfo.vue'
import TournamentSet from './TournamentSet.vue'
import GameDropzone from './GameDropzone.vue'
import GameTable from './GameTable.vue'
import ZipPreviewPane from './ZipPreviewPane.vue'
import RecentDrafts from './RecentDrafts.vue'
import DiscordMessage from './DiscordMessage.vue'
import ToggleButton from '@/components/ToggleButton.vue'
import { useGamesStore } from '@/stores/games'
import type { ReplayMetadata, ReplayErrors } from '../entities/gamemeta'
import { MatchSetDefinition, MatchSetType } from '@/entities/matchset'

import { zipFilename, computeReplayFilename, Player } from '@/entities/game'
import { extractDraftUrl } from '../entities/draft'
import { getRandomInt } from '../lib/maths'

const props = defineProps<{
  civPresets: string[] | null
  mapPresets: string[] | null
  tournament?: Tournament
}>()

const gamesStore = useGamesStore()

const player1 = ref('Player1')
const player2 = ref('Player2')
const boPa = ref<MatchSetType | null>(null)
const expectedGamesCount = ref<number>(0)
const mapDraft: Ref<string> = ref('')
const civDraft: Ref<string> = ref('')
const meta: Ref<ReplayMetadata> = ref({
  maps: null,
  civs: null,
  player1_score: null,
  player2_score: null
})
const metaErrors: Ref<ReplayErrors> = ref({ maps: null, civs: null })
const showResults = ref(true)

const setTypeRestrictions = computed((): MatchSetDefinition[] | undefined => {
  if (!props.tournament) {
    return
  }
  return [...new Set(Object.keys(props.tournament.maps).map(MatchSetDefinition.parse))]
})

const downloadWarningReplayMissing = computed(() => {
  if (boPa.value == MatchSetType.BestOf) {
    return false
  }

  for (const game of gamesStore.games) {
    for (const replay of game.replays) {
      if (!replay.file) {
        return true
      }
    }
  }

  return false
})

const winCount = computed(() => {
  return gamesStore.games.reduce(
    (count, game) => {
      if (game.winner.side == 'none') {
        return count
      }
      return {
        ...count,
        [game.winner.firstPlayer.profile]: (count[game.winner.firstPlayer.profile] ?? 0) + 1
      }
    },
    {} as Record<Player['profile'], number>
  )
})

const playerSide = computed(() => {
  if (
    gamesStore.games.length == 0 ||
    !gamesStore.games[0].teams ||
    gamesStore.games[0].teams.length < 2
  ) {
    return ''
  }
  const isPlayer = (draftPlayer: typeof player1 | typeof player2) => (player: Player) =>
    player.name.toLowerCase().includes(draftPlayer.value.toLowerCase()) ||
    draftPlayer.value.toLowerCase().includes(player.name.toLowerCase())
  for (const game of gamesStore.games) {
    if (game.isUnparseable() || game.isDummy()) {
      continue
    }
    const profile1 = game.teams?.[0].asGameWinner('left').firstPlayer?.profile
    const profile2 = game.teams?.[game.teams.length - 1].asGameWinner('right').firstPlayer?.profile
    const first_team_p1_match = game.teams?.[0].players.find(isPlayer(player1))
    if (first_team_p1_match) {
      return { left: profile1, right: profile2 }
    }
    const last_team_p2_match = game.teams?.[game.teams.length - 1].players.find(isPlayer(player2))
    if (last_team_p2_match) {
      return { left: profile1, right: profile2 }
    }
    const fist_team_p2_match = game.teams?.[0].players.find(isPlayer(player2))
    if (fist_team_p2_match) {
      return { left: profile2, right: profile1 }
    }
    const last_team_p1_match = game.teams?.[game.teams.length - 1].players.find(isPlayer(player1))
    if (last_team_p1_match) {
      return { left: profile2, right: profile1 }
    }
  }
  for (const game of gamesStore.games) {
    if (game.isUnparseable() || game.isDummy()) {
      continue
    }
    return {
      left: game.teams![0].asGameWinner('left').firstPlayer?.profile,
      right: game.teams![game.teams!.length - 1].asGameWinner('left').firstPlayer?.profile
    }
  }
  return { left: '__dummy1__', right: '__dummy2__' }
})
const leftScore = computed(() => {
  if (!playerSide.value) {
    return 0
  }
  return (winCount.value[playerSide.value.left ?? ''] ?? 0) + (winCount.value['__dummy1__'] ?? 0)
})
const rightScore = computed(() => {
  if (!playerSide.value) {
    return 0
  }
  return (winCount.value[playerSide.value.right ?? ''] ?? 0) + (winCount.value['__dummy2__'] ?? 0)
})

watch([leftScore, rightScore], ([newLeftScore, newRightScore], [oldLeftScore, oldRightScore]) => {
  if (newLeftScore == oldLeftScore && newRightScore == oldRightScore) {
    return
  }

  if (newLeftScore == 0 && newRightScore == 0) {
    meta.value.player1_score = null
    meta.value.player2_score = null
    return
  }

  meta.value.player1_score = newLeftScore
  meta.value.player2_score = newRightScore
})

const downloadWarningScore = computed(() => {
  if (boPa.value == MatchSetType.PlayAll) {
    return false
  }

  if (2 * leftScore.value > gamesStore.games.length + 1) {
    return true
  }
  if (2 * rightScore.value > gamesStore.games.length + 1) {
    return true
  }

  return false
})

const downloadWarningCivDraftMissing = computed(() => {
  if (!props.civPresets || props.civPresets.length == 0) {
    return false
  }

  if (civDraft.value.length > 0) {
    return false
  }

  return true
})

const downloadWarningMapDraftMissing = computed(() => {
  if (!props.mapPresets || props.mapPresets.length == 0) {
    return false
  }

  if (mapDraft.value.length > 0) {
    return false
  }

  return true
})

const downloadDisabledMessage = computed(() => {
  if (metaErrors.value.civs || metaErrors.value.maps) {
    return 'The draft links have some issues'
  }

  // Force civ draft entry if preset is specified
  /*if (props.civPresets && !meta.value.civs) {
    return false
  }*/

  // Force map draft entry if preset is specified
  /*if (props.mapPresets && !meta.value.maps) {
    return false
  }*/

  // If Best of/Play all and number of games was not selected
  if (boPa.value == null || expectedGamesCount.value == 0) {
    return 'You must choose the type of set (e.g. Best of 5)'
  }

  for (const game of gamesStore.games) {
    for (const replay of game.replays) {
      if (replay.file) {
        return null
      }
    }
  }

  return 'Replays are missing'
})

const downloadEnabled = computed(() => downloadDisabledMessage.value == null)

function setExpectedGamesCount(count: number) {
  gamesStore.setGamesNumber(count)
  expectedGamesCount.value = count
}

function getFirstReplayFile(): File | null {
  for (const game of gamesStore.games) {
    for (const replay of game.replays) {
      if (replay.file) {
        return replay.file
      }
    }
  }
  return null
}

function downloadZip() {
  const zip = new JSZip()
  const zipComment = 'Generated by https://replaypacker.zeta-two.com'

  const dummyBase = getFirstReplayFile()
  if (!dummyBase) {
    console.error('Could not find any valid replay files')
    return
  }

  for (const [gameIdx, game] of gamesStore.games.entries()) {
    if (game.isDummy()) {
      const replay_filename = computeReplayFilename(player1.value, player2.value, game, gameIdx, 0)
      const suffixArray = new Uint8Array(getRandomInt(1e5, 3e6))
      //window.crypto.getRandomValues(array);
      const dummyFile = new Blob([dummyBase, suffixArray])
      zip.file(replay_filename, dummyFile)
    } else {
      for (const [replayIdx, replay] of game.replays.entries()) {
        const replay_filename = computeReplayFilename(
          player1.value,
          player2.value,
          game,
          gameIdx,
          replayIdx
        )
        zip.file(replay_filename, replay.file)
      }
    }
  }
  const metaFile = new Blob([JSON.stringify(meta.value)], { type: 'application/json' })
  zip.file('metadata.json', metaFile)

  zip
    .generateAsync({
      type: 'blob',
      comment: zipComment,
      compression: 'DEFLATE',
      compressionOptions: {
        level: 6
      }
    })
    .then(function (blob) {
      saveAs(blob, zipFilename(player1.value, player2.value))
    })
}

const discordMessage = computed(() => {
  const boPaLabel = boPa.value?.toString() ?? 'Best of' // TODO: should there be a default value?
  const scorePreview = showResults.value ? `|| ${leftScore.value} - ${rightScore.value} ||` : 'vs'
  return `${player1.value} ${scorePreview} ${player2.value}
${boPaLabel} ${expectedGamesCount.value}
Map draft: ${extractDraftUrl(mapDraft.value)}
Civ draft: ${extractDraftUrl(civDraft.value)}`
})

function updateMeta(newErrors: ReplayErrors, newMeta: ReplayMetadata) {
  // Guess set length based on map draft
  if (!props.tournament && newMeta?.maps?.pickedMaps?.length) {
    const numOfMaps = newMeta.maps.pickedMaps.length
    if (numOfMaps % 2 == 0) {
      setExpectedGamesCount(numOfMaps + 1)
    } else {
      setExpectedGamesCount(numOfMaps)
    }
  }

  meta.value = newMeta
  metaErrors.value = newErrors

  if (!props.tournament || !meta.value.maps?.preset) {
    return
  }

  const presetToSetType: Record<string, MatchSetDefinition> = Object.fromEntries(
    Object.entries(props.tournament.maps).map(([setType, preset]) => [
      preset,
      MatchSetDefinition.parse(setType)
    ])
  )

  if (!(meta.value.maps.preset in presetToSetType)) {
    console.error('Map preset is not in the tournament set, but it should')
    return
  }

  const setDefinition = presetToSetType[meta.value.maps.preset]
  setExpectedGamesCount(setDefinition.length)
  boPa.value = setDefinition.type
}
</script>

<template>
  <Suspense>
    <RecentDrafts
      v-if="mapPresets || civPresets"
      :civ-presets="civPresets"
      :map-presets="mapPresets"
      v-model:map-draft="mapDraft"
      v-model:civ-draft="civDraft"
    />
    <template #fallback>
      <div class="text-center p-4 border-2 col-span-3 mt-4 h-80">Loading Drafts...</div>
    </template>
  </Suspense>
  <GameInfo
    :expected-games-count="expectedGamesCount"
    v-model:player1="player1"
    v-model:player2="player2"
    v-model:map-draft="mapDraft"
    v-model:civ-draft="civDraft"
    :civ-presets="civPresets"
    :map-presets="mapPresets"
    :bo-pa="boPa"
    @update-meta="updateMeta"
  />

  <SetInfo
    v-if="!setTypeRestrictions"
    :games-count="expectedGamesCount"
    @set-games="setExpectedGamesCount"
    @set-bo-pa="(newBoPa) => (boPa = newBoPa)"
  />
  <TournamentSet
    v-else
    :set-types="setTypeRestrictions"
    :type="boPa"
    :length="expectedGamesCount"
    @set-games="setExpectedGamesCount"
    @set-bo-pa="(newBoPa) => (boPa = newBoPa)"
  />

  <ToggleButton class="mt-4" label="Show results (spoilers)" v-model="showResults" />

  <GameDropzone />
  <GameTable :show-results="showResults" />

  <div id=" message_box" class="mt-4 text-center p-4 border-2 rounded-lg col-span-3 hidden"></div>
  <div class="text-center p-4 border-2 rounded-lg col-span-3 mt-4">
    <ZipPreviewPane :games="gamesStore.games" :player1="player1" :player2="player2" :meta="meta" />
    <button
      :disabled="!downloadEnabled"
      class="btn text-2xl text-white dark:text-black"
      :class="{
        'bg-blue-500': downloadEnabled,
        'bg-blue-200': !downloadEnabled,
        'dark:bg-blue-700': downloadEnabled,
        'dark:bg-blue-300': !downloadEnabled
      }"
      @click="downloadZip"
    >
      Download
    </button>
    <div
      v-if="!downloadEnabled"
      class="p-2 mt-4 text-sm text-amber-800 rounded-lg bg-ruby-100 dark:bg-ruby-400 dark:text-ruby-800"
    >
      {{ downloadDisabledMessage }}
    </div>
    <div
      v-if="downloadWarningReplayMissing"
      class="p-2 mt-4 text-sm text-amber-800 rounded-lg bg-amber-100 dark:bg-amber-400 dark:text-amber-800"
    >
      WARNING: You have selected "play all" but not provided all replays.
    </div>
    <div
      v-if="downloadWarningCivDraftMissing"
      class="p-2 mt-4 text-sm text-amber-800 rounded-lg bg-amber-100 dark:bg-amber-400 dark:text-amber-800"
    >
      WARNING: You have not provided a civilization draft link.
    </div>
    <div
      v-if="downloadWarningMapDraftMissing"
      class="p-2 mt-4 text-sm text-amber-800 rounded-lg bg-amber-100 dark:bg-amber-400 dark:text-amber-800"
    >
      WARNING: You have not provided a map draft link.
    </div>
    <div
      v-if="downloadWarningScore"
      class="p-2 mt-4 text-sm text-amber-800 rounded-lg bg-amber-100 dark:bg-amber-400 dark:text-amber-800"
    >
      WARNING: The score does not make sense for a best-of set.
    </div>
  </div>

  <DiscordMessage :discord-message="discordMessage" />
</template>
