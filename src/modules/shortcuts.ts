import { HelperExampleFactory } from "./examples";
import { getPref } from "../utils/prefs";
export function registerShortcuts() {
    ztoolkit.Keyboard.register((ev, data) => {
        // 删除条目和附件默认快捷键:Alt+I
        var key_del_item_att = getPref('key.del.item.att') == undefined ? 'I' : getPref('key.del.item.att');
        // 删除附件默认快捷键.Alt+A
        var key_del_att = getPref('key.del.att') == undefined ? 'A' : getPref('key.del.att');
        //仅删除快照默认快捷键 Alt+S
        var key_del_snap = getPref('key.del.snap') == undefined ? 'S' : getPref('key.del.snap');
        // 仅删除笔记默认快捷键.Alt+N
        var key_del_note = getPref('key.del.note') == undefined ? 'N' : getPref('key.del.note');
        // 仅删除其它默认快捷键.Alt+X
        var key_del_extra = getPref('key.del.extra') == undefined ? 'X' : getPref('key.del.extra');
        // 仅删除摘要默认快捷键.Alt+Z
        var key_del_abs = getPref('key.del.abs') == undefined ? 'Z' : getPref('key.del.abs');

        if (data.type === "keyup" && data.keyboard) {
            // 删除条目和附件默认快捷键: Alt+I
            if (data.keyboard.equals(`alt,${key_del_item_att}`)) {
                HelperExampleFactory.delItemAtt();
                //Zotero.debug("clt+K pressed")
            }
            // 删除附件默认快捷键.Alt+A
            if (data.keyboard.equals(`alt,${key_del_att}`)) {
                HelperExampleFactory.delAtt();
                //Zotero.debug("clt+K pressed")
            }
            //仅删除快照默认快捷键 Alt+S
            if (data.keyboard.equals(`alt,${key_del_snap}`)) {
                HelperExampleFactory.delSnap();
                //Zotero.debug("clt+K pressed")
            }
            // 仅删除笔记默认快捷键.Alt+N
            if (data.keyboard.equals(`alt,${key_del_note}`)) {
                HelperExampleFactory.delNote();
                //Zotero.debug("clt+K pressed")
            }
            // 删除其它
            if (data.keyboard.equals(`alt,${key_del_extra}`)) {
                HelperExampleFactory.delExtra();
                //Zotero.debug("clt+K pressed")
            }
            // 仅删除摘要默认快捷键.Alt+Z
            if (data.keyboard.equals(`alt,${key_del_abs}`)) {
                HelperExampleFactory.delAbstract();
                //Zotero.debug("clt+K pressed")
            }
        }
    });
    //     // if (data.type === "keydown") {
    //     //     if (ev.key === "Alt") {
    //     //         addon.data.translate.concatKey = true;
    //     //     }
    //     // }
    //     // if (data.type === "keyup") {
    //     //     if (ev.key === "Alt") {
    //     //         addon.data.translate.concatKey = false;
    //     //     }
    //     // }
    // });


}
