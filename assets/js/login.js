$(function() {
    // 点击注册的事件
    $("#go_login").on("click", function() {
            $(".login_box").hide();
            $(".reg_box").show();

        })
        // 点击登录的事件
    $("#go_reg").on("click", function() {
        $(".login_box").show();
        $(".reg_box").hide();
    })

    // 声明form
    var form = layui.form;
    // 声明layui
    var layer = layui.layer;
    // 验证密码框
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        reg_pwd: function(value) {
            // 形参value是文本框的内容
            // 获取密码框的文本
            var text_pwd = $(".reg_box [name=password]").val();
            if (value !== text_pwd) {
                return "两次密码不一致"
            }
        }
    })

    // 注册发起的请求
    $("#form_reg").on("submit", function(e) {
        e.preventDefault();
        var data = $(this).serialize();
        $.ajax({
            type: "post",
            url: "/api/reguser",
            data: data,
            success: function(res) {
                if (res.status !== 0) { return layer.msg(res.message) }
                // console.log(res);
                // layer.msg(res.message);

                layer.msg(res.message, {
                    icon: 1,
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                }, function() {
                    //do something
                    $("#go_reg").click()
                });
            }
        })
    });
    // console.log($("#form_login").html());
    // 登录发起的请求
    // $("#form_login").submit(function(e) {
    $("#form_login").on("submit", function(e) {
        // console.log(1111);s
        e.preventDefault();
        var data = $(this).serialize();
        $.post("/api/login", data,
            function(res) {
                console.log(res);
                if (res.status !== 0) { return layer.msg(res.message) };
                layer.msg(res.message, {
                    icon: 1,
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                }, function() {
                    //do something
                    // 将登录成功得到的 token 字符串，保存到 localStorage 中
                    localStorage.setItem("token", res.token)
                    location.href = '/index.html'
                });
            }
        )
    })


})