<template>
    <Card>
        <div class="condition">
            <Input  v-model="keyName" suffix="ios-search" placeholder="Search by name..." style="width: 200px;margin-right: 50px;" />
            <Button style="margin-right: 10px;" type="primary" @click="search">Search</Button>
            <Button style="margin-right: 50px;" type="info" @click="reset">Reset</Button>
        </div>
        <div class="action">
            <Button type="primary" icon="md-add" @click="show = true" disabled>Add New User</Button>
        </div>
        <div style="position: relative;">
            <Table :columns="columns" :data="userList" class="list">
                <template slot-scope="{ row }" slot="avatar">
                    <Button v-if="row.avatar" icon="md-eye" type="primary" size="small" @click="preview(row.avatar)">预览</Button>
                </template>
                <template slot-scope="{ row }" slot="status">
                    <ISwitch size="large" :value="row.status === 0" @on-change="handleStatus(row)">
                        <span slot="open">正常</span>
                        <span slot="close">无效</span>
                    </ISwitch>
                </template>
                <template slot-scope="{ row }" slot="comments">
                    <span>{{ row.comments.length }}</span>
                </template>
                <template slot-scope="{ row }" slot="action">
                    <Button type="info" size="small" @click="edit(row)" disabled>编辑</Button>
                </template>
            </Table>
            <Spin size="large" fix v-if="loading" />
        </div>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="total" :current="query.page" @on-change="changePage"></Page>
            </div>
        </div>
        <Modal title="View Image" v-model="visible" :zIndex="1600">
            <img :src="avatar" v-if="visible" style="width: 100%">
            <template v-slot:footer>
                <Button type="primary" style="margin-right: 5px" @click="visible = !visible">关闭</Button>
            </template>
        </Modal>
    </Card>
</template>
<script>
import { getUserList, update } from '@/api/user'

export default {
  name: 'Link',
  data () {
    return {
      visible: false,
      columns: [
        {
          title: 'UserName',
          key: 'username',
          tooltip: true
        },
        {
          title: 'Avatar',
          slot: 'avatar'
        },
        {
          title: 'Mail',
          key: 'mail'
        },
        {
          title: 'CreatedAt',
          key: 'createdAt'
        },
        {
          title: 'Status',
          slot: 'status'
        },
        {
          title: 'Comments',
          slot: 'comments'
        },
        {
          title: 'Action',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      userList: [],
      total: 0,
      query: {
        limit: 10,
        page: 1
      },
      loading: false,
      avatar: '',
      keyName: ''
    }
  },
  watch: {
    'query.page' () {
      this.getUserList()
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    async getUserList () {
      this.loading = true
      let query = Object.assign({}, this.query)
      if (this.keyName) query = Object.assign({}, this.query, { username: this.keyName })
      const { data } = await getUserList(query)
      this.total = data.count
      this.userList = data.rows
      this.loading = false
    },
    changePage (i) {
      this.query.page = i
    },
    preview (img) {
      this.avatar = img
      this.visible = true
    },
    async handleStatus (row) {
      this.loading = true
      row.status = row.status ? 0 : 1
      await update(row)
      await this.getUserList()
      this.loading = false
    },
    async search () {
      if (!this.keyName) {
        this.$Message.warning('搜索条件不能为空')
        return
      }
      const query = Object.assign({}, this.query, { username: this.keyName })
      const { data } = await getUserList(query)
      this.userList = data.rows
      this.total = data.count
    },
    reset () {
      this.keyName = ''
      this.getUserList()
    }
  }
}
</script>
<style scoped lang="stylus">
    .condition, .action
        margin-bottom 20px
        display flex
    .list
        >>> .ivu-table-row
            overflow hidden
            padding 50px 0
</style>
