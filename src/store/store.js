import { firebaseDb, firebaseAuth } from '../boot/firebase'

const state = {}
const mutations = {}
const actions = {
  registerUser() {
    console.log('register user')
  }
}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
