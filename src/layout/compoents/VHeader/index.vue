<template>
    <Header class="header-wrapper" style="margin-left: 200px;">
        <VBreadcrumd />
        <header-user />
    </Header>
</template>

<script>
import HeaderUser from './header-user'
import VBreadcrumd from '@/components/Breadcrumd/index'
export default {
  name: 'v-header',
  components: { VBreadcrumd, HeaderUser },
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="stylus">
.header-wrapper
    background #fff
    box-shadow 0 0 3px 2px rgba(0,0,0,.1)
    display flex
</style>
