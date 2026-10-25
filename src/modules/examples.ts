import { config } from "../../package.json";
import { getString } from "../utils/locale";
const { OS } = ChromeUtils.importESModule("chrome://zotero/content/osfile.mjs"); //使用OS.File.removeEmptyDir
import { getPref } from "../utils/prefs";

/** 条目右键菜单注册 ID（全局唯一，卸载时用） */
const ITEM_MENU_ID = "delitemwithatt-item-menu";
/** 分类右键菜单注册 ID */
const COLLECTION_MENU_ID = "delitemwithatt-collection-menu";

function example(
  target: any,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor,
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
        text: getString("del-col-item-att-sucess"),
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
        text: nSucess + " " + getString("exp-sucess"),
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
        text: nFail + " " + getString("exp-fail"),
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
        text: getString("chan-lan-sucess"),
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
  static delItemAttSucess(items: any) {
    new ztoolkit.ProgressWindow(config.addonName)
      .createLine({
        text: getString("del-item-att-sucess", {
          args: { count: items.length },
        }),
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
        text: getString("del-att-sucess"),
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
        text: getString("del-snap-sucess"),
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
        text: getString("del-note-sucess"),
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
        text: getString("del-extra-sucess"),
        type: "success",
        progress: 100,
      })
      .show();
  }

  //  摘要删除完成提示
  @example
  static delAbstractSucess() {
    new ztoolkit.ProgressWindow(config.addonName)
      .createLine({
        text: getString("del-abs-sucess"),
        type: "success",
        progress: 100,
      })
      .show();
  }
}

export class KeyExampleFactory {
  // 注意：toolkit 6.x 中键盘管理器字段名是 Keyboard（ZoteroToolkit 内置），
  // 若你的 MyToolkit 里命名为 Shortcut，把下面 ztoolkit.Keyboard 换成 ztoolkit.Shortcut 即可。
  // 快捷键注册请在 startup 中调用一次。
  //
  // static registerShortcuts() {
  //   // 修改后重启生效
  //   const key_del_item_att = getPref("key.del.item.att") ?? "I";
  //   const key_del_att = getPref("key.del.att") ?? "A";
  //   const key_del_snap = getPref("key.del.snap") ?? "S";
  //   const key_del_note = getPref("key.del.note") ?? "N";
  //   const key_del_extra = getPref("key.del.extra") ?? "X";
  //   const key_del_abs = getPref("key.del.abs") ?? "Z";
  //
  //   ztoolkit.Keyboard.register("event", {
  //     id: `${config.addonRef}-key-del-item-att`,
  //     key: key_del_item_att as string,
  //     modifiers: "alt",
  //     callback: () => HelperExampleFactory.delItemAtt(),
  //   });
  //   // ……其余五个同理
  // }
}

/**
 * 给 FTL message id 加插件命名空间前缀。
 *
 * zotero-plugin-scaffold 默认开启 prefixFluentMessages，构建时
 * 会把 addon.ftl 里所有 key 改写成 `delitemwithatt-xxx`
 * （并顺带把文件重命名为 delitemwithatt-addon.ftl）。
 * 而 registerMenu 的 l10nID 是直接传给 document.l10n 的，
 * 构建时不会被改写 —— 必须自己加前缀，否则解析为空、菜单不显示。
 */
const l10n = (key: string) => `${config.addonRef}-${key}`;

export class UIExampleFactory {
  /**
   * 统一注册全部右键菜单（Zotero 8+ 官方 API）。
   *
   * 旧写法是「每个菜单项一次 ztoolkit.Menu.register + 各自一个 DOM id」，
   * 新 API 是「每个注册点一次 registerMenu，菜单项放在 menus 数组里」。
   *
   * ⚠️ 请在 startup() 中调用一次即可，不要放到 onMainWindowLoad（会重复注册）。
   */


