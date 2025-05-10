<script setup lang="ts">
import type { SetType } from '@/entities/set'

const emit = defineEmits<{
  setGames: [number]
  setBoPa: ['best-of' | 'play-all']
}>()

const props = defineProps<{
  setTypes: SetType[] | undefined
  type: SetType['type'] | ''
  length: SetType['length']
}>()

const changeSetType = (event: Event) => {
  if (!event.target) {
    return
  }
  const [setType, setLength] = (event.target as HTMLInputElement).value.split(',')
  emit('setGames', +setLength)
  emit('setBoPa', setType as SetType['type'])
}
</script>
<template>
  <div class="mt-4 text-center">
    <ul class="w-full gap-6 flex flex-row justify-center">
      <li class="basis-2/11" v-for="setType in props.setTypes" :key="setType.label">
        <input
          type="radio"
          :id="`${setType.type}-${setType.length}`"
          @change="changeSetType"
          :value="`${setType.type},${setType.length}`"
          :checked="props.type == setType.type && props.length == setType.length"
          class="hidden peer"
          required
        />
        <label
          :for="`${setType.type}-${setType.length}`"
          class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <div class="block w-full">
            <div class="text-center w-full text-lg font-semibold">{{ setType.label }}</div>
          </div>
        </label>
      </li>
    </ul>
  </div>
</template>
