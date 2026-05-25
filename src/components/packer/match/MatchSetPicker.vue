<script setup lang="ts">
import { ref, watch } from 'vue'
import { MatchSetType } from '@/entities/matchset'

const emit = defineEmits<{
  setGames: [number]
  setBoPa: [MatchSetType]
}>()

const props = defineProps<{
  gamesCount: number
}>()

const customGameCount = ref(9)
const bestOf = ref<number | 'custom'>(props.gamesCount)
const boPa = ref<MatchSetType | null>(null)

watch(customGameCount, async (newCount, oldCount) => {
  if (newCount == oldCount) {
    return
  }
  if (newCount < 0) {
    customGameCount.value = 0
    return
  }
  if (newCount > 99) {
    customGameCount.value = 99
    return
  }
  if (bestOf.value != 'custom') {
    return
  }
  emit('setGames', newCount)
})

watch(
  () => props.gamesCount,
  (newGamesCount, oldGamesCount) => {
    if (newGamesCount == oldGamesCount) {
      return
    }

    if (bestOf.value != newGamesCount) {
      customGameCount.value = newGamesCount
    }

    if (bestOf.value != 'custom' && [3, 5, 7].includes(newGamesCount)) {
      bestOf.value = newGamesCount
    } else {
      bestOf.value = 'custom'
    }
  }
)

watch(bestOf, (newBestOf, oldBestOf) => {
  if (newBestOf == oldBestOf) {
    return
  }
  if (newBestOf == 'custom') {
    emit('setGames', customGameCount.value)
  } else {
    emit('setGames', newBestOf)
  }
})

watch(boPa, (newBoPa, oldBoPa) => {
  if (newBoPa == oldBoPa) {
    return
  }
  if (newBoPa == null) {
    return
  }
  emit('setBoPa', newBoPa)
})
</script>
<template>
  <div :class="$style.wrap">
    <ul :class="$style.list">
      <li :class="$style.bopaCell">
        <div>
          <div :class="$style.half">
            <input
              id="best-of"
              v-model="boPa"
              type="radio"
              name="bo-pa"
              :class="$style.input"
              :value="MatchSetType.BestOf"
            />
            <label for="best-of" :class="[$style.tile, $style.leftJoin]">
              <div :class="$style.tileLabel">Best of</div>
            </label>
          </div>
          <div :class="$style.half">
            <input
              id="play-all"
              v-model="boPa"
              type="radio"
              name="bo-pa"
              :class="$style.input"
              :value="MatchSetType.PlayAll"
            />
            <label for="play-all" :class="[$style.tile, $style.rightJoin]">
              <div :class="$style.tileLabel">Play all</div>
            </label>
          </div>
        </div>
      </li>
      <li v-for="count in [3, 5, 7]" :key="count" :class="$style.cell" :value="count">
        <input
          :id="`bo${count}`"
          v-model="bestOf"
          type="radio"
          name="bo"
          :value="count"
          :class="$style.input"
          required
        />
        <label :for="`bo${count}`" :class="[$style.tile, $style.standalone]">
          <div :class="$style.tileLabel">{{ count }} Games</div>
        </label>
      </li>

      <li :class="$style.cell">
        <input
          id="bo-custom"
          v-model="bestOf"
          type="radio"
          name="bo"
          value="custom"
          :class="$style.input"
          :checked="bestOf == 'custom'"
        />
        <label for="bo-custom" :class="[$style.tile, $style.standalone]">
          <div :class="$style.tileLabel">
            <input
              v-model="customGameCount"
              :class="$style.numberInput"
              type="number"
              aria-roledescription="Number field"
              value="9"
              data-hs-input-number-input=""
              min="1"
              max="99"
              maxlength="2"
            />
            Games
          </div>
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
  list-style: none;
  padding: 0;
  margin: 0;
}
.bopaCell {
  flex-basis: 27.27%;
}
.cell {
  flex-basis: 18.18%;
}
.half {
  display: inline-flex;
  width: 50%;
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
  cursor: pointer;
}
.tile:hover {
  background-color: var(--color-bg-hover);
  color: var(--color-text-secondary);
}
.standalone {
  border-radius: var(--radius-lg);
}
.leftJoin {
  border-top-left-radius: var(--radius-lg);
  border-bottom-left-radius: var(--radius-lg);
  border-right-width: 1px;
}
.rightJoin {
  border-top-right-radius: var(--radius-lg);
  border-bottom-right-radius: var(--radius-lg);
  border-left-width: 1px;
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
.numberInput {
  padding: 0;
  width: 2rem;
  background-color: transparent;
  border: 1px solid var(--color-border-default);
  color: var(--color-text-primary);
  text-align: center;
  -moz-appearance: textfield;
}
.numberInput::-webkit-inner-spin-button,
.numberInput::-webkit-outer-spin-button {
  -webkit-appearance: none;
}
.numberInput:focus {
  outline: none;
  border-color: var(--color-accent);
}
</style>
