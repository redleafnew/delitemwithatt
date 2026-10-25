startup-begin = Addon is loading
startup-finish = Addon is ready

# ---------------------------------------------------------------------------
# Menu item strings
#
# ⚠️ Keys used as `l10nID` in Zotero.MenuManager.registerMenu MUST use the
#    `.label =` form, otherwise the menu item renders blank (a message with
#    attributes but no value has nothing for the menu to read).
#
# ⚠️ These keys are for menus only — do NOT pass them to getString():
#    a message that only has attributes resolves to an empty string.
#    Keys fetched via getString() (confirm dialogs, progress windows, etc.)
#    keep the plain `key = value` form.
# ---------------------------------------------------------------------------

# Item context menu
del-att = Delete Attachment(s)
    .label = Delete Attachment(s)
delitem-label = Delete Attachment(s) and Item(s)
    .label = Delete Attachment(s) and Item(s)
delatt-label = Delete All Attachment(s) only
    .label = Delete All Attachment(s) only
delsnap-label = Delete Snapshot(s) only
    .label = Delete Snapshot(s) only
delnote-label = Delete Note(s) only
    .label = Delete Note(s) only
delabstract-label = Empty "Abstract" Field(s)
    .label = Empty "Abstract" Field(s)
delextra-label = Empty "Extra" Field(s)
    .label = Empty "Extra" Field(s)
eport-att = Export Attachment(s)
    .label = Export Attachment(s)
chan-lan = Set Language Field Automatically
    .label = Set Language Field Automatically

# Collection context menu
del-col-item-att = Delete Collection with Attachment(s)
    .label = Delete Collection with Attachment(s)

# ---------------------------------------------------------------------------
# Strings read via getString() — keep the plain `key = value` form.
# Do NOT add `.label` to anything below.
# ---------------------------------------------------------------------------

# Preferences
prefs-title = Del Item With Attachment
prefs-table-title = Title
prefs-table-detail = Detail

# Language field
chan-lan-sucess = Language field set automatically.
softLanFail = Language field set failed.

# Collection deletion
del-col-item-att-sucess = Collection with attachment(s) removed.
delete-collection-and-attachment = Are you sure you want to delete the selected collection including the attachments? The linked attachments could not be restored.

# Confirmation dialogs (with plural forms)
delete-item-and-attachment =
  {$count ->
   [one] Are you sure you want to move the selected item including the attachment to the Trash? The linked attachment could not be restored.
  *[other] Are you sure you want to move the selected {$count} items including the attachments to the Trash?
  The linked attachments could not be restored.
  }
delete-attachment-only =
  {$count ->
   [one] Are you sure you want to delete the attachment of the selected item? The linked attachment could not be restored.
  *[other] Are you sure you want to delete the attachments of the {$count} selected items? The linked attachments could not be restored.
  }
delete-snapshot =
  {$count ->
   [one] Are you sure you want to delete the snapshot of the selected item?
  *[other] Are you sure you want to delete the snapshots of the {$count} selected items?
  }
# delete-snapshot-sig                  =	Are you sure you want to delete the snapshot of the item?
# delete-snapshot-mul                 =	Are you sure you want to delete the snapshots of the items?
delete-note =
  {$count ->
   [one] Are you sure you want to delete the note of the selected item?
  *[other] Are you sure you want to delete the notes of the {$count} selected items?
  }
# delete-note-sig                     =	Are you sure you want to delete the note of the item?
# delete-note-mul                     =	Are you sure you want to delete the notes of the items?
delete-extra =
 {$count ->
   [one] Are you sure you want to empty the "Extra" field of the selected item?
  *[other] Are you sure you want to empty the "Extra" fields of the {$count} selected items?
  }
delete-abstract =
 {$count ->
   [one] Are you sure you want to empty the "Abstract" fields of the selected item?
  *[other] Are you sure you want to empty the "Abstract" fields of the {$count} selected items?
  }
# delete-abstract-sig                 =	Are you sure you want to empty the abstract of the item?
# delete-abstract-mul                 =	Are you sure you want to empty the abstracts of the items?

# Completion messages
del-item-att-sucess =
 {$count ->
   [one] The selected item and its attachment(s) removed.
  *[other] {$count} selected items and their attachment(s) removed.
  }
del-att-sucess = Attachment(s) removed.
del-abs-sucess = "Abstract" field(s) emptied.
del-extra-sucess = "Extra" field(s) emptied.
del-note-sucess = Note(s) removed.
del-snap-sucess = Snapshot(s) removed.

file-is-open = The file can not be deleted. Please close the file if you have opened it and try again.

# Export
exort-dir = Select the save directory
exp-sucess = attachment(s) export completed!
exp-fail = attachment(s) export failed. The attachment(s) may be removed.

# ---------------------------------------------------------------------------
# Leftover template strings — unused by current code, safe to keep or delete
# ---------------------------------------------------------------------------
menuitem-label = Addon Template: Helper Examples
menupopup-label = Addon Template: Menupopup
menuitem-submenulabel = Addon Template
menuitem-filemenulabel = Addon Template: File Menuitem
