<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <header></header>
  <RouterView />
  <footer></footer>
</template>

<style scoped>
header {
  padding: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 11px;
  background-color: var(--color-primary-color);
}

@media (min-width: 1024px) {
}
</style>
