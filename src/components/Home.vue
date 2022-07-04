<!--sprites -> other -> dream-world-->
<template>
  <div class="element" v-for="pokemon in pokemonList" v-bind:key="pokemon">
    <a bind-href="'#/'id"><img v-bind:src="pokemon.urlImage" /></a>
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
            abilities: [],
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
              res.data.abilities.map((currentElement) => {
                this.pokemonList[index].abilities.push(currentElement.ability);
              });
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
    console.log(this.pokemonList);
  },
};
</script>

<style scoped></style>
