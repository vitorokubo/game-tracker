# Game-Tracker

O projeto consiste em uma single page application que consulta as ofertas de jogos via API do [cheap shark](https://apidocs.cheapshark.com/) e expõe os jogos em promoção. O projeto pode ser consultado em produção neste [link](https://game-tracker-vokubo.onrender.com).

## Tecnologias utilizadas e justificativas

|      Abrangência       | Utilizado  |
| :--------------------: | ---------- |
|       Linguagem        | Javascript |
|         Estilo         | CSS       |
|       Requisição       | Axious     |
| _Framework (opcional)_ | Vite+Vue   |

O framework escolhido para o projeto foi o Vite + Vue, sendo o Vite um bundler que permite criar um ambiente de desenvolvimento estruturado simples e rápido. Já com o Vue pois temos um framework de fácil estruturação, versátil e bem documentado.

## Como Rodar a Aplicação

### Requisitos

-   Node.js 16.16.0

### `yarn`

No diretório da aplicação rode o seguinte comando acima para instalar as dependências

### `yarn dev`

E o comando acima para rodar a aplicação na URL http://127.0.0.1:5173/

## Funcionalidades

<ul>
    <li>Design responsivo com quebras em 480px, 768px e 1024px.</li>
    <li>Ordenamento das promoções em % Desconto, Maior Preço, Menor Preço e Título .</li>
    <li>Busca por título nas ofertas.</li>
    <li>Router implementado.</li>
    <li>Lista de promoções são salvas em cache para que na volta da navegação o usuário não se perca caso visite outras paginas da aplicação a partir da principal.</li>
    <li>Configurado testes com Vitest.</li>
    <li>Funciona como uma PWA.</li>
</ul>

## Telas Produzidas

<div float="left">
    <div>
        <p>Design Mobile</p>
        <img src="./src/assets/screen/Screen-478px.png"  />
    </div>
    <div>
        <p>Design Desktop</p>
        <img src="./src/assets/screen/Screen-1024px.png"  />
    </div>
        <p>Telas com varias promoções carregadas</p>
        <img src="./src/assets/screen/Screen-GamesLoaded-1024px.png"  />
    </div>

## Ideias futuras para o projeto

<ul>
    <li> Storybook dos componentes.</li>
    <li> Converter o projeto em SSR com NUXT.</li>
</ul>