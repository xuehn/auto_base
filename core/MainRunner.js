/*
 * @Author: NickHopps
 * @Date: 2019-01-31 22:58:00
 * @Last Modified by: TonyJiangWJ
 * @Last Modified time: 2022-06-05 09:01:50
 * @Description:
 */
let {config: _config, storage_name: _storage_name} = require('../config.js')(runtime, global)
let singletonRequire = require('../lib/SingletonRequirer.js')(runtime, global)
let _widgetUtils = singletonRequire('WidgetUtils')
let automator = singletonRequire('Automator')
let _commonFunctions = singletonRequire('CommonFunction')
let _runningQueueDispatcher = singletonRequire('RunningQueueDispatcher')
let alipayUnlocker = singletonRequire('AlipayUnlocker')
let AntForestDao = singletonRequire('AntForestDao')
let FloatyInstance = singletonRequire('FloatyUtil')
let OpenCvUtil = require('../lib/OpenCvUtil.js')
let callStateListener = !_config.is_pro && _config.enable_call_state_control ? singletonRequire('CallStateListener')
    : {
        exitIfNotIdle: () => {
        }, enableListener: () => {
        }, disableListener: () => {
        }
    }
let StrollScanner = require('./StrollScanner.js')
let ImgBasedFriendListScanner = require('./ImgBasedFriendListScanner.js')
let BaseScanner = require('./BaseScanner.js')

