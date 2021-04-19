Zotero.DelItem = {

    DelItem: async function () {//右击时删除条目调用的函数

        var zoteroPane = Zotero.getActiveZoteroPane();
        var items = zoteroPane.getSelectedItems();
        var truthBeTold = window.confirm("Are you sure you want to move the selected item(s) including the attachment(s) to the Trash? The attachment(s) could not be restored.")
        if (truthBeTold) {
        Zotero.DelItem.DelItems(items);
        }
    },
    
    DelColl: async function () {//右击时删除分类调用的函数

        var collection = ZoteroPane.getSelectedCollection();
        var items = collection.getChildItems();
        var truthBeTold = window.confirm("Are you sure you want to delete the selected collection including the attachments? This action cannot be undone.")
        if (truthBeTold) {
            Zotero.DelItem.DelItems(items);
            collection.deleted = true; //删除条目
            await collection.saveTx();
        }
    },

    DelAtt: async function () { // 仅删除附件调用的函数
      
        var zoteroPane = Zotero.getActiveZoteroPane();
        var items = zoteroPane.getSelectedItems();
        var truthBeTold = window.confirm("Are you sure you want to delete the attachment(s) of the item(s)? This action cannot be undone.")
        if (truthBeTold) {
            for (let item of items) { 
                    if (item && !item.isNote()) { //2 if
                        if (item.isRegularItem()) { // Regular Item 一般条目//3 if 
                            let attachmentIDs = item.getAttachments();
                                for (let id of attachmentIDs) { //4 for
                                    let attachment = Zotero.Items.get(id);
                                // if (attachment.attachmentContentType == 'text/html' ) { //可以筛选删除的附件类型
                                        attachment.deleted = true; //删除附件(快照)
                                        await attachment.saveTx();   
                                // }
                                    var file = await attachment.getFilePathAsync();
                                    await OS.File.remove(file); //删除文件
                                } //4 for
                            } // 3 if
                        if (item.isAttachment()) { //附件条目 5 if
                            var file = await item.getFilePathAsync();
                            await OS.File.remove(file); //删除文件
                            item.deleted = true; 
                            await item.saveTx();
                            }//5if
                 } //2 if
            }
        } 
    },

    DelItems: async function (items) { //删除条目被调用的执行具体删除任务的函数
        Components.utils.import("resource://gre/modules/osfile.jsm");
        var zfPath = Zotero.ZotFile.getPref("dest_dir");   //得到zotfile路径
        //var DelItems = ""; //删除的条目，主要用于换行，当前无用
        var num = 0;//计数，当前无用
        for (let item of items) {  // 1 for
            title = item.getField('title');
           // num  += 1; //，当前无用
           // DelItems += num + ': '+ title + '\n';
            file = await getFilePath(item); //调用函数
            if (file){
                var filePath = OS.Path.dirname(file); //得到文件存放的文件夹
                if (filePath != zfPath){ //如果两个文件夹不一致，文件可能存在storage中
                    await OS.File.removeDir(filePath) //删除文件夹
                    }
                await OS.File.remove(file); //删除文件
            }
            item.deleted = true; //删除条目
            await item.saveTx();

        }// 1 for

       // alert(DelItems + "\n " + num + "个条目（包括附件）已经被删除。") // 当前无用

        async function getFilePath(item) { //1 函数 得到文件路径

            if (item && !item.isNote()) { //2 if

                    if (item.isRegularItem()) { // Regular Item 一般条目//3 if 
                    
                        let attachmentIDs = item.getAttachments();
                        for (let id of attachmentIDs) { //4 for
                            var file = await Zotero.Items.get(id).getFilePathAsync();
                            return file;
                        } //4 for
                    } // 3 if
                    if (item.isAttachment()) { //附件条目 5 if
                            var file = await item.getFilePathAsync();
                            return file;
                    }//5if
            } //2 if

        } ;
    }
}