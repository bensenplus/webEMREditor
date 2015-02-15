/**
 * 锚点插件，为UEditor提供插入锚点支持
 * @file
 * @since 1.2.6.1
 */
UE.plugin.register('dropdownlist', function (){

    var uiUtils = UE.ui.uiUtils;
    var me = this;


    //注册一个触发命令的事件，同学们可以在任意地放绑定触发此命令的事件
    me.addListener( 'click', function (type, evt) {

        setTimeout(function() {
            var range = me.selection.getRange();
            if(range.collapsed) {
                var node = domUtils.findParentByTagName(range.startContainer, 'a', true);
                if(node && node.attributes['class'] && node.attributes['class'].value == 'dropdownlist') {


                    if(node.attributes['listValue']) {
                        var listValue = node.attributes['listValue'].value.split('\n');

                        var listItems = new Array();

                        for (var i = 0; i < listValue.length; i++) {
                            listItems.push({label: listValue[i]});
                        }

                        var dropdownlist = new UE.ui.DropDownList({
                            items: listItems,
                            holdNode:node,
                            editor: me
                        });
                        dropdownlist.render();
                        var rect = uiUtils.getClientRect(node);
                        dropdownlist.showAt({left:rect.left,top:rect.bottom});

                    }


                }
            }
        });

    } );


    return {
           commands:{
           /**
            * 插入下拉控件
            * @command dropdownlist
            * @method execCommand
            * @param { String } cmd 命令字符串
            * @param { String } para 下拉列表字符串
            * @example
            * ```javascript
            * //editor 是编辑器实例
            * editor.execCommand('dropdownlist', 'anchor1');
            * ```
            */
           'dropdownlist':{
               execCommand:function (cmd, para) {
                   var range = this.selection.getRange();
                   var node = domUtils.findParentByTagName(range.startContainer, 'a', true);
                   if(node && node.attributes['class'] && node.attributes['class'].value == 'dropdownlist') {
                       domUtils.setAttributes(node, {
                           'id': para.listId,
                           'listValue': para.listValue
                       });
                   } else {
                       if (para) {
                           //只在选区的开始插入
                           range.collapse(true);
                           var dropdownlist = this.document.createElement('a');
                           domUtils.setAttributes(dropdownlist, {
                               'id': para.listId,
                               'listValue': para.listValue,
                               'class': 'dropdownlist'
                           });
                           if (para.listValue && para.listValue.split('\n')[0]) {
                               dropdownlist.innerText = para.listValue.split('\n')[0];
                           }
                           //domUtils.setStyles(dropdownlist, {'background': 'Gainsboro'});
                           range.insertNode(dropdownlist).setStartAfter(dropdownlist).setCursor(false, true);
                       }
                   }
               }
           }
       }
    }
});
