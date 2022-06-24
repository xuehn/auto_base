
const CaijiConfig = {
    name: 'CaijiConfig',
    mixins: [mixin_common],
    data () {
        return {
            configs: {
                test: '',
            },
            loading:{
                isLoading: false,
            }
        }
    },
    methods: {
        mainRun: function () {
            this.loading.isLoading = true;
            var business_type_name = '采集';
            $app.invoke('mainRun', {business_type: 'caiji', business_type_name: business_type_name})
        }
    },
    template: `
  <div>
    <tip-block style="margin: 0.5rem">建设中...</tip-block>
    <van-field v-model="configs.test" label="测试" type="text" placeholder="请输入测试配置" input-align="right" />
    <van-button class="footer" type="primary" block @click="mainRun" :loading="loading.isLoading">开始执行</van-button>
  </div>`
}
