//JSONP原理：
//1. 判断请求与当前页面的域，是否同源，如果同源则发送正常的ajax，就没有跨域的事情了。
//2. 如果不同源，生成一个script标签
//3. 生成一个随机的callback名字，还得创建一个名为这个的方法。
//4. 设置script标签的src，设置为要请求的接口。
//5. 将callback作为参数拼接在后面。
//6. 后端接收到请求后，开始准备要返回的数据
//7. 后端拼接数据，将要返回的数据用callback的值和括号包裹起来
//      例如：callback=asd123456，要返回的数据为{"a":1, "b":2},
//      就要拼接为：asd123456({"a":1, "b":2});
//8. 将内容返回。
//9. 浏览器接收到内容，会当做js代码来执行。
//10. 从而执行名为asd123456的方法。这样我们就接收到了后端返回给我们的对象。

var $ = {
    ajax: function (options) {
        var url = options.url;
        var type = options.type;
        var dataType = options.dataType;
        //判断是否同源（协议，域名，端口号）
        //获取目标url的域
        var targetProtocol = "";
        var targetHost = "";//目标接口的host，host是包涵域名和端口的
        //如果url不带http，那么访问的一定是相对路径，相对路径一定是同源的。
        if (url.indexOf("http://") == 0 || url.indexOf("https://") == 0) {
            var targetUrl = new URL(url);
            targetProtocol = targetUrl.protocol;
            targetHost = targetUrl.host;
        } else {
            targetProtocol = location.protocol;
            targetHost = location.host;
        }
        //首先判断是否为jsonp，因为不是jsonp不用做其他的判断，直接发送ajax
        if (dataType == "jsonp") {
            //要看是否同源
            if (location.protocol == targetProtocol && location.host == targetHost) {//表示同源
                //此处省略。因为同源，jsonp会当做普通的ajax做请求
            } else {//不同源，跨域
                //随机生成一个callback
                var callback = "cb" + Math.floor(Math.random() * 1000000);
                //给window上添加一个方法
                window[callback] = options.success;
                //生成script标签。
                var script = document.createElement("script");
                if (url.indexOf("?") > 0) {//表示已经有参数了
                    script.src = url + "&callback=" + callback;
                } else {//表示没有参数
                    script.src = url + "?callback=" + callback;
                }
                script.id = callback;
                document.head.appendChild(script);
            }
        }
    }
}

$.ajax({
    url: "http://baidu.com",
    type: "get",
    dataType: "jsonp",
    success: function (data) {
        console.log(data);
    }
});