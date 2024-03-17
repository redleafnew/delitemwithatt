
# Delete item(s) with attachment(s)

[![zotero target version](https://img.shields.io/badge/Zotero-7.0.*-green?style=flat-square&logo=zotero&logoColor=CC2936)](https://www.zotero.org)
[![version](https://img.shields.io/github/package-json/v/redleafnew/delitemwithatt?style=flat-square)](https://github.com/redleafnew/delitemwithatt/releases/)
[![download number](https://img.shields.io/github/downloads/redleafnew/delitemwithatt/latest/delitemwithatt.xpi?style=flat-square)](https://github.com/redleafnew/delitemwithatt/releases/)
[![license](https://img.shields.io/github/license/redleafnew/delitemwithatt?style=flat-square)](#license)
[![Using Zotero Plugin Template](https://img.shields.io/badge/Using-Zotero%20Plugin%20Template-blue?style=flat-square&logo=github)](https://github.com/windingwind/zotero-plugin-template)

# 注意：

最新版仅支持Zotero 7.0, Zotero 6.0请下载[0.1.06](https://github.com/redleafnew/delitemwithatt/releases/tag/0.1.06)。

# 插件用途

1. 删除条目或分类的同时将链接的附件也一块删除。


    从[https://github.com/redleafnew/delitemwithatt/releases](https://github.com/redleafnew/delitemwithatt/releases)下载xpi，然后在Zotero或JurisM中通过Tools-Addons-Install Add-on From File安装。安装完成后在条目上右击会出现：`删除附件`，如果条目有附件，会出现四个子菜单，`删除附件和条目(Alt+I)`，`仅删除所有附件(Alt+A)`，`仅删除快照(Alt+S)`，`仅删除笔记(Alt+N)`，`清空摘要(Alt+Z)`，`清空其它(Alt+X)`，点击后条目包括附件、附件、快照或笔记会被删除（包括文件）。在分类上右击时会出现：`删除分类条目包括附件`，确认后会在删除分类的同时将分类中的条目包含附件删除，快照也认为是附件。**注意：删除时链接文件不进回收站，直接删除，请删除前备份**。

    以上快捷键修改方法：在`Zotero`中运行`Tools`-`Developer`-`Run JavaScript`，输入：

   `Zotero.Prefs.set('extensions.zotero.delitemwithatt.key.del.item.att', 'I', true); // 修改删除条目和附件默认快捷键，修改I为预设置的快捷字母`

    `Zotero.Prefs.set('extensions.zotero.delitemwithatt.key.del.att', 'A', true); // 修改删除附件默认快捷键，修改A为预设置的快捷字母`

   ` Zotero.Prefs.set('extensions.zotero.delitemwithatt.key.del.snap', 'S', true); // 修改删除快照默认快捷键，修改S为预设置的快捷字母`

    `Zotero.Prefs.set('extensions.zotero.delitemwithatt.key.del.note', 'N', true); // 修改删除笔记默认快捷键，修改I为预设置的快捷字母`

    `Zotero.Prefs.set('extensions.zotero.delitemwithatt.key.del.extra', 'X', true); // 修改删除其它默认快捷键，修改X为预设置的快捷字母`

    `Zotero.Prefs.set('extensions.zotero.delitemwithatt.key.del.abs', 'Z', true); // 修改删除摘要默认快捷键，修改Z为预设置的快捷字母`

2. 根据条目标题语言将所选条目语言字段设置为`en-US`或`zh-CN`。

3. 将附件导出。

# 感谢

本插件基于@windingwind的[zotero-plugin-template](https://github.com/windingwind/zotero-plugin-template)开发，在此表示感谢。

# Reminder：

The latest version only supports Zotero 7.0, Zotero 6.0 users could download [0.1.06](https://github.com/redleafnew/delitemwithatt/releases/tag/0.1.06)。

# Usage

1. Remove linked attachment(s) when delete the item(s) or collection.

    Download xpi from [https://github.com/redleafnew/delitemwithatt/releases](https://github.com/redleafnew/delitemwithatt/releases), and click Tools-Addons-Install Add-on From File in Zotero or JurisM to install the extension. After the installation, right click the item(s) `Delete Attachment(s)` shows, if there is/are attachment(s) for the item(s), there  will be four submenus, `Delete Attachment(s) and Item(s)(Alt+I)`, `Delete All Attachment(s) only(Alt+A)`, `Delete Snapshot(s) only(Alt+S)`, `Delete Note(s) only(Alt+N)`, `Empty Abstract(s)(Alt+Z)`, `Empty Extra(s)(Alt+X)`, when confirm, the item(s),attachment(s), the snapshot(s) or the note(s) will be deleted;  right click the collection `Delete Collections with Attachments` shows, when confirm, the collection and the item(s) with attachment(s) in the selected collection will be deleted. Snapshot is also regarded as attachment. **Note: the linked files could not be restored, they will be removed directly, please backup before removing**.

2. Set the language field of selected items as `en-US` or `zh-CN` according to the language of item title.

3. Export attachment(s).

# Disclaimer

This plugin based on @windingwind's [zotero-plugin-template](https://github.com/windingwind/zotero-plugin-template)，many thanks for his team's hard working。

# License
    The source code is released under GNU General Public License, version 3.0

    Contributions preferably through pull requests are welcome!
