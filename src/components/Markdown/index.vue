<template>
    <div id="editor">
        <mavon-editor
                v-model="content"
                :boxShadow="false"
                ref="md"
                placeholder="开始创作..."
                @imgAdd="imgUpload"
                style="max-height: 90%;"
        />
    </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { uploadFile } from '@/utils'

export default {
  name: 'Markdown',
  components: {
    mavonEditor
  },
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      content: this.text
    }
  },
  methods: {
    // 上传图片
    async imgUpload (pos, file) {
      const { url } = await uploadFile(file)
      this.$refs.md.$img2Url(pos, url)
    }
  }
}
</script>

<style scoped lang="stylus">
#editor
    width 100%
    height 60vh
</style>
