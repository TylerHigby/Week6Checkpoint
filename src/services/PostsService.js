import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { router } from "../router.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class PostsService {
  async getPosts() {
    AppState.posts = []
    const res = await api.get('api/posts')
    // logger.log(res.data)
    // logger.log(res.data.posts)
    AppState.posts = res.data.posts.map(post => new Post(post))
  }

  async createPost(postData) {
    const res = await api.post('api/posts', postData)
    logger.log('creating post', res.data)
    const newPost = new Post(res.data)
    AppState.posts.push(newPost)
    return newPost
  }

  async getPostsByProfileId(profileId) {
    AppState.posts = []
    const res = await api.get(`api/posts?creatorId=${profileId}`)
    logger.log(res.data)
    AppState.posts = res.data.posts.map(post => new Post(post))
  }

  async changePage(url) {
    logger.log(url)
    const res = await api.get(url)
    logger.log('change page 📃', res.data)//good
    AppState.posts = res.data.posts.map(post => new Post(post))
    AppState.pageNumber = res.data.page
    AppState.totalPages = res.data.totalPages
  }


  async searchPosts(searchTerm) {
    const res = await api.get(`api/posts?query=${searchTerm}`)
    logger.log('searching', res.data)
    AppState.posts = res.data.posts.map(post => new Post(post))
    AppState.pageNumber = res.data.page
    AppState.totalPages = res.data.totalPages
    AppState.searchTerm = searchTerm
  }

  async deletePost(id) {
    logger.log('deleting', id)
    const res = await api.delete('api/posts/' + id)
    logger.log(res.data)
  }

  async likePost(id) {
    logger.log('liking', id)
    // const res = await api.post('api/posts/' + id)
    // logger.log('liking', res.data)
    const res = await api.post(`api/posts/${id}/like`)
    logger.log('liking', res.data)
  }

}

export const postsService = new PostsService()