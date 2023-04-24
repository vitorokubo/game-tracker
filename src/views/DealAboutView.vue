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
  <div class="wrapper">
    <nav>
      <RouterLink to="/"> {{ '< Voltar' }} </RouterLink>
    </nav>
    <main>
      <p v-if="errorMessage">Houve algum erro na chamada à API.</p>
      <div v-else>
        <div class="card">
          <img :src="deal?.game?.gameInfo?.thumb" />
          <div class="cardInfoWrapper">
            <h2 class="title">
              {{ deal?.game?.gameInfo?.name ? deal.game.gameInfo.name : 'Título indisponível' }}
            </h2>
            <div class="cardInfo">
              <div class="lowestPrice">
                <p>Menor preço:</p>
                <p class="grade">$ {{ deal?.game?.cheapestPrice?.price }}</p>
                <p>
                  {{
                    deal?.game?.cheapestPrice?.date
                      ? new Date(deal?.game?.cheapestPrice?.date * 1000).toLocaleDateString()
                      : ''
                  }}
                </p>
              </div>
              <div class="priceInfo">
                <div>
                  <p class="normalPrice">
                    $
                    {{
                      deal?.game?.gameInfo?.retailPrice ? deal?.game?.gameInfo?.retailPrice : '---'
                    }}
                  </p>
                  <p class="descountPrice">
                    $
                    {{ deal?.game?.gameInfo?.salePrice ? deal?.game?.gameInfo?.salePrice : '---' }}
                  </p>
                </div>
                <div class="ratingBox">
                  <p>Rating</p>
                  <p class="rating">{{ deal?.game?.gameInfo?.steamRatingText }}</p>
                </div>
              </div>
            </div>
            <button>
              <a :href="'https://www.cheapshark.com/redirect?dealID=' + dealID">Ir para promoção</a>
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px auto;
}

nav {
  border-radius: 8px;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 6px;
  margin-left: -330px;
}

main {
  display: flex;
}
.card {
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 80vw;
  max-width: 400px;

  overflow: hidden;

  border-radius: 8px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: var(--color-primary-color);
}

.title {
  font-size: 1.8rem;
  font-weight: 300;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.lowestPrice {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.cardInfo {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 1.6rem;
}

.cardInfoWrapper {
  padding: 7px 16px 16px;
  display: flex;
  flex-direction: column;
}

.grade {
  width: fit-content;
  text-transform: uppercase;
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1.6rem;
  text-decoration: none;
  background-color: var(--color-secundary-color);
  border-radius: 4px;
  padding: 7px 12px;
}
.normalPrice {
  font-size: 1rem;
  line-height: 1.2rem;
  text-align: right;
  text-decoration-line: line-through;
}
.descountPrice {
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1.6rem;
}

.ratingBox {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.rating {
  margin-top: 5px;
  width: fit-content;
  padding: 6px;
  font-size: 1.4rem;
  line-height: 1.6rem;
  font-weight: 300;
  background-color: var(--color-tertiary-color);
  border-radius: 4px;
}
.priceInfo {
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: flex-end;
  gap: 10px;
}

button {
  margin-top: 10px;
  margin-inline: auto;
  padding: 7px;
  font-family: inherit;
  font-weight: 300;
  font-size: 1.6rem;
  border-radius: 8px;
  border: none;
  color: #fff;
  background-color: var(--color-secundary-color);
  width: 50%;
}

@media (min-width: 480px) {
  .title {
    font-size: 2.4rem;
    line-height: 2.8rem;
  }
  .details {
    font-size: 1.8rem;
    line-height: 2.1rem;
  }

  .normalPrice {
    font-size: 1.2rem;
    line-height: 1.4rem;
  }
  .descountPrice {
    font-size: 1.8rem;
    line-height: 2.1rem;
  }
  .badge-savings {
    font-size: 1.8rem;
    line-height: 2.1rem;
    width: 84px;
  }
}
</style>
