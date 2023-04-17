<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  promo: {
    type: Object,
    default: () => ({ savings: 0 })
  }
})
//definir props default

const savings = computed(() => {
  let value = parseInt(props.promo.savings)
  return value === 100 ? 'Gratis' : -value + '%'
})
</script>

<template>
  <div class="card">
    <img :src="promo.thumb" />
    <div class="cardInfoWrapper">
      <h2 class="title">
        {{ promo.title }}
      </h2>
      <div class="cardInfo">
        <RouterLink class="details" :to="{ name: 'DealAbout', params: { dealID: promo.dealID } }"
          ><p>Detalhes</p></RouterLink
        >
        <div class="priceInfo">
          <div>
            <p class="normalPrice">$ {{ promo.normalPrice }}</p>
            <p class="descountPrice">$ {{ promo.salePrice }}</p>
          </div>
          <button class="badge-savings">
            <p>{{ savings }}</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
img {
  overflow: hidden;
  height: 95px;
}
.card {
  display: flex;
  height: 180px;
  flex-direction: column;

  width: min(100%, 380px);

  overflow: hidden;

  border-radius: 8px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: var(--color-primary-color);
}

.cardInfoWrapper {
  padding: 0.9rem 1.1rem 1.1rem;
}
.title {
  font-size: 1.8rem;
  font-weight: 300;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.cardInfo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.6rem;
}

.details {
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

.badge-savings {
  width: 64px;
  text-transform: uppercase;
  font-size: 1.4rem;
  line-height: 1.6rem;
  font-weight: 700;
  background-color: var(--color-tertiary-color);
  border: none;
  color: white;
  border-radius: 4px;
  padding-block: 7px;
}

.priceInfo {
  display: flex;
  align-items: center;
  gap: 10px;
}

@media (min-width: 480px) {
  .card {
    height: 250px;
  }

  img {
    height: 147px;
  }
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

  .cardInfoWrapper {
    padding: 7px 16px 16px;
  }
}
</style>
