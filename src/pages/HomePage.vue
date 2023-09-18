<template>
  <div class="container-fluid bg-black">
    <section class="row">
      <div v-for="commercial in commercials" :key="commercial.id" class="col-6">
        <!-- {{ commercial.title }} -->
        <CommercialCard :commercial="commercial" />
      </div>
      <div>
        <SearchBar />
      </div>
      <div>
        <PostForm />
      </div>
      <div v-for="post in posts" :key="post.id" class="col-12">
        <!-- {{ post.body }}i -->
        <PostCard :post="post" />
      </div>
    </section>
    <section class="row justify-content-around m-2">
      <button @click="changePage(pageNumber - 1)" :disabled="pageNumber <= 1"
        class="col-2 btn btn-primary mb-3">previous</button>
      <button @click="changePage(pageNumber + 1)" class="col-2 btn btn-primary mb-3">next</button>
    </section>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import Pop from "../utils/Pop.js";
import { postsService } from "../services/PostsService.js";
import { AppState } from '../AppState.js'
import { commercialsService } from "../services/CommercialsService.js";
export default {
  setup() {
    onMounted(() => {
      getPosts();
      getCommercials();
    });

    async function getPosts() {
      try {
        await postsService.getPosts();
      } catch (error) {
        Pop.error(error)
      }
    }

    async function getCommercials() {
      try {
        await commercialsService.getCommercials();
      } catch (error) {
        Pop.error(error)
      }
    }

    return {
      posts: computed(() => AppState.posts),
      commercials: computed(() => AppState.commercials),
      pageNumber: computed(() => AppState.pageNumber),
      totalPages: computed(() => AppState.totalPages),
      searchTerm: computed(() => AppState.searchTerm),
      async changePage(number) {
        try {
          await postsService.changePage(`api/posts?page=${number}`)
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
