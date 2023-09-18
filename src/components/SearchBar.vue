<template>
  <form @submit="searchPosts" class="row mt-2 mb-2">
    <div class="col-12 input-group">
      <input type="text" class="form-control" placeholder="search">
      <button class="btn btn-primary"><i class="mdi mdi-magnify"></i></button>
    </div>
  </form>
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
      async searchPosts() {
        try {
          logger.log('searching', searchTerm.value)
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