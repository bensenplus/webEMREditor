/**
 * 日期时间插件，为UEditor提供插入日期时间支持
 * @file
 * @since 1.2.6.1
 */
UE.plugin.register('calendar', function (){

    var uiUtils = UE.ui.uiUtils;
    var me = this;

    //注册一个触发命令的事件，同学们可以在任意地放绑定触发此命令的事件
    me.addListener( 'click', function (type, evt) {
        setTimeout(function() {
            var range = me.selection.getRange();
            if(range.collapsed) {
                var node = domUtils.findParentByTagName(range.startContainer, 'a', true);
                if(node && node.attributes['class'] && node.attributes['class'].value == 'calendar') {
                    var node = domUtils.findParentByTagName(range.startContainer, 'a', true);
                    if(node){
                        laydate({
                            elemIsId:'false',
                            elem: node,
                            istime: node.attributes['istime'].value=='false'?false:true,
                            format:node.attributes['format'].value
                        })
                    }
                }
            }
        });
    } );

    formatDate = function (istime,format) {
        var date = new Date;
        var YYYY = ('000' + date.getFullYear()).slice(-4),
            YY = YYYY.slice(-2),
            MM = ('0' + (date.getMonth()+1)).slice(-2),
            DD = ('0' + date.getDate()).slice(-2),
        format = format || (istime ? 'YYYY-MM-DD hh:mm:ss' : 'YYYY-MM-DD');
        var fDate = format.replace(/YYYY/ig, YYYY).replace(/YY/ig, YY).replace(/MM/ig, MM).replace(/DD/ig, DD);
        if(istime){
            hh = ('0' + date.getHours()).slice(-2),
            mm = ('0' + date.getMinutes()).slice(-2),
            ss = ('0' + date.getSeconds()).slice(-2);
            fDate = fDate.replace(/hh/ig, hh).replace(/mm/ig, mm).replace(/ss/ig, ss);
        }
        return fDate;
    }

    return {
        commands:{
            /**
             * 插入时间控件
             * @command calendar
             * @method execCommand
             * @param { String } cmd 命令字符串
             * @param { String } param 参数
             * @example
             * ```javascript
             * //editor 是编辑器实例
             * editor.execCommand('calendar');
             * ```
             */
            'calendar':{
                execCommand:function (cmd,param) {
                    var range = this.selection.getRange();
                    //只在选区的开始插入
                    range.collapse(true);
                    var calendar = this.document.createElement('a');
                    domUtils.setAttributes(calendar, {
                        'id':param.id,
                        'istime':param.istime,
                        'format':param.format,
                        'class': 'calendar'
                    });
                    calendar.innerText = formatDate(param.istime,param.format);
                    range.insertNode(calendar).setStartAfter(calendar).setCursor(false, true);
                }
            }
        }
    }
});
