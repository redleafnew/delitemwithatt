import { config } from "../../package.json";
import { getString } from "./locale";

function example(
  target: any,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
) {
  const original = descriptor.value;
  descriptor.value = function (...args: any) {
    try {
      ztoolkit.log(`Calling example ${target.name}.${String(propertyKey)}`);
      return original.apply(this, args);
    } catch (e) {
      ztoolkit.log(`Error in example ${target.name}.${String(propertyKey)}`, e);
      throw e;

    }
  };
  return descriptor;
}

export class BasicExampleFactory {
  // 删除分类条目附件完成提示
  @example
  static delColItemAttSucess() {
    new ztoolkit.ProgressWindow(config.addonName)
      .createLine({
        text: getString("del.col.item.att.sucess"),
        type: "success",
        progress: 100,
      })
      .show();
  }
  // 导出完成提示
  @example
  static exortSucess(nSucess: number) {
    new ztoolkit.ProgressWindow(config.addonName)
      .createLine({
        text: nSucess + ' ' + getString("exp.sucess"),
        type: "success",
        progress: 100,
      })
      .show();
  }
  // 文件不存在提示
  @example
  static exortFail(nFail: number) {
    new ztoolkit.ProgressWindow(config.addonName)
      .createLine({
        text: nFail + ' ' + getString("exp.fail"),
        type: "fail",
        progress: 100,
      })
      .show();
  }

  // 语言设置完成提示
  @example
  static lanSetSucess() {
    new ztoolkit.ProgressWindow(config.addonName)
      .createLine({
        text: getString("chan.lan.sucess"),
        type: "success",
        progress: 100,
      })
      .show();
  }

  static softLanFail() {
    new ztoolkit.ProgressWindow(config.addonName)
      .createLine({
        text: getString("softLanFail"),
        type: "fail",
        progress: 100,
      })
      .show();
  }

  // 条目附件删除完成提示
  @example
  static delItemAttSucess() {
    new ztoolkit.ProgressWindow(config.addonName)
      .createLine({
        text: getString("del.item.att.sucess"),
        type: "success",
        progress: 100,
      })
      .show();
  }

  // 附件删除完成提示
  @example
  static delAttSucess() {
    new ztoolkit.ProgressWindow(config.addonName)
      .createLine({
        text: getString("del.att.sucess"),
        type: "success",
        progress: 100,
      })
      .show();
  }

  // 快照删除完成提示
  @example
  static delSnapSucess() {
    new ztoolkit.ProgressWindow(config.addonName)
      .createLine({
        text: getString("del.snap.sucess"),
        type: "success",
        progress: 100,
      })
      .show();
  }

  // 笔记删除完成提示
  @example
  static delNoteSucess() {
    new ztoolkit.ProgressWindow(config.addonName)
      .createLine({
        text: getString("del.note.sucess"),
        type: "success",
        progress: 100,
      })
      .show();
  }

  // 其它删除完成提示
  @example
  static delExtraSucess() {
    new ztoolkit.ProgressWindow(config.addonName)
      .createLine({
        text: getString("del.extra.sucess"),
        type: "success",
        progress: 100,
      })
      .show();
  }

  // 摘要删除完成提示
  @example
  static delAbstractSucess() {
    new ztoolkit.ProgressWindow(config.addonName)
      .createLine({
        text: getString("del.abs.sucess"),
        type: "success",
        progress: 100,
      })
      .show();
  }
}

export class KeyExampleFactory {

