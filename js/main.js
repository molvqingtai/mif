/**
 * @Author: molvqingtai
 * @Date:   2018-06-26T17:45:43+08:00
 * @Email:  molvqingtai@gmail.com
 * @Filename: main.js
 * @Last modified by:   molvqingtai
 * @Last modified time: 2018-07-05T11:27:51+08:00
 */

//懒加载
$(function() {
    $("img.lazy").lazyload({
        effect: "fadeIn"
    });
});

// header特效
$(function() {
    var fixedObj = {
        bar: $(".top-bar"),
        header: $("header"),
        main: $("main"),
        topHeight: function() {
            return this.bar.height() + this.header.height();
        },
        isBar: function() {
            return this.bar.is(":hidden");
        }
    }

    function fixedTop() {
        if ($(window).scrollTop() > fixedObj.topHeight()) {
            fixedObj.main.css("margin-top", fixedObj.header.height());
            fixedObj.header.addClass("active");
        } else if (!fixedObj.isBar() && $(window).scrollTop() <= fixedObj.bar.height()) {
            fixedObj.main.css("margin-top", 0);
            fixedObj.header.removeClass("active");
        } else if ($(window).scrollTop() <= 0) {
            fixedObj.main.css("margin-top", 0);
            fixedObj.header.removeClass("active");
        }
    }
    $(window).scroll(fixedTop);

})


//Mobile 菜单
$(function() {
    $(".header-menu").on("touchstart", function() {
        var activeEl = $(".header-logo,.header-menu-line,.header-nav-wrap,.header-nav-item");
        console.log($('.header-logo').hasClass("active"));
        if (!activeEl.hasClass("active")) {

            activeEl.addClass("active");
            $("html").css({
                "height": "100%",
                "overflow": "hidden"
            });
        } else {
            activeEl.removeClass("active");
            $("html").css({
                "height": "auto",
                "overflow": "auto"
            });
        }
    })
})


//轮播
$(function() {
    var swiper = new Swiper('#swiper', {
        speed: 600,
        parallax: true,
        autoplay: {
            delay: 5000,
            stopOnLastSlide: false,
            disableOnInteraction: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
    var swiperMin = new Swiper('#swiper-min', {
        autoplay: {
            delay: 5000,
            stopOnLastSlide: false,
            disableOnInteraction: true,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        }
    })
})

//日历
$(function() {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        $(".about-right-input").val(new Date().toJSON().substr(0, 10));
    } else {
        $(".about-right-input").attr("type", "text").val(new Date().toJSON().substr(0, 10)).cxCalendar();
    }

})

//显示隐藏订单
$(function() {
    var activeEl = $(".buy-order-items,.buy-order-total,.buy-order-button");
    $(".buy-order-button").on("touchstart", function() {
        if (activeEl.hasClass("active")) {
            activeEl.removeClass("active");
            $(this).text("隐藏订单");
        } else {
            activeEl.addClass("active");
            $(this).text("显示订单");
        }

    })
})


//表单验证
$(function() {
    var validator = new Validator('form', [{
        //name 字段
        name: 'username',
        display: "用户名不能为空！",
        // 验证条件
        rules: 'required'
    }, {
        name: "passworld",
        display: "密码不能为空！",
        rules: 'required'
    }, {
        name: "repassworld",
        display: "密码不一致！",
        rules: 'same(passworld)|required'
    }, {
        name: "name",
        display: "姓名不能为空！",
        rules: 'required'
    }, {
        name: "tel",
        display: "电话格式错误！",
        rules: 'required|is_phone'
    }, {
        name: "address",
        display: "地址不能为空！",
        rules: 'required'
    }, {
        name: "email",
        display: "邮箱格式错误！",
        rules: 'required|is_email'
    }, {
        name: "newpassworld",
        display: "新密码不能为空！",
        rules: 'required'
    }, {
        name: "renewpassworld",
        display: "新密码不一致！",
        rules: 'same(newpassworld)|required'
    }, {
        name: "title",
        display: "标题不能为空！",
        rules: 'required'
    }, {
        name: "text",
        display: "留言不能为空！",
        rules: 'required'
    }, {
        name: "number",
        display: "商品数量必须为整数！",
        regexp_num: /^[1-9][0-9]*$/,
        rules: 'required|regexp_num'
    }], function(obj, evt) {
		console.log(evt);
        if (obj.errors) {
            tips(obj.errors[0].display);

            function tips(msg) {
                var tipStr = `<div id="tips">${msg}</div>`;
                if ($("#tips").length > 0) {
                    $("#tips").replaceWith(tipStr);
                } else {
                    $("body").append(tipStr);
                }
            }
        }
    })

})
