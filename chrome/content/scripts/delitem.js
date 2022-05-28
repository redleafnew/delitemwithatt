Zotero.DelItem = {

    DelItem: async function () {//右击时删除条目调用的函数

        var zoteroPane = Zotero.getActiveZoteroPane();
        var items = zoteroPane.getSelectedItems();
        var iaInfo = items.length > 1 ? 'delete.item.and.attachment.mul' : 'delete.item.and.attachment.sig';
        var truthBeTold = window.confirm(Zotero.DelItem.diwaGetString(iaInfo))
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
        var daoInfo = items.length > 1 ? 'delete.attachment.only.mul' : 'delete.attachment.only.sig';
        var truthBeTold = window.confirm(Zotero.DelItem.diwaGetString(daoInfo))
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
                                try {
                                    await OS.File.remove(file); // 尝试删除文件
                                } catch (error) { // 弹出错误
                                    alert(Zotero.DelItem.diwaGetString("file.is.open"));
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
                            try {
                                await OS.File.remove(file); // 尝试删除文件
                            } catch (error) { // 弹出错误
                                alert(Zotero.DelItem.diwaGetString("file.is.open"));
                                return; // 弹出错误后终止执行       
                            }
                        }
                        item.deleted = true;
                        await item.saveTx();
                    }//5if
                } //2 if

            }
            this.opterationComplete();
        }
    },


    DelSnap: async function () { // 仅快照时调用的函数

        var zoteroPane = Zotero.getActiveZoteroPane();
        var items = zoteroPane.getSelectedItems();
        var dsInfo = items.length > 1 ? 'delete.snapshot.mul' : 'delete.snapshot.sig'
        var truthBeTold = window.confirm(Zotero.DelItem.diwaGetString(dsInfo))
        if (truthBeTold) {
            for (let item of items) {
                if (item && !item.isNote()) { //2 if
                    if (item.isRegularItem()) { // Regular Item 一般条目//3 if 
                        let attachmentIDs = item.getAttachments();
                        for (let id of attachmentIDs) { //4 for
                            let attachment = Zotero.Items.get(id);
                            if (attachment.attachmentContentType == 'text/html') { //筛选删除的附件类型
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
                        if (item.attachmentContentType == 'text/html') { //筛选删除的附件类型
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
            this.opterationComplete();
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
                            try {
                                await OS.File.remove(file); // 尝试删除文件
                            } catch (error) { // 弹出错误
                                alert(Zotero.DelItem.diwaGetString("file.is.open"));
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
                        try {
                            await OS.File.remove(file); // 尝试删除文件
                        } catch (error) { // 弹出错误
                            alert(Zotero.DelItem.diwaGetString("file.is.open"));
                            return; // 弹出错误后终止执行       
                        }
                    }

                }//5if
            } //2 if
            item.deleted = true;
            await item.saveTx();

        }
        this.opterationComplete();

    },

    DelNote: async function () { // 仅删除笔记调用的函数

        var zoteroPane = Zotero.getActiveZoteroPane();
        var items = zoteroPane.getSelectedItems();
        var dnInfo = items.length > 1 ? 'delete.note.mul' : 'delete.note.sig';
        var truthBeTold = window.confirm(Zotero.DelItem.diwaGetString(dnInfo))
        if (truthBeTold) {
            for (let item of items) {
                if (item && !item.isNote()) { //2 if
                    if (item.isRegularItem()) { // Regular Item 一般条目//3 if 
                        var noteIDs = item.getNotes();
                        for (let id of noteIDs) {
                            await Zotero.Items.trashTx(id);
                        }
                        //Zotero.Items.erase(item.getNotes()); //原用函数，删除笔记不可恢复
                        await item.saveTx();
                    } // 3 if

                } //2 if
                if (item.isNote()) { //如果条目是笔记则直接删除
                    item.deleted = true;
                    await item.saveTx();
                }//5if

            }
            this.opterationComplete();
        }
    },
    DelExtra: async function () { // 仅删除其它调用的函数

        var zoteroPane = Zotero.getActiveZoteroPane();
        var items = zoteroPane.getSelectedItems();
        var dnInfo = items.length > 1 ? 'delete.extra.mul' : 'delete.extra.sig';
        var truthBeTold = window.confirm(Zotero.DelItem.diwaGetString(dnInfo))
        if (truthBeTold) {
            for (let item of items) {
                if (item.isRegularItem() && !item.isCollection()) {
                    try {
                        item.setField('extra', '');
                        item.save();

                    } catch (error) {
                        // numFail = numFail + 1;
                    }
                }

            }
            this.opterationComplete();
        }
    },
    DelAbstract: async function () { // 仅删除笔记调用的函数

        var zoteroPane = Zotero.getActiveZoteroPane();
        var items = zoteroPane.getSelectedItems();
        var dnInfo = items.length > 1 ? 'delete.abstract.mul' : 'delete.abstract.sig';
        var truthBeTold = window.confirm(Zotero.DelItem.diwaGetString(dnInfo))
        if (truthBeTold) {
            for (let item of items) {
                if (item.isRegularItem() && !item.isCollection()) {
                    try {
                        item.setField('abstractNote', '')
                        item.save();

                    } catch (error) {
                        // numFail = numFail + 1;
                    }
                }

            }
            this.opterationComplete();
        }
    },

    // 导出附件
    // 右击导出分类调用的函数
    ExpColl: async function () {
        var collection = ZoteroPane.getSelectedCollection();
        var items = collection.getChildItems();
        Zotero.DelItem.ExpAtt(items);
    },

    // 右击分类导出附件
    ExpAtts: async function () {
        var zoteroPane = Zotero.getActiveZoteroPane();
        var items = zoteroPane.getSelectedItems();
        Zotero.DelItem.ExpAtt(items);
    },
    // 导出附件实际调用的函数
    ExpAtt: async function (items) {
        var expDir = await this.chooseDirectory(); //得到导出的目录
        var nItems = 0; //导出个数计数器
        var lanUI = Zotero.Prefs.get('intl.locale.requested', true); // 得到当前Zotero界面语言
        var whiteSpace = ' ';
        if (lanUI == 'zh-CN') { whiteSpace = '' };
        for (let item of items) {
            if (item && !item.isNote()) { //2 if
                if (item.isRegularItem()) { // Regular Item 一般条目//3 if 
                    let attachmentIDs = item.getAttachments();
                    for (let id of attachmentIDs) { //4 for
                        let attachment = Zotero.Items.get(id);
                        var file = await attachment.getFilePathAsync();
                        if (file) { // 如果文件存在(文件可能已经被删除)
                            try {
                                // await exportAtts(file, expDir);
                                var baseName = OS.Path.basename(file); //得到文件名
                                var destName = OS.Path.join(expDir, baseName);
                                OS.File.copy(file, destName); // 尝试导出文件    
                                nItems = nItems + 1;
                            } catch (error) { // 弹出错误
                                alert(Zotero.DelItem.diwaGetString("file.export.error"));
                                return; // 弹出错误后终止执行       
                            }

                        }

                    } //4 for
                } // 3 if
                if (item.isAttachment()) { //附件条目 5 if
                    var file = await item.getFilePathAsync();
                    if (file) { // 如果文件存在(文件可能已经被删除)
                        try {
                            // await exportAtts(file, expDir);
                            var baseName = OS.Path.basename(file); //得到文件名
                            var destName = OS.Path.join(expDir, baseName);
                            OS.File.copy(file, destName); // 尝试导出文件  
                            nItems = nItems + 1;
                        } catch (error) { // 弹出错误
                            alert(Zotero.DelItem.diwaGetString("file.export.error"));
                            return; // 弹出错误后终止执行       
                        }
                    }

                }//5if
            } //2 if

        }
        var fileInfo = nItems > 1 ? 'file.exported.mul' : 'file.exported.sig';
        var alertInfo = nItems + whiteSpace + Zotero.DelItem.diwaGetString(fileInfo) + whiteSpace + expDir + Zotero.DelItem.diwaGetString("full.stop");
        this.showPopUP(alertInfo, 'finished')
        // alert (nItems + whiteSpace + Zotero.DelItem.diwaGetString(fileInfo) + whiteSpace + expDir + Zotero.DelItem.diwaGetString("full.stop")); 
    },

    // 导出附件函数
    exportAtts: async function (file, expDir) {
        var baseName = OS.Path.basename(file); //得到文件名
        var destName = OS.Path.join(expDir, baseName);
        OS.File.copy(file, destName); // 尝试导出文件
    },

    //对话框 Form ZotFile
    /**
     * Choose directory from file picker
     * @return {string} Path to file
     */
    chooseDirectory: async function () {
        if (Zotero.platformMajorVersion >= 60) {
            var FilePicker = require('zotero/filePicker').default;
        }
        else {
            var nsIFilePicker = Components.interfaces.nsIFilePicker;
        }
        var wm = Services.wm;
        var win = wm.getMostRecentWindow('navigator:browser');
        var ps = Services.prompt;
        if (Zotero.platformMajorVersion >= 60) {
            var fp = new FilePicker();
            fp.init(win, Zotero.DelItem.diwaGetString("file.exp.path"), fp.modeGetFolder);
            fp.appendFilters(fp.filterAll);
            if (await fp.show() != fp.returnOK) return '';
            return fp.file;
        }
        else {
            var fp = Components.classes["@mozilla.org/filepicker;1"]
                .createInstance(nsIFilePicker);
            fp.init(win, Zotero.DelItem.diwaGetString("file.exp.path"), nsIFilePicker.modeGetFolder);
            fp.appendFilters(nsIFilePicker.filterAll);
            if (fp.show() != nsIFilePicker.returnOK) return '';
            var file = fp.file;
            return file.path;
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
        this.opterationComplete();
    },

    // 将所选条目语言字段为空时设为en
    chanLanForEmpty: async function () {
        var zoteroPane = Zotero.getActiveZoteroPane();
        var items = zoteroPane.getSelectedItems();

        for (item of items) {
            var la = item.getField("language");
            if (la == "") { //如果为空则替换
                item.setField("language", "en");
                await item.saveTx();
            }
        }

        this.opterationComplete();

    },

    // Localization (borrowed from ZotFile sourcecode)
    // 提示语言本地化函数
    diwaGetString: function (name, params) {
        var l10n = '';
        stringsBundle = Components.classes['@mozilla.org/intl/stringbundle;1']
            .getService(Components.interfaces.nsIStringBundleService)
            .createBundle('chrome://delitem/locale/diwa.properties');
        try {
            if (params !== undefined) {
                if (typeof params != 'object') {
                    params = [params];
                }
                l10n = tringsBundle.formatStringFromName(name, params, params.length);
            }
            else {
                l10n = stringsBundle.GetStringFromName(name);
            }
        }
        catch (e) {
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
                    if (attType != undefined) { //不等于undefined为有附件
                        return true;
                    }
                }
            }
            if (item.isAttachment()) {
                var attType = item.attachmentContentType;
            }
        }


        if (attType != undefined) {
            return true;
        } else {
            return false;
        }
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
                    if (attType == 'text/html') {
                        return true;
                    }
                }
            }
            if (item.isAttachment()) {
                var attType = item.attachmentContentType;
            }
        }

        // 如果是text;/html则为快照      
        if (attType == 'text/html') {
            return true;
        } else {
            return false;
        }
    },
    // 检查笔记是否存在函数
    checkItemNote: function (item) {
        if (item && !item.isNote()) {
            if (item.isRegularItem()) { // not an attachment already
                var noteIDs = item.getNotes();
                var withNote = JSON.stringify(noteIDs) === '[]';
                if (withNote) {
                    return false;
                } else { //为假时含笔记
                    return true;
                }
            }
        }

        if (item && item.isNote()) {
            return true;
        }
    },

    // 检查是否为链接   
    // true为链接或没有附件
    checkItemExp: function (item) {
        var num = 0;
        if (item && !item.isNote()) {
            if (item.isRegularItem()) { // not an attachment already
                let attachmentIDs = item.getAttachments();
                //return attachmentIDs.length;  // 返回数据中元素个数
                for (let id of attachmentIDs) {
                    let attachment = Zotero.Items.get(id);
                    num = num + attachment.attachmentLinkMode; // attachmentLinkMode 链接类型 3为链接 2为文件

                }
                var linkURL = attachmentIDs.length == 1 && num == 3
                if (linkURL || attachmentIDs.length == 0) { return true; }
            }

            if (item.isAttachment()) {
                //var attType =  item.attachmentContentType;
                if (item.attachmentLinkMode == 3) { return true; }
            }
        }

    },

    // 检查‘其它’是否存在函数
    checkItemExtra: function (item) {
        if (item && !item.isNote()) {
            if (item.isRegularItem()) { // not an attachment already
                var extra = item.getField('extra')
                var withExtra = extra === '';
                if (withExtra) {
                    return false;//为假时其它中无内容，菜单禁用
                } else {
                    return true;
                }
            }
        }


    },


    // 检查摘要是否存在函数abstractNote
    checkItemAbstract: function (item) {
        if (item && !item.isNote()) {
            if (item.isRegularItem()) { // not an attachment already
                var abstract = item.getField('abstractNote')
                var withabstract = abstract === '';
                if (withabstract) {
                    return false;//为假时摘要中无内容，菜单禁用
                } else {
                    return true;
                }
            }
        }


    },
    // 是否显示菜单函数
    displayMenuitem: function () { // 如果无附件则不显示菜单
        var pane = Services.wm.getMostRecentWindow("navigator:browser")
            .ZoteroPane;
        var collection = ZoteroPane.getSelectedCollection();
        var items = pane.getSelectedItems();
        if (collection) { var items_coll = collection.getChildItems(); }
        //Zotero.debug("**Jasminum selected item length: " + items.length);
        var showMenuAtt = items.some((item) => Zotero.DelItem.checkItemAtt(item));  // 检查附件
        var showMenuSnap = items.some((item) => Zotero.DelItem.checkItemSnap(item));  // 检查快照
        var showMenuNote = items.some((item) => Zotero.DelItem.checkItemNote(item));  // 检查笔记
        var showMenuExtra = items.some((item) => Zotero.DelItem.checkItemExtra(item));  // 检查笔记
        var showMenuAbstract = items.some((item) => Zotero.DelItem.checkItemAbstract(item));  // 检查笔记


        var showMenuColl = (collection == false); // 非正常文件夹，如我的出版物、重复条目、未分类条目、回收站，为false，此时返回值为true，隐藏菜单
        if (collection) { // 如果是正常分类才显示
            var showMenuCollExp = items_coll.some((item) => Zotero.DelItem.checkItemAtt(item));
        } else {
            var showMenuCollExp = false;
        } // 检查分类是否有附件及是否为正常分类
        var showMenuExpAtt = items.every((item) => Zotero.DelItem.checkItemExp(item));   //检查是否为链接   true为链接或没有附件     
        // pane.document.getElementById( // 其他分类菜单是否可见 总的id：zotero-collectionmenu
        //     "zotero-collectionmenu"
        //     ).hidden =  showMenuColl; //   

        pane.document.getElementById( // 删除分类/文件夹菜单是否可见 
            "zotero-collectionmenu-delitem"
        ).hidden = showMenuColl; // 仅删除附件菜单是否可用 zotero-collectionmenu-delitem

        pane.document.getElementById( // 删除分类/文件夹分隔条是否可见 id-delcoll-separator
            "id-delcoll-separator"
        ).hidden = showMenuColl; //      

        pane.document.getElementById( // 导出分类附件是否可见 zotero-collectionmenu-exp-att
            "zotero-collectionmenu-exp-att"
        ).hidden = showMenuColl; //   

        pane.document.getElementById( // 仅删除附件菜单
            "zotero-itemmenu-delatt"
        ).disabled = !showMenuAtt; // 仅删除附件菜单是否可用

        pane.document.getElementById( // 仅删除快照菜单
            "zotero-itemmenu-delsnap"
        ).disabled = !showMenuSnap;// 仅删除快照是否可用

        pane.document.getElementById( // 仅删除笔记菜单
            "zotero-itemmenu-delnote"
        ).disabled = !showMenuNote;// 仅删除笔记是否可用

        pane.document.getElementById( // 仅删除其它菜单
            "zotero-itemmenu-delextra"
        ).disabled = !showMenuExtra;// 仅删除其它是否可用

        pane.document.getElementById( // 仅删除摘要菜单
            "zotero-itemmenu-delabstract"
        ).disabled = !showMenuAbstract;// 仅删除摘要是否可用

        pane.document.getElementById( // 分类导出附件
            "zotero-collectionmenu-exp-att"
        ).disabled = !showMenuCollExp; // 分类导出附件菜单是否可用

        pane.document.getElementById( // 条目导出附件
            "zotero-itemmenu-exp-att"
        ).disabled = !showMenuAtt || showMenuExpAtt; // 条目导出附件菜单是否可用


    },

    opterationComplete: function () {
        var prompInfo = this.diwaGetString('operation.completed');
        var prompStatus = 'finished';
        this.showPopUP(prompInfo, prompStatus);
    },

    // 右下角弹出函数 displayMenuitem: function () 
    showPopUP: function (alertInfo, status) {
        var progressWindow = new Zotero.ProgressWindow({ closeOnClick: true });
        progressWindow.changeHeadline(Zotero.DelItem.diwaGetString(status));
        progressWindow.addDescription(alertInfo);
        progressWindow.show();
        progressWindow.startCloseTimer(4000);
    },
}



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

