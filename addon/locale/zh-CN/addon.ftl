startup-begin = 插件加载中
startup-finish = 插件已就绪

# ---------------------------------------------------------------------------
# 菜单项文案
#
# ⚠️ 用作 Zotero.MenuManager.registerMenu 的 l10nID 时，必须写成 `.label =`
#    形式，否则菜单项是空白的（FTL 里没有值、只有属性时，菜单读不到 label）。
#
# ⚠️ 这些 key 只用于菜单，不要再拿去 getString()：
#    只有属性的消息用 getString() 取出来是空的。
#    用 getString() 取文案的 key（确认弹窗、提示条等）保持 `key = 文案` 原样。
# ---------------------------------------------------------------------------

# 条目右键菜单
del-att =
    .label = 删除附件
delitem-label =
    .label = 删除条目和附件
delatt-label =
    .label = 仅删除附件
delsnap-label =
    .label = 仅删除快照
delnote-label =
    .label = 仅删除笔记
delabstract-label =
    .label = 清空“摘要”字段
delextra-label =
    .label = 清空“其他”字段
eport-att =
    .label = 导出附件
chan-lan =
    .label = 自动设置语言字段

# 分类右键菜单
del-col-item-att =
    .label = 删除分类包括附件

# ---------------------------------------------------------------------------
# 以下用 getString() 读取，保持 `key = 文案` 形式，不要改成 .label
# ---------------------------------------------------------------------------

# 启动提示
# startup-begin / startup-finish 见文件开头

# 语言设置
chan-lan-sucess = 语言字段自动设置完成。
softLanFail = 语言字段自动设置失败。

# 分类删除
del-col-item-att-sucess = 分类包括附件已删除。
delete-collection-and-attachment = 您确定将所选分类包括附件移动到回收站? 链接的附件不可恢复。

# 确认弹窗（带数量复数）
delete-item-and-attachment =
  {$count ->
   [one] 您确定将所选条目包括附件移动到回收站? 链接的附件不可恢复。
  *[other] 您确定将所选{$count}个条目包括附件移动到回收站? 链接的附件不可恢复。
  }
delete-attachment-only =
  {$count ->
   [one] 您确定将所选条目的附件移动到回收站? 链接的附件不可恢复。
  *[other] 您确定将所选{$count}个条目的附件移动到回收站? 链接的附件不可恢复。
  }
delete-snapshot =
  {$count ->
   [one] 您确定将所选条目的快照移动到回收站?
  *[other] 您确定将所选{$count}个条目的快照移动到回收站?
  }
# delete-snapshot-sig                 =	Are you sure you want to delete the snapshot of the item?
# delete-snapshot-mul                 =	Are you sure you want to delete the snapshots of the items?
delete-note =
  {$count ->
   [one] 您确定将所选条目的笔记删除?
  *[other] 您确定将所选{$count}个条目的笔记删除?
  }
# delete-note-sig                     =	Are you sure you want to delete the note of the item?
# delete-note-mul                     =	Are you sure you want to delete the notes of the items?
delete-extra =
 {$count ->
   [one] 您确定将所选条目的“其他”字段内容清空?
  *[other] 您确定将所选{$count}个条目的“其他”字段内容清空?
  }
delete-abstract =
 {$count ->
   [one] 您确定将所选条目的“摘要”字段内容清空?
  *[other] 您确定将所选{$count}条目的“摘要”字段内容清空?
  }
# delete-abstract-sig                 =	Are you sure you want to empty the abstract of the item?
# delete-abstract-mul                 =	Are you sure you want to empty the abstracts of the items?

# 操作完成提示
del-item-att-sucess =
 {$count ->
   [one] 所选条目和附件已删除。
  *[other] {$count}个所选条目及其附件已删除。
  }
del-att-sucess = 附件已删除。
del-abs-sucess = “摘要”字段已清空。
del-extra-sucess = “其他”字段已清空。
del-note-sucess = 笔记已删除。
del-snap-sucess = 快照已删除。

file-is-open = 无法删除文件。如果文件已经打开, 请关闭后重试。

# 导出
exort-dir = 请选择存放的路径
exp-sucess = 个附件导出成功！
exp-fail = 个附件导出失败，可能已经删除。

# ---------------------------------------------------------------------------
# 模板遗留、当前代码未使用，可保留也可删除
# ---------------------------------------------------------------------------
menuitem-label = 插件模板: 帮助工具样例
menupopup-label = 插件模板: 弹出菜单
menuitem-submenulabel = 插件模板：子菜单
menuitem-filemenulabel = 插件模板: 文件菜单
