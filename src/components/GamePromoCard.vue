<script setup>
import { RouterLink } from 'vue-router'
defineProps({
  promo: Object
})
</script>

<template>
  <div class="card">
    <img :src="promo.thumb" />
      <h2>
        {{ promo.title }}
      </h2>
     <div class="cardInfo">  
        <RouterLink class="details" :to="{ name: 'DealAbout', params: { dealID: promo.dealID } }"
          >Detalhes</RouterLink
        >
        <div class="priceInfo">
          <div>
            <p>{{ promo.normalPrice }}</p>
            <p>{{ promo.salePrice }}</p>
          </div>
            <button class="badge-savings">{{ promo.savings }}</button>
          </div>
    </div>
  </div>     
</template>

<style scoped>

.card {
  background-color: var(--color-primary-color);
  border-radius: 4px;
  display:flex;
  flex-direction: column;
}

img {
  width : 100%;
  border-radius: 4px;
}

.cardInfo{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.priceInfo{
  display: flex;
}


</style>