  // modifiers逗号分隔，shift就是shift，ctrl跨平台是accel
  @example
  static registerShortcuts() {

    // 删除条目和附件快捷键:Alt+I
    ztoolkit.Shortcut.register("event", {
      id: `${config.addonRef}-key-del-item-att`,
      key: "I",
      modifiers: "alt",
      callback: (keyOptions) => {
        HelperExampleFactory.delItemAtt();
      },
    });

    // 删除附件快捷键.Alt+A
    ztoolkit.Shortcut.register("event", {
      id: `${config.addonRef}-key-del-att`,
      key: "A",
      modifiers: "alt",
      callback: (keyOptions) => {

        HelperExampleFactory.delAtt();
      },
    });

    //仅删除快照快捷键 Alt+S
    ztoolkit.Shortcut.register("event", {
      id: `${config.addonRef}-key-del-snap`,
      key: "S",
      modifiers: "alt",
      callback: (keyOptions) => {
        HelperExampleFactory.delSnap();
      },
    });

    //删除笔记快捷键Alt+N
    ztoolkit.Shortcut.register("event", {
      id: `${config.addonRef}-key-del-snap`,
      key: "N",
      modifiers: "alt",
      callback: (keyOptions) => {
        HelperExampleFactory.delNote();
      },
    });

    //删除其它要快捷键Alt+X
    ztoolkit.Shortcut.register("event", {
      id: `${config.addonRef}-key-del-snap`,
      key: "X",
      modifiers: "alt",
      callback: (keyOptions) => {
        HelperExampleFactory.delExtra();
      },
    });

    //删除摘要快捷键Alt+Z
    ztoolkit.Shortcut.register("event", {
      id: `${config.addonRef}-key-del-abs`,
      key: "Z",
      modifiers: "alt",
      callback: (keyOptions) => {
        HelperExampleFactory.delAbstract();
      },
    });

    //删除摘要快捷键Alt+Z
    ztoolkit.Shortcut.register("event", {
      id: `${config.addonRef}-key-del-abs`,
      key: "U",
      modifiers: "alt",
      callback: (keyOptions) => {
        // HelperExampleFactory.OSnow();
      },
    });
  }

}

export class UIExampleFactory {

  // 是否显示分类右键菜单
  static displayColMenuitem() {
    const collection = ZoteroPane.getSelectedCollection(),
      //items = collection.getChildItems(),
      menuDelCol = document.getElementById('zotero-collectionmenu-delitemwithatt-del-item-att'), // 删除分类及附件菜单
      menuExpColAtt = document.getElementById('zotero-collectionmenu-delitemwithatt-export-att'); // 导出分类附件菜单

    // 非正常文件夹，如我的出版物、重复条目、未分类条目、回收站，为false，此时返回值为true，禁用菜单
    // 两个！！转表达式为逻辑值
    var showMenuDelCol = !!collection;
    //ztoolkit.getGlobal("alert")(`Selected ${showMenuDelCol}`);

    if (!!collection) { // 如果是正常分类才显示
      var items = collection.getChildItems();
      var showmenuExpColAtt = items.some((item) => HelperExampleFactory.checkItemAtt(item));
    } else {
      var showmenuExpColAtt = false;
    } // 检查分类是否有附件及是否为正常分类
    menuDelCol?.setAttribute('disabled', String(!showMenuDelCol)); // 禁用导出附件
    // menuDelCol?.setAttribute('disabled', `${!showMenuDelCol}`); // 禁用导出附件
    menuExpColAtt?.setAttribute('disabled', String(!showmenuExpColAtt)); // 禁用删除附件
  }

