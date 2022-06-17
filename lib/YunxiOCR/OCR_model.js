module.exports = OCR = {
    prepare: function() {
        runtime.loadDex("./libs/YunxiOcr.dex");
        if (!files.exists(runtime.files.join(runtime.libraryDir, "libc++_shared.so"))) {
            files.copy("./libs/libc++_shared.so", runtime.files.join(runtime.libraryDir, "libc++_shared.so"));
        }
        if (!files.exists(runtime.files.join(runtime.libraryDir, "libedge-infer.so"))) {
            files.copy("./libs/libedge-infer.so", runtime.files.join(runtime.libraryDir, "libedge-infer.so"));
        }

        function detectOcr(path1, path2, path3) {
            var instance = new com.plugin.PaddleOCR.YunxiPlugin(context);
            var isLoad = instance.OnLoad()
            this.init = function(path1, path2, path3) {
                var result = instance.init(4, files.read(path1), files.path(path2), files.path(path3)); //设置模型文件路径
                if (result) {
                    return true;
                } else {
                    return instance.getLastError(); //如果有错误可以用getLastError获取
                }
            }
            var InitResult = this.init(path1, path2, path3);
            this.loadImage = function(image) {
                if (InitResult) {
                    var thisimage = image.getBitmap();
                    var result = instance.ocr(thisimage, 0.9);
                    return JSON.parse(result);
                } else {
                    return "未初始化"
                }
            }
            this.Destroy = function() {
                instance.destroy();
            }
            events.on('exit', function(t) {
                instance.destroy(); //必须释放,否则下次无法init
            });
        }
        return new detectOcr("./tessdata/config.json", "./tessdata/eng.traineddata", "./tessdata/chi_sim.traineddata");
    },
    findText: function(where, myText, action) {
        let mypoint = android.graphics.Point()
        where.some(result => {
            if (result.label.search(myText) != -1) {
                pointArr = result.points
                mypoint.x = (pointArr[0].x + pointArr[1].x + pointArr[2].x + pointArr[3].x) / 4
                mypoint.y = (pointArr[0].y + pointArr[1].y + pointArr[2].y + pointArr[3].y) / 4
                return false
            }
        })
        if (action == "click") {
            return click(mypoint.x, mypoint.y)
        }
        return mypoint
    }
}