<template>
    <div class="user">
        <ul class="list">
            <li class="item">
                <Dropdown @on-click="click">
                    <Avatar :src="avatar" size="large" />
                    <span style="padding-left: 10px;">{{username}}</span>
                    <DropdownMenu slot="list" style="text-align: center;">
                        <DropdownItem name='logOut'>
                            <Icon type="md-power" />
                            退出登录
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'header-user',
  computed: {
    ...mapGetters([
      'avatar',
      'username'
    ])
  },
  methods: {
    ...mapActions({
      logOut: 'user/resetToken'
    }),
    click (v) {
      if (v === 'logOut') {
        this.logOut()
        this.$router.push('/login')
        this.$Message.success('成功注销')
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.user
    margin-left auto
    .list
        display flex
        .item
            height 100%
            cursor pointer
            transition: all .2s ease-in-out
            padding 0 10px
            &:hover
                background #F5F7F9
</style>