  // 是否显示条目右键菜单
  static displayMenuitem() {
    const items = ZoteroPane.getSelectedItems(),
      menuChanLan = document.getElementById('zotero-itemmenu-delitemwithatt-chan-lan'), // 修改语言菜单
      menuExpAtt = document.getElementById('zotero-itemmenu-delitemwithatt-export-att'), // 导出附件菜单
      menuDelAtt = document.getElementById('zotero-itemmenu-delitemwithatt-del-att'), // 导出附件菜单
      menuDelSnap = document.getElementById('zotero-itemmenu-delitemwithatt-del-snap'), // 删除快照
      menuDelNote = document.getElementById('zotero-itemmenu-delitemwithatt-del-note'), // 删除笔记
      menuDelExtra = document.getElementById('zotero-itemmenu-delitemwithatt-del-extra'), // 删除其它
      menuDelAbs = document.getElementById('zotero-itemmenu-delitemwithatt-del-abs'), // 删除摘要


      showMenuChanLan = items.some((item) => HelperExampleFactory.checkIsRegularItem(item)),// 检查是否为正常条目
      showMenuAtt = items.some((item) => HelperExampleFactory.checkItemAtt(item)), // 检查附件
      showMenuSnap = items.some((item) => HelperExampleFactory.checkItemSnap(item)),  // 检查快照
      showMenuNote = items.some((item) => HelperExampleFactory.checkItemNote(item)),  // 检查笔记
      showMenuExtra = items.some((item) => HelperExampleFactory.checkItemExtra(item)),  // 检查其它内容
      showMenuAbstract = items.some((item) => HelperExampleFactory.checkItemAbstract(item));  // 检查摘要

    //menu.setAttribute('hidden', 'true');
    menuChanLan?.setAttribute('disabled', `${!showMenuChanLan}`); // 禁用修改语言
    menuExpAtt?.setAttribute('disabled', `${!showMenuAtt}`); // 禁用导出附件
    menuDelAtt?.setAttribute('disabled', String(!showMenuAtt)); // 禁用删除附件
    menuDelSnap?.setAttribute('disabled', String(!showMenuSnap)); // 禁用删除快照
    menuDelNote?.setAttribute('disabled', String(!showMenuNote)); // 禁用删除笔记
    menuDelExtra?.setAttribute('disabled', String(!showMenuExtra)); // 禁用删除其它
    menuDelAbs?.setAttribute('disabled', String(!showMenuAbstract)); // 禁用删除摘要
  }
  // 分隔条
  @example
  static registerMenuSepartor() {
    ztoolkit.Menu.register("item", {
      tag: "menuseparator",
      id: "zotero-itemmenu-delitemwithatt-separator",
    });
  }
  // 分类右键菜单：删除分类及附件，导出附件
  @example
  static registerRightClickCollMenu() {
    const exportIcon = `chrome://${config.addonRef}/content/icons/export.png`,
      delColIcon = `chrome://${config.addonRef}/content/icons/favicon@0.5x.png`;
    // 删除分类及附件菜单
    ztoolkit.Menu.register("collection", {
      tag: "menuitem",
      id: "zotero-collectionmenu-delitemwithatt-del-item-att",
      label: getString("del.col.item.att"),
      commandListener: (ev) => HelperExampleFactory.delColItemAtt(),
      icon: delColIcon,
      // oncommand: "await HelperExampleFactory.filePickerExample()",
    });

    // 导出分类附件菜单
    ztoolkit.Menu.register("collection", {
      tag: "menuitem",
      id: "zotero-collectionmenu-delitemwithatt-export-att",
      label: getString("eport.att"),
      commandListener: (ev) => HelperExampleFactory.colExpAtt(),
      icon: exportIcon,
      // oncommand: "await HelperExampleFactory.filePickerExample()",
    });
  }

  // 导出附件右键菜单
  @example
  static registerRightClickMenuItem() {
    const exportIcon = `chrome://${config.addonRef}/content/icons/export.png`;
    // item menuitem with icon 导出附件
    ztoolkit.Menu.register("item", {
      tag: "menuitem",
      id: "zotero-itemmenu-delitemwithatt-export-att",
      label: getString("eport.att"),
      commandListener: (ev) => HelperExampleFactory.expAtt(),
      icon: exportIcon,
      // oncommand: "await HelperExampleFactory.filePickerExample()",
    });
  }

