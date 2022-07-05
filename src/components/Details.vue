<template>
  <div class="element">
    <h3>{{ pokemonList[id].name }}</h3>
    <img :src="pokemonList[id].urlImage" />
    <ul>
      <li v-for="ability in pokemonList[id].abilities">
        {{ ability.name }}
      </li>
    </ul>
    <button>Details</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Details",
  props: ["id"],
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
    console.log(this.pokemonList[this.id]);
  },
};
</script>
