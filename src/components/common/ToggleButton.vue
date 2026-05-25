<script setup lang="ts">
const props = defineProps<{
  label: string
}>()

const model = defineModel<boolean>()
</script>
<template>
  <label :class="$style.wrapper">
    <input v-model="model" type="checkbox" :class="$style.input" />
    <span :class="$style.track"></span>
    <span :class="$style.label">{{ props.label }}</span>
  </label>
</template>

<style module>
.wrapper {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
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
.track {
  position: relative;
  width: 2.75rem;
  height: 1.5rem;
  background-color: var(--color-border-default);
  border-radius: 9999px;
  transition: background-color 0.2s;
}
.track::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 1.25rem;
  height: 1.25rem;
  background-color: #ffffff;
  border: 1px solid var(--color-border-default);
  border-radius: 9999px;
  transition: transform 0.2s, border-color 0.2s;
}
.input:checked ~ .track {
  background-color: var(--color-accent);
}
.input:checked ~ .track::after {
  transform: translateX(100%);
  border-color: #ffffff;
}
.input:focus-visible ~ .track {
  outline: 4px solid var(--color-accent-disabled);
  outline-offset: 1px;
}
.label {
  margin-inline-start: var(--space-3);
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-primary);
}
</style>
