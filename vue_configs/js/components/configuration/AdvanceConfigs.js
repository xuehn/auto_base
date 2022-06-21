

/**
 * 区域信息配置以及图像识别相关配置
 */
const RegionConfig = {
  mixins: [mixin_common],
  data() {
    return {
      mounted: false,
      hough_config: false,
      configs: {
        // 取色识别配置
        can_collect_color_lower: '#12905F',
        can_collect_color_upper: '#2EA178',
        collectable_lower: '#89d600',
        collectable_upper: '#ffff14',
        water_lower: '#caa50e',
        water_upper: '#ffede2',
      },
      validations: {
        stroll_button_region: VALIDATOR.REGION,
        rank_check_region: VALIDATOR.REGION,
        bottom_check_region: VALIDATOR.REGION,
        tree_collect_region: VALIDATOR.REGION,
        bottom_check_gray_color: VALIDATOR.COLOR,
        can_collect_color_lower: VALIDATOR.COLOR,
        can_collect_color_upper: VALIDATOR.COLOR,
        collectable_lower: VALIDATOR.COLOR,
        collectable_upper: VALIDATOR.COLOR,
        helpable_lower: VALIDATOR.COLOR,
        helpable_upper: VALIDATOR.COLOR,
      }
    }
  },
  methods: {
    loadConfigs: function () {
      // 浏览器测试时使用
      this.configs.stroll_button_region = this.configs.stroll_button_left + ',' + this.configs.stroll_button_top + ',' + this.configs.stroll_button_width + ',' + this.configs.stroll_button_height
      this.configs.rank_check_region = this.configs.rank_check_left + ',' + this.configs.rank_check_top + ',' + this.configs.rank_check_width + ',' + this.configs.rank_check_height
      this.configs.bottom_check_region = this.configs.bottom_check_left + ',' + this.configs.bottom_check_top + ',' + this.configs.bottom_check_width + ',' + this.configs.bottom_check_height
      this.configs.tree_collect_region = this.configs.tree_collect_left + ',' + this.configs.tree_collect_top + ',' + this.configs.tree_collect_width + ',' + this.configs.tree_collect_height

      $app.invoke('loadConfigs', {}, config => {
        Object.keys(this.configs).forEach(key => {
          console.log('child load config key:[' + key + '] value: [' + config[key] + ']')
          this.$set(this.configs, key, config[key])
        })
        this.configs.stroll_button_region = this.configs.stroll_button_left + ',' + this.configs.stroll_button_top + ',' + this.configs.stroll_button_width + ',' + this.configs.stroll_button_height
        this.configs.rank_check_region = this.configs.rank_check_left + ',' + this.configs.rank_check_top + ',' + this.configs.rank_check_width + ',' + this.configs.rank_check_height
        this.configs.bottom_check_region = this.configs.bottom_check_left + ',' + this.configs.bottom_check_top + ',' + this.configs.bottom_check_width + ',' + this.configs.bottom_check_height
        this.configs.tree_collect_region = this.configs.tree_collect_left + ',' + this.configs.tree_collect_top + ',' + this.configs.tree_collect_width + ',' + this.configs.tree_collect_height

        this.mounted = true
      })
    },
    showRealVisual: function () {
      $app.invoke('showRealtimeVisualConfig', {})
    },
    openGrayDetector: function () {
      $app.invoke('openGrayDetector', {})
    },
  },
  computed: {
    strollButtonRegion: function () {
      return this.configs.stroll_button_region
    },
    rankCheckRegion: function () {
      return this.configs.rank_check_region
    },
    bottomCheckRegion: function () {
      return this.configs.bottom_check_region
    },
    treeCollectRegion: function () {
      return this.configs.tree_collect_region
    },
    visualConfigs: function () {
      return {
        // 排行榜校验区域
        rank_check_left: this.configs.rank_check_left,
        rank_check_top: this.configs.rank_check_top,
        rank_check_width: this.configs.rank_check_width,
        rank_check_height: this.configs.rank_check_height,
        // 能量球所在范围
        tree_collect_left: this.configs.tree_collect_left,
        tree_collect_top: this.configs.tree_collect_top,
        tree_collect_width: this.configs.tree_collect_width,
        tree_collect_height: this.configs.tree_collect_height,
        // 底部校验区域
        bottom_check_left: this.configs.bottom_check_left,
        bottom_check_top: this.configs.bottom_check_top,
        bottom_check_width: this.configs.bottom_check_width,
        bottom_check_height: this.configs.bottom_check_height,
        // 逛一逛按钮区域
        stroll_button_left: this.configs.stroll_button_left,
        stroll_button_top: this.configs.stroll_button_top,
        stroll_button_width: this.configs.stroll_button_width,
        stroll_button_height: this.configs.stroll_button_height,
      }
    },
  },
  watch: {
    strollButtonRegion: function () {
      if (this.mounted && this.validations.stroll_button_region.validate(this.strollButtonRegion)) {
        let match = /^(\d+)\s*,(\d+)\s*,(\d+)\s*,(\d+)\s*$/.exec(this.strollButtonRegion)
        this.configs.stroll_button_left = parseInt(match[1])
        this.configs.stroll_button_top = parseInt(match[2])
        this.configs.stroll_button_width = parseInt(match[3])
        this.configs.stroll_button_height = parseInt(match[4])
      }
    },
    rankCheckRegion: function () {
      if (this.mounted && this.validations.rank_check_region.validate(this.rankCheckRegion)) {
        let match = /^(\d+)\s*,(\d+)\s*,(\d+)\s*,(\d+)\s*$/.exec(this.rankCheckRegion)
        this.configs.rank_check_left = parseInt(match[1])
        this.configs.rank_check_top = parseInt(match[2])
        this.configs.rank_check_width = parseInt(match[3])
        this.configs.rank_check_height = parseInt(match[4])
      }
    },
    bottomCheckRegion: function () {
      if (this.mounted && this.validations.bottom_check_region.validate(this.bottomCheckRegion)) {
        let match = /^(\d+)\s*,(\d+)\s*,(\d+)\s*,(\d+)\s*$/.exec(this.bottomCheckRegion)
        this.configs.bottom_check_left = parseInt(match[1])
        this.configs.bottom_check_top = parseInt(match[2])
        this.configs.bottom_check_width = parseInt(match[3])
        this.configs.bottom_check_height = parseInt(match[4])
      }
    },
    treeCollectRegion: function () {
      if (this.mounted && this.validations.tree_collect_region.validate(this.treeCollectRegion)) {
        let match = /^(\d+)\s*,(\d+)\s*,(\d+)\s*,(\d+)\s*$/.exec(this.treeCollectRegion)
        this.configs.tree_collect_left = parseInt(match[1])
        this.configs.tree_collect_top = parseInt(match[2])
        this.configs.tree_collect_width = parseInt(match[3])
        this.configs.tree_collect_height = parseInt(match[4])
      }
    },
    // 变更区域信息，用于实时展示
    visualConfigs: {
      handler: function (v) {
        console.log('区域信息变更 触发消息')
        $app.invoke('saveConfigs', v)
      },
      deep: true
    },
  },
  template: `
  <div>
    <div ref="top-block"></div>
    <van-divider content-position="left">
      图像分析相关
      <van-button style="margin-left: 0.4rem" plain hairline type="primary" size="mini" @click="showRealVisual">实时查看区域配置</van-button>
    </van-divider>
    <tip-block>区域输入框左滑可以通过滑块输入数值，也可以通过取色工具获取目标区域信息：<van-button style="margin-left: 0.4rem" plain hairline type="primary" size="mini" @click="openGrayDetector">打开取色工具</van-button></tip-block>
    <tip-block>功能扩展中...</tip-block>
    <van-cell-group>
        <van-cell title="ocr配置" is-link @click="routerTo('/advance/region/ocr')" />
        <van-cell title="线程池配置" is-link @click="routerTo('/advance/region/threadPool')" />
    </van-cell-group>
  </div>
  `
}

