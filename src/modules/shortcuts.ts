import { HelperExampleFactory } from "./examples";
import { getPref } from "../utils/prefs";
export function registerShortcuts() {
  ztoolkit.Keyboard.register((ev, data) => {
    // 删除条目和附件默认快捷键:Alt+I
    const key_del_item_att = getPref("key.del.item.att") as string
        ?? (Zotero.isMac ? "R" : "I");
    // 删除附件默认快捷键.Alt+A
    const key_del_att =
      getPref("key.del.att") == undefined ? "A" : getPref("key.del.att") as string;
    //仅删除快照默认快捷键 Alt+S
    const key_del_snap =
      getPref("key.del.snap") == undefined ? "S" : getPref("key.del.snap") as string;
    // 仅删除笔记默认快捷键.Alt+N
    const key_del_note =
      getPref("key.del.note") == undefined ? "N" : getPref("key.del.note") as string;
    // 仅删除其它默认快捷键.Alt+X
    const key_del_extra =
      getPref("key.del.extra") == undefined ? "X" : getPref("key.del.extra") as string;
    // 仅删除摘要默认快捷键.Alt+Z
    const key_del_abs =
      getPref("key.del.abs") == undefined ? "Z" : getPref("key.del.abs") as string;

    if (data.type === "keyup" && data.keyboard) {
      // 删除条目和附件默认快捷键: Alt+I
      if (
        data.keyboard.equals(`alt,${key_del_item_att}`) ||
        data.keyboard.equals(`shift,alt,${getModifiedCharacter(key_del_item_att, "shiftOption")}`) ||
        data.keyboard.equals(`alt,${getModifiedCharacter(key_del_item_att, "option")}`)
      ) {
        HelperExampleFactory.delItemAtt();
        //Zotero.debug("clt+K pressed")
      }
      // 删除附件默认快捷键：Alt+A
      if (
        data.keyboard.equals(`alt,${key_del_att}`) ||
        data.keyboard.equals(`shift,alt,${getModifiedCharacter(key_del_att, "shiftOption")}`) ||
        data.keyboard.equals(`alt,${getModifiedCharacter(key_del_att, "option")}`)
      ) {
        HelperExampleFactory.delAtt();
        //Zotero.debug("clt+K pressed")
      }
      //仅删除快照默认快捷键：Alt+S
      if (
        data.keyboard.equals(`alt,${key_del_snap}`) ||
        data.keyboard.equals(`shift,alt,${getModifiedCharacter(key_del_snap, "shiftOption")}`) ||
        data.keyboard.equals(`alt,${getModifiedCharacter(key_del_snap, "option")}`)
      ) {
        HelperExampleFactory.delSnap();
        //Zotero.debug("clt+K pressed")
      }
      // 仅删除笔记默认快捷键：Alt+N
      if (
        data.keyboard.equals(`alt,${key_del_note}`) ||
        data.keyboard.equals(`shift,alt,${getModifiedCharacter(key_del_note, "shiftOption")}`) ||
        data.keyboard.equals(`alt,${getModifiedCharacter(key_del_note, "option")}`)
      ) {
        HelperExampleFactory.delNote();
        //Zotero.debug("clt+K pressed")
      }
      // 删除其他字段快捷键：Alt+X
      if (
        data.keyboard.equals(`alt,${key_del_extra}`) ||
        data.keyboard.equals(`shift,alt,${getModifiedCharacter(key_del_extra, "shiftOption")}`) ||
        data.keyboard.equals(`alt,${getModifiedCharacter(key_del_extra, "option")}`)
      ) {
        HelperExampleFactory.delExtra();
        //Zotero.debug("clt+K pressed")
      }
      // 仅删除摘要默认快捷键：Alt+Z
      if (
        data.keyboard.equals(`alt,${key_del_abs}`) ||
        data.keyboard.equals(`shift,alt,${getModifiedCharacter(key_del_abs, "shiftOption")}`) ||
        data.keyboard.equals(`alt,${getModifiedCharacter(key_del_abs, "option")}`)
      ) {
        HelperExampleFactory.delAbstract();
        //Zotero.debug("clt+K pressed")
      }
    }
  });

  // key Map for MacOS
  type KeyModifiers = {
    option: string;
    shiftOption: string;
  };

  type KeyboardMap = Record<string, KeyModifiers>;

  const macKeyboardMap: KeyboardMap = {
    // QWERTY行
    'q': { option: 'œ', shiftOption: 'Œ' },
    'w': { option: '∑', shiftOption: '„' },
    'e': { option: '´', shiftOption: '´' },
    'r': { option: '®', shiftOption: '‰' },
    't': { option: '†', shiftOption: 'ˇ' },
    'y': { option: '¥', shiftOption: 'Á' },
    'u': { option: '¨', shiftOption: '¨' },
    'i': { option: '^', shiftOption: '^' },
    'o': { option: 'ø', shiftOption: 'Ø' },
    'p': { option: 'π', shiftOption: '∏' },
    
    // ASDF行
    'a': { option: 'å', shiftOption: 'Å' },
    's': { option: 'ß', shiftOption: 'Í' },
    'd': { option: '∂', shiftOption: 'Î' },
    'f': { option: 'ƒ', shiftOption: 'Ï' },
    'g': { option: '©', shiftOption: '˝' },
    'h': { option: '˙', shiftOption: 'Ó' },
    'j': { option: '∆', shiftOption: 'Ô' },
    'k': { option: '˚', shiftOption: '' },
    'l': { option: '¬', shiftOption: 'Ò' },
    
    // ZXCV行
    'z': { option: 'Ω', shiftOption: '¸' },
    'x': { option: '≈', shiftOption: '˛' },
    'c': { option: 'ç', shiftOption: 'Ç' },
    'v': { option: '√', shiftOption: '◊' },
    'b': { option: '∫', shiftOption: 'ı' },
    'n': { option: '˜', shiftOption: '˜' },
    'm': { option: 'µ', shiftOption: 'Â' },
  };

  function getModifiedCharacter(
    inputChar: string,
    modifier: keyof KeyModifiers
  ): string | null {
    const normalizedInputChar = inputChar.toLowerCase();
    return macKeyboardMap[normalizedInputChar]?.[modifier] ?? null;
  }

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
