## 说明
【auto.js游戏脚本】脚手架（Pro8）：封装常用函数、集成常用插件


一、插件
1. OCR文字识别：使用“YunxiOcr抠脚模块版”，包含64位与32位两个版本。
- 备份地址：https://app.yinxiang.com/shard/s24/nl/26737632/f8562309-1fc9-4c1d-b20b-2977fce80f81
- 模块路径：libs/system/YunxiOcr
- 使用方式：参照 YunxiOcr/main.js
    ```
    //引用模块
    const myOCR = require("OCR_model");
    //加载插件
    console.time("加载")
    var OCR = myOCR.prepare()
    console.timeEnd("加载")
    ...
    //图片识别
    var OCR_Result = OCR.loadImage(myImage);
    ```
2.可视化调试：
- 备份地址：
- 模块路径：libs/system/drawFloaty
- 使用方式：参照 drawFloaty/main.js
    ```
    
    //引用模块
    let drawFloaty = require('./drawFloaty');
    //初始化
    drawFloaty.init({
        // 小米11状态栏高度138px
        statusBarHeight: 138
    });
    //绘制浮框（根据坐标）
    drawFloaty.draw({
        region: [left, top, right, bottom],
        color: 'green' //red、green、orange
    }, 300);
    ```

二、函数
1. todo


## 关于授权

## TODOs
- 热更新
- 脚本运行信息浮窗
- 调试绘制浮窗扩展（支持auto的region格式，即[x,y,width,height]）
- 基础函数封装
- 基础ui界面
- 授权功能优化

### 其他主流分辨率支持
目前已支持：
- 1920 * 1080
- 2160 * 1080

待支持：
- 1280 * 720（云设备，模拟器比较普遍，如果模拟器用1080p的话，配置低点的机器可能就有点难带动了，而且目前的云机大多都无法修改分辨率）
- 2340 * 1920
- 等其它分辨率

### 调整框架性逻辑，需新增等待多点比色成功并执行操作

### 调试参数配置界面优化

### 使用说明的补充与完善

### 自定义Toast，缩小时间，调整位置不挡在脚本需要判断的位置

### 功能完善
