<script setup lang="ts">
import SpoilerInstructions from '@/components/spoilers/SpoilerInstructions.vue'
import SpoilerForm from '@/components/spoilers/SpoilerForm.vue'
import BaseCard from '@/components/common/BaseCard.vue'
</script>

<template>
  <div :class="$style.container">
    <main :class="$style.main">
      <SpoilerInstructions />
      <SpoilerForm />
    </main>
    <footer>
      <BaseCard align="center" spacing="top">
        <p>
          Created by <a :class="$style.link" href="https://github.com/ZetaTwo">ZetaTwo</a> &amp;
          <a :class="$style.link" href="https://github.com/Kjir">Beargwyn</a> -
          <a :class="$style.link" href="https://github.com/ZetaTwo/aoe2replaypacker">Source code</a>
          -
          <a :class="$style.link" href="https://forms.gle/NDKqE8acLdYR2JrKA">Report an issue</a>
        </p>
      </BaseCard>
    </footer>
  </div>
</template>

<style module>
@media (min-width: 1024px) {
  .container {
    margin-left: auto;
    margin-right: auto;
    max-width: var(--container-max-width);
  }
}
.main {
  margin-top: var(--space-10);
}
.link {
  text-decoration: underline;
}
</style>
