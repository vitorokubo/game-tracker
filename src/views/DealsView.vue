<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import GamePromoCard from '../components/GamePromoCard.vue'

const PromoList = ref([])
const sortBy = ref('Savings')
const pageNumber = ref(0)
const tripleA = ref(1)
const isLoaded = ref(false)
const desc = ref(0)
const title = ref(``)
const storeID = ref(1)

//tomar cuidado com desc, setar default props e default props do componente

const fetchGames = async (sortBy, pageNumber, tripleA, desc, title) => {
  let url = `https://www.cheapshark.com/api/1.0/deals?pageNumber=${pageNumber.value}&pageSize=12&onSale=1&AAA=${tripleA.value}&sortBy=${sortBy.value}&desc=${desc.value}${title.value}` //&storeID=${storeID.value}`
  isLoaded.value = false
  try {
    const response = await axios.get(url)
    response.data.forEach((promo) => PromoList.value.push(promo))
    setTimeout(() => {
      isLoaded.value = true
    }, 2000) // Loading Teste
  } catch (error) {
    console.log(error)
  }
}

const handleTitle = (e) => {
  pageNumber.value = 0
  if (e.target.value.length === 0) {
    title.value = ''
    PromoList.value = []
    fetchGames(sortBy, pageNumber, tripleA, desc, title)
  } else {
    title.value = `&title=${e.target.value}`
    PromoList.value = []
    fetchGames(sortBy, pageNumber, tripleA, desc, title)
  }
}

const sort = (e) => {
  switch (e.target.value) {
    case 'descount':
      sortBy.value = 'Savings'
      desc.value = 0
      PromoList.value.sort((a, b) => {
        const aSavings = parseFloat(a.savings)
        const bSavings = parseFloat(b.savings)
        if (aSavings > bSavings) {
          return -1
        } else if (aSavings < bSavings) {
          return 1
        } else {
          // savings are equal, compare normalPrice
          const aNormalPrice = parseFloat(a.normalPrice)
          const bNormalPrice = parseFloat(b.normalPrice)
          if (aNormalPrice > bNormalPrice) {
            return -1
          } else if (aNormalPrice < bNormalPrice) {
            return 1
          } else {
            return 0
          }
        }
      })
      break
    case 'higher-price':
      sortBy.value = 'Price'
      desc.value = 1
      PromoList.value.sort((a, b) => {
        const aSalePrice = parseFloat(a.salePrice)
        const bSalePrice = parseFloat(b.salePrice)
        if (aSalePrice > bSalePrice) {
          return -1
        } else if (aSalePrice < bSalePrice) {
          return 1
        } else {
          return 0
        }
      })
      break
    case 'lower-price':
      sortBy.value = 'Price'
      desc.value = 0
      PromoList.value.sort((a, b) => {
        const aSalePrice = parseFloat(a.salePrice)
        const bSalePrice = parseFloat(b.salePrice)
        if (aSalePrice < bSalePrice) {
          return -1
        } else if (aSalePrice > bSalePrice) {
          return 1
        } else {
          return 0
        }
      })
      break
    case 'title':
      sortBy.value = 'Title'
      desc.value = 0
      PromoList.value.sort((a, b) => {
        const titleA = a.title.toLowerCase()
        const titleB = b.title.toLowerCase()
        let i = 0
        while (i < titleA.length && i < titleB.length) {
          if (titleA[i] < titleB[i]) {
            return -1
          } else if (titleA[i] > titleB[i]) {
            return 1
          }
          i++
        }
        if (titleA.length < titleB.length) {
          return -1
        } else if (titleA.length > titleB.length) {
          return 1
        } else {
          return 0
        }
      })
      break
  }
}

const loadMore = () => {
  pageNumber.value++
  fetchGames(sortBy, pageNumber, tripleA, desc, title)
}

onMounted(() => {
  fetchGames(sortBy, pageNumber, tripleA, desc, title)
})
</script>

<template>
  <nav>
    <h1>Ofertas</h1>

    <div>
      <input type="text" @keydown.enter.prevent="handleTitle" />
      <select @change="sort" name="filter" id="filter">
        <option value="descount" selected>% de Desconto</option>
        <option value="higher-price">Maior Preço</option>
        <option value="lower-price">Meno Preço</option>
        <option value="title">Título</option>
      </select>
    </div>
  </nav>
  <main>
    <div class="gameList">
      <GamePromoCard
        v-for="promo in PromoList"
        :promo="promo"
        :key="promo.storeID + promo.dealID"
      />
    </div>
    <div v-if="PromoList.length === 0 && isLoaded">
      <h2>Resultado não encontrado para essa busca, tente outro titulo...</h2>
    </div>
    <div v-if="!isLoaded">
      <h2>Loading...</h2>
    </div>
    <button class="" @click="loadMore">Carregar mais</button>
  </main>
</template>

<style scoped>
.gameList {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

@media (min-width: 1024px) {
  .gameList {
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
