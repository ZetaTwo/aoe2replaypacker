<script setup lang="ts">
import SpoilerInstructions from '@/components/spoilers/SpoilerInstructions.vue'
import SpoilerForm from '@/components/spoilers/SpoilerForm.vue'
</script>

<template>
  <div class="lg:container lg:mx-auto lg:max-w-(--breakpoint-lg)">
    <main class="mt-10">
      <SpoilerInstructions />
      <SpoilerForm />
    </main>
    <footer>
      <div class="text-center p-4 border-2 rounded-lg col-span-3 mt-4">
        <p>
          Created by <a class="underline" href="https://github.com/ZetaTwo">ZetaTwo</a> &amp;
          <a class="underline" href="https://github.com/Kjir">Beargwyn</a> -
          <a class="underline" href="https://github.com/ZetaTwo/aoe2replaypacker">Source code</a> -
          <a class="underline" href="https://forms.gle/NDKqE8acLdYR2JrKA">Report an issue</a>
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped></style>
