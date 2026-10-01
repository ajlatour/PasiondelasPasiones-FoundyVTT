import { MODULE_ID } from "./config.js";

/**
 * Applies flattened "system.some.path.0.label": "text" entries from a Babele
 * translation file onto a copy of the document's `system` data.
 */
export function applySystemTranslations(system, entry) {
  const result = foundry.utils.deepClone(system);
  for (const [path, text] of Object.entries(entry ?? {})) {
    if (!path.startsWith("system.") || typeof text !== "string") continue;
    const keys = path.split(".").slice(1);
    const last = keys.pop();
    const parent = keys.reduce((o, k) => o?.[k], result);
    if (parent && last in parent) parent[last] = text;
  }
  return result;
}

/** Babele hook (`babele.init`): one translation folder per language declared in module.json. */
export function registerTranslations(babele) {
  babele.registerConverters({
    pasionSystem: (system, _translation, _data, _tc, entry) => applySystemTranslations(system, entry)
  });

  const languages = game.modules.get(MODULE_ID)?.languages ?? [];
  for (const { lang } of languages) {
    babele.register({ module: MODULE_ID, lang, dir: `translations/${lang}` });
  }
}
