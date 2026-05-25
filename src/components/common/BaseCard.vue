<script setup lang="ts">
withDefaults(
  defineProps<{
    align?: 'center' | 'start'
    spacing?: 'top' | 'bottom' | 'none'
  }>(),
  { align: 'start', spacing: 'none' }
)
</script>

<template>
  <div
    :class="[
      $style.card,
      align === 'center' ? $style.alignCenter : null,
      spacing === 'top' ? $style.spacingTop : null,
      spacing === 'bottom' ? $style.spacingBottom : null
    ]"
  >
    <slot />
  </div>
</template>

<style module>
.card {
  padding: var(--space-4);
  border: 2px solid var(--color-border-section);
  border-radius: var(--radius-lg);
  color: var(--color-text-primary);
}
.alignCenter {
  text-align: center;
}
.spacingTop {
  margin-top: var(--space-4);
}
.spacingBottom {
  margin-bottom: var(--space-4);
}
</style>
