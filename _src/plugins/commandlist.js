/**
 * 命令插件，为UEditor提供插入命令支持
 * @file
 * @since 1.2.6.1
 */
UE.plugin.register('commandlist', function (){

    var uiUtils = UE.ui.uiUtils;
    var me = this;


    me.addListener('keyup',function(type, evt){

        var keyCode = evt.keyCode || evt.which;
        if(keyCode == 16) {

            setTimeout(function() {
                var range = me.selection.getRange();
                if(range.collapsed) {
                    var node = domUtils.findParentByTagName(range.startContainer, 'p', true);
                    if(node) {

                        var listItems = new Array();
                        listItems.push({label: '医嘱'});
                        listItems.push({label: '主诉'});
                        listItems.push({label: '用药'});
                        listItems.push({label: '检查'});
                        listItems.push({label: '检验'});

                        var dropdownlist = new UE.ui.DropDownList({
                            items: listItems,
                            holdNode:node,
                            editor: me
                        });
                        dropdownlist.render();
                        var rect = uiUtils.getClientRect(node);
                        dropdownlist.showAt({left:rect.left,top:rect.bottom});
                        dropdownlist.focus();

                    }

                }
            });

        }


    });


    return {
           commands:{

           'commandlist':{
               execCommand:function (cmd, para) {

               }
           }
       }
    }
});
