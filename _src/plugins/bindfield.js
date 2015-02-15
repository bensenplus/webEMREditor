/**
 * 锚点插件，为UEditor提供插入锚点支持
 * @file
 * @since 1.2.6.1
 */
UE.plugin.register('bindfield', function (){

    var uiUtils = UE.ui.uiUtils;
    var me = this;

    return {
           commands:{
           /**
            * 插入锚点
            * @command bindfield
            * @method execCommand
            * @param { String } cmd 命令字符串
            * @param { String } name 锚点名称字符串
            * @example
            * ```javascript
            * //editor 是编辑器实例
            * editor.execCommand('bindfield', 'anchor1');
            * ```
            */
           'bindfield':{
               execCommand:function (cmd, para) {
                   var range = this.selection.getRange();
                   var node = domUtils.findParentByTagName(range.startContainer, 'span', true);
                   if(node && node.attributes['class'] && node.attributes['class'].value == 'bindfield') {
                       domUtils.setAttributes(node, {
                           'id': para.id
                       });
                       node.innerText = para.label;
                   } else {
                       if (para) {
                           //只在选区的开始插入
                           range.collapse(true);
                           var bindfield = this.document.createElement('span');
                           domUtils.setAttributes(bindfield, {
                               'id': para.id,
                               'class': 'bindfield'
                           });

                           bindfield.innerText = para.label;

                           range.insertNode(bindfield).setStartAfter(bindfield).setCursor(false, true);
                       }
                   }
               }
           }
       }
    }
});
