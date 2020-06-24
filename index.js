// 序列帧视频播放
function SequenceFrame(object) {
    return {
        container: object.container, //序列容器
        urlRoot: object.urlRoot, //序列根目录
        imgType: object.imgType || 'png', //序列格式
        frameNumber: object.frameNumber, //序列帧数
        framePerSecond: object.framePerSecond || 18, //每秒帧数
        imgList: {
            length: 0
        },  // 图片资源
        percent: 0, // 加载图片的进度
        loadedAutoPlay: object.loadedAutoPlay || false, // 自动播放
        loop: object.loop || 0,  //是否循环，0：无限循环
        oriLoop: object.loop || 0,  //保存原始值，是否循环，0：无限循环
        pauseTimer: '',  //播放序列计时器
        loopTimer: '',   //循环计时器
        success: object.success || function () { },  //加载成功执行的函数
        index: 1,  //当前图片序号
        playIng: false, // 当前是否正在播放，用于暂停中的判断
        pauseRightNow: object.pauseRightNow || false,   // 调用暂停方法时是否需要立刻暂停，默认执行（即会执行完一遍动画）
        fillMode: object.fillMode || 'forwards',        // 动画播放完毕后停留的状态，默认forwards：停在最后一帧；none：不显示任何一帧
        load: function () {
            var that = this;
            for (var start = 1; start <= that.frameNumber; start++) {
                (function (index) {
                    var img = new Image();
                    img.onload = function () {
                        that.imgList.length++;
                        that.imgList[index] = this;
                        that.percent = Math.round(100 * that.imgList.length / that.frameNumber);
                        that.loadSuccess();
                        that.autoPlay();
                    };
                    img.onerror = function () {
                        that.imgList.length++;
                        that.percent = Math.round(100 * that.imgList.length / that.frameNumber);
                        that.loadSuccess();
                        that.autoPlay();
                    };
                    img.src = that.urlRoot + index + '.' + that.imgType;
                })(start);
            }
        },
        play: function () {
            if (this.percent == 100) {
                var that = this;
                that.index = 1;
                that.loop = that.oriLoop;
                that.playIng = true;
                var step = function () {
                    if (that.index == 1) {
                        that.container.innerHTML = '';
                    }
                    if (that.imgList[that.index - 1]) {
                        that.container.removeChild(that.imgList[that.index - 1]);
                    }
                    if(that.imgList[that.index]) {
                        that.container.appendChild(that.imgList[that.index]);
                    } else {
                        // 若这一帧图片加载失败，则替换成上一帧
                        var i = that.index - 1;
                        i = i<1?that.frameNumber:i; // 若首帧加载失败，尝试使用最后一帧
                        if(that.imgList[i]) {
                            that.container.appendChild(that.imgList[i]);
                        } else {
                            // 若图片均加载失败
                            var error = new Image();
                            error.alt="资源" + that.index + "加载失败，刷新页面重试~";
                            that.container.appendChild(error);
                            that.pause();
                            return;
                        }
                    }
                    // 序列增加
                    that.index++;
                    // 如果超过最大限制
                    if (that.index <= that.frameNumber) {
                        that.pauseTimer = setTimeout(step, Math.round(1000 / that.framePerSecond));
                    } else {
                        if (that.loop - 1 > 0) {
                            that.loopTimer = setTimeout(function() {
                                that.play();
                                that.loop--;
                            }, Math.round(1000 / that.framePerSecond))
                        }
                        if (that.loop - 1 < 0) {
                            that.loopTimer = setTimeout(function() {
                                that.play();
                            }, Math.round(1000 / that.framePerSecond))
                        }
                        if(that.loop - 1 == 0) {
                            that.playIng = false;
                            if(that.fillMode == 'none') {
                                that.container.innerHTML = '';
                            }
                        }
                    }
                };
                step();
            }
        },
        autoPlay: function () {
            if (this.loadedAutoPlay) {
                this.play();
            }
        },
        pause: function (callBack) {
            var that = this;
            if(!that.playIng) {
                return;
            }
            that.loop = 1;
            var restTime = (that.frameNumber - that.index + 3) * Math.round(1000 / that.framePerSecond);
            if(that.pauseRightNow) {
                that.playIng = false;
                // console.log('暂停动画');
                clearTimeout(that.pauseTimer);
                clearTimeout(that.loopTimer);
                if(that.fillMode == 'none') {
                    that.container.innerHTML = '';
                }
                if (typeof callBack === "function") {
                    callBack();
                }
            } else {
                setTimeout(function () {
                    clearTimeout(that.pauseTimer);
                    that.playIng = false;
                    if (typeof callBack === "function") {
                        callBack();
                    }
                }, restTime);
            }
        },
        loadSuccess: function (successFun) {
            if (this.percent == 100) {
                this.success();
            }
        }
    }
};
