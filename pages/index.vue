<template>
  <div>
    <h1 v-text="title"></h1>
    Players: <pre>{{ players }}</pre>
    <button @click="createRoom">Criar Sala</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Index',
  computed: {
    ...mapState(['title', 'players'])
  },
  async asyncData({ store, $axios }) {
    const { data } = await $axios.get('/api/home/title')
    store.commit('SET_TITLE', data.title)
    store.commit('SET_PLAYERS', data.players)
  },
  mounted() {
    console.log(io('ws://localhost:5000', {transports: ['websocket']}))
  },
  methods: {
    ...mapActions(['createRoom'])
  },
}
</script>
