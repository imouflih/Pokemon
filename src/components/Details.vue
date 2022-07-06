<template>
  <div class="element">
    <h2>{{ pokemonList[id].name }}</h2>
    <img :src="pokemonList[id].urlImage" />
    <ul v-if="pokemonList[id].abilities.length == 1">
      <li>
        {{ pokemonList[id].abilities[0].name }}
        <button @click="isOpen0 = true" v-if="!isOpen0">Details</button>
        <div class="element" v-if="isOpen0">
          <h4>{{ pokemonList[id].abilities[0].effect }}</h4>
          <button @click="isOpen0 = false">Close</button>
        </div>
      </li>
    </ul>
    <ul v-if="pokemonList[id].abilities.length == 2">
      <li>
        {{ pokemonList[id].abilities[0].name }}
        <button @click="isOpen0 = true" v-if="!isOpen0">Details</button>
        <div class="element" v-if="isOpen0">
          <h4>{{ pokemonList[id].abilities[0].effect }}</h4>
          <button @click="isOpen0 = false">Close</button>
        </div>
      </li>
      <li>
        {{ pokemonList[id].abilities[1].name }}
        <button @click="isOpen1 = true" v-if="!isOpen1">Details</button>
        <div class="element" v-if="isOpen1">
          <h4>{{ pokemonList[id].abilities[1].effect }}</h4>
          <button @click="isOpen1 = false">Close</button>
        </div>
      </li>
    </ul>
    <ul v-if="pokemonList[id].abilities.length == 3">
      <li>
        {{ pokemonList[id].abilities[0].name }}
        <button @click="isOpen0 = true" v-if="!isOpen0">Details</button>
        <div class="element" v-if="isOpen0">
          <h4>{{ pokemonList[id].abilities[0].effect }}</h4>
          <button @click="isOpen0 = false">Close</button>
        </div>
      </li>
      <li>
        {{ pokemonList[id].abilities[1].name }}
        <button @click="isOpen1 = true" v-if="!isOpen1">Details</button>
        <div class="element" v-if="isOpen1">
          <h4>{{ pokemonList[id].abilities[1].effect }}</h4>
          <button @click="isOpen1 = false">Close</button>
        </div>
      </li>
      <li>
        {{ pokemonList[id].abilities[2].name }}
        <button @click="isOpen2 = true" v-if="!isOpen2">Details</button>
        <div class="element" v-if="isOpen2">
          <h4>{{ pokemonList[id].abilities[2].effect }}</h4>
          <button @click="isOpen2 = false">Close</button>
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
      isOpen0: false,
      isOpen1: false,
      isOpen2: false,
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
                        ress.data.effect_entries[0].language.name == "en"
                          ? 0
                          : 1
                      ].effect;
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
