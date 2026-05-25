<script setup lang="ts">
import { watch, ref } from 'vue'
import { MatchSetDefinition, MatchSetType } from '@/entities/matchset'

const emit = defineEmits<{
  setGames: [number]
  setBoPa: [MatchSetType]
}>()

const props = defineProps<{
  setTypes: MatchSetDefinition[] | undefined
  type: MatchSetType | null
  length: number
}>()

const chosenSetDefinition = ref<MatchSetDefinition | null>(null)

watch(
  () => [props.type, props.length],
  ([newType, newLength], [oldType, oldLength]) => {
    if (newType == oldType && newLength == oldLength) {
      return
    }

    for (const candidateType of props.setTypes ?? []) {
      if (candidateType.length == newLength && candidateType.type == newType) {
        chosenSetDefinition.value = candidateType
        return
      }
    }
  }
)

watch(chosenSetDefinition, (newType, oldType) => {
  if (newType == null) {
    return
  }
  if (newType == oldType) {
    return
  }

  emit('setGames', newType.length)
  emit('setBoPa', newType.type)
})
</script>
<template>
  <div :class="$style.wrap">
    <ul :class="$style.list">
      <li v-for="setType in props.setTypes" :key="setType.label()" :class="$style.cell">
        <input
          :id="`${setType.type}-${setType.length}`"
          v-model="chosenSetDefinition"
          name="set-definition"
          type="radio"
          :value="setType"
          :class="$style.input"
          required
        />
        <label :for="`${setType.type}-${setType.length}`" :class="$style.tile">
          <div :class="$style.tileLabel">{{ setType.label() }}</div>
        </label>
      </li>
    </ul>
  </div>
</template>

<style module>
.wrap {
  margin-top: var(--space-4);
  text-align: center;
}
.list {
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: var(--space-6);
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0;
}
.cell {
  flex-basis: 18.18%;
}
.input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
.tile {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: var(--space-4);
  background-color: var(--color-bg-card);
  color: var(--color-text-muted);
  border: 2px solid var(--color-border-default);
  border-radius: var(--radius-lg);
  cursor: pointer;
}
.tile:hover {
  background-color: var(--color-bg-hover);
  color: var(--color-text-secondary);
}
.input:checked + .tile {
  color: var(--color-accent-text);
  border-color: var(--color-border-accent);
}
.tileLabel {
  text-align: center;
  width: 100%;
  font-size: var(--font-size-lg);
  font-weight: 600;
}
</style>
