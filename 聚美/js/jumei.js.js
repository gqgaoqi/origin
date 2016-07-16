/**
 * Created by Administrator on 2016/6/16.
 */
//登陆请求

$('#ubtn').click(function(){
    var name=$('#uname').val();
    var pwd=$('#upwd').val();
    if(name==""||pwd==""){$('#alert').html("请输入用户名和密码！")}
    else{$.get('data/denglu.php',{user_name:name,user_pwd:pwd},function(data){
        if(data==0){
            $('[data-dismiss="modal"]').click();
            $('#navbar_1> .d').html("<li><a>欢迎你："+name +"</a><li><li><a href='' id='clear' >退出登录</a></li>");
            //这执行记住密码功能
            jzpwd(name,pwd);
            //$('#clear').click(function(){clearCookie(name)});
        }
        else{$('#alert').html(data)}
        $('#uname').html('');
        $('#upwd').html('');
    })}

});
//svg绘制验证码
function yanzhen() {
    var bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

    //绘制验证码背景
    var svg = $('#post_yz').next()[0];
    bg.setAttribute('width', 100);
    bg.setAttribute('height', 34);
    bg.setAttribute('fill', rc(180, 240));
    svg.appendChild(bg);
    var db = 'abcdefghijkmnpqrstwxyzABCDEFGHJKLMNPQRSTWXYZ23456789';
    //验证码字符串

    function rc(min, max) {
        //随机色函数
        var r = Math.floor(Math.random() * (max - min)) + min;
        var g = Math.floor(Math.random() * (max - min)) + min;
        var b = Math.floor(Math.random() * (max - min)) + min;
        return "rgb(" + r + "," + g + "," + b + ")";
    }

    function rt(min, max) {
        //随机数函数
        var m = Math.floor(Math.random() * (max - min)) + min;
        return m;
    }

    for (var i = 0,sr=""; i < 4; i++) {
        //绘制字符
        var te = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        te.innerHTML = db[rt(0, db.length)];
        te.setAttribute('x', 10 + rt(-5, 5) + i * 20);
        te.setAttribute('y', 24 + rt(-5, 5));
        te.setAttribute('font-size', rt(20, 30));
        te.setAttribute('fill', rc(0, 150));
        te.setAttribute('rotate', rt(-45, 45));
        svg.appendChild(te);
        sr+=te.innerHTML;
    }
    for (var i = 0; i < 6; i++) {
        //绘制干扰线
        var le = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        le.setAttribute('x1', rt(10, 90));
        le.setAttribute('y1', rt(5, 34));
        le.setAttribute('x2', rt(10, 90));
        le.setAttribute('y2', rt(5, 34));
        le.setAttribute('stroke', rc(0, 150));
        svg.appendChild(le);
    }
    return sr; //返回验证码
}
var t = "";
//传递验证码
t=yanzhen();
$('#post_yz').next().next().click(function(){
    //刷新验证码
    $(this).prev().html('');
    t=  yanzhen();
});
//注册界面
$('#post').on('keyup','input',function(){
    if(this.id==="post_uname"){
        //用户名验证
        var reg=/^[\u4e00-\u9fa5]{3,5}$/g;
        var bool= reg.test($(this).val());
        var l = $(this).val().length;
        var pname=$(this).val();
        if(bool) {//正则验证通过
            $.get('data/post_name.php',{pname:pname},function(data){
                //异步请求验证用户名是否注册
                $('#post_uname').removeClass('c').prev().html(data==0?'该用户名已被占用！':'');
            });
        }else{
            if (l < 3) { $(this).prev().html('用户名太短')}
            else if (l > 5) {$(this).prev().html('用户名太长') }
            else{$(this).prev().html('用户名格式不正确， 请输入3~5个汉字!')}
            $(this).addClass('c');
        }

    }
    if(this.id==="post_upwd"){
        //密码验证
        reg=/^[a-z0-9A-Z]{6,18}$/g;
        bool= reg.test($(this).val());
        l = $(this).val().length;
        if(bool) {
            $(this).removeClass('c').prev().html('')
        }else{
            $(this).addClass('c');
            if (l < 6) {$(this).prev().html('密码最短6位') }
            else if (l > 18) { $(this).prev().html('密码最长18位') }
        }
    }
    if(this.id==="post_npwd"){
        //确认密码验证
        if($(this).val()===$('#post_upwd').val()){$(this).removeClass('c').prev().html('')}
        else{$(this).addClass('c').prev().html('两次密码输入不一致！')}
    }
    if(this.id==="post_yz"){
        //验证码
        if($(this).val().toLowerCase()== t.toLowerCase()){$(this).removeClass('c').parent().children("span").html('')}
        else{$(this).addClass('c').parent().children("span").html('验证码输入错误！')}
    }
});
var i="";
//声明空字符串接收span内容
$('#confirm').click(function(){
    $.each($('#post .modal-body div>span'),function(s,m){
        //遍历每一个提示内容
        i+= m.innerHTML;
    });
    if(i===""&&($('#confirm')[0].checked===true)){
        //判断复选框是否选中
        $('#post_btn').attr('disabled',false);
    }else{
        $('#post_btn').attr('disabled',true);
    }
    i="";
});
//点击注册
$('#post_btn').click(function(){
    var name=$('#post_uname').val();
    var pwd=$('#post_upwd').val();
    $.get('data/post.php',{user_name:name,user_pwd:pwd},function(data){
        //异步请求执行注册语句
        $('#mobody').addClass('none').next().addClass('none');
        // $('#mobody');
        $('#post_success').removeClass('none');
        $('#post_success>h1').html(data);
    });

});
$('#query').click(function(){           //现在登录
    console.log(123);
    $('[data-dismiss="modal"]').click();
    $('#mobody').removeClass('none').next().removeClass('none');
    $('#post_success').addClass('none');
});
//锚点跳转动画
$('#floor').on('click','a',function(){
    var h = $(this).attr('data-hf');//获取自定义属性值 获取锚点名称
    $('html,body').animate({scrollTop:$(h).offset().top-10},300);//使用动画跳转到当前锚点位置
});
//记住密码功能
//写入cookie
function jzpwd(name,pwd){
    var date=new Date();
    date.setDate(date.getDate());
        document.cookie="uname="+name+";expires="+date.toGMTString();
}
//检测cookie是否存在，如果存在就直接获取，否则创建
function checkCookie(uname){
    var cook = document.cookie;
    cook=cook.split(';');
    console.log(cook);
    $.each(cook,function(t,s){
        console.log(s.split('=')[1]);
    })
}
checkCookie();

function clearCookie(name){
    document.cookie="uname="+name+";expires=Thu,01-Jan-70 00:00:01 GMT";
}