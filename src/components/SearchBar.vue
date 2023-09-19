<template>
  <form @submit.prevent="searchPosts" class="row mt-2 mb-2">
    <div class="col-12 input-group">
      <input v-model="searchTerm" type="text" class="form-control" placeholder="search">
      <button class="btn btn-primary"><i class="mdi mdi-magnify"></i></button>
    </div>
  </form>
  <div v-if="activeSearch" class="text-white">
    listing results for: {{ activeSearch }}
  </div>
</template>

<script>

import { computed, ref } from "vue";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { postsService } from "../services/PostsService.js";

export default {
  setup() {
    const searchTerm = ref('')
    return {
      searchTerm,
      activeSearch: computed(() => AppState.searchTerm),
      //the page is reloading when this is submitted. Cannot trust any of the code on the inside right now. Take this step by step, logging and verifying the values of searchTerm.value and your service along the way.
      async searchPosts() {
        try {
          logger.log('searching', searchTerm.value) // g
          await postsService.searchPosts(searchTerm.value)
        } catch (error) {
          Pop.error(error)
        }
      }
    };
  },
};
</script>


<style></style>