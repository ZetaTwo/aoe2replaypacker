<script setup lang="ts">
withDefaults(
  defineProps<{
    tone?: 'warning' | 'error'
  }>(),
  { tone: 'warning' }
)
</script>

<template>
  <div :class="[$style.alert, tone === 'error' ? $style.error : $style.warning]">
    <slot />
  </div>
</template>

<style module>
.alert {
  padding: var(--space-2);
  margin-top: var(--space-4);
  font-size: var(--font-size-sm);
  border-radius: var(--radius-lg);
}
.warning {
  background-color: var(--color-warning-bg);
  color: var(--color-warning-text);
}
.error {
  background-color: var(--color-error-bg);
  color: var(--color-error-text);
}
</style>
