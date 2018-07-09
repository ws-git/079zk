$(function() {
    $.ajax({
        url: '/api/index',
        success: function(res) {
            var tpl = $('#tpl').html();

            var template = handlebars.template(tpl);

            var html = template(res.list);

            $('.nav').html(html);
        }
    })
})