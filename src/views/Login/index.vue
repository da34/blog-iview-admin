<template>
    <div class="login-wrapper">
        <Card style="width:320px" class="login">
            <p slot="title">欢迎登录</p>
            <div style="text-align:center">
<!--                <img src="../assets/2ecd3b0452aa197097d5131afacab7b8.png" width="50">-->
                <Form ref="formInline" :model="formInline" :rules="ruleInline">
                    <FormItem prop="username">
                        <Input type="text" v-model="formInline.username" placeholder="账号">
                            <Icon type="ios-person-outline" slot="prepend" />
                        </Input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input type="password" v-model="formInline.password" placeholder="密码">
                            <Icon type="ios-lock-outline" slot="prepend" />
                        </Input>
                    </FormItem>
                    <FormItem>
                        <Button long type="primary" @click="handleSubmit('formInline')">登录</Button>
                    </FormItem>
                </Form>
            </div>
            <Spin size="large" fix v-if="spinShow" />
        </Card>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      formInline: {
        username: '',
        password: ''
      },
      spinShow: false,
      ruleInline: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码不能少于六位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions({
      login: 'user/login'
    }),
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.spinShow = true
          this.login(this.formInline).then(res => {
            this.$router.push('/')
            this.spinShow = false
          }).catch(e => {
            this.spinShow = false
          })
        } else {
          this.$Message.error('失败!')
        }
      })
    }
  }
}
</script>
<style scoped lang="stylus">
.login-wrapper
    display flex
    height 100%
    .login
        margin auto
</style>
