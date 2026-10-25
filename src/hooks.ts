import {
  // BasicExampleFactory,
  KeyExampleFactory,
  UIExampleFactory,
} from "./modules/examples";
import { config } from "../package.json";
import { getString, initLocale } from "./utils/locale";
import { registerShortcuts } from "./modules/shortcuts";
import { getPref } from "./utils/prefs";

/** 构建产物里 FTL 的真实文件名：scaffold 的 prefixLocaleFiles 会加上命名空间 */
const FTL_FILE = `${config.addonRef}-addon.ftl`;

/** 安全延时：不用 Zotero.Promise.delay（Bluebird 已在 Zotero 8 移除） */
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function log(msg: string) {
  try {
    Zotero.debug(`[${config.addonRef}] ${msg}`);
  } catch (e) {
    // ignore
  }
}

/**
 * 把插件 FTL 注入主窗口。
 *
 * Zotero 8+ 的 MenuManager 用 l10nID，是在「窗口 document 的 l10n 上下文」里
 * 解析文案的；而 initLocale() 只 new 了一个 Localization 对象供 getString() 用，
 * 不会把 ftl 插进窗口。缺了这一步，l10nID 解析为空 → 菜单项没有 label。
 */
function insertFTL(window: Window) {
  try {
    (window as any).MozXULElement.insertFTLIfNeeded(FTL_FILE);
  } catch (e) {
    log(`insertFTLIfNeeded(${FTL_FILE}) failed: ${e}`);
  }
}

function insertFTLToAllWindows() {
  let wins: Window[] = [];
  try {
    wins = (Zotero.getMainWindows() as Window[]) ?? [];
  } catch (e) {
    // ignore
  }
  if (!wins.length) {
    try {
      wins = [Zotero.getMainWindow()];
    } catch (e) {
      // ignore
    }
  }
  for (const w of wins.filter(Boolean)) {
    insertFTL(w);
  }
}

async function onStartup() {
  log("onStartup start");

  // 逐个 await，任何一个缺失/永不 resolve 都不会卡住后续注册
  for (const p of [
    Zotero.initializationPromise,
    Zotero.unlockPromise,
    Zotero.uiReadyPromise,
  ]) {
    try {
      await p;
    } catch (e) {
      log(`await init promise failed: ${e}`);
    }
  }

  try {
    initLocale();
  } catch (e) {
    log(`initLocale failed: ${e}`);
  }

  insertFTLToAllWindows();

  // 关键：菜单注册放在最前，且单独 try/catch，
  // 保证后面任何一步出问题都不会影响菜单。
  try {
    UIExampleFactory.registerMenus();
  } catch (e) {
    log(`registerMenus failed: ${e}`);
  }

  try {
    registerShortcuts();
  } catch (e) {
    log(`registerShortcuts failed: ${e}`);
  }

  // 以下都是非关键流程，出问题不影响菜单
  try {
    ztoolkit.ProgressWindow.setIconURI(
      "default",
      `chrome://${config.addonRef}/content/icons/favicon.svg`,
    );
  } catch (e) {
    log(`setIconURI failed: ${e}`);
  }

  const quiet_boot =
    getPref("quiet.boot") == undefined ? "disable" : getPref("quiet.boot");
  if (quiet_boot != "disable") {
    log("onStartup done (quiet)");
    return;
  }

  try {
    const popupWin = new ztoolkit.ProgressWindow(config.addonName, {
      closeOnClick: true,
      closeTime: -1,
    })
      .createLine({
        text: getString("startup-begin"),
        type: "default",
        progress: 0,
      })
      .show();

    await delay(1000);
    popupWin.changeLine({
      progress: 30,
      text: `[30%] ${getString("startup-begin")}`,
    });

    await delay(1000);
    popupWin.changeLine({
      progress: 100,
      text: `[100%] ${getString("startup-finish")}`,
    });
    popupWin.startCloseTimer(5000);
  } catch (e) {
    log(`startup popup failed: ${e}`);
  }

  log("onStartup done");
}

/**
 * 新开窗口时也要插 ftl。
 * 注意：这里只插 ftl，不注册菜单 —— 菜单是全局注册一次的，重复注册会翻倍。
 */
function onMainWindowLoad({ window }: { window: Window }): void {
  insertFTL(window);
}

function onShutdown(): void {
  log("onShutdown");
  try {
    UIExampleFactory.unregisterMenus();
  } catch (e) {
    log(`unregisterMenus failed: ${e}`);
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
