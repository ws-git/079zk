var Handlebars = function() {
    return {
        compile: function(source) {
            console.log(source);

            var tpl = source.replace(/[\n\r]/g, '');
            console.log(tpl);
            var setHtml = function(data) {
                console.log(data);

                var str = '';
                var reg = new RegExp('\{\{#each\\s+this\}\}(.+)\{\{\/each\}\}', 'g')
                tpl.replace(reg, function($0, $1) {
                    // console.log($1);
                    data.forEach(function(val, index) {
                        var html = $1.replace(/\{\{(\w+)\}\}/g, function($0, $1) {
                            // console.log($1);
                            return val[$1];
                        });
                        str += html;
                    })
                    console.log(str);
                })
                return str;
            }
            return setHtml
        }
    }
}()