  // 修改语言右键菜单
  @example
  static registerRightClickChanLan() {
    const chanLanIcon = `chrome://${config.addonRef}/content/icons/chanLan.png`;

    ztoolkit.Menu.register("item", {
      tag: "menuitem",
      id: "zotero-itemmenu-delitemwithatt-chan-lan",
      label: getString("chan.lan"),
      commandListener: (ev) => HelperExampleFactory.chanLan(),
      icon: chanLanIcon,
      // oncommand: "await HelperExampleFactory.filePickerExample()",
    });
  }
  // 删除附件右键菜单
  @example
  static registerRightClickMenuPopup() {
    // const delIcon = `chrome://${config.addonRef}/content/icons/del.png`;
    ztoolkit.Menu.register(
      "item",
      {
        tag: "menu",
        label: getString("del.att"),

        children: [
          { // 删除附件和条目菜单
            tag: "menuitem",
            label: getString("delitem.label"),
            id: "zotero-itemmenu-delitemwithatt-del-item-att",
            commandListener: (ev) => HelperExampleFactory.delItemAtt(),
          },
          {// 删除附件
            tag: "menuitem",
            label: getString("delatt.label"),
            id: "zotero-itemmenu-delitemwithatt-del-att",
            commandListener: (ev) => HelperExampleFactory.delAtt(),
          },
          {// 删除快照
            tag: "menuitem",
            label: getString("delsnap.label"),
            id: "zotero-itemmenu-delitemwithatt-del-snap",
            commandListener: (ev) => HelperExampleFactory.delSnap(),
          },
          {// 删除笔记
            tag: "menuitem",
            label: getString("delnote.label"),
            id: "zotero-itemmenu-delitemwithatt-del-note",
            commandListener: (ev) => HelperExampleFactory.delNote(),
          },

          {// 删除摘要
            tag: "menuitem",
            label: getString("delabstract.label"),
            id: "zotero-itemmenu-delitemwithatt-del-abs",
            commandListener: (ev) => HelperExampleFactory.delAbstract(),
          },

          {// 删除其它
            tag: "menuitem",
            label: getString("delextra.label"),
            commandListener: (ev) => HelperExampleFactory.delExtra(),
            id: "zotero-itemmenu-delitemwithatt-del-extra",
          },
        ],
      },
      "before",
      document.querySelector(
        "#zotero-itemmenu-delitemwithatt-export-att"
      ) as XUL.MenuItem
    );
  }
}

export class HelperExampleFactory {

  // 检查是否为正常条目，附件不显示修改语言
  static checkIsRegularItem(item: Zotero.Item) {
    return item && !item.isNote() && item.isRegularItem(); //条目存在，不为笔记，是正常条目
  }

