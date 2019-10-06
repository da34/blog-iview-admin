<template>
    <Breadcrumb >
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem v-for="item in breadList" :key="item.path" :to="item.path">{{item.meta.title}}</BreadcrumbItem>
    </Breadcrumb>
</template>

<script>
export default {
  name: 'VBreadcrumd',
  data () {
    return {
      breadList: null
    }
  },
  watch: {
    '$route' () {
      this.getBreadcrumb()
    }
  },
  created () {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb () {
      const matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      this.breadList = matched
    }
  }
}
</script>

<style scoped>

</style>
