<template>
    <div>
      <Row :gutter="30">
        <Col span="8">
          <Card shadow>
            <p slot="title" style="height: 25px">
              <Icon type="md-settings" size="20" />
              个人设置
            </p>
            <CellGroup @on-click="name => name === 'user' ? selectIndex = 0 : selectIndex = 1">
              <Cell title="基本设置" label="个人账户信息设置" name="user"  :selected="!selectIndex" >
              </Cell>
              <Cell title="安全设置" label="密码、邮箱等设置" name="safety" :selected="!!selectIndex">
              </Cell>
            </CellGroup>
          </Card>
        </Col>
        <Col span="16">
          <Card class="right-content" shadow>
            <div v-if="!selectIndex" class="user-content">
              <h2>基本设置</h2>
              <Form class="mt-10" :model="formValidate" :rules="ruleValidate">
                <FormItem prop="avatar">
                <p>头像</p>
                  <div class="mt-10">
                    <Avatar shape="square" :src="avatar" :size="90" />
                  </div>
                  <Upload action="//jsonplaceholder.typicode.com/posts/" class="mt-10 mb-10">
                    <Button icon="md-camera">修改头像</Button>
                  </Upload>
                </FormItem>
                <FormItem prop="username" label="名称">
                  <Input />
                </FormItem>
                <FormItem prop="mail" label="邮箱">
                  <Input />
                </FormItem>
                <FormItem prop="desc" label="个人简介">
                  <Input show-word-limit maxlength="20" type="textarea" />
                </FormItem>
                <Button type="primary">更新信息</Button>
              </Form>
            </div>
            <div v-else class="safety-content">
              <h2>安全设置</h2>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'personage',
  data () {
    return {
      formValidate: {
        avatar: '',
        mail: '',
        desc: '',
        username: ''
      },
      ruleValidate: {
        mail: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '不正确的电子邮件格式', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入个人简介', trigger: 'blur' },
          { type: 'string', max: 20, message: '简介不大于20个字符', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ]
      },
      selectIndex: 0
    }
  },
  computed: {
    ...mapGetters([
      'avatar',
      'username'
    ])
  }
}
</script>

<style scoped>

</style>
