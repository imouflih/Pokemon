<!--sprites -> other -> dream-world-->
<template>
  <div>
    <img
      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
    />
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  data() {
    return {
      pokemon: "null",
    };
  },
  mounted() {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => {
        this.pokemon = response.data.results[0].url;
        console.log(this.pokemon);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("https://pokeapi.co/api/v2/pokemon/1/")
      .then((response) => {
        this.pokemon = response.data.sprites.other.dream_world.front_default;
        console.log(this.pokemon);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped></style>
