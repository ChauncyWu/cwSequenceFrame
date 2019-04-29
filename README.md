# cwSequenceFrame
介绍：前端项目中经常有需要用到序列帧的地方，一般来说使用CSS3动画即可实现，也可以很方便的控制动画播放，使用CSS3实现的效果在PC和iOS上可以正常播放，但是在安卓上效果不尽人意，关于此的原因没有找到相关资料就没深入了解。为了保证在安卓上能够正常播放序列帧又不影响性能，我参考以下文章编写了一个符合个人实际需求的通过JS控制的动画播放控件。

[炫酷H5中序列图片视频化播放的高性能实现](https://www.zhangxinxu.com/wordpress/2018/05/image-sequence-html5-video-play/)

# v1.0
## 更新
【新增】播放指定序列帧图片，支持自定义每秒帧数，控制何时加载，是否加载完成就自动播放，是否循环播放。
```
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


