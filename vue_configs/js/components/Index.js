let IndexConfig = {
  mixins: [mixin_methods],
  data: function () {
    return {
      menuItems: [
        {
          title: '锁屏设置',
          link: '/basic/lock'
        },
        {
          title: '图像识别相关设置',
          link: '/advance/region'
        },
        {
          title: '悬浮窗设置',
          link: '/basic/floaty'
        },
        {
          title: '日志设置',
          link: '/basic/log'
        },
        {
          title: '前台应用白名单设置',
          link: '/advance/skipPackage'
        },
        {
          title: '高级设置',
          link: '/advance/common'
        },
        {
          title: '关于项目',
          link: '/about'
        },
        {
          title: '脚本说明README',
          link: '/readme'
        },
        {
            title: '[测试统计]',
            link: '/view/collectSummary'
        },
      ]
    }
  },
  methods: {
    routerTo: function (item) {
      this.$router.push(item.link)
      this.$store.commit('setTitleWithPath', { title: item.title, path: item.link })
    }
  },
  template: `<div>
    <van-cell-group>
      <van-cell :title="item.title" is-link v-for="item in menuItems" :key="item.link" @click="routerTo(item)"/>
    </van-cell-group>
  </div>`
}


let IndexBusiness = {
    mixins: [mixin_methods],
    data: function () {
        return {
            menuItems: [
                {
                    title: '采集',
                    link: '/business/caiji'
                },{
                    title: '高级配置',
                    link: '/index/config'
                }
            ]
        }
    },
    methods: {
        routerTo: function (item) {
            this.$router.push(item.link)
            this.$store.commit('setTitleWithPath', { title: item.title, path: item.link })
        }
    },
    template: `<div>
    <van-cell-group>
      <van-cell :title="item.title" is-link v-for="item in menuItems" :key="item.link" @click="routerTo(item)"/>
    </van-cell-group>
  </div>`
}
