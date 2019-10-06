<template>
    <div class="user">
        <Dropdown @on-click="click">
            <Tooltip :content="'你好'+username" placement="left">
                <Avatar :src="avatar" size="large"></Avatar>
            </Tooltip>
            <DropdownMenu slot="list" style="text-align: center;">
                <DropdownItem name='logOut'>
                    <Icon type="md-power" />
                    注销
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
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
    width 50px
    margin-left auto
</style>
