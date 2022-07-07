<template>
  <div class="element">
    <h2>{{ pokemonList[id].name }}</h2>
    <img :src="pokemonList[id].urlImage" />
    <ul>
      <li v-for="ability in pokemonList[id].abilities">
        {{ ability.name }}
        <button @click="ability.isOpen = true" v-if="!ability.isOpen">
          Details
        </button>
        <div class="element" v-if="ability.isOpen">
          <h5>{{ ability.effect }}</h5>
          <button @click="ability.isOpen = false">Close</button>
        </div>
      </li>
    </ul>
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
              res.data.abilities.map((currentElement, indice) => {
                this.pokemonList[index].abilities.push(currentElement.ability);
                axios
                  .get(this.pokemonList[index].abilities[indice].url)
                  .then((ress) => {
                    this.pokemonList[index].abilities[indice].effect =
                      ress.data.effect_entries[
                        ress.data.effect_entries[0].language.name === "en"
                          ? 0
                          : 1
                      ].effect;
                    this.pokemonList[index].abilities[indice].isOpen = false;
                  });
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
    console.log(this.pokemonList[0].abilities);
  },
};
</script>

<style>
button {
  background-color: #a3b4d3;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  padding: 3px;
  width: 100px;
}
button:hover {
  background-color: #ccc;
  color: #000;
}
</style>
