/**
 * 全选
 * @file
 * @since 1.2.6.1
 */

/**
 * 引用数据
 * @command refdata
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @example
 * ```javascript
 * editor.execCommand( 'refdata' );
 * ```
 */
UE.plugins['refdata'] = function(){
    var me = this;
    me.commands['refdata'] = {
        execCommand : function(cmd){
            alert(UEDITOR_CONFIG.refdata[0].name);
        }
    };


    //快捷键
    me.addshortcutkey({
         "refdata" : "ctrl+49"
    });
};
