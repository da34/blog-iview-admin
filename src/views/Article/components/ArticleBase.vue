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
                <Button @click="draft" style="margin-right: 10px;">保存草稿</Button>
                <Button type="primary" @click="publish(0)">发布文章</Button>
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
                <RadioGroup v-model="postForm.categoryId" type="button">
                    <Radio  v-for="category in categoryList" :key="category.id" :label="category.id" style="margin: 10px 10px 0 0;" >{{category.name}}</Radio>
                </RadioGroup>
            </div>
            <div class="tag">
                <p>标签</p>
                <Tag color="#FFA2D3"
                     @on-change="handleTag"
                     :checkable="true"
                     :checked="postForm.tags.some(v => v.id === tag.id)"
                     v-for="tag in tagList"
                     :key="tag.name"
                     :name="tag.id"
                >{{tag.name}}</Tag>
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
                    <div style="padding: 20px 0" v-if="!postForm.imageUrl">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>Click or drag files here to upload</p>
                    </div>
                    <div v-else class="preview">
                        <img :src="postForm.imageUrl">
                        <div class="upload-list-cover">
                            <Icon type="ios-eye-outline" @click.stop="visible = true"></Icon>
                            <Icon type="ios-trash-outline" @click.stop="postForm.imageUrl = ''"></Icon>
                        </div>
                    </div>
                </Upload>
                <Modal title="View Image" v-model="visible" :zIndex="1600">
                    <img :src="postForm.imageUrl" v-if="visible" style="width: 100%">
                    <template v-slot:footer>
                        <Button type="primary" @click="visible = false">关闭</Button>
                    </template>
                </Modal>
            </div>
            <div class="rankOpt">
                <Collapse simple>
                    <Panel>
                        <span style="font-weight: 700">高级选项</span>
                        <template v-slot:content>
                            <div class="password">
                                <p>文章访问密码：</p>
                                <Input  style="margin-top: 10px;"  type="password" password  @on-click="isPwd = !isPwd" v-model="postForm.viewPwd" placeholder="输入..." />
                            </div>
                            <div class="top">
                                <span>置顶：</span>
                                <ISwitch size="large" v-model="postForm.putTop" :true-value="0" :false-value="1">
                                    <span slot="open">ON</span>
                                    <span slot="close">OFF</span>
                                </ISwitch>
                            </div>
                            <div class="comment">
                                <span>评论：</span>
                                <ISwitch size="large"  v-model="postForm.commentDisabled" :true-value="0" :false-value="1">
                                    <span slot="open">ON</span>
                                    <span slot="close">OFF</span>
                                </ISwitch>
                            </div>
                        </template>
                    </Panel>
                </Collapse>
            </div>
            <Divider v-if="type !== 'create'" />
            <p v-if="type !== 'create'" style="font-size: 14px; color: #666;">
                最后更新于
                <Time :time="postForm.updateAt" />
            </p>
        </Card>
    </div>
</template>
<script>
import Markdown from '@/components/Markdown/index'
import { fetchList } from '@/api/category'
import { fetchTagList } from '../../../api/tag'
import { uploadFile } from '@/utils'
import { createArticle, updateArticle } from '@/api/article'

const defaultForm = {
  title: '', // 文章题目
  content: '', // 文章内容
  contentShort: '', // 文章摘要
  imageUrl: '', // 文章头图
  createdAt: '', // 前台展示时间
  commentDisabled: 0, // 是否开放评论 0 - 开放, 1 - 禁用
  viewPwd: '', // 文章访问密码
  putTop: 1, // 是否置顶 0 - 置顶
  status: 0, // 状态 0 - 发布, 1 - 草稿
  tags: [], // 标签
  categoryId: 0 // 分类
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
      tagList: [],
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
      this.createdAt = this.postForm.createdAt
      return
    }
    this.postForm = Object.assign({}, defaultForm)
  },
  computed: {
    disabled () {
      return !!this.postForm.imageUrl
    }
  },
  methods: {
    async fetchOption () {
      const category = await fetchList()
      const tags = await fetchTagList()
      this.categoryList = category.data
      this.tagList = tags.data
    },
    async publish (status = 0) {
      this.postForm.content = this.$refs.md.content
      if (typeof status === 'number') this.postForm.status = status
      if (!this.postForm.title || !this.postForm.content) {
        this.$Message.error('标题和内容为必填项!')
      }
      if (this.type !== 'create') {
        const tempArr = []
        this.postForm.tags.map(v => {
          if (v.id) tempArr.push(v.id)
          else tempArr.push(v)
        })
        this.postForm.tags = tempArr.slice()
        // console.log(this.postForm.tags)
        // console.log(tempArr)
        // return
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
      console.log(url)
      this.postForm.imageUrl = url
      return false
    },
    DateOk () {
      this.postForm.createdAt = new Date(this.createdAt).getTime()
    },
    handleTag (checked, id) {
      console.log('我执行了')
      if (checked) this.postForm.tags.push(id)
      else {
        const index = this.postForm.tags.indexOf(id)
        this.postForm.tags.splice(index, 1)
      }
    }
  }
}
</script>
<style scoped lang="stylus">
.article-wrapper
    display flex
    width 100%
    .option
        width 300px
        > div
            margin-top 10px
        .headImg, .tag, .category
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
        .rankOpt
            div
                margin-bottom 10px
    .article
        flex-grow 1
        margin-right 10px
    >>> .ivu-checkbox-inner
        margin-right 3px
    >>> .ivu-collapse
        border 0
    >>> .ivu-collapse-header
        padding 0
</style>
