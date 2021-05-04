Zotero.DelItem = {

    DelItem: async function () {//右击时删除条目调用的函数

        var zoteroPane = Zotero.getActiveZoteroPane();
        var items = zoteroPane.getSelectedItems();
        var truthBeTold = window.confirm(Zotero.DelItem.diwaGetString("delete.item.and.attachment"))
        if (truthBeTold) {
        Zotero.DelItem.DelItems(items);
        
        }
    },
    
    DelColl: async function () {//右击时删除分类调用的函数

        var collection = ZoteroPane.getSelectedCollection();
        var items = collection.getChildItems();
        var truthBeTold = window.confirm(Zotero.DelItem.diwaGetString("delete.collection.and.attachment"))
        if (truthBeTold) {
           Zotero.DelItem.DelItems(items);
           collection.deleted = true; //删除条目
            await collection.saveTx();
        }
    },

    DelAtt: async function () { // 仅删除附件调用的函数
      
        var zoteroPane = Zotero.getActiveZoteroPane();
        var items = zoteroPane.getSelectedItems();
        var truthBeTold = window.confirm(Zotero.DelItem.diwaGetString("delete.attachment.only"))
        if (truthBeTold) {
            for (let item of items) { 
                    if (item && !item.isNote()) { //2 if
                        if (item.isRegularItem()) { // Regular Item 一般条目//3 if 
                            let attachmentIDs = item.getAttachments();
                                for (let id of attachmentIDs) { //4 for
                                    let attachment = Zotero.Items.get(id);
                                    let ifLinks = (attachment.attachmentLinkMode == Zotero.Attachments.LINK_MODE_LINKED_FILE); // 检测是否为链接模式
                                    var file = await attachment.getFilePathAsync();
                                    if (file && ifLinks) { // 如果文件存在(文件可能已经被删除)且为链接模式删除文件
                                        try { await OS.File.remove (file); // 尝试删除文件
                                        } catch (error) { // 弹出错误
                                          alert (Zotero.DelItem.diwaGetString("file.is.open"));
                                          return; // 弹出错误后终止执行       
                                        }
                                        }  
                                // if (attachment.attachmentContentType == 'text/html' ) { // 可以筛选删除的附件类型
                                        attachment.deleted = true; // 删除附件(快照)
                                        await attachment.saveTx();   
                                // }
                          
                                } //4 for
                            } // 3 if
                        if (item.isAttachment()) { //附件条目 5 if
                            var ifLinksAtt = (item.attachmentLinkMode == Zotero.Attachments.LINK_MODE_LINKED_FILE); //检测是否为链接模式
                            var file = await item.getFilePathAsync();
                            if (file && ifLinksAtt) { // 如果文件存在(文件可能已经被删除)且为链接模式删除文件
                                try { await OS.File.remove (file); // 尝试删除文件
                                } catch (error) { // 弹出错误
                                  alert (Zotero.DelItem.diwaGetString("file.is.open"));
                                  return; // 弹出错误后终止执行       
                                }   
                                }  
                            item.deleted = true; 
                            await item.saveTx();
                            }//5if
                 } //2 if
            }
        } 
    },


    DelSnap: async function () { // 仅快照时调用的函数

        var zoteroPane = Zotero.getActiveZoteroPane();
        var items = zoteroPane.getSelectedItems();
        var truthBeTold = window.confirm(Zotero.DelItem.diwaGetString("delete.snapshot"))
        if (truthBeTold) {
            for (let item of items) { 
                    if (item && !item.isNote()) { //2 if
                        if (item.isRegularItem()) { // Regular Item 一般条目//3 if 
                            let attachmentIDs = item.getAttachments();
                                for (let id of attachmentIDs) { //4 for
                                    let attachment = Zotero.Items.get(id);
                                 if (attachment.attachmentContentType == 'text/html' ) { //筛选删除的附件类型
                                        attachment.deleted = true; //删除附件(快照)
                                        await attachment.saveTx(); 
                                        // 快照不处理文件
                                       /*  var file = await attachment.getFilePathAsync();
                                       if (file) { //如果文件存在，文件可能已经被删除
                                            await OS.File.remove(file); //删除文件 
                                            }  */
                                    }
                                    
                                } //4 for
                            } // 3 if
                        if (item.isAttachment()) { //附件条目 5 if
                                if (item.attachmentContentType == 'text/html' ) { //筛选删除的附件类型
                                    // 快照不处理文件
                                    /*var file = await item.getFilePathAsync();
                                    if (file) { //如果文件存在，文件可能已经被删除
                                        await OS.File.remove(file); //删除文件 
                                        }  */
                                    item.deleted = true; 
                                    await item.saveTx();
                                }
                            }//5if
                 } //2 if
            }
        } 
    },


    DelItems: async function (items) { //删除条目和附件时被调用的执行具体删除任务的函数
      

        for (let item of items) { 
            if (item && !item.isNote()) { //2 if
                        if (item.isRegularItem()) { // Regular Item 一般条目//3 if 
                            let attachmentIDs = item.getAttachments();
                                for (let id of attachmentIDs) { //4 for
                                    let attachment = Zotero.Items.get(id);
                                    let ifLinks = (attachment.attachmentLinkMode == Zotero.Attachments.LINK_MODE_LINKED_FILE); // 检测是否为链接模式
                                    var file = await attachment.getFilePathAsync();
                                    if (file && ifLinks) { //如果文件存在(文件可能已经被删除)且为链接模式删除文件
                                        try { await OS.File.remove (file); // 尝试删除文件
                                        } catch (error) { // 弹出错误
                                          alert (Zotero.DelItem.diwaGetString("file.is.open"));
                                          return; // 弹出错误后终止执行       
                                        }
                                        }  
                                // if (attachment.attachmentContentType == 'text/html' ) { //可以筛选删除的附件类型
                                        attachment.deleted = true; //删除附件(快照)
                                        await attachment.saveTx();   
                                // }
                                  
                                } //4 for
                            
                            } // 3 if
                        if (item.isAttachment()) { //附件条目 5 if
                            var ifLinksAtt = (item.attachmentLinkMode == Zotero.Attachments.LINK_MODE_LINKED_FILE); //检测是否为链接模式
                            var file = await item.getFilePathAsync();
                            if (file && ifLinksAtt) { // 如果文件存在(文件可能已经被删除)且为链接模式删除文件
                                try { await OS.File.remove (file); // 尝试删除文件
                                } catch (error) { // 弹出错误
                                  alert (Zotero.DelItem.diwaGetString("file.is.open"));
                                  return; // 弹出错误后终止执行       
                                }  
                                }  

                            }//5if
            } //2 if
            item.deleted = true; 
            await item.saveTx(); 
        }
        
    },

    // 将所有所选条目语言字段设为en
    chanLanForSel: async function () { 
        var zoteroPane = Zotero.getActiveZoteroPane();
        var items = zoteroPane.getSelectedItems();
       
        for (item of items) {
            var la = item.getField("language");
            //if (la=="") { //如果为空则替换
                item.setField("language", "en");
                await item.saveTx();
            //}
        }
    },

    // 将所选条目语言字段为空时设为en
    chanLanForEmpty: async function () { 
        var zoteroPane = Zotero.getActiveZoteroPane();
        var items = zoteroPane.getSelectedItems();
       
        for (item of items) {
            var la = item.getField("language");
            if (la=="") { //如果为空则替换
                item.setField("language", "en");
                await item.saveTx();
            }
        }
    },
 
    // Localization (borrowed from ZotFile sourcecode)
    // 提示语言本地化函数
    diwaGetString: function (name, params){
        var l10n = '';
        stringsBundle = Components.classes['@mozilla.org/intl/stringbundle;1']
            .getService(Components.interfaces.nsIStringBundleService)
            .createBundle('chrome://delitem/locale/diwa.properties');
        try { 
            if (params !== undefined){
                if (typeof params != 'object'){
                    params = [params];
                }
                l10n = tringsBundle.formatStringFromName(name, params, params.length);
            }
            else {
                l10n = stringsBundle.GetStringFromName(name);
            }
        }
        catch (e){
            throw ('Localized string not available for ' + name);
        }
        return l10n;
    },

    
    // 检查附件是否存在函数
    checkItemAtt: function (item) { 
        if (item && !item.isNote()) {
            if (item.isRegularItem()) { // not an attachment already
                let attachmentIDs = item.getAttachments();
                for (let id of attachmentIDs) {
                    let attachment = Zotero.Items.get(id);
                    var attType = attachment.attachmentContentType;
                    if (attType != undefined ) { //不等于undefined为有附件
                        return true;} 
                }
            }
            if (item.isAttachment()) {
                 var attType =  item.attachmentContentType;
                }
            }  
            
            
            if (attType != undefined ) {
                return true;} else {
                    return false;}
    },

    // 检查快照是否存在函数
    checkItemSnap: function (item) {
        if (item && !item.isNote()) {
            if (item.isRegularItem()) { // not an attachment already
                let attachmentIDs = item.getAttachments();
                for (let id of attachmentIDs) {
                    let attachment = Zotero.Items.get(id);
                    var attType = attachment.attachmentContentType;
                    // 如果是text;/html则为快照      
                    if (attType == 'text/html' ) { 
                        return true;} 
                }
            }
            if (item.isAttachment()) {
                 var attType =  item.attachmentContentType;
                }
            }  
            
      // 如果是text;/html则为快照      
            if (attType == 'text/html' ) { 
                return true;} else {
                    return false;}
    },

    // 是否显示菜单函数
    displayMenuitem: function () { // 如果无附件则不显示菜单
            var pane = Services.wm.getMostRecentWindow("navigator:browser")
                .ZoteroPane;
            var collection = ZoteroPane.getSelectedCollection();
            var items = pane.getSelectedItems();
            //Zotero.debug("**Jasminum selected item length: " + items.length);
            var showMenuAtt = items.some((item) => Zotero.DelItem.checkItemAtt(item));  // 检查附件
            var showMenuSnap = items.some((item) => Zotero.DelItem.checkItemSnap(item));  // 检查快照
            var showMenuColl = (collection == false); // 非正常文件夹，如我的出版物、重复条目、未分类条目、回收站，为false，此时返回值为true，隐藏菜单
            //pane.document.getElementById("id-delitem-separator").hidden = !( // 分隔条是否出现
            //    showMenuAtt ||
             //   showMenuSnap);
            
            /*pane.document.getElementById( //总菜单
            //    "zotero-itemmenu-delitem-namehandler"
            //    ).disabled = !( // 总菜单是否可用
            //        showMenuAtt ||
           //         showMenuSnap);*/
            /*pane.document.getElementById( //删除条目和附件
                "zotero-itemmenu-delitem"
                ).disabled = !( // 删除条目和附件是否可用
                    showMenuAtt ||
                    showMenuSnap);*/

                    
            pane.document.getElementById( // 删除分类/文件夹菜单是否可见
                "zotero-collectionmenu-delitem"
                ).hidden = showMenuColl; // 仅删除附件菜单是否可用
            pane.document.getElementById( // 删除分类/文件夹分隔条是否可见
                "id-delcoll-separator"
                ).hidden = showMenuColl; // 仅删除附件菜单是否可用           
            pane.document.getElementById( // 仅删除附件菜单
                 "zotero-itemmenu-delatt"
                 ).disabled = !showMenuAtt; // 仅删除附件菜单是否可用
                              
            pane.document.getElementById( // 仅删除快照菜单
                 "zotero-itemmenu-delsnap"
                 ).disabled = !showMenuSnap;// 仅删除快照是否可用
                        
    },
};

window.addEventListener(
    "load",
    function (e) {
        if (window.ZoteroPane) {
            var doc = window.ZoteroPane.document;
            // add event listener for menu items
            doc.getElementById("zotero-itemmenu").addEventListener(
                "popupshowing",
                Zotero.DelItem.displayMenuitem,
                false
            );
            // add event listener for menu collections
            doc.getElementById("zotero-collectionmenu").addEventListener(
                "popupshowing",
                Zotero.DelItem.displayMenuitem,
                false
            );
        }
    },
    false
);