  @example
  static registerMenus() {
    Zotero.debug(`[${config.addonRef}] registerMenus start`);
    const exportIcon = `chrome://${config.addonRef}/content/icons/export.svg`;
    const delColIcon = `chrome://${config.addonRef}/content/icons/favicon.svg`;
    const chanLanIcon = `chrome://${config.addonRef}/content/icons/chanLan.svg`;
    const delIcon = `chrome://${config.addonRef}/content/icons/favicon.svg`;

    // ---------- 条目右键菜单 ----------
    const rItem = Zotero.MenuManager.registerMenu({
      menuID: ITEM_MENU_ID,
      pluginID: config.addonID,
      target: "main/library/item",
      menus: [
        // 删除附件（子菜单，含 6 个操作）
        {
          menuType: "submenu",
          l10nID: l10n("del-att"),
          icon: delIcon,
          onShowing: (_ev, context) => {
            const items = HelperExampleFactory.getMenuItems(context);
            context.setVisible(
              items.some((item) => item && !item.isNote()),
            );
          },
          menus: [
            {
              // 删除附件和条目
              menuType: "menuitem",
              l10nID: l10n("delitem-label"),
              onShowing: (_ev, context) => {
                const items = HelperExampleFactory.getMenuItems(context);
                context.setVisible(
                  items.some((i) => HelperExampleFactory.checkIsRegularItem(i)),
                );
              },
              onCommand: () => HelperExampleFactory.delItemAtt(),
            },
            {
              // 仅删除所有附件
              menuType: "menuitem",
              l10nID: l10n("delatt-label"),
              onShowing: (_ev, context) => {
                const items = HelperExampleFactory.getMenuItems(context);
                context.setVisible(
                  items.some((i) => HelperExampleFactory.checkItemAtt(i)),
                );
              },
              onCommand: () => HelperExampleFactory.delAtt(),
            },
            {
              // 仅删除快照
              menuType: "menuitem",
              l10nID: l10n("delsnap-label"),
              onShowing: (_ev, context) => {
                const items = HelperExampleFactory.getMenuItems(context);
                context.setVisible(
                  items.some((i) => HelperExampleFactory.checkItemSnap(i)),
                );
              },
              onCommand: () => HelperExampleFactory.delSnap(),
            },
            {
              // 仅删除笔记
              menuType: "menuitem",
              l10nID: l10n("delnote-label"),
              onShowing: (_ev, context) => {
                const items = HelperExampleFactory.getMenuItems(context);
                context.setVisible(
                  items.some((i) => HelperExampleFactory.checkItemNote(i)),
                );
              },
              onCommand: () => HelperExampleFactory.delNote(),
            },
            {
              // 清空摘要
              menuType: "menuitem",
              l10nID: l10n("delabstract-label"),
              onShowing: (_ev, context) => {
                const items = HelperExampleFactory.getMenuItems(context);
                context.setVisible(
                  items.some((i) => HelperExampleFactory.checkItemAbstract(i)),
                );
              },
              onCommand: () => HelperExampleFactory.delAbstract(),
            },
            {
              // 清空其它
              menuType: "menuitem",
              l10nID: l10n("delextra-label"),
              onShowing: (_ev, context) => {
                const items = HelperExampleFactory.getMenuItems(context);
                context.setVisible(
                  items.some((i) => HelperExampleFactory.checkItemExtra(i)),
                );
              },
              onCommand: () => HelperExampleFactory.delExtra(),
            },
          ],
        },
        // 导出附件
        {
          menuType: "menuitem",
          l10nID: l10n("eport-att"),
          icon: exportIcon,
          onShowing: (_ev, context) => {
            const items = HelperExampleFactory.getMenuItems(context);
            context.setVisible(
              items.some((i) => HelperExampleFactory.checkItemAtt(i)),
            );
          },
          onCommand: () => HelperExampleFactory.expAtt(),
        },
        // 修改语言
        {
          menuType: "menuitem",
          l10nID: l10n("chan-lan"),
          icon: chanLanIcon,
          onShowing: (_ev, context) => {
            const items = HelperExampleFactory.getMenuItems(context);
            context.setVisible(
              items.some((i) => HelperExampleFactory.checkIsRegularItem(i)),
            );
          },
          onCommand: () => HelperExampleFactory.chanLan(),
        },
      ],
    });

    Zotero.debug(`[${config.addonRef}] item menu => ${rItem}`);

    // ---------- 分类右键菜单 ----------
    const rCol = Zotero.MenuManager.registerMenu({
      menuID: COLLECTION_MENU_ID,
      pluginID: config.addonID,
      target: "main/library/collection",
      menus: [
        // 删除分类及附件
        {
          menuType: "menuitem",
          l10nID: l10n("del-col-item-att"),
          icon: delColIcon,
          onShowing: (_ev, context) => {
            const collections = HelperExampleFactory.getSelectedCollections();
            context.setVisible(collections.length > 0);
          },
          onCommand: () => HelperExampleFactory.delColItemAtt(),
        },
        // 导出分类附件
        {
          menuType: "menuitem",
          l10nID: l10n("eport-att"),
          icon: exportIcon,
          onShowing: (_ev, context) => {
            const collections = HelperExampleFactory.getSelectedCollections();
            const items: Zotero.Item[] = [];
            for (const c of collections) {
              for (const it of c.getChildItems()) {
                items.push(it);
              }
            }
            context.setVisible(
              items.some((i) => HelperExampleFactory.checkItemAtt(i)),
            );
          },
          onCommand: () => HelperExampleFactory.colExpAtt(),
        },
      ],
    });

    Zotero.debug(`[${config.addonRef}] collection menu => ${rCol}`);
  }

