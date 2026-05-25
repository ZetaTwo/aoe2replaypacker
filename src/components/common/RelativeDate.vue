<script setup lang="ts">
import { formatDistanceToNow, intlFormat } from 'date-fns'
const props = defineProps<{
  date: Date | undefined
}>()
</script>
<template>
  <abbr
    v-if="props.date"
    :title="
      intlFormat(props.date, {
        weekday: 'short',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      })
    "
    >{{ formatDistanceToNow(props.date) }} ago</abbr
  >
</template>
