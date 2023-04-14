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
    <div>
      <h1>Ofertas</h1>

      <div>
        <input type="text"> 
        <select name="filter" id="filter">
          <option value="descount" selected>% de Desconto</option>
          <option value="higher-price">Maior Preço</option>
          <option value="lower-price">Meno Preço</option>
          <option value="title" >Título</option>
        </select>
      </div>
    </div>
    <div class="gameList">
      <GamePromoCard v-for="promo in PromoList" :promo="promo" :key="promo.gameID" />
    </div>
  </main>
</template>

<style scoped>

@media (min-width: 1024px){
  .gameList{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap:20px;
    
  }

}

</style>