import { BasicTool } from "zotero-plugin-toolkit/dist/basic";
import Addon from "./addon";
import { config } from "../package.json";

const basicTool = new BasicTool();
//const OS = ztoolkit.getGlobal("OS");

if (!basicTool.getGlobal("Zotero").delitemwithatt) {
  // Set global variables
  _globalThis.Zotero = basicTool.getGlobal("Zotero");
  _globalThis.ZoteroPane = basicTool.getGlobal("ZoteroPane");
  _globalThis.Zotero_Tabs = basicTool.getGlobal("Zotero_Tabs");
  _globalThis.window = basicTool.getGlobal("window");
  _globalThis.document = basicTool.getGlobal("document");
  _globalThis.OS = basicTool.getGlobal("OS");
  _globalThis.window.confirm = basicTool.getGlobal("confirm")
  _globalThis.alert = basicTool.getGlobal("alert")
  _globalThis.addon = new Addon();
  _globalThis.ztoolkit = addon.data.ztoolkit;
  ztoolkit.basicOptions.log.prefix = `[${config.addonName}]`;
  ztoolkit.basicOptions.log.disableConsole = addon.data.env === "production";
  ztoolkit.UI.basicOptions.ui.enableElementJSONLog =
    addon.data.env === "development";
  Zotero.delitemwithatt = addon;
  // Trigger addon hook for initialization
  addon.hooks.onStartup();
}
