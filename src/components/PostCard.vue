<template>
  <div class="card bg bg-grey p-3 mt-2 mb-2 elevation-5">
    <div class="fw-bold">
      <router-link :to="{ name: 'Profile', params: { profileId: post.creatorId } }">
        <img class="creatorImg" :src="post.creatorImg" alt="no image available">
      </router-link>
      {{ post.creatorName }}
      <button v-if="post.creatorId == account.id" @click.stop="deletePost(post.id)" class="btn btn-danger"
        title="delete post?"><i class="mdi mdi-delete-forever"></i></button>
    </div>
    <div class="mt-4 mb-4">
      {{ post.body }}
    </div>
    <div>
      <img class="img-fluid mb-4" :src="post.imgUrl" alt="Image not available">
    </div>
    <div class="mt-2">
      posted on: {{ post.createdAt }}
    </div>
    <div class="text-end">
      {{ post.likes }}<i class="text-danger mdi mdi-heart"></i>
    </div>

  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { Post } from "../models/Post.js";
import { computed } from "vue";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { postsService } from "../services/PostsService.js";

export default {
  props: { post: { type: Post, required: true } },
  setup() {
    const router = useRoute();
    return {
      account: computed(() => AppState.account),
      async deletePost(id) {
        try {
          if (await Pop.confirm('Are you sure you want to delete the post?')) {
            await postsService.deletePost(id)
            router.push({ name: "Home" })
            Pop.success('Post Removed')
          }
        } catch (error) {
          Pop.error(error)
        }
      }
    };
  },
};
</script>


<style>
.creatorImg {
  height: 50px;
  width: 50px;
  object-fit: cover;
  object-position: center;
}

.postImg {
  height: 100vh;
  width: 100vw;
  object-fit: cover;
  object-position: center;
}
</style>