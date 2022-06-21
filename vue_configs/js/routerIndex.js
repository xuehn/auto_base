
const router = new VueRouter({
  scrollBehavior (to, from, savedPosition) {
    console.log('savedPosition', savedPosition)
    if (savedPosition) {
      return savedPosition
    }
    return { x: 0, y: 0 }
  },
  routes: [
    { path: '/', component: Index, meta: { index: 0 } },
    { path: '/advance/region', component: RegionConfig, meta: { index: 1, title: '图像识别相关设置' } },
    { path: '/advance/region/ocr', component: OcrConfig, meta: { index: 2, title: 'OCR设置' } },
    { path: '/advance/region/threadPool', component: ThreadPoolConfig, meta: { index: 2, title: '线程池配置' } },
    { path: '/basic/lock', component: LockConfig, meta: { index: 1, title: '锁屏设置' } },
    { path: '/basic/floaty', component: FloatyConfig, meta: { index: 1, title: '悬浮窗设置' } },
    { path: '/basic/log', component: LogConfig, meta: { index: 1, title: '日志设置' } },
    { path: '/advance/skipPackage', component: SkipPackageConfig, meta: { index: 1, title: '前台应用白名单设置' } },
    { path: '/advance/common', component: AdvanceCommonConfig, meta: { index: 1, title: '高级设置' } },
    { path: '/about', component: About, meta: { index: 1, title: '关于项目' } },
    { path: '/about/develop', component: DevelopConfig, meta: { index: 2, title: '开发模式' } },
    { path: '/readme', component: Readme, meta: { index: 1, title: '说明与常见问题README' } },
    { path: '/view/collectSummary', component: CollectSummary, meta: { index: 1, title: '测试统计', keepAlive: true } },
    { path: '/view/collectChart', component: CollectChart, meta: { index: 2, title: '统计图表' } },
    { path: '/view/dailyChart', component: DailyChart, meta: { index: 2, title: '按日统计图表' } },
  ]
})

