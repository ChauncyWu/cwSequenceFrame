# cwSequenceFrame

介绍：前端项目中经常有需要用到序列帧的地方，一般来说使用CSS3动画即可实现，也可以很方便的控制动画播放，使用CSS3实现的效果在PC和iOS上可以正常播放，但是在安卓上效果不尽人意，关于此的原因没有找到相关资料就没深入了解。为了保证在安卓上能够正常播放序列帧又不影响性能，我参考以下文章编写了一个符合个人实际需求的通过JS控制的动画播放控件。

[炫酷H5中序列图片视频化播放的高性能实现](https://www.zhangxinxu.com/wordpress/2018/05/image-sequence-html5-video-play/)

## 一、API

### 1.1 一般选项
|参数|描述|类型|默认|举例|启用版本|
|----|----|----|----|----|------|
|container|容器|HTML元素|必填|document.getElementById('container')|1.0|
|urlRoot  |序列帧根目录，相对html页面的地址|string|必填|'images/loading/'|1.0|
|imgType  |序列帧格式|string|'png'|'jpg'|1.0|
|frameNumber|序列帧帧数|num|必填|12|1.0|
|framePerSecond|每秒帧数|num|18|18|1.0|
|loadedAutoPlay|加载完成自动播放|boolean|false|true|1.0|
|loop|循环次数|num|0（无限循环）|1（循环一次）|1.0|
|pauseRightNow|暂停方法调用方式|boolean|false（调用暂停方法后会执行完当前一次循环）|true（调用暂停方法后立即停止）|2.0|
|fillMode|动画播放完毕后停留的状态|string|forwards（停在最后一帧）|none（不显示任何一帧）|2.0|

### 1.2 可获取参数
|参数|描述|类型|默认|启用版本|
|----|----|----|----|----|
|imgList|加载的图片序列对象|Object|{length:0}|1.0|
|percent|加载图片的进度|num|0|1.0|
|playIng|当前是否正在播放|boolean|false|1.0|

### 1.3 回调函数
|方法|描述|
|---|----|
|success()|加载成功后执行的函数|

### 1.4 方法
|方法|描述|
|---|----|
|load()|加载序列帧图片资源|
|play()|开始播放序列帧动画|
|pause(fun)|停止动画，可传入函数，在播放完当前动画后执行|

## 二、版本

### v2.0

#### 更新

- 【新增】pauseRightNow参数，调用暂停方法时是否需要立刻暂停，默认（false）执行（即会执行完一遍动画）。
- 【新增】playIng参数，当前是否正在播放，用于暂停中的判断。
- 【新增】fillMode参数，动画播放完毕后停留的状态，默认forwards：停在最后一帧；none：不显示任何一帧。

#### 使用

```js
var demo = new SequenceFrame({
    container: document.getElementById('container'),    //存放序列帧的容器
    urlRoot: 'images/loading/',     //序列帧根目录，相对html页面的地址
    imgType: 'png',                 //序列帧格式
    frameNumber: 12,                //序列帧帧数
    framePerSecond: 18,             //每秒帧数
    loadedAutoPlay: true,          //加载完成自动播放
    loop: 0,                        //播放次数，0：循环
    pauseRightNow: true,            // 暂停方法调用，立刻暂停
    fillMode: 'none'                // 播放完毕停留在最后一帧
    success: function (){}          //加载成功后执行的函数
});

demo.load();                    //加载序列帧图片资源
```

### v1.0

#### 更新

- 【新增】播放指定序列帧图片，支持自定义每秒帧数，控制何时加载，是否加载完成就自动播放，是否循环播放。

#### 使用

```js
var demo = new SequenceFrame({
    container: document.getElementById('container'), //存放序列帧的容器
    urlRoot: 'images/loading/',     //序列帧根目录，相对html页面的地址
    imgType: 'png',                 //序列帧格式
    frameNumber: 12,                //序列帧帧数
    framePerSecond: 18,             //每秒帧数
    loadedAutoPlay: false,          //加载完成自动播放
    loop: true,                     //循环播放
    success: function (){}          //加载成功后执行的函数
});

demo.load();                    //加载序列帧图片资源
demo.play();                    //开始播放序列帧动画
demo.pause(fun);                //停止动画，但会执行完当前一次播放，可传入函数，在播放完当前动画后执行

```
