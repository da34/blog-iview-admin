<template>
    <div style="padding: 30px">
        <span style="font-size: 25px;font-weight: bold">Name: </span>
        <span style="font-size: 20px;font-weight: bold">{{username}}</span>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'username'
    ])
  }
}
</script>

<style scoped>

</style>