function MainRunner() {
    let _base_scanner = new BaseScanner()
    _commonFunctions.registerOnEngineRemoved(function () {
        if (_base_scanner !== null) {
            _base_scanner.destroy()
            _base_scanner = null
        }
    }, 'release threadPool')

    var _current_num = 0;
    /***********************
     * 综合操作
     ***********************/

        // 打开应用
    const startApp = function () {
            toastLog('假装打开应用~')
        sleep(1000)
            toastLog('test：'+_config.test)
            sleep(1000)
            toastLog('test2：'+_config.test)
            sleep(1000)
            /*app.startActivity({
                action: 'VIEW',
                data: 'alipays://platformapi/startapp?appId=60000002',
                packageName: _config.package_name
            })
            FloatyInstance.setFloatyInfo({x: _config.device_width / 2, y: _config.device_height / 2}, "查找是否有'打开'对话框")
            let confirm = _widgetUtils.widgetGetOne(/^打开$/, 1000)
            if (confirm) {
                automator.clickCenter(confirm)
            }
            _commonFunctions.readyForAlipayWidgets()
            if (_config.is_alipay_locked) {
                sleep(1000)
                alipayUnlocker.unlockAlipay()
            }*/
        }


    /**
     * 关闭活动弹窗
     */
    const clearPopup = function () {
        /*// 合种/添加快捷方式提醒
        threads.start(function () {
            let floty = idEndsWith('J_pop_treedialog_close').findOne(
                _config.timeout_findOne
            )
            if (floty) {
                floty.click()
            }
        })
        threads.start(function () {

            let buttons = className('android.widget.Button')
                .desc('关闭').findOne(
                    _config.timeout_findOne
                )
            if (buttons) {
                buttons.click()
            }
        })
        threads.start(function () {
            let floty = descEndsWith('关闭蒙层').findOne(_config.timeout_findOne)
            if (floty) {
                floty.click()
            }
            floty = textEndsWith('关闭蒙层').findOne(_config.timeout_findOne)
            if (floty) {
                floty.click()
            }
        })
        debugInfo('关闭蒙层成功')*/
    }

    // 显示文字悬浮窗
    const showFloaty = function (text) {
        _commonFunctions.closeFloatyWindow()
        let window = floaty.window(
            < card
        cardBackgroundColor = "#aa000000"
        cardCornerRadius = "20dp" >
            < horizontal
        w = "250"
        h = "40"
        paddingLeft = "15"
        gravity = "center" >
            < text
        id = "log"
        w = "180"
        h = "30"
        textSize = "12dp"
        textColor = "#ffffff"
        layout_gravity = "center"
        gravity = "left|center"
            / >
            < card
        id = "stop"
        w = "30"
        h = "30"
        cardBackgroundColor = "#fafafa"
        cardCornerRadius = "15dp"
        layout_gravity = "right|center"
        paddingRight = "-15"
            >
            < text
        w = "30"
        h = "30"
        textSize = "16dp"
        textColor = "#000000"
        layout_gravity = "center"
        gravity = "center"
            >
              ×
    <
        /text>
        < /card>
        < /horizontal>
        < /card>
    )
        window.stop.on('click', () => {
            _runningQueueDispatcher.removeRunningTask()
            exit()
        })
        logInfo(text)
        ui.run(function () {
            window.log.text(text)
        })
    }

    /***********************
     * 构建下次运行
     ***********************/

        // 异步获取 toast 内容
    const getToastAsync = function (filter, limit, exec) {
            limit = limit >= 6 ? 6 : limit
            filter = typeof filter == null ? '' : filter
            let lock = threads.lock()
            let complete = lock.newCondition()
            let result = []
            lock.lock()

            // 在新线程中开启监听
            let thread = threads.start(function () {
                lock.lock()
                try {
                    let temp = []
                    let counter = 0
                    let toastDone = false
                    let startTimestamp = new Date().getTime()
                    // 监控 toast
                    events.onToast(function (toast) {
                        if (toastDone) {
                            return
                        }
                        if (
                            toast &&
                            toast.getPackageName() &&
                            toast.getPackageName().indexOf(filter) >= 0
                        ) {
                            counter++
                            temp.push(toast.getText())
                            if (counter >= limit) {
                                logInfo('正常获取toast信息' + temp)
                                toastDone = true
                            } else if (new Date().getTime() - startTimestamp > 10000) {
                                warnInfo('等待超过十秒秒钟，直接返回结果')
                                toastDone = true
                            }
                        } else {
                            errorInfo('无法获取toast内容，直接返回[]')
                            toastDone = true
                        }
                    })
                    // 触发 toast
                    limit = exec()
                    let count = 3
                    while (count-- > 0 && !toastDone) {
                        sleep(1000)
                    }
                    if (!toastDone) {
                        warnInfo('获取toast超时释放锁')
                    }
                    debugInfo('temp' + temp)
                    result = temp
                } finally {
                    complete.signal()
                    lock.unlock()
                }
            })
            // 获取结果
            debugInfo('阻塞等待toast结果')
            complete.await()
            debugInfo('阻塞等待结束，等待锁释放')
            lock.unlock()
            debugInfo('获取toast结果成功：' + result)
            events.removeAllListeners('toast')
            return result
        }


    /***********************
     * 主要函数
     ***********************/

    /**
     * 监听toast信息
     */
    const Executor = function () {
        this.eventSettingThread = null
        this.stopListenThread = null
        this.needRestart = false
        this.setupEventListeners = function () {
            this.eventSettingThread = threads.start(function () {
                events.setMaxListeners(0)
                events.observeToast()
                // 监控 toast
                events.onToast(function (toast) {
                    if (
                        toast &&
                        toast.getPackageName() &&
                        toast.getPackageName().indexOf(_config.package_name) >= 0
                    ) {
                        let text = toast.getText()
                        if (/.*近期.*存在异常.*/.test(text)) {
                            warnInfo(['被检测到异常 延迟{}分钟后执行 toast:{}', _config.cool_down_time || 10, text], true)
                            _commonFunctions.setUpAutoStart(_config.cool_down_time || 10)
                            exit()
                        } else {
                            debugInfo(['获取到toast信息：{}', text])
                        }
                    }
                })
            })
        }

        /**
         * 监听音量上键直接关闭
         */
        this.listenStopCollect = function () {
            this.interruptStopListenThread()
            this.stopListenThread = threads.start(function () {
                infoLog('即将开始执行预设任务，运行中可按音量上键关闭', true)
                events.removeAllKeyDownListeners('volume_down')
                events.observeKey()
                events.on("key_down", function (keyCode, event) {
                    let stop = false
                    if (keyCode === 24) {
                        stop = true
                        warnInfo('关闭脚本', true)
                        _commonFunctions.cancelAllTimedTasks()
                    } else if (keyCode === 25) {
                        //warnInfo('延迟五分钟后启动脚本', true)
                        //_commonFunctions.setUpAutoStart(5)
                        //stop = true
                    }
                    if (stop) {
                        unlocker && unlocker.saveNeedRelock(true)
                        _runningQueueDispatcher.removeRunningTask()
                        _config.resetBrightness && _config.resetBrightness()
                        exit()
                    }
                })
            })
        }

        this.readyForStart = function () {
            callStateListener.exitIfNotIdle()
            callStateListener.enableListener()
            _runningQueueDispatcher.addRunningTask()
            // 取消定时任务
            _commonFunctions.cancelAllTimedTasks()
            _commonFunctions.delayIfBatteryLow()
            if (!(images.hasOwnProperty('isDelegated') && images.isDelegated())) {
                warnInfo('图片资源代理丢失，重新启动')
                _commonFunctions.getAndUpdateDismissReason('_lost_image_delegate')
                _runningQueueDispatcher.executeTargetScript(FileUtils.getRealMainScriptPath())
                exit()
            } else {
                debugInfo('图片资源代理正常')
            }
            unlocker.exec()
            _commonFunctions.showDialogAndWait(true)
            _config._releasedScreenCapturer && _commonFunctions.requestScreenCaptureOrRestart()
            this.listenStopCollect()
            _commonFunctions.showEnergyInfo()
            if (_base_scanner === null) {
                _base_scanner = new BaseScanner()
            }
        }

        this.endLoop = function () {
            callStateListener.disableListener()
            resourceMonitor.releaseAll()
            this.interruptStopListenThread()
            events.removeAllListeners('key_down')
            events.removeAllListeners('toast')
            if (_config.auto_lock === true && unlocker.needRelock() === true) {
                debugInfo('重新锁定屏幕')
                automator.lockScreen()
                unlocker.saveNeedRelock(true)
            }
            _config.resetBrightness && _config.resetBrightness()
            flushAllLogs()
            _runningQueueDispatcher.removeRunningTask()
            if (_base_scanner !== null) {
                _base_scanner.destroy()
                _base_scanner = null
            }
            // 清除过长日志
            _commonFunctions.reduceConsoleLogs()
        }

        this.interruptStopListenThread = function () {
            if (this.stopListenThread !== null) {
                this.stopListenThread.interrupt()
                this.stopListenThread = null
            }
        }

        this.endMain = function () {
            logInfo('任务执行结束')
            if (this.eventSettingThread != null) {
                this.eventSettingThread.interrupt()
                this.eventSettingThread = null
            }
        }
    }

    /**
     * 循环运行
     */
    const CycleExecutor = function () {
        Executor.call(this)

        this.execute = function () {
            this.setupEventListeners()
            this.readyForStart()
            _current_num = 0
            startApp()
            // 首次启动等待久一点
            sleep(1500)
            while (true) {
                _current_num++
                _commonFunctions.showEnergyInfo(_current_num)
                // 增加当天运行总次数
                _commonFunctions.increaseRunTimes()
                infoLog("========循环第" + _current_num + "次运行========")
                //showCollectSummaryFloaty()
                try {
                    openAndWaitForPersonalHome()
                    //执行逻辑

                } catch (e) {
                    errorInfo('发生异常 [' + e + ']')
                    _current_num = _current_num == 0 ? 0 : _current_num - 1
                    _commonFunctions.printExceptionStack(e)
                    _has_next = true
                    _re_try = 0
                }

                logInfo('========本轮结束========')
            }
            this.endLoop()
            this.endMain()
            // 返回最小化应用
            _commonFunctions.minimize(_config.package_name)
        }
    }



    return {
        exec: function () {
            let executor = null
            if (_config.is_cycle) {
                executor = new CycleExecutor()
            } else {
                //executor = new CountdownExecutor()
            }
            executor.execute()
        }
    }
}

module.exports = new MainRunner()