  // 检查附件是否存在函数
  static checkItemAtt(item: Zotero.Item) {
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
        if (attType != undefined) {
          return true;
        } else {
          return false;
        }
      }
    }

  }

  // 检查快照是否存在函数
  static checkItemSnap(item: Zotero.Item) { // 检查快照
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
        // 如果是text;/html则为快照
        if (attType == 'text/html') {
          return true;
        } else {
          return false;
        }
      }
    }


  }

  // 检查笔记是否存在函数
  static checkItemNote(item: Zotero.Item) { // 检查笔记
    if (item && !item.isNote()) {
      if (item.isRegularItem()) { // not an attachment already
        var noteIDs = item.getNotes();
        var withNote = ztoolkit.getGlobal("JSON").stringify(noteIDs) === '[]';
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
  }

  // 检查其它内容是否存在函数
  static checkItemExtra(item: Zotero.Item) { // 检查其它内容
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
  }

  // 检查摘要是否存在函数
  static checkItemAbstract(item: Zotero.Item) { // 检查摘要
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

  }

  // 删除条目和附件
  static async delItemAtt() {
    var zoteroPane = Zotero.getActiveZoteroPane();
    var items = zoteroPane.getSelectedItems();
    var iaInfo = items.length > 1 ? 'delete.item.and.attachment.mul' : 'delete.item.and.attachment.sig';
    var truthBeTold = ztoolkit.getGlobal("confirm")(getString(iaInfo))
    if (truthBeTold) {
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
                  alert(getString("file.is.open"));
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
                alert(getString("file.is.open"));
                return; // 弹出错误后终止执行
              }
            }

          }//5if
        } //2 if
        item.deleted = true;
        await item.saveTx();

      }
      BasicExampleFactory.delItemAttSucess(); // 附件条目删除成功提示;

    }
  }

  //删除分类条目包括附件
  static async delColItemAtt() {

    var collection = ZoteroPane.getSelectedCollection();
    var items = collection!.getChildItems();
    var truthBeTold = window.confirm(getString("delete.collection.and.attachment"))
    if (truthBeTold) {
      HelperExampleFactory.delAttDo(items);//删除条目
      await collection!.eraseTx()
    }
    BasicExampleFactory.delColItemAttSucess();
  }

  //导出分类附件
  static async colExpAtt() {
    var collection = ZoteroPane.getSelectedCollection();
    var items = collection!.getChildItems();
    await HelperExampleFactory.expAttDo(items)
    // BasicExampleFactory.exortSucess(); // 导出成功提示

  }

  // 删除附件
  static async delAtt() {
    var zoteroPane = Zotero.getActiveZoteroPane();

    var items = zoteroPane.getSelectedItems();
    var daoInfo = items.length > 1 ? 'delete.attachment.only.mul' : 'delete.attachment.only.sig';
    var truthBeTold = ztoolkit.getGlobal("confirm")(getString(daoInfo));
    if (truthBeTold) {
      HelperExampleFactory.delAttDo(items); // 调用删除条目及附件的函数
      BasicExampleFactory.delAttSucess(); // 附件删除成功提示;
    }
  }

  // 删除附件执行的函数
  static async delAttDo(items: Zotero.Item[]) {

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
                //await trash.remove(file);
              } catch (error) { // 弹出错误
                alert(getString("file.is.open"));
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
              alert(getString("file.is.open"));
              return; // 弹出错误后终止执行
            }
          }
          item.deleted = true;
          await item.saveTx();
        }//5if
      } //2 if

    }


  }
  // 删除快照
  static async delSnap() {
    var zoteroPane = Zotero.getActiveZoteroPane();
    var items = zoteroPane.getSelectedItems();
    var dsInfo = items.length > 1 ? 'delete.snapshot.mul' : 'delete.snapshot.sig'
    var truthBeTold = ztoolkit.getGlobal("confirm")(getString(dsInfo))
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
      BasicExampleFactory.delSnapSucess(); // 快照删除成功提示;
    }
  }

  // 删除笔记
  static async delNote() {
    var zoteroPane = Zotero.getActiveZoteroPane();
    var items = zoteroPane.getSelectedItems();
    var dnInfo = items.length > 1 ? 'delete.note.mul' : 'delete.note.sig';
    var truthBeTold = window.confirm(getString(dnInfo))
    if (truthBeTold) {
      for (let item of items) {
        if (item && !item.isNote()) { //2 if
          if (item.isRegularItem()) { // Regular Item 一般条目//3 if
            var noteIDs = item.getNotes();
            for (let id of noteIDs) {
              await Zotero.Items.trashTx([id]);
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
      BasicExampleFactory.delNoteSucess(); // 附件笔记成功提示;
    }

  }

  // 删除其它
  static async delExtra() {
    var zoteroPane = Zotero.getActiveZoteroPane();
    var items = zoteroPane.getSelectedItems();
    var dnInfo = items.length > 1 ? 'delete.extra.mul' : 'delete.extra.sig';
    var truthBeTold = window.confirm(getString(dnInfo))
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
      BasicExampleFactory.delExtraSucess(); // 其它删除成功提示;
    }

  }

  // 删除摘要
  static async delAbstract() {
    var zoteroPane = Zotero.getActiveZoteroPane();
    var items = zoteroPane.getSelectedItems();
    var dnInfo = items.length > 1 ? 'delete.abstract.mul' : 'delete.abstract.sig';
    var truthBeTold = window.confirm(getString(dnInfo))
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
      BasicExampleFactory.delAbstractSucess(); // 摘要删除成功提示;
    }

  }

  // 导出附件
  static async expAtt() {
    var items = ZoteroPane.getSelectedItems();
    await HelperExampleFactory.expAttDo(items)
  }
  // 导出附件执行函数
  static async expAttDo(items: Zotero.Item[]) {
    var nSucess = 0; //导出成功附件个数
    var nFail = 0; //导出失败附件个数
    var expDir = await HelperExampleFactory.dirExp() + '\\';
    // const OS = ztoolkit.getGlobal("OS");
    for (let item of items) {
      if (item && !item.isNote()) { //2 if
        if (item.isRegularItem()) { // Regular Item 一般条目//3 if
          let attachmentIDs = item.getAttachments();
          for (let id of attachmentIDs) { //4 for
            var file = await Zotero.Items.get(id).getFilePathAsync();
            if (file) {
              try {
                // await exportAtts(file, expDir);

                var baseName = OS.Path.basename(file); //得到文件名
                var destName = OS.Path.join(expDir, baseName);
                OS.File.copy(file, destName); // 尝试导出文件
                nSucess++;
                //BasicExampleFactory.exortSucess(); // 导出成功提示
              } catch (error) { // 弹出错误
                alert('error export');
                return; // 弹出错误后终止执行
              }
            } else {
              nFail++;
              //BasicExampleFactory.exortFail(); // 导出失败提示
            }
          } //4 for
        } // 3 if
        if (item.isAttachment()) { //附件条目 5 if
          var file = await item.getFilePathAsync();
          if (file) {
            try {
              // await exportAtts(file, expDir);

              var baseName = OS.Path.basename(file); //得到文件名
              var destName = OS.Path.join(expDir, baseName);
              OS.File.copy(file, destName); // 尝试导出文件
              nSucess++;
              //BasicExampleFactory.exortSucess(); // 导出成功提示

            } catch (error) { // 弹出错误
              alert('error export');
              return; // 弹出错误后终止执行
            }
          } else {
            nFail++;
            // // 导出失败提示
          }
        }//5if
      } //2 if
    }
    BasicExampleFactory.exortSucess(nSucess)
    BasicExampleFactory.exortFail(nFail);

  }

  // 选择存贮路径
  @example
  static async dirExp() {
    const path = await new ztoolkit.FilePicker(
      getString("exort.dir"),
      "folder"

    ).open();
    return path;
    // ztoolkit.getGlobal("alert")(`Selected ${path}`);
  }

  // 修改语言
  @example
  static async chanLan() {
    var zoteroPane = Zotero.getActiveZoteroPane();
    var items = zoteroPane.getSelectedItems();
    var pattern = new RegExp("[\u4E00-\u9FA5]+");
    for (let item of items) {
      var title = String(item.getField("title"));
      if (Zotero.ItemTypes.getName(item.itemTypeID) == 'computerProgram' // 文献类型为软件时返回
      ) {
        continue;
      }
      var lan = pattern.test(title) ? 'zh-CN' : 'en-US';
      try {
        if (item && !item.isNote() && item.isRegularItem() &&
          Zotero.ItemTypes.getName(item.itemTypeID) != 'computerProgram') { //正常条目，非笔记设置语言
          item.setField("language", lan);
          await item.saveTx();
        }

      } catch (error) {
        Zotero.debug(`语言设置失败，可能条目类型${Zotero.ItemTypes.getName(item.itemTypeID)}不能设置语言。`)
      }

    }
    if (items.length == 1 && //如果仅有一个条目，且是软件，显示失败
      Zotero.ItemTypes.getName(items[0].itemTypeID) == 'computerProgram') {
      BasicExampleFactory.softLanFail();
    } else {
      BasicExampleFactory.lanSetSucess(); // 语言设置成功提示;
    }
  }
}
