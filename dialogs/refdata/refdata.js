window.onload = function () {
    refdata.tabExist = createArr( refdata.tabNum );
    initEvtHandler( "tabHeads" );
};

function initEvtHandler( conId ) {
    var tabHeads = $G( conId );
    for ( var i = 0, j = 0; i < tabHeads.childNodes.length; i++ ) {
        var tabObj = tabHeads.childNodes[i];
        if ( tabObj.nodeType == 1 ) {
            domUtils.on( tabObj, "click", (function ( index ) {
                return function () {
                    switchTab( index );
                };
            })( j ) );
            j++;
        }
    }
    switchTab( 0 );
}

function switchTab( index ) {

    //autoHeight( index );
    if ( refdata.tabExist[index] == 0 ) {
        refdata.tabExist[index] = 1;
        createTab( 'tab' + index, index);
    }
    //获取呈现元素句柄数组
    var tabHeads = $G( "tabHeads" ).getElementsByTagName( "span" ),
            tabBodys = $G( "tabBodys" ).getElementsByTagName( "div" ),
            i = 0, L = tabHeads.length;
    //隐藏所有呈现元素
    for ( ; i < L; i++ ) {
        tabHeads[i].className = "";
        tabBodys[i].style.display = "none";
    }
    //显示对应呈现元素
    tabHeads[index].className = "focus";
    tabBodys[index].style.display = "block";
}

//function autoHeight( index ) {
//    var iframe = dialog.getDom( "iframe" ),
//    parent = iframe.parentNode.parentNode;
//    iframe.style.height = "420px";
//    parent.style.height = "420px";
//}

function createTab( tabName, tabIndex ) {
    var lang = editor.getLang(dialog.className.split( "-" )[2]);
    var tab = $G( tabName ); //获取将要生成的Div句柄
    var count = 0;
    for(var content in lang['static']){
        if(count == tabIndex){
            tab.innerHTML += '选择'+lang['static'][content]+'数据引入病历<br>';
        }
        count++;
    }
}

function createArr( tabNum ) {
    var arr = [];
    for ( var i = 0; i < tabNum; i++ ) {
        arr[i] = 0;
    }
    return arr;
}

