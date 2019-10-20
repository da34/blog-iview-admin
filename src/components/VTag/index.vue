<template>
    <div>
        <Tag class="diyTag" :closable="closable" :checkable="checkable" :checked="checked" :type="type" :color="color" :name="name" :fade="fade" >
            {{value}}
            <svg-icon class="icon" iconClass="edit" />
        </Tag>
    </div>
</template>

<script>
export default {
  name: 'VTag',
  props: {
    edit: {
      type: Boolean,
      default: false
    },
    value: String,
    // 下面的是iViews自带的
    closable: {
      type: Boolean,
      default: false
    },
    checkable: {
      type: Boolean,
      default: false
    },
    checked: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'dot'
    },
    color: {
      type: String,
      default: 'default'
    },
    name: {
      type: [String, Number],
      default: ''
    },
    fade: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="stylus">
.diyTag
    position relative
    .icon
        position: absolute
        top -5px
        right -5px
</style>
