<template>
    <Content :style="{padding: '0 16px 16px', marginLeft: '200px'}">
        <div class="content">
            <keep-alive v-if="$route.meta.noCache">
                <router-view/>
            </keep-alive>
            <router-view v-else />
        </div>
    </Content>
</template>
<script>
export default {
  data () {
    return {
    }
  }
}
</script>
<style scoped lang="stylus">
.content
    padding 20px 0
</style>
