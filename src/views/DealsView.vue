<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import GamePromoCard from '../components/GamePromoCard.vue'

const PromoList = ref([])
const url =
  'https://www.cheapshark.com/api/1.0/deals?pageNumber=0&pageSize=12&storeID=1&onSale=1&AAA=1'

const fetchGames = (url) => {
  axios.get(url).then((response) => {
    PromoList.value = response.data
  })
}
// https://www.cheapshark.com/api/1.0/deals

onMounted(() => {
  fetchGames(url)
})
</script>

<template>
  <main>
    <GamePromoCard v-for="promo in PromoList" :promo="promo" :key="promo.gameID" />
  </main>
</template>
