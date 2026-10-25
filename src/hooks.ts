import {
  // BasicExampleFactory,
  KeyExampleFactory,
  UIExampleFactory,
} from "./modules/examples";
import { config } from "../package.json";
import { getString, initLocale } from "./utils/locale";
import { registerShortcuts } from "./modules/shortcuts";
import { getPref } from "./utils/prefs";

/**
 * 把插件 FTL 注入主窗口。
 *
 * 为什么必须做这一步：
 * Zotero 8+ 的 MenuManager 用 l10nID，是在「窗口 document 的 l10n 上下文」里
 * 解析文案的。而 zotero-plugin-template 的 initLocale() 只 new 了一个
 * Localization 对象供 getString() 用 —— 它不会把 ftl 插进窗口。
 * 结果就是 l10nID 解析为空 → 菜单项没有 label → Zotero 11 直接不渲染，
 * 表现就是「菜单注册成功了，但右键什么都没有」。
 *
 * 文件名必须是构建产物里真实的名字（本项目是 `${addonRef}-addon.ftl`）。
 */
function insertFTL(window: Window) {
  const ftl = `${config.addonRef}-addon.ftl`;
  try {
    (window as any).MozXULElement.insertFTLIfNeeded(ftl);
  } catch (e) {
    ztoolkit.log(`insertFTLIfNeeded(${ftl}) failed`, e);
  }
}

function insertFTLToAllWindows() {
  const wins =
    ((Zotero.getMainWindows as any)?.() as Window[]) ??
    [Zotero.getMainWindow()];
  for (const w of wins.filter(Boolean)) {
    insertFTL(w);
  }
}

async function onStartup() {
  await Promise.all([
    Zotero.initializationPromise,
    Zotero.unlockPromise,
    Zotero.uiReadyPromise,
  ]);
  initLocale();

  // 关键：把 ftl 插进已经打开的主窗口，否则菜单文案为空、菜单不显示
  insertFTLToAllWindows();

  ztoolkit.ProgressWindow.setIconURI(
    "default",
    `chrome://${config.addonRef}/content/icons/favicon.svg`,
  );

  // 允许启用静默启动插件
  const quiet_boot =
    getPref("quiet.boot") == undefined ? "disable" : getPref("quiet.boot");

  // 启动进度弹窗（静默模式下不创建）
  const popupWin =
    quiet_boot == "disable"
      ? new ztoolkit.ProgressWindow(config.addonName, {
          closeOnClick: true,
          closeTime: -1,
        })
          .createLine({
            text: getString("startup-begin"),
            type: "default",
            progress: 0,
          })
          .show()
      : undefined;

  // KeyExampleFactory.registerShortcuts();
  registerShortcuts(); //新的注册快捷键

  /**
   * 注册右键菜单（Zotero 8+ 官方 API，Zotero 11 无需改动）。
   *
   * ⚠️ 只在这里调用一次：
   * - 新 API 是全局注册，对所有主窗口生效，开新窗口无需重新注册；
   * - 不要放进 onMainWindowLoad，否则每开一个窗口就注册一次。
   */
  try {
    UIExampleFactory.registerMenus();
  } catch (e) {
    ztoolkit.log("registerMenus failed", e);
  }

  if (popupWin) {
    await Zotero.Promise.delay(1000);
    popupWin.changeLine({
      progress: 30,
      text: `[30%] ${getString("startup-begin")}`,
    });

    await Zotero.Promise.delay(1000);

    popupWin.changeLine({
      progress: 100,
      text: `[100%] ${getString("startup-finish")}`,
    });
    popupWin.startCloseTimer(5000);
  } else {
    await Zotero.Promise.delay(1000);
  }
}

/**
 * 新开窗口时也要插 ftl，否则新窗口里菜单文案为空。
 * 注意：这里只插 ftl，不注册菜单（菜单是全局注册一次的）。
 */
function onMainWindowLoad({ window }: { window: Window }): void {
  insertFTL(window);
}

function onShutdown(): void {
  // 卸载菜单（可选：插件禁用/卸载时 Zotero 会按 pluginID 自动清理）
  try {
    UIExampleFactory.unregisterMenus();
  } catch (e) {
    ztoolkit.log("unregisterMenus failed", e);
  }

  ztoolkit.unregisterAll();
  // Remove addon object
  addon.data.alive = false;
  // @ts-ignore types undefined
  delete Zotero.delitemwithatt;
}

export default {
  onStartup,
  onShutdown,
  onMainWindowLoad,
};
