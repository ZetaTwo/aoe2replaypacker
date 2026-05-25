<script setup lang="ts">
import BaseCard from '@/components/common/BaseCard.vue'
</script>

<template>
  <BaseCard spacing="bottom">
    <h1 :class="$style.title">AoE2 Replay Pack Generator - Spoiler Tool</h1>

    <p>
      TODO This page will help you create a zip file of replays for submitting your AoE2 match
      results.
    </p>
  </BaseCard>
</template>

<style module>
.title {
  font-size: var(--font-size-3xl);
  text-align: center;
}
</style>
