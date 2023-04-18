<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import GamePromoCard from '../components/GamePromoCard.vue'
import LoadingTriangle from '../components/icons/LoadingTriangle.vue'
import { onBeforeRouteLeave } from 'vue-router'

const PromoList = ref([])
const sortBy = ref('descount')
const pageNumber = ref(0)
const tripleA = ref(1)
const isLoaded = ref(false)
const title = ref(``)
const storeID = ref(1)
const errorMessage = ref(false)

const fetchGames = async (pageNumber = 0, tripleA = 1, title = '') => {
  let url = `https://www.cheapshark.com/api/1.0/deals?pageNumber=${pageNumber.value}&pageSize=12&onSale=1&AAA=${tripleA.value}${title.value}&storeID=${storeID.value}`
  isLoaded.value = false
  try {
    const response = await axios.get(url)
    response.data.forEach((promo) => {
      if (typeof promo === 'object') {
        PromoList.value.push(promo)
      }
    })
    isLoaded.value = true
  } catch (error) {
    errorMessage.value = true
  }
}

const handleTitle = (e) => {
  pageNumber.value = 0
  if (e.target.value.length === 0) {
    title.value = ''
    PromoList.value = []
    fetchGames(pageNumber, tripleA, title)
  } else {
    title.value = `&title=${e.target.value}`
    PromoList.value = []
    fetchGames(pageNumber, tripleA, title)
  }
}

const sort = (e) => {
  switch (e.target.value) {
    case 'descount':
      sortBy.value = 'descount'
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
      sortBy.value = 'higher-price'
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
      sortBy.value = 'lower-price'
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
      sortBy.value = 'title'
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
  fetchGames(pageNumber, tripleA, title)
}

onMounted(() => {
  const savedState = window.localStorage.getItem('PromoListState')
  if (savedState) {
    isLoaded.value = true
    const parsedState = JSON.parse(savedState)
    PromoList.value = parsedState.PromoList
    pageNumber.value = parsedState.pageNumber
    sortBy.value = parsedState.sortBy
    window.localStorage.removeItem('PromoListState')
  } else {
    fetchGames(pageNumber, tripleA, title)
  }
})

onBeforeRouteLeave(() => {
  const currentState = {
    PromoList: PromoList.value,
    pageNumber: pageNumber.value,
    sortBy: sortBy.value
  }
  window.localStorage.setItem('PromoListState', JSON.stringify(currentState))
})
</script>

<template>
  <nav>
    <div class="navWrapper">
      <h2>Ofertas</h2>
      <div class="filterBox">
        <input type="text" @keyup.enter="handleTitle" placeholder="Procurar" />
        <div class="selectBox">
          <p>Ordenar Por:</p>
          <select @change="sort" name="filter" id="filter" v-model="sortBy">
            <option value="descount">% de Desconto</option>
            <option value="higher-price">Maior Preço</option>
            <option value="lower-price">Meno Preço</option>
            <option value="title">Título</option>
          </select>
        </div>
      </div>
    </div>
  </nav>
  <main>
    <div class="gameList">
      <GamePromoCard
        v-for="promo in PromoList"
        :promo="promo"
        :key="promo.storeID + promo.dealID"
      />
      <button class="loadMore" @click="loadMore">Carregar mais</button>
    </div>
    <div class="exception" v-if="errorMessage === true">
      <h2>Houve algum problema na chama à API.</h2>
    </div>
    <div class="exception" v-if="PromoList.length === 0 && isLoaded">
      <h2>Resultado não encontrado para essa busca, tente outro titulo...</h2>
    </div>
    <div class="exception" v-if="!isLoaded">
      <LoadingTriangle />
      <h2>Loading...</h2>
    </div>
  </main>
</template>

<style scoped>
.navWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 8px;
}

h2 {
  font-size: 1.8rem;
  line-height: 2.1rem;
  font-weight: 300;
}
.filterBox {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  width: min(100%, 380px);
  gap: 10px;
}
.selectBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  flex: 0.8;
}
p {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-block: 8px;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.2rem;
}
.gameList {
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  align-items: center;
  gap: 20px;
}

input,
select {
  font-weight: 100;
  border-radius: 8px;
  border: none;
  color: #fff;
  background-color: var(--color-primary-color);
  height: 40px;
  padding-inline: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
select {
  width: 100%;
  font-family: 'Robot', sans-serif;
}
input {
  flex: 1.2;
}

button {
  font-family: inherit;
  padding-block: 15px;
  font-style: normal;
  font-weight: 100;
  font-size: 1.8rem;
  line-height: 2.1rem;
  border-radius: 8px;
  border: none;
  color: #fff;
  background-color: var(--color-secundary-color);
  width: min(100%, 380px);
  grid-column: 1 / span 3;
  margin-block: 30px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.exception {
  padding: 10px;
  text-align: center;
}

@media (min-width: 480px) {
  h2 {
    font-size: 3rem;
    line-height: 4.2rem;
  }
}

@media (min-width: 768px) {
  .gameList {
    margin: auto 20%;
  }
}

@media (min-width: 1024px) {
  .gameList {
    margin: auto;
    max-width: 1200px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
  nav {
    padding: 0 8px;
  }
  .navWrapper {
    max-width: 1200px;
    margin: 45px auto;
    align-items: baseline;
    gap: 30px;
  }

  .filterBox {
    width: 100%;
    align-items: center;
  }

  input,
  select {
    font-size: 1.8rem;
    line-height: 2.1rem;
  }

  select {
    width: auto;
  }

  input {
    flex: none;
    width: 380px;
  }

  p {
    font-size: 1.8rem;
    line-height: 2.1rem;
  }
  .selectBox {
    gap: 20px;
    flex-direction: row;
    flex: none;
  }
}
</style>
