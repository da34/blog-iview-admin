<template>
    <Card>
        <div class="condition">
            <Input  v-model="keyName" suffix="ios-search" placeholder="Search by name..." class="search"/>
            <Button style="margin-right: 10px;" type="primary" @click="search">Search</Button>
            <Button style="margin-right: 50px;" type="info" @click="reset">Reset</Button>
        </div>
        <div class="action">
            <Button type="primary" icon="md-add" @click="show = true">Add New Link</Button>
        </div>
        <div style="position: relative;">
            <Table :columns="columns" :data="linkList" class="list">
                <template slot-scope="{ row }" slot="avatar">
                    <Button v-if="row.avatar" icon="md-eye" type="primary" size="small" @click="preview(row.avatar)">预览</Button>
                </template>
                <template slot-scope="{ row }" slot="status">
                    <ISwitch size="large" :value="row.status === 0" @on-change="handleStatus(row)">
                        <span slot="open">正常</span>
                        <span slot="close">无效</span>
                    </ISwitch>
                </template>
                <template slot-scope="{ row }" slot="action">
                    <Button type="info" size="small" @click="edit(row)">编辑</Button>
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
        <Modal :title="modalTitle" v-model="show" :zIndex="1600" @on-ok="handleOk('link')">
            <Form ref="link" :model="linkData" label-position="top" :rules="ruleLink">
                <FormItem label="Name" prop="name">
                    <Input v-model="linkData.name" />
                </FormItem>
                <FormItem label="Avatar">
                    <Input v-model="linkData.avatar" />
                </FormItem>
                <FormItem label="OutLine">
                    <Input v-model="linkData.outline" />
                </FormItem>
                <FormItem label="URL" prop="URL">
                    <Input v-model="linkData.URL" />
                </FormItem>
            </Form>
            <span style="padding-right: 10px;">Status</span>
            <ISwitch size="large" :value="linkData.status" :true-value="0" :false-value="1" @on-change="status => linkData.status = status">
                <span slot="open">正常</span>
                <span slot="close">无效</span>
            </ISwitch>
        </Modal>
    </Card>
</template>
<script>
import { getList, update, search, create } from '@/api/link'

const defaultLink = {
  name: '',
  avatar: '',
  URL: '',
  outline: '',
  status: 0
}

export default {
  name: 'Link',
  data () {
    const validatorName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter your Name'))
      }
      callback()
    }
    const validatorURL = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter your URL'))
      }
      callback()
    }
    return {
      visible: false,
      show: false,
      modalTitle: 'Create Link',
      linkData: Object.assign({}, defaultLink),
      columns: [
        {
          title: 'Name',
          key: 'name',
          minWidth: 100,
          tooltip: true
        },
        {
          title: 'Avatar',
          minWidth: 100,
          slot: 'avatar'
        },
        {
          title: 'Outline',
          minWidth: 100,
          key: 'outline'
        },
        {
          title: 'URL',
          minWidth: 100,
          key: 'URL'
        },
        {
          title: 'Status',
          minWidth: 100,
          slot: 'status'
        },
        {
          title: 'Action',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      linkList: [],
      total: 0,
      query: {
        limit: 10,
        page: 1
      },
      loading: false,
      keyName: '',
      avatar: '',
      type: 0,
      ruleLink: {
        name: [
          { validator: validatorName, trigger: 'blur' }
        ],
        URL: [
          { validator: validatorURL, trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    'query.page' () {
      this.getLinkList()
    }
  },
  created () {
    this.getLinkList()
  },
  methods: {
    async getLinkList () {
      this.loading = true
      const { data } = await getList(this.query)
      this.total = data.count
      this.linkList = data.rows
      this.loading = false
    },
    edit (row) {
      this.linkData = Object.assign({}, row)
      this.show = true
      this.type = 1
      this.modalTitle = 'Edit Link'
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
      this.getLinkList()
      this.loading = false
    },
    async search () {
      if (!this.keyName) {
        this.$Message.warning('搜索条件不能为空')
        return
      }
      const query = Object.assign({}, this.query, { name: this.keyName })
      const { data } = await getList(query)
      this.linkList = data.rows
      this.total = data.count
    },
    reset () {
      this.keyName = ''
      this.getLinkList()
    },
    handleOk (name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          if (!this.type) {
            await create(this.linkData)
            this.$Message.success('新增成功!')
          } else {
            await update(this.linkData)
            this.$Message.success('修改成功!')
          }
          this.linkData = Object.assign({}, defaultLink)
          this.getLinkList()
        } else {
          this.$Message.error('Fail!')
        }
      })
    }
  }
}
</script>
<style scoped lang="stylus">
    .condition, .action
        margin-bottom 20px
        display flex
        .search
            flex 0 0 200px
            margin-right 50px
@media (max-width: 768px)
    .condition
        flex-wrap wrap
        >>> Button
            margin-top 10px
        .search
            flex 0 0 auto
</style>
