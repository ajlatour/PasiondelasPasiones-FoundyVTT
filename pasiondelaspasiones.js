import { MODULE_ID, localizeConfig } from "./scripts/config.js";
import { sheetConfig } from "./scripts/sheet-config.js";
import { registerTranslations } from "./scripts/translations.js";

// Compendium content (names, moves, journals...) is stored in English and translated at
// runtime by Babele using translations/<lang>/. See TRANSLATING.md.
Hooks.once("babele.init", registerTranslations);

// Compendium titles come from lang/<code>.json (PASION.packs.<pack>) so they follow the user's
// language even without Babele. Falls back to the English label in module.json.
const englishTitles = {};
Hooks.once("init", () => {
  for (const pack of game.data.packs) {
    if (pack.packageName === MODULE_ID) englishTitles[pack.name] = pack.label;
  }
});

const packTitle = name => {
  const key = `PASION.packs.${name}`;
  return game.i18n.has(key, false) ? game.i18n.localize(key) : null;
};

Hooks.once("ready", () => {
  for (const pack of game.packs) {
    if (pack.metadata.packageName !== MODULE_ID) continue;
    const title = packTitle(pack.metadata.name);
    if (title) pack.metadata.label = title;
  }
  ui.sidebar.tabs.compendium?.render();
});

// The sidebar list does not reliably pick up the localized label, so also patch the rendered text.
Hooks.on("renderCompendiumDirectory", (app, html) => {
  const root = html instanceof HTMLElement ? html : html?.[0];
  if (!root) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const text = node.data.trim();
    const name = Object.keys(englishTitles).find(n => englishTitles[n] === text);
    const title = name && packTitle(name);
    if (title) node.data = node.data.replace(text, title);
  }
});

Hooks.once("ready", () => {
  game.settings.set("pbta", "hideRollMode", true);
  game.settings.set("pbta", "hideRollFormula", true);
});

Hooks.on("renderSettings", (app, html) => {
  const links = {
    shop: {
      title: "Pasión de las Pasiones by Khelren - itch.io",
      url: "https://khelren.itch.io/pasion",
      iconClass: "fa-solid fa-cart-shopping"
    },

    donation: {
      title: "Ko-fi Khelren",
      url: "https://ko-fi.com/khelren",
      iconClass: "fa-regular fa-mug-hot fa-bounce"
    }
  };

  const createButton = (text, iconClass, url) => {
    const button = $(`<button><i class="${iconClass}"></i> ${text}</button>`);
    button.on("click", ev => {
      ev.preventDefault();
      window.open(url, "_blank");
    });
    return button;
  };

  const addLinkButton = (container, link) => {
    const button = createButton(link.title, link.iconClass, link.url);
    container.append(button);
  };

  const title = game.i18n.localize("PASION.SupportLinks");
  const lotdSection = $(`<h2>${title}  <i class="fa-regular fa-heart"></i></h2>`);
  html.find("#settings-game").after(lotdSection);

  const lotdDiv = $(`<div></div>`);
  lotdSection.after(lotdDiv);

  Object.values(links).forEach(link => {
    addLinkButton(lotdDiv, link);
  });
});

Hooks.once("pbtaSheetConfig", () => {
  // Disable the sheet config form.
  game.settings.set("pbta", "sheetConfigOverride", true);
  // Define custom tags.
  game.pbta.tagConfigOverride = {
    // Tags available to any actor and item
    general: '[{"value":"fire"},{"value":"water"},{"value":"earth"},{"value":"air"}]',
    actor: {
      // Tags available to all actors
      all: '[{"value":"person"}]',
      // Tags available to a specific actor type set up on game.pbta.sheetConfig.actorTypes (e.g. "character", "npc")
      character: '[{"value":"mook"}]'
    },
    item: {
      // Tags available to all actors
      all: '[{"value":"consumable"}]',
      // Tags available to a specific item type (e.g. "equipment", "move")
      move: '[{"value":"sword"}]'
    }
  };
  // Replace the game.pbta.sheetConfig with our own version, in the user's language.
  // Anything without a translation falls back to the English text.
  game.pbta.sheetConfig = localizeConfig(sheetConfig, (key, english) =>
    game.i18n.has(key, false) ? game.i18n.localize(key) : english
  );
});
