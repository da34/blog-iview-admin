<template>
    <Content class="content-wrapper">
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
.content-wrapper
    padding 0 16px 16px
    margin-left 200px
    .content
        padding 20px 0
@media (max-width: 768px)
    .content-wrapper
        margin-left 0
</style>
