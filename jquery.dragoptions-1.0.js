/*
 Info:
  Plugin: dragOptions
  Version: 1.0
  Author: Nikita Korobochkin
  E-mail: nikita.ak.85@gmail.com
*/

(function($){
    $.fn.extend({
        dragOptions: function(params) {

            var defaults = {
                highlight: "►"
            };

            var options = $.extend(defaults, params);

            return this.each(function() {

                var _v = {
                    initial:    [],
                    hover:      -1,
                    current:    -1
                };
                var _o = options;
                var object = $(this);

                $(object).on("mousedown", "option", function(e){

                    if (!_v.initial.length && !e.ctrlKey && !e.shiftKey) {

                        _updateIndexes();

                        _v.initial = [];
                        _v.initialObjects = [];
                        $("option", object).each(function(){
                            _v.initial.push({
                                key: $(this).val(),
                                text: $(this).text()
                            });
                            _v.initialObjects.push(this);
                        });

                        $(this).text(_o.highlight+$(this).text());
                        _v.drag = $(this).data("index")
                        _v.current = _v.drag;
                        
                    }

                }).on("mousemove", "option", function(){

                    if (!_v.initial.length) return false;

                    _v.hover = $(this).data("index");
                    if (_v.current != _v.hover) {
                        _v.current = _v.hover;

                        var tempOptions = _v.initial.slice(0);
                        var showOptions = [];

                        var dragOption = tempOptions.splice(_v.drag,1);
                        for (var i = 0, k = tempOptions.length; i <= k; i++) {
                            if (i != _v.current) {
                                showOptions.push(tempOptions.shift());
                            } else {
                                showOptions.push(dragOption[0]);
                            }
                        }

                        $("option", object).each(function(i){
                            if (i==_v.current) {
                                $(this).text(_o.highlight+showOptions[i].text);
                            } else {
                                $(this).text(showOptions[i].text);
                            }
                        });

                        $("option", object).removeAttr('selected').eq(_v.current).attr('selected', 'selected');
                    }

                }).on("mouseup", "option", function(){

                    if (!_v.initial.length) return false;

                    $("option", object).each(function(i){
                        $(this).text(_v.initial[i].text);
                    });

                    object.html('');

                    var cutOption = _v.initialObjects.splice(_v.drag,1);
                    for (var i = 0, k = _v.initialObjects.length; i <= k; i++) {
                        if (i != _v.current) {
                            object.append(_v.initialObjects.shift());
                        } else {
                            object.append(cutOption[0]);
                        }
                    }

                    $("option", object).removeAttr('selected').eq(_v.current).attr('selected', 'selected');

                    _updateIndexes();

                    _v.hover = -1;
                    _v.initial = [];
                    _v.initialObjects = [];

                });

                var _updateIndexes = function(){
                    $("option", object).each(function(i){
                        $(this).data("index", i);
                    });
                };

            });
        }
    });
})(jQuery);