<script setup>
import axios from 'axios'
import { reactive, ref, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const deal = reactive({ game: {} })
const route = useRoute()
const dealID = ref(route.params.dealID)
const errorMessage = ref('')

const fetchGame = async () => {
  try {
    const response = await axios.get(`https://www.cheapshark.com/api/1.0/deals?id=${dealID.value}`)
    deal.game = response.data
  } catch (error) {
    errorMessage.value = error
  }
}

onMounted(() => {
  fetchGame()
})
</script>

<template>
  <RouterLink to="/">Voltar</RouterLink>

  <main>
    <p v-if="errorMessage">Houve algum erro na chamada à API.</p>
    <div v-else>
      <img :src="deal.game?.gameInfo?.thumb" />
      <div class="card">
        <p>{{ deal.game.gameInfo }}</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.card {
  display: flex;
  width: 320px;
  background-color: var(--color-primary-color);
}
</style>
