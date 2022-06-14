let drawFloaty = require('./drawFloaty');

drawFloaty.init({
    // 小米11状态栏高度138px
    statusBarHeight: 138
});

setInterval(function() {
    let toDraw = [];
    let eles = visibleToUser(true).textMatches(/.+/).find();
    let eles2 = visibleToUser(true).descMatches(/.+/).find();
    eles.forEach(ele => {
        let bds = ele.bounds();
        toDraw.push({
            region: [bds.left, bds.top, bds.right, bds.bottom],
            color: 'green'
        });
    });
    eles2.forEach(ele => {
        for (let a of eles) {
            if (a == ele) return;
        }
        let bds = ele.bounds();
        toDraw.push({
            region: [bds.left, bds.top, bds.right, bds.bottom],
            color: 'green'
        });
    });
    drawFloaty.draw(toDraw, 300);
}, 100);


setTimeout(function() {
    drawFloaty.destroy();
    exit();
}, 50000);