import { getData } from '@/api/fetch'

const endpointURL = 'posts'

export default {
  state:{
    posts: null,
    totalPosts: null,
    currentPost: null,
  },

  actions: {

    async getPosts({commit}, urlQuery = null) {
      let currentEndpointURL = endpointURL
      if (urlQuery) {
        let queryString = new URLSearchParams(urlQuery);
        currentEndpointURL += `?${queryString.toString()}`
      }

      let postsData = await getData(currentEndpointURL, null, 'GET')

      if (postsData.status === 200) {
        commit('UPDATE_POSTS', postsData.data.posts)
        commit('UPDATE_TOTAL_POSTS', postsData.data.total)
        return
      }
    },

    async getCurrentPost({commit}, postID) {
      let postData = await getData(`${endpointURL}/${postID}`, null, 'GET')
      commit('UPDATE_CURRENT_POST', postData.data)
    },

    async updatePost({commit}, params) {
      let postID = params.id
      let postData = await getData(`${endpointURL}/${postID}`, params.body, 'PUT')
      commit('UPDATE_CURRENT_POST', postData.data)
      return postData.status
    },

    async searchPost({commit}, searchQuery){
      let postsData = await getData(`${endpointURL}/search?q=${searchQuery}`,null, 'GET')
      commit('UPDATE_POSTS', postsData.data.posts)
      commit('UPDATE_TOTAL_POSTS', postsData.data.total)
    }
  },

  mutations: {
    'UPDATE_POSTS'(state, newValue) {
      state.posts = newValue
    },
    'UPDATE_TOTAL_POSTS'(state, newValue) {
      state.totalPosts = newValue
    },
    'UPDATE_CURRENT_POST'(state, newValue) {
      state.currentPost = newValue
    },
  },

  getters: {
    allPosts(state) {
      return state.posts
    },

    totalCountPosts(state) {
      return state.totalPosts
    },

    currentPostData(state) {
      return state.currentPost
    }
  }
}