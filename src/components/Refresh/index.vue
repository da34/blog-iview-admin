<script>
export default {
  name: 'Refresh',
  beforeCreate () {
    const { path } = this.$route.params
    this.$router.replace({
      path
    })
  },
  render (h) {
    return h
  }
}
</script>
