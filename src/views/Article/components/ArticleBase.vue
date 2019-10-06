<template>
    <div class="article-wrapper">
        <Card class="article">
            <div>
                <h2>{{title}}</h2>
                <Divider />
                <div class="title">
                    <h3>标题</h3> <br />
                    <Input v-model="postForm.title" placeholder="请输入标题..." style="width: 95%" :clearable="true" />
                </div>
                <Markdown :text="postForm.content" style="margin-top: 20px;z-index: 100" ref="md" />
            </div>
            <div style="text-align: center">
                <Button type="primary" style="margin-right: 10px;" @click="publish(0)">发布</Button>
                <Button @click="draft">草稿</Button>
            </div>
        </Card>
        <Card class="option">
            <h4>选项</h4>
            <Divider />
            <div class="date">
                <p>发布日期</p>
                <DatePicker v-model="createdAt" @on-ok="DateOk" type="datetime" style="margin-top: 10px; width: 90%;" />
            </div>
            <div class="category">
                <p>分类</p>
                <Input v-model="postForm.category.name" />
<!--                <RadioGroup v-model="postForm.category.name" type="button">-->
<!--                    <Radio  v-for="category in categoryList" :key="category.name" :label="category.name" style="margin-right: 10px;" />-->
<!--                    <Button icon="ios-add" type="dashed" size="small" @click="handleAdd"></Button>-->
<!--                </RadioGroup>-->
            </div>
            <div class="tag">
                <p>标签</p>
<!--                <Tag color="#F4B9C6"-->
<!--                     @on-change="handleTag"-->
<!--                     :checkable="true"-->
<!--                     :checked="postForm.tags.some(v => v.name === tag.name)"-->
<!--                     v-for="tag in tagList"-->
<!--                     :key="tag.name"-->
<!--                     :name="tag.name"-->
<!--                >{{tag.name}}</Tag>-->
                <Input v-model="postForm.tag.name" />
            </div>
            <div class="headImg">
                <p>文章头图</p>
                <Upload
                        ref="Upload"
                        type="drag"
                        :disabled="disabled"
                        :format="['jpg','jpeg','png']"
                        style="margin-top: 10px;"
                        :before-upload="handleUpload"
                        :show-upload-list="false"
                        action="//jsonplaceholder.typicode.com/posts/">
                    <div style="padding: 20px 0" v-if="!postForm.image_url">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>Click or drag files here to upload</p>
                    </div>
                    <div v-else class="preview">
                        <img :src="postForm.image_url">
                        <div class="upload-list-cover">
                            <Icon type="ios-eye-outline" @click.stop="visible = true"></Icon>
                            <Icon type="ios-trash-outline" @click.stop="postForm.image_url = ''"></Icon>
                        </div>
                    </div>
                </Upload>
                <Modal title="View Image" v-model="visible" :zIndex="1600">
                    <img :src="postForm.image_url" v-if="visible" style="width: 100%">
                    <template v-slot:footer>
                        <Button type="primary" @click="visible = false">关闭</Button>
                    </template>
                </Modal>
            </div>
            <div class="password">
                <p>文章访问密码</p>
                <Input disabled style="margin-top: 10px;" icon="ios-eye-outline" :type="iptType" @on-click="isPwd = !isPwd" v-model="postForm.password" placeholder="输入..." />
            </div>
            <Divider v-if="type !== 'create'" />
            <p v-if="type !== 'create' && postForm.updateAt === 'Invaliddate'" style="font-size: 14px; color: #666;">
                最后更新于
                <Time :time="postForm.updateAt" />
            </p>
        </Card>
    </div>
</template>
<script>
import Markdown from '@/components/Markdown/index'
import { fetchList } from '@/api/category'
import { uploadFile } from '@/utils'
import { createArticle, updateArticle } from '@/api/article'

const defaultForm = {
  title: '', // 文章题目
  content: '', // 文章内容
  content_short: '', // 文章摘要
  image_url: '', // 文章头图
  createdAt: '', // 前台展示时间
  comment_disabled: 0, // 是否开放评论 0 - 开放, 1 - 禁用
  password: '', // 文章访问密码
  top: 1, // 是否置顶 0 - 置顶
  status: 0, // 状态 0 - 发布, 1 - 草稿
  tag: { name: '' }, // 标签
  category: { name: '' } // 分类
}
export default {
  name: 'ArticleBase',
  components: { Markdown },
  props: {
    type: {
      type: String,
      default: 'create'
    },
    title: {
      type: String,
      default: '新建文章'
    },
    article: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      createdAt: '',
      categoryList: [],
      visible: false,
      uploadList: [],
      postForm: {},
      isPwd: false
    }
  },
  created () {
    this.fetchOption()
    if (this.type !== 'create') {
      this.postForm = Object.assign({}, this.article)
      this.postForm.category = this.postForm.category ? this.postForm.category : { name: '' }
      this.postForm.tag = this.postForm.tag ? this.postForm.tag : { name: '' }
      this.createdAt = this.postForm.createdAt
      return
    }
    this.postForm = Object.assign({}, defaultForm)
  },
  computed: {
    disabled () {
      return !!this.postForm.image_url
    },
    iptType () {
      return this.isPwd ? 'text' : 'password'
    }
  },
  methods: {
    async fetchOption () {
      const category = await fetchList()
      this.categoryList = category.data
    },
    async publish (status = 0) {
      this.postForm.content = this.$refs.md.content
      if (typeof status === 'number') this.postForm.status = status
      if (!this.postForm.title || !this.postForm.content) {
        this.$Message.error('标题和内容为必填项!')
      }
      if (this.type !== 'create') {
        await updateArticle(this.postForm)
      } else {
        await createArticle(this.postForm)
      }
      this.$Message.success('成功发布')
      await this.$router.push({
        path: '/article/show'
      })
    },
    draft () {
      this.publish(1)
    },
    refresh () {
      const { fullPath } = this.$route
      this.$router.replace({
        name: 'refresh',
        params: { path: fullPath }
      })
    },
    // 上传图片
    async handleUpload (file) {
      const { url } = await uploadFile(file)
      this.postForm.image_url = url
      return false
    },
    DateOk () {
      this.postForm.createdAt = new Date(this.createdAt).getTime()
    },
    handleAdd () {
    }
  }
}
</script>
<style scoped lang="stylus">
.article-wrapper
    display flex
    .option
        flex 0 0 300px
        > div
            margin-top 10px
        .headImg, .tag, .category, .password
            margin 10px 0
            .preview
                position relative
                .upload-list-cover
                    display none
                    position absolute
                    top 0
                    bottom 0
                    left 0
                    right 0
                    background rgba(0,0,0,.6)
                    i
                        color #fff
                        font-size 25px
                        cursor pointer
                        margin auto
                &:hover .upload-list-cover
                    display flex
                img
                    width 100%
    .article
        flex 1
        margin-right 10px
    >>> .ivu-checkbox-inner
        margin-right 3px
</style>
