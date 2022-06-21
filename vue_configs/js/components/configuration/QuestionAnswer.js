const MarkdownPreview = {
  name: 'MarkdownPreview',
  props: {
    text: String
  },
  data() {
    return {
    }
  },
  computed: {
    markdownHtml: function () {
      try {
        return Mdjs.md2html(this.text).replace(/href="#[^"]+"/g, 'href="javascript:void(0);"')
      } catch (e) {
        return this.text
      }
    }
  },
  template: `
    <p v-html="markdownHtml" class="markdown-preview"></p>
  `
}

const QueryLimit = {
  name: 'QueryLimit',
  mixins: [mixin_common],
  components: { MarkdownPreview },
  props: {
    targetUrl: String
  },
  data() {
    return {
      accessToken: '',
      showDialog: false,
      teachForAccessToken: '### 获取AccessToken方式\r\n\
       - 登录Gitee账号，点击头像进入`设置`；\r\n\
       - 在 `安全设置` 找到 `私人令牌`；\r\n\
       - 点击 `生成新令牌` 输入描述信息；\r\n\
       - 权限可以仅勾选 `issues`；\r\n\
       - 点击 `提交` 弹窗中根据提示输入登录密码，即可生成私人令牌；\r\n\
       - 私人令牌属于密码其他人获取后可以以你的身份发布任何issue请妥善保管不要共享到其他地方。\r\n\
       - 脚本中提交后只会保存在当前webview的localStorage中，清除缓存后丢失，请自行妥善保存。'
    }
  },
  methods: {
    setToken: function () {
      if (this.accessToken) {
        localStorage.setItem('accessToken', this.accessToken)
        this.$emit('requery', { accessToken: this.accessToken })
      }
    },
    jumpToUrl: function () {
      $app.invoke('openUrl', { url: this.targetUrl })
    },
  },
  template: `
    <div style="padding: 2rem">
      <markdown-preview text="## Gitee 限流 请稍后再访问 "  />
      <div style="display:flex;justify-content: center;">
        <van-button @click="showDialog=true">输入accessToken</van-button>
      </div>
      <markdown-preview :text="teachForAccessToken" style="margin-top:1rem" />
      <div style="display:flex;justify-content: center;">
        <van-button @click="jumpToUrl">直接访问网页版</van-button>
      </div>
      <van-dialog v-model="showDialog" show-cancel-button @confirm="setToken" :get-container="getContainer" title="输入AccessToken">
        <van-field v-model="accessToken" placeholder="请输入accessToken" label="accessToken" />
      </van-dialog>
    </div>
  `

}

const Readme = {
  name: 'Readme',
  components: { MarkdownPreview, QueryLimit },
  data() {
    return {
      base64Content: '',
      accessToken: '',
      noAccessPerm: false,
      loading: true,
      contentFrom: ''
    }
  },
  computed: {
    markdownContent: function () {
      let content = Base64.decode(this.base64Content)
      // console.log(content)
      content = content.replace(/\(\.([^\)]+)\)/g, '(https://gitee.com/TonyJiangWJ/Ant-Forest/raw/master/$1)')
      // console.log(content)
      return content
    }
  },
  methods: {
    getReadme: function () {
      this.loading = true
      API.get(`https://gitee.com/api/v5/repos/TonyJiangWJ/Ant-Forest/readme?access_token=${this.accessToken}`).then(resp => {
        this.base64Content = resp.content
        this.contentFrom = 'Gitee'
        return Promise.resolve(true)
      }).catch(e => {
        return Promise.resolve(false)
      }).then(success => {
        if (success) {
          this.loading = false
          this.noAccessPerm = false
        } else {
          console.log('请求gitee失败，尝试请求github')
          this.getGithubReadme()
        }
      })
    },
    getGithubReadme: function () {
      API.get(`https://api.github.com/repos/TonyJiangWJ/Ant-Forest/contents/README.md?ref=master`)
      .then(resp => {
        this.noAccessPerm = false
        this.base64Content = resp.content
        this.contentFrom = 'Github'
        return Promise.resolve({})
      })
      .catch(e => {
        this.noAccessPerm = true
        this.$toast('accessToken 无效 被限流啦')
        return Promise.resolve({})
      })
      .then(r => {
        this.loading = false
      })
    },
    queryWithAccessToken: function (payload) {
      this.accessToken = payload.accessToken
      this.getReadme()
    }
  },
  mounted() {
    this.accessToken = localStorage.getItem('accessToken')
    this.getReadme()
  },
  template: `
  <div>
    <div v-if="!loading && !noAccessPerm" style="padding: 2rem 2rem 0 2rem; font-size: 0.5rem">来源：{{contentFrom}}</div>
    <query-limit v-if="noAccessPerm" @requery="queryWithAccessToken"  target-url="https://gitee.com/TonyJiangWJ/Ant-Forest" />
    <div v-else style="padding: 2rem">
      <markdown-preview :text="markdownContent"/>
    </div>

    <van-overlay :show="loading" z-index="1000">
      <div class="wrapper">
        <van-loading size="4rem" vertical>加载中...</van-loading>
      </div>
    </van-overlay>
  </div>
  `
}