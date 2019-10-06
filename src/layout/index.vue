<template>
    <div class="layout">
        <Layout :style="{minHeight: '100vh'}">
            <Sider breakpoint="md"
                   :collapsible="true" collapsed-width="78" v-model="isCollapsed"
                   :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
                <h1 v-if="!isCollapsed" style="color: #fff; text-align: center;padding: 10px 0;">玉捷-后台管理</h1>
                <VMenu :isCollapsed="isCollapsed" />
            </Sider>
            <Layout>
               <VHeader />
                <AppMain />
            </Layout>
        </Layout>
    </div>
</template>
<script>
import VHeader from './compoents/VHeader/index'
import AppMain from './compoents/AppMain'
import VMenu from './compoents/Meun/index'
export default {
  data () {
    return {
      isCollapsed: false
    }
  },
  components: { VMenu, VHeader, AppMain }
}
</script>
<style scoped lang="stylus">
    .layout
        border 1px solid #d7dde4
        background #f5f7f9
        position relative
        height 100vh
        border-radius 4px
        overflow hidden
</style>
