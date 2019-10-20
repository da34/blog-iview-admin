<template>
    <Card>
        <div class="condition">
            <Input  v-model="keyTitle" suffix="ios-search" placeholder="Search by title..." style="width: 200px;margin-right: 50px;" />
<!--            <DatePicker :value="dateVal" format="yyyy/MM/dd" type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px;margin-right: 50px;"></DatePicker>-->
            <Button style="margin-right: 10px;" type="primary" @click="search">Search</Button>
            <Button style="margin-right: 50px;" type="info" @click="reset">Reset</Button>
        </div>
        <div class="action">
            <Button type="primary" icon="md-add" @click="$router.push('/article/create')">Add New Article</Button>
        </div>
        <div style="position: relative;">
            <Table :columns="columns" :data="articleList" class="list">
                <template slot-scope="{ row }" slot="headerCover">
                    <Button v-if="row.imageUrl" icon="md-eye" type="primary" size="small" @click="preview(row.imageUrl)">预览</Button>
                </template>
                <template slot-scope="{ row }" slot="status">
                    <ISwitch size="large" :value="row.status === 0" @on-change="handleStatus(row)">
                        <span slot="open">正常</span>
                        <span slot="close">草稿</span>
                    </ISwitch>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <Button disabled type="primary" size="small" style="margin-right: 5px" to="/" target="_blank" @click="show(index)">查看</Button>
                    <Button type="info" size="small" @click="edit(row.id)">编辑</Button>
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
            <img :src="headerCover" v-if="visible" style="width: 100%">
            <template v-slot:footer>
                <Button type="primary" style="margin-right: 5px" @click="visible = !visible">关闭</Button>
            </template>
        </Modal>
    </Card>
</template>
<script>
import { fetchList, updateArticle, searchArticle } from '@/api/article'

export default {
  name: 'ArticleBase',
  data () {
    return {
      dateVal: ['Start Date', 'End Date'],
      headerCover: '',
      visible: false,
      columns: [
        {
          title: 'Title',
          key: 'title',
          tooltip: true
        },
        {
          title: 'HeaderCover',
          slot: 'headerCover'
        },
        {
          title: 'publishDate',
          key: 'createdAt'
        },
        {
          title: 'Views',
          key: 'views'
        },
        {
          title: 'Status',
          slot: 'status'
        },
        {
          title: 'ViewPwd',
          key: 'viewPwd'
        },
        {
          title: 'Action',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      articleList: [],
      total: 0,
      query: {
        limit: 10,
        page: 1
      },
      loading: false,
      keyTitle: ''
    }
  },
  watch: {
    'query.page' () {
      this.getArticleList()
    }
  },
  created () {
    this.getArticleList()
  },
  methods: {
    async getArticleList () {
      this.loading = true
      const { data } = await fetchList(this.query)
      // console.log(data)
      this.total = data.count
      this.articleList = data.rows
      this.loading = false
    },
    show (index) {
    },
    edit (id) {
      this.$router.push({
        path: '/article/edit',
        query: { id }
      })
    },
    changePage (i) {
      this.query.page = i
    },
    preview (img) {
      this.headerCover = img
      this.visible = true
    },
    async handleStatus (row) {
      this.loading = true
      row.status = row.status ? 0 : 1
      await updateArticle(row)
      this.getArticleList()
      this.loading = false
    },
    async search () {
      if (!this.keyTitle) this.$Message.warning('搜索条件不能为空')
      const result = await searchArticle({ title: this.keyTitle })
      this.articleList = result.data
      // console.log(result)
    },
    reset () {
      this.keyTitle = ''
      this.getArticleList()
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
