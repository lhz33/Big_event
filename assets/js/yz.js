$(function() {
    $.ajaxPrefilter(function(a) {
        a.url = "http://ajax.frontend.itheima.net" + a.url
    })
});