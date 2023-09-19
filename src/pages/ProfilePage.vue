<template>
  <!-- need to render the profile that we get back from the get request -->

  <!--  Need to get posts made by that profile working -->
  <!-- FIXME need to have older and newer page buttons work on this page Check the bing chilling profile, that profile has more than 20 posts, or make 20 posts yourself -->
  <!-- REVIEW if the older and newer show the homepage posts, make sure you review vueFlix on how to pass multiple queries for next and previous -->
  <!--  this is setup for the refresh to work, we just need the content to show up in the first place -->
  <div class="container-fluid bg-black">
    <section class="row">
      <div v-for="commercial in commercials" :key="commercial.id" class="col-6">
        <!-- {{ commercial.title }} -->
        <CommercialCard :commercial="commercial" />
      </div>
    </section>
    <section class="row">
      <div v-if="profile" class="text-white row p-3">
        <h1 class="text-center">User Info</h1>
        <div class="p-3"> Name: {{ profile.name }}</div>
        <div class="p-3"> Email: {{ profile.email }}</div>
        <div class="p-3"> Profile picture: <img class="rounded profPic" :src="profile.picture" alt=""></div>
        <div class="p-3"> Cover Image: <img class="profileImage rounded" :src="profile.coverImg" alt=""></div>
        <div class="p-3"> Bio: {{ profile.bio }}</div>
        <div class="p-3"> Github: {{ profile.github }}</div>
        <div class="p-3"> Resume: {{ profile.resume }}</div>
        <div class="p-3"> Class: {{ profile.class }}</div>
        <div class="p-3"> Graduated? {{ profile.graduated }}</div>
      </div>
    </section>
    <h1 class="text-center text-white">User Posts</h1>
    <div v-for="post in posts" :key="post.id" class="col-12">
      <!-- {{ post.body }}i -->
      <PostCard :post="post" />
    </div>
    <section class="row justify-content-around m-2">
      <button @click="changeProfilePage(profilePageNumber - 1)" :disabled="profilePageNumber <= 1"
        class="col-2 btn btn-primary mb-3">previous</button>
      <button @click="changeProfilePage(profilePageNumber + 1)" class="col-2 btn btn-primary mb-3">next</button>
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
import { Profile } from "../models/Profile.js";


export default {
  setup() {
    onMounted(() => {
      getPostsByProfileId();
      getProfileById();
      getCommercials();
    });
    const route = useRoute();
    async function getPostsByProfileId() {
      try {
        await postsService.getPostsByProfileId(route.params.profileId);
      } catch (error) {
        Pop.error(error)
      }
    }
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
      account: computed(() => AppState.account),
      coverImg: computed(() => `url(${AppState.activeProfile?.coverImg})`),
      commercials: computed(() => AppState.commercials),
      // pageNumber: computed(() => AppState.pageNumber),
      // totalPages: computed(() => AppState.totalPages),
      profilePageNumber: computed(() => AppState.profilePageNumber),
      profileTotalPages: computed(() => AppState.profileTotalPages),
      async changeProfilePage(number, creatorId) {
        try {
          await postsService.changePage(`api/posts?creatorId=${creatorId}&page=${number}`)
        } catch (error) {
          Pop.error(error)
        }
      }
    };
  },
};
</script>


<style>
.profileImage {
  height: 30vh;
  width: 30vw;
}

.profPic {
  height: 100px;
  width: 100px;
}
</style>