<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const deal = ref({})
const route = useRoute()
const dealID = ref(route.params.dealID)

const fetchGame = async () => {
  const response = await axios.get(`https://www.cheapshark.com/api/1.0/deals?id=${dealID.value}`)
  deal.value = response.data
}

onMounted(() => {
  fetchGame()
})
</script>

<template>
  <RouterLink to="/">Voltar</RouterLink>
  <div>
    <p>{{ deal }}</p>
  </div>
</template>
