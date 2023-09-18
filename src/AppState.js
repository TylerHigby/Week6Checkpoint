import { reactive } from 'vue'


// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

  /**@type {Profile} */
  activeProfile: null,

  /**@type {Post[]} */
  posts: [],
  /**@type {Post} */
  activePost: null,

  /**@type {Commercial[]} */
  commercials: [],

  /** @type {Number} */
  pageNumber: 1,

  /** @type {Number}*/
  totalPages: 1,

  /**@type {String} */
  searchTerm: ''
})
