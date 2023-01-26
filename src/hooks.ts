import {
  // BasicExampleFactory,
  KeyExampleFactory,
  UIExampleFactory,
} from "./modules/examples";
import { config } from "../package.json";
import { getString, initLocale } from "./modules/locale";


async function onStartup() {
  await Promise.all([
    Zotero.initializationPromise,
    Zotero.unlockPromise,
    Zotero.uiReadyPromise,
  ]);
  initLocale();
  ztoolkit.ProgressWindow.setIconURI(
    "default",
    `chrome://${config.addonRef}/content/icons/favicon.png`
  );

  const popupWin = new ztoolkit.ProgressWindow(config.addonName, {
    closeOnClick: true,
    closeTime: -1,
  })
    .createLine({
      text: getString("startup.begin"),
      type: "default",
      progress: 0,
    })
    .show();

  KeyExampleFactory.registerShortcuts();

  await Zotero.Promise.delay(1000);
  popupWin.changeLine({
    progress: 30,
    text: `[30%] ${getString("startup.begin")}`,
  });

  ZoteroPane.collectionsView.onSelect.addListener(UIExampleFactory.displayColMenuitem); //监听分类右键显示菜单

  ZoteroPane.itemsView.onSelect.addListener(UIExampleFactory.displayMenuitem); //监听右键显示菜单

  UIExampleFactory.registerMenuSepartor(); // 分隔条

  UIExampleFactory.registerRightClickCollMenu();

  UIExampleFactory.registerRightClickMenuItem();

  UIExampleFactory.registerRightClickMenuPopup();

  UIExampleFactory.registerRightClickChanLan();

  await Zotero.Promise.delay(1000);

  popupWin.changeLine({
    progress: 100,
    text: `[100%] ${getString("startup.finish")}`,
  });
  popupWin.startCloseTimer(5000);

}

function onShutdown(): void {
  ztoolkit.unregisterAll();
  // Remove addon object
  addon.data.alive = false;
  delete Zotero.delitemwithatt;
}


export default {
  onStartup,
  onShutdown,
};
