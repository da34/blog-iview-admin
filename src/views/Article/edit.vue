<template>
    <div>
        <ArticleBase v-if="JSON.stringify(article) !== '{}'" type="edit" title="编辑文章" :article="article" />
    </div>
</template>

<script>
import ArticleBase from './components/ArticleBase'
import { fetchArticle } from '@/api/article'

export default {
  name: 'edit',
  components: { ArticleBase },
  data () {
    return {
      article: {}
    }
  },
  created () {
    this.getArticleDetail(this.$route.query.id)
  },
  methods: {
    async getArticleDetail (id) {
      const { data } = await fetchArticle(id)
      this.article = data
    }
  }
}
</script>

<style scoped>

</style>
