$(function () {
    getUserInfo();

    var layer = layui.layer
    $("#btnLogout").on("click", function () {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' },
            function (index) {
                localStorage.removeItem('token')
                location.href = '/login.html'
                layer.close(index)
            })
    })
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers 就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // console.log(res);
            // 调用 renderAvatar 渲染用户的头像
            renderAvatar(res.data)
        },
        // 不论成功还是失败，最终都会调用 complete 回调函数
        // complete: function (res) {
        //     // console.log(res.responseJSON);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token');
        //         location.href = '/login.html';
        //     }
        // }
    })
}

//渲染用户的头像
function renderAvatar(user) {
    //获取用户的名称
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp' + name);
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}