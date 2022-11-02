# 插件用途

1. 删除条目或分类的同时将链接的附件也一块删除。


    从[https://github.com/redleafnew/delitemwithatt/releases](https://github.com/redleafnew/delitemwithatt/releases)下载xpi，然后在Zotero或JurisM中通过Tools-Addons-Install Add-on From File安装。安装完成后在条目上右击会出现：`删除附件`，如果条目有附件，会出现四个子菜单，`删除附件和条目`，`仅删除所有附件`，`仅删除快照`，`仅删除笔记`，点击后条目包括附件、附件、快照或笔记会被删除（包括文件）。在分类上右击时会出现：`删除分类条目包括附件`，确认后会在删除分类的同时将分类中的条目包含附件删除，快照也认为是附件。**注意：删除时链接文件不进回收站，直接删除，请删除前备份**。

2. 根据条目标题语言将所选条目语言字段设置为`en-US`或`zh-CN`。 

3. 将附件导出。

&ensp;&ensp;&ensp;~~4. 更新期刊缩写。~~

&ensp;&ensp;&ensp;&ensp;~~如果需要在搜索不到期刊名称时用全称代替，需要修改高级配置（在`Zotero`中依次点击`Edit`-`Preference`-`Advanced`-`Config Editor`），英文期刊：`extensions.delitemwithatt.en-abbr` 选项为`true`，中文期刊：`extensions.delitemwithatt.ch-abbr`选项为`true`。英文期刊判断方式为`Language`字段为`en-US`，中文为`zh-CN`。~~

# Usage

1. Remove linked attachment(s) when delete the item(s) or collection.

    Download xpi from [https://github.com/redleafnew/delitemwithatt/releases](https://github.com/redleafnew/delitemwithatt/releases), and click Tools-Addons-Install Add-on From File in Zotero or JurisM to install the extension. After the installation, right click the item(s) `Delete Attachment(s)` shows, if there is/are attachment(s) for the item(s), there  will be four submenus, `Delete Attachment(s) and Item(s)`, `Delete All Attachment(s) only`, `Delete Snapshot(s) only`, `Delete Note(s) only`, when confirm, the item(s),attachment(s), the snapshot(s) or the note(s) will be deleted;  right click the collection `Delete Collections with Attachments` shows, when confirm, the collection and the item(s) with attachment(s) in the selected collection will be deleted. Snapshot is also regarded as attachment. **Note: the linked files could not be restored, they will be removed directly, please backup before removing**.

2. Set the language field of selected items as `en-US` or `zh-CN` according to the language of item title.

3. Export attachment(s).

&ensp;&ensp;&ensp;&ensp;~~4. Update Journal Abbreviation.~~

# License
    The source code is released under GNU General Public License, version 3.0

    Contributions preferably through pull requests are welcome!
