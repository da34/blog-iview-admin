<template>
    <div class="wrapper">
            <Row :gutter="30">
                <Col span="8">
                    <Card shadow>
                        <p slot="title" style="height: 25px">
                            <Icon type="ios-list" size="25" />
                            分类-标签管理
                        </p>
                        <CellGroup @on-click="name => showTag = name === 'tag'">
                            <Cell title="分类" label="文章的分类管理" :selected="!showTag" name="category">
                                <template v-slot:icon >
                                    <svg-icon iconClass="category" />
                                </template>
                            </Cell>
                            <Cell title="标签" label="文章的标签管理" :selected="showTag" name="tag">
                                <template v-slot:icon >
                                    <svg-icon iconClass="tag" />
                                </template>
                            </Cell>
                        </CellGroup>
                    </Card>
                </Col>
                <Col span="16">
                    <Card class="right-content" shadow>
                        <div v-show="showTag">
                            <h3 class="title">标签</h3>
                            <Tag closable  @on-close="closeTag(tag)" v-for="tag in tagList" :key="tag.name" :name="tag.name">{{tag.name}}</Tag>
                        </div>
                        <div v-show="!showTag">
                            <h3 class="title">分类</h3>
                            <Tag type="dot" closable @on-close="closeCategory(category)"  v-for="category in categoryList" :key="category.name" :name="category.name">{{category.name}}</Tag>
                        </div>
                        <div class="action">
                            <h3 class="title">新增</h3>
                            <div class="real">
                                <Input  v-model="value" placeholder="Enter something..." />
                                <Button type="info" style="margin-left: 30px" @click="handleAdd">新增</Button>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
    </div>
</template>
<script>
import { fetchTagList, deleteTag, createTag } from '@/api/tag'
import { fetchList, deleteCategory, createCategory } from '@/api/category'

const COLOR = ['primary', 'success', 'blue', 'green', 'red',
  'pink', 'magenta', 'volcano', 'orange', 'gold', 'lime', 'cyan', 'geekblue', 'purple']

export default {
  name: 'TagCategory',
  data () {
    return {
      showTag: false,
      edit: false,
      tagList: [],
      categoryList: [],
      value: ''
    }
  },
  watch: {
    async showTag (newVal) {
      if (newVal && !this.tagList.length) {
        this.fetchTagList()
      }
    }
  },
  created () {
    this.fetchCategory()
  },
  methods: {
    async fetchCategory () {
      const { data } = await fetchList()
      this.categoryList = data
    },
    async fetchTagList () {
      const { data } = await fetchTagList()
      this.tagList = data
    },
    closeTag (tag) {
      const that = this
      this.$Modal.confirm({
        title: '删除标签',
        render: (h) => {
          return h('span', {}, [
            `您确定删除`,
            h('Tag', tag.name),
            h('span', '吗')
          ])
        },
        closable: true,
        async onOk () {
          await deleteTag(tag.id)
          that.fetchTagList()
          that.$Message.success('删除成功!')
        }
      })
    },
    closeCategory (caregory) {
      const that = this
      this.$Modal.confirm({
        title: '删除分类',
        render: (h) => {
          return h('span', {}, [
            `您确定删除`,
            h('Tag', {
              props: {
                type: 'dot'
              }
            }, caregory.name),
            h('span', '吗')
          ])
        },
        closable: true,
        async onOk () {
          await deleteCategory(caregory.id)
          that.fetchCategory()
          that.$Message.success('删除成功!')
        }
      })
    },
    async handleAdd () {
      if (this.showTag) {
        await createTag({ name: this.value })
        this.fetchTagList()
      } else {
        await createCategory({ name: this.value })
        this.fetchCategory()
      }
      this.$Message.success('新建成功!')
      this.value = ''
    }
  }
}
</script>
<style scoped lang="stylus">
.wrapper
    .right-content
        padding 0 10px
        .title
            margin-bottom 10px
        .action
            margin-top 30px
            .real
                margin-top 10px
                display flex
                .ivu-input-wrapper
                    flex 0 0 30%
</style>
