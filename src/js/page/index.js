require(['jquery', 'handlebars'], function($, handlebars) {
    $.ajax({
        url: '/api/index',
        success: function(res) {
            console.log(res);
        }
    })
})