const OcrConfig = {
  mixins: [mixin_common],
  data() {
    return {
      ocr_invoke_count: '已使用10次剩余490次',
      configs: {
        // ocr相关
        useOcr: true,
        ocrThreshold: null,
        autoSetThreshold: true,
        apiKey: '',
        secretKey: '',
        // 排行榜识别配置
        check_finger_by_pixels_amount: true,
        finger_img_pixels: 1800,
      }
    }
  },
  mounted() {
    $nativeApi.request('ocrInvokeCount', {}).then(resp => {
      this.ocr_invoke_count = resp
    })
  },
  template: `
  <div>
    <van-cell-group>
      <tip-block>默认使用多点找色方式识别列表中的小手，失效后请打开基于像素点个数判断是否可收取，这是一个阈值当像素点个数小于给定的值之后就判定为可收取</tip-block>
      <switch-cell title="基于像素点个数判断是否可收取" title-style="flex:2;" v-model="configs.check_finger_by_pixels_amount" />
      <number-field v-if="configs.check_finger_by_pixels_amount" v-model="configs.finger_img_pixels" label="小手像素点个数" placeholder="小手像素点个数" label-width="8em" />
      <tip-block>当不启用百度OCR的时候会使用多点找色方式模拟识别倒计时，如果模拟识别不准确时可以看情况选择百度OCR方式</tip-block>
      <tip-block v-if="configs.useOcr">{{ocr_invoke_count}}</tip-block>
      <switch-cell title="是否启用百度OCR倒计时" v-model="configs.useOcr" />
      <template v-if="configs.useOcr">
        <tip-block>请填写百度AI平台申请的API_KEY和SECRET_KEY</tip-block>
        <van-field v-model="configs.apiKey" label="" placeholder="apiKey" label-width="8em" type="text" input-align="right" />
        <van-field v-model="configs.secretKey" label="" placeholder="secretKey" label-width="8em" type="password" input-align="right" />
      </template>
      <template v-if="configs.useOcr">
        <tip-block>通过图片中非白色的像素点阈值筛选当前图片是否进行OCR请求 理论上像素点越多数值越小 越有必要进行OCR识别 从而节省识别次数</tip-block>
        <switch-cell title="是否自动判断OCR像素阈值" v-model="configs.autoSetThreshold"/>
        <number-field v-model="configs.ocrThreshold" label="OCR像素阈值" placeholder="留空使用默认配置" label-width="8em" />
      </template>
    </van-cell-group>
  </div>`
}

const ThreadPoolConfig = {
  mixins: [mixin_common],
  data() {
    return {
      configs: {
        thread_pool_size: '5',
        thread_pool_max_size: '5',
        thread_pool_queue_size: '16',
        thread_pool_waiting_time: '5',
      }
    }
  },
  template: `
  <div>
    <van-cell-group>
      <tip-block>图像识别的线程池配置，如果过于卡顿，请调低线程池大小，同时增加线程池等待时间。</tip-block>
      <number-field v-model="configs.thread_pool_size" label="线程池大小" placeholder="留空使用默认配置" label-width="8em" />
      <number-field v-model="configs.thread_pool_max_size" label="线程池最大大小" placeholder="留空使用默认配置" label-width="8em" />
      <number-field v-model="configs.thread_pool_queue_size" label="线程池等待队列大小" label-width="10em" placeholder="留空使用默认配置" />
      <number-field v-model="configs.thread_pool_waiting_time" label="线程池等待时间" placeholder="留空使用默认配置" label-width="8em" >
        <template #right-icon><span>秒</span></template>
      </number-field>
    </van-cell-group>
  </div>`
}