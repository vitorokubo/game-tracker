<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="headerWrapper">
      <RouterLink class="logoLink" to="/">
        <img src="./assets/logo.png" alt="Logo do Game-Tracker" />
        <h1>Game <span>Tracker</span></h1>
      </RouterLink>
    </div>
  </header>
  <RouterView />
  <footer>
    <div class="footerWrapper">
      <a class="footerLogo" href="#">
        <img src="./assets/logo.png" alt="Logo do Game-Tracker" />
      </a>
      <p>
        © 2021, Game Tracker Inc. Todos os direitos reservados. Nulla facilisi. Etiam sagittis
        congue tempor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
        turpis egestas. Suspendisse eu velit et ante luctus egestas. Aenean sed nisi tellus. Duis
        non ornare libero. Quisque suscipit maximus nisi, in gravida felis. Cras ornare mauris ac
        nisi congue, ut condimentum sem tincidunt. Phasellus semper tellus malesuada turpis gravida
        cursus. Duis nec eleifend nunc, vitae finibus elit. Aliquam eget diam vitae purus suscipit
        viverra.
      </p>

      <ul>
        <li>
          <a href="#">Termos de Serviço</a>
        </li>
        <li>
          <a href="#">Política de Privacidade</a>
        </li>
        <li>
          <a href="#">Trabalhe conosco</a>
        </li>
        <li>
          <a href="#">Contato</a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<style scoped>
header {
  display: flex;
  background-color: var(--color-primary-color);
}

.headerWrapper {
  margin: 9px auto;
}

.logoLink {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 11px;
}

footer {
  display: flex;
  min-height: 300px;

  background-color: var(--color-primary-color);
}

.footerWrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
  margin: 20px 10%;
}

.footerLogo {
  margin: 0 auto;
}
p {
  text-align: center;
  font-size: 1rem;
  line-height: 1.5rem;
}

h1 {
  font-weight: 300;
  font-size: 2.4rem;
  line-height: 2.8rem;
}

span {
  font-weight: bold;
}

ul {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  text-decoration: none;
  list-style: none;

  font-size: 1.2rem;
  font-weight: 700;
  line-height: 2.2rem;
}

@media (min-width: 768px) {
  .headerWrapper {
    margin: 9px 10%;
  }
  .footerWrapper {
    margin-block: 50px;
    align-items: flex-start;
  }

  p {
    font-size: 1.4rem;
    line-height: 2.5rem;
    text-align: left;
  }
  ul {
    flex-direction: row;
    justify-content: flex-start;
    gap: 46px;
  }
}
</style>
