<template>
  <div class="container-fluid bg-black">
    <section class="row">
      <div v-for="commercial in commercials" :key="commercial.id" class="col-6">
        <!-- {{ commercial.title }} -->
        <CommercialCard :commercial="commercial" />
      </div>
    </section>
    <section class="row">
      <div v-if="profile">
        {{ profile.name }}
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import Pop from "../utils/Pop.js";
import { postsService } from "../services/PostsService.js";
import { profilesService } from '../services/ProfilesService.js'
import { AppState } from "../AppState.js";
import { commercialsService } from "../services/CommercialsService.js";


export default {
  setup() {
    onMounted(() => {
      // getPostsByProfileId();
      getProfileById();
      getCommercials();
    });
    const route = useRoute();
    // async function getPostsByProfileId() {
    //   try {
    //     await postsService.getPostsByProfileId(route.params.profileId);
    //   } catch (error) {
    //     Pop.error(error)
    //   }
    // }
    async function getProfileById() {
      try {
        await profilesService.getProfileById(route.params.profileId)
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
      profile: computed(() => AppState.activeProfile),
      // account: computed(() => AppState.account),
      coverImg: computed(() => `url(${AppState.activeProfile?.coverImg})`),
      commercials: computed(() => AppState.commercials)
    };
  },
};
</script>


<style></style>