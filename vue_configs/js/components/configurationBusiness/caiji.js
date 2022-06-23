
const CaijiConfig = {
    name: 'CaijiConfig',
    mixins: [mixin_common],
    data () {
        return {
            configs: {
                test: '',
                test2: ''
            },
        }
    },
    methods: {
        mainRun: function () {
            $app.invoke('mainRun', {})
        }
    },
    template: `
  <div>
    <tip-block style="margin: 0.5rem">建设中...</tip-block>
    <van-field v-model="configs.test" label="测试" type="text" placeholder="请输入测试配置" input-align="right" />
    <van-field v-model="configs.test2" label="测试" type="text" placeholder="请输入测试配置" input-align="right" />
    <van-button class="footer" type="primary" block @click="mainRun">开始执行</van-button>
  </div>`
}
