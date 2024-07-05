<script setup lang="ts">
import { computed } from 'vue'
import { extractDraftId } from '../utils'

const props = defineProps<{
  civPresets: string[] | null
  mapPresets: string[] | null
}>()
const mapPresets = props.mapPresets ?? []
const civPresets = props.civPresets ?? []

const mapDraftURI = defineModel<string>('mapDraft')
const civDraftURI = defineModel<string>('civDraft')

const mapDraftId = computed(() => extractDraftId(mapDraftURI.value))
const civDraftId = computed(() => extractDraftId(civDraftURI.value))

type draft = {
  draftId: string
  presetId: string
  title: string
  nameHost: string
  nameGuest: string
}

const recentDrafts = await (async () => {
  const response = await fetch('https://aoe2cm.net/api/recentdrafts')
  const drafts = (await response.json()) as draft[]
  return drafts.filter(
    (draft) => civPresets.includes(draft.presetId) || mapPresets.includes(draft.presetId)
  )
})()
console.log(recentDrafts)

const selectDraft = (draft: draft) => {
  if (mapPresets.includes(draft.presetId)) {
    if (mapDraftURI.value == draft.draftId) {
      mapDraftURI.value = ''
    } else {
      mapDraftURI.value = draft.draftId
    }
  } else {
    if (civDraftURI.value == draft.draftId) {
      civDraftURI.value = ''
    } else {
      civDraftURI.value = draft.draftId
    }
  }
}
</script>

<template>
  <div class="text-center p-4 border-2 col-span-3 mt-4 h-80 overflow-auto">
    <h2 class="text-center text-2xl">Recent Drafts</h2>
    <ul role="list" class="divide-y divide-gray-100">
      <li class="flex justify-between" v-for="draft in recentDrafts" :key="draft.draftId">
        <button
          class="flex-auto text-start hover:bg-slate-100"
          :class="{ 'bg-slate-300': [mapDraftId, civDraftId].includes(draft.draftId) }"
          @click="selectDraft(draft)"
        >
          <div class="min-w-100 flex-auto">
            <span class="text-sm font-semibold leading-6 text-gray-900">{{ draft.nameHost }}</span>
            <span class="mt-1 truncate text-xs leading-5 text-gray-500 m-3">vs</span>
            <span class="text-sm font-semibold leading-6 text-gray-900">{{ draft.nameGuest }}</span>
            <span class="mt-1 truncate text-xs leading-5 text-gray-500 m-3"
              >{{ draft.title }} ({{ draft.draftId }})</span
            >
          </div>
        </button>
      </li>
    </ul>
    <!-- <p v-for="draft in recentDrafts">{{ draft.title }} - {{ draft.nameHost }} vs {{ draft.nameGuest }} - -->
    <!--   {{ draft.draftId }}</p> -->
  </div>
</template>
