<template>
    <Menu active-name="1-2" :open-names="['1']" :class="menuitemClasses" width="auto" theme="dark">
        <div v-for="(menu, index) in routes" :key="menu.path">
            <MenuItem v-if="!menu.hidden && menu.children && menu.children.length === 1 " :name="index" :to="{ name: menu.children[0].name }">
                <svg-icon :iconClass="menu.children[0].meta.icon" />
                <span>{{menu.children[0].meta.title}}</span>
            </MenuItem>
            <Submenu :name="index" v-else-if="!menu.hidden">
                <template slot="title">
                    <svg-icon :iconClass="menu.meta.icon" />
                    <span v-if="menu.meta.title">{{menu.meta.title}}</span>
                </template>
                <div v-for="child in menu.children" :key="child.path">
                    <MenuItem v-if="!child.hidden" :name="child.name" :to="{ name: child.name }"><span>{{child.meta.title}}</span></MenuItem>
                </div>
            </Submenu>
        </div>
    </Menu>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'VMenu',
  props: {
    isCollapsed: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'routes'
    ]),
    menuitemClasses () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    }
  }
}
</script>

<style scoped lang="stylus">
    .menu-item span
        display inline-block
        overflow hidden
        width 69px
        text-overflow ellipsis
        white-space nowrap
        vertical-align bottom
        transition width .2s ease .2s
    .menu-item i
        transform translateX(0px)
        transition font-size .2s ease, transform .2s ease
        vertical-align middle
        font-size 16px
    .collapsed-menu span
        width: 0
        transition width .2s ease
    .collapsed-menu i
        transform translateX(5px)
        transition font-size .2s ease .2s, transform .2s ease .2s
        vertical-align middle
        font-size 25px
</style>
