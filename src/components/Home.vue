<!--sprites -> other -> dream-world-->
<template>
  <div class="list">
    <div class="element box" v-for="(pokemon, key) in pokemonList">
      <router-link :to="{ name: 'Details', params: { id: key } }">
        <img :src="pokemon.urlImage" />
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      pokemonList: Array(151)
        .fill()
        .map(() => {
          return {
            name: "",
            urlImage: "",
          };
        }),
    };
  },
  mounted() {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => {
        this.pokemonList.map((currElement, index) => {
          currElement.name = response.data.results[index].name;
          return currElement;
        });
        this.pokemonList.map((currElement, index) => {
          axios
            .get(response.data.results[index].url)
            .then((res) => {
              currElement.urlImage =
                res.data.sprites.other.dream_world.front_default;
            })
            .catch((error) => {
              console.log(error);
            });
          return currElement;
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped></style>