  /**
   * 卸载菜单（可选）。
   * 插件被禁用/卸载时 Zotero 会自动按 pluginID 清理，一般无需手动调用。
   */
  static unregisterMenus() {
    Zotero.MenuManager.unregisterMenu(ITEM_MENU_ID);
    Zotero.MenuManager.unregisterMenu(COLLECTION_MENU_ID);
  }
}

export class HelperExampleFactory {
  /** 取当前选中的条目（菜单上下文优先，回退到主面板选中） */
  static getMenuItems(context?: any): Zotero.Item[] {
    const fromContext = context?.items as Zotero.Item[] | undefined;
    if (Array.isArray(fromContext) && fromContext.length) {
      return fromContext;
    }
    return HelperExampleFactory.getSelectedItems();
  }

  /** 取主面板当前选中的条目 */
  static getSelectedItems(): Zotero.Item[] {
    const pane = Zotero.getActiveZoteroPane() as any;
    const items = pane?.getSelectedItems?.();
    return (items as Zotero.Item[]) ?? [];
  }

  /** 取当前选中的分类（兼容旧版没有 getSelectedCollections 的情况） */
  static getSelectedCollections(): Zotero.Collection[] {
    const pane = Zotero.getActiveZoteroPane() as any;
    if (typeof pane?.getSelectedCollections === "function") {
      return (pane.getSelectedCollections() as Zotero.Collection[]) ?? [];
    }
    const c = pane?.getSelectedCollection?.();
    return c ? [c as Zotero.Collection] : [];
  }

  /**
   * 按 id 取条目并做类型窄化。
   * zotero-types 里 Zotero.Items.get(单个 id) 返回 `Zotero.Item | false`，
   * 直接读属性会报 "Property 'xxx' does not exist on type 'false | Item'"。
   */
  static getItem(id: number): Zotero.Item | undefined {
    const item = Zotero.Items.get(id);
    return item ? (item as Zotero.Item) : undefined;
  }

  // 检查是否为正常条目，附件不显示修改语言
  static checkIsRegularItem(item: Zotero.Item) {
    return item && !item.isNote() && item.isRegularItem(); //条目存在，不为笔记，是正常条目
  }

