<script setup lang="ts">
const props = defineProps<{
  color: number
}>()
</script>
<template>
  <div
    :class="[
      'text-center',
      'text-gray-800',
      'font-bold',
      'border-2',
      'grid',
      'content-center',
      $style[`player-color-${props.color}`]
    ]"
  >
    <span>{{ props.color }}</span>
  </div>
</template>
<style lang="css" module>
.player-color-1 {
  background-color: #3e59f8;
}

.player-color-2 {
  background-color: #eb0000;
}

.player-color-3 {
  background-color: #00fe00;
}

.player-color-4 {
  background-color: #ffff01;
}

.player-color-5 {
  background-color: #00ffff;
}

.player-color-6 {
  background-color: #bd2bbb;
}

.player-color-7 {
  background-color: #797979;
}

.player-color-8 {
  background-color: #f99200;
}
</style>