  // 检查附件是否存在函数
  static checkItemAtt(item: Zotero.Item) {
    if (item && !item.isNote()) {
      if (item.isRegularItem()) {
        // not an attachment already
        let attachmentIDs = item.getAttachments();
        for (let id of attachmentIDs) {
          const attachment = HelperExampleFactory.getItem(id);
          if (!attachment) {
            continue;
          }
          var attType = attachment.attachmentContentType;
          if (attType != undefined) {
            //不等于undefined为有附件
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
  static checkItemSnap(item: Zotero.Item) {
    // 检查快照
    if (item && !item.isNote()) {
      if (item.isRegularItem()) {
        // not an attachment already
        let attachmentIDs = item.getAttachments();
        for (let id of attachmentIDs) {
          const attachment = HelperExampleFactory.getItem(id);
          if (!attachment) {
            continue;
          }
          var attType = attachment.attachmentContentType;
          // 如果是text;/html则为快照
          if (attType == "text/html") {
            return true;
          }
        }
      }
      if (item.isAttachment()) {
        var attType = item.attachmentContentType;
        // 如果是text;/html则为快照
        if (attType == "text/html") {
          return true;
        } else {
          return false;
        }
      }
    }
  }

  // 检查笔记是否存在函数
  static checkItemNote(item: Zotero.Item) {
    // 检查笔记
    if (item && !item.isNote()) {
      if (item.isRegularItem()) {
        // not an attachment already
        var noteIDs = item.getNotes();
        var withNote = ztoolkit.getGlobal("JSON").stringify(noteIDs) === "[]";
        if (withNote) {
          return false;
        } else {
          //为假时含笔记
          return true;
        }
      }
    }

    if (item && item.isNote()) {
      return true;
    }
  }

  // 检查其它内容是否存在函数
  static checkItemExtra(item: Zotero.Item) {
    // 检查其它内容
    if (item && !item.isNote()) {
      if (item.isRegularItem()) {
        // not an attachment already
        var extra = item.getField("extra");
        var withExtra = extra === "";
        if (withExtra) {
          return false; //为假时其它中无内容，菜单禁用
        } else {
          return true;
        }
      }
    }
  }

  // 检查摘要是否存在函数
  static checkItemAbstract(item: Zotero.Item) {
    // 检查摘要
    if (item && !item.isNote()) {
      if (item.isRegularItem()) {
        // not an attachment already
        var abstract = item.getField("abstractNote");
        var withabstract = abstract === "";
        if (withabstract) {
          return false; //为假时摘要中无内容，菜单禁用
        } else {
          return true;
        }
      }
    }
  }

  // 删除条目和附件
  static async delItemAtt() {
    var items = HelperExampleFactory.getSelectedItems();
    var truthBeTold = ztoolkit.getGlobal("confirm")(
      getString("delete-item-and-attachment", {
        args: { count: items.length },
      }),
    );
    if (truthBeTold) {
      HelperExampleFactory.delAttDo(items); // 调用仅删除附件的函数
      for (let item of items) {
        if (item && !item.isNote()) {
          item.deleted = true;
          await item.saveTx();
        }
      }
      BasicExampleFactory.delItemAttSucess(items); // 附件条目删除成功提示;
    }
  }

  //删除分类条目包括附件
  static async delColItemAtt() {
    const collections = HelperExampleFactory.getSelectedCollections();
    var truthBeTold = window.confirm(
      getString("delete-collection-and-attachment"),
    );
    if (truthBeTold) {
      for (const c of collections) {
        c.deleted = true;
        await c.saveTx({ deleteItems: true } as any);
      }
      BasicExampleFactory.delColItemAttSucess();
    }
  }

  //导出分类附件
  static async colExpAtt() {
    const collections = HelperExampleFactory.getSelectedCollections();
    const items: Zotero.Item[] = [];
    for (const c of collections) {
      for (const it of c.getChildItems()) {
        items.push(it);
      }
    }
    await HelperExampleFactory.expAttDo(items);
  }

  // 仅删除附件
  static async delAtt() {
    var items = HelperExampleFactory.getSelectedItems();
    var truthBeTold = ztoolkit.getGlobal("confirm")(
      getString("delete-attachment-only", { args: { count: items.length } }),
    );

    if (truthBeTold) {
      HelperExampleFactory.delAttDo(items); // 调用仅删除附件的函数
      BasicExampleFactory.delAttSucess(); // 附件删除成功提示;
    }
  }

  // 仅删除附件执行的函数
  static async delAttDo(items: Zotero.Item[]) {
    for (let item of items) {
      if (item && !item.isNote()) {
        //2 if
        if (item.isRegularItem()) {
          // Regular Item 一般条目//3 if
          let attachmentIDs = item.getAttachments();
          for (let id of attachmentIDs) {
            //4 for
            const attachment = HelperExampleFactory.getItem(id);
            if (!attachment) {
              continue;
            }
            let ifLinks =
              attachment.attachmentLinkMode ==
              Zotero.Attachments.LINK_MODE_LINKED_FILE; // 检测是否为链接模式
            var file = await attachment.getFilePathAsync();
            if (file && ifLinks) {
              // 如果文件存在(文件可能已经被删除)且为链接模式删除文件
              try {
                var parentDir = PathUtils.parent(file); // 得到文件父目录 文件夹
                await Zotero.File.removeIfExists(file);
              } catch (error) {
                // 弹出错误
                alert(getString("file-is-open"));
                continue; // 弹出错误后直接进入下次循环
              }
              try {
                await OS.File.removeEmptyDir(parentDir);
              } catch (e) {
                // 目录不空时忽略，不影响主流程
              }
            }
            attachment.deleted = true; // 删除附件(快照)
            await attachment.saveTx();
          } //4 for
        } // 3 if
        if (item.isAttachment()) {
          //附件条目 5 if
          var ifLinksAtt =
            item.attachmentLinkMode == Zotero.Attachments.LINK_MODE_LINKED_FILE; //检测是否为链接模式
          var file = await item.getFilePathAsync();
          if (file && ifLinksAtt) {
            // 如果文件存在(文件可能已经被删除)且为链接模式删除文件
            try {
              var parentDir = PathUtils.parent(file); // 得到文件父目录 文件夹
              await Zotero.File.removeIfExists(file);
            } catch (error) {
              // 弹出错误
              alert(getString("file-is-open"));
              continue; // 弹出错误后直接进入下次循环
            }
            try {
              await OS.File.removeEmptyDir(parentDir);
            } catch (e) {
              // 目录不空时忽略，不影响主流程
            }
          }
          item.deleted = true;
          await item.saveTx();
        } //5if
      } //2 if
    }
  }

  // 删除快照
  static async delSnap() {
    var items = HelperExampleFactory.getSelectedItems();
    var truthBeTold = ztoolkit.getGlobal("confirm")(
      getString("delete-snapshot", { args: { count: items.length } }),
    );

    if (truthBeTold) {
      for (let item of items) {
        if (item && !item.isNote()) {
          //2 if
          if (item.isRegularItem()) {
            // Regular Item 一般条目//3 if
            let attachmentIDs = item.getAttachments();
            for (let id of attachmentIDs) {
              //4 for
              const attachment = HelperExampleFactory.getItem(id);
              if (!attachment) {
                continue;
              }
              if (attachment.attachmentContentType == "text/html") {
                //筛选删除的附件类型
                attachment.deleted = true; //删除附件(快照)
                await attachment.saveTx();
              }
            } //4 for
          } // 3 if
          if (item.isAttachment()) {
            //附件条目 5 if
            if (item.attachmentContentType == "text/html") {
              //筛选删除的附件类型
              item.deleted = true;
              await item.saveTx();
            }
          } //5if
        } //2 if
      }
      BasicExampleFactory.delSnapSucess(); // 快照删除成功提示;
    }
  }

  // 删除笔记
  static async delNote() {
    var items = HelperExampleFactory.getSelectedItems();
    var truthBeTold = window.confirm(
      getString("delete-note", { args: { count: items.length } }),
    );
    if (truthBeTold) {
      for (let item of items) {
        if (item && !item.isNote()) {
          //2 if
          if (item.isRegularItem()) {
            // Regular Item 一般条目//3 if
            var noteIDs = item.getNotes();
            for (let id of noteIDs) {
              await Zotero.Items.trashTx([id]);
            }
            await item.saveTx();
          } // 3 if
        } //2 if
        if (item.isNote()) {
          //如果条目是笔记则直接删除
          item.deleted = true;
          await item.saveTx();
        } //5if
      }
      BasicExampleFactory.delNoteSucess(); // 附件笔记成功提示;
    }
  }

  // 删除其它
  static async delExtra() {
    var items = HelperExampleFactory.getSelectedItems();
    var truthBeTold = window.confirm(
      getString("delete-extra", { args: { count: items.length } }),
    );

    if (truthBeTold) {
      for (let item of items) {
        if (item.isRegularItem() && !(item instanceof Zotero.Collection)) {
          try {
            item.setField("extra", "");
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
    var items = HelperExampleFactory.getSelectedItems();
    var truthBeTold = window.confirm(
      getString("delete-abstract", { args: { count: items.length } }),
    );
    if (truthBeTold) {
      for (let item of items) {
        if (item.isRegularItem() && !(item instanceof Zotero.Collection)) {
          try {
            item.setField("abstractNote", "");
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
    var items = HelperExampleFactory.getSelectedItems();
    await HelperExampleFactory.expAttDo(items);
  }

  // 导出附件执行函数
  static async expAttDo(items: Zotero.Item[]) {
    var nSucess = 0; //导出成功附件个数
    var nFail = 0; //导出失败附件个数
    var expDir = await HelperExampleFactory.dirExp();
    for (let item of items) {
      if (item && !item.isNote()) {
        //2 if
        if (item.isRegularItem()) {
          // Regular Item 一般条目//3 if
          let attachmentIDs = item.getAttachments();
          for (let id of attachmentIDs) {
            //4 for
            const attItem = HelperExampleFactory.getItem(id);
            if (!attItem) {
              nFail++;
              continue;
            }
            var file = await attItem.getFilePathAsync();
            if (file) {
              try {
                var baseName = PathUtils.filename(file); //得到文件名
                var destName = PathUtils.join(expDir as string, baseName);
                IOUtils.copy(file, destName); // 尝试导出文件
                nSucess++;
              } catch (error) {
                alert("error export");
                return; // 弹出错误后终止执行
              }
            } else {
              nFail++;
            }
          } //4 for
        } // 3 if
        if (item.isAttachment()) {
          //附件条目 5 if
          var file = await item.getFilePathAsync();
          if (file) {
            try {
              var baseName = PathUtils.filename(file); //得到文件名
              var destName = PathUtils.join(expDir as string, baseName);
              IOUtils.copy(file, destName); // 尝试导出文件
              nSucess++;
            } catch (error) {
              alert("error export");
              return; // 弹出错误后终止执行
            }
          } else {
            nFail++;
          }
        } //5if
      } //2 if
    }
    BasicExampleFactory.exortSucess(nSucess);
    BasicExampleFactory.exortFail(nFail);
  }

  // 选择存贮路径
  @example
  static async dirExp() {
    const path = await new ztoolkit.FilePicker(
      getString("exort-dir"),
      "folder",
    ).open();
    if (!path) {
      throw new Error("No directory selected");
    }
    return path;
  }

  // 修改语言
  @example
  static async chanLan() {
    var items = HelperExampleFactory.getSelectedItems();
    var pattern = new RegExp("[\u4E00-\u9FA5]+");
    for (let item of items) {
      var title = String(item.getField("title"));
      if (
        Zotero.ItemTypes.getName(item.itemTypeID) == "computerProgram" // 文献类型为软件时返回
      ) {
        continue;
      }
      var lan = pattern.test(title) ? "zh-CN" : "en-US";
      try {
        if (
          item &&
          !item.isNote() &&
          item.isRegularItem() &&
          Zotero.ItemTypes.getName(item.itemTypeID) != "computerProgram"
        ) {
          //正常条目，非笔记设置语言
          item.setField("language", lan);
          await item.saveTx();
        }
      } catch (error) {
        Zotero.debug(
          `语言设置失败，可能条目类型${Zotero.ItemTypes.getName(item.itemTypeID)}不能设置语言。`,
        );
      }
    }
    if (
      items.every(
        (
          item, // 如果都是软件提示错误
        ) => Zotero.ItemTypes.getName(item.itemTypeID) == "computerProgram",
      )
    ) {
      BasicExampleFactory.softLanFail();
    } else {
      BasicExampleFactory.lanSetSucess(); // 语言设置成功提示;
    }
  }
}
