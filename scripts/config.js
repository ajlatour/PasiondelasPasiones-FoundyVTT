// Pure helpers (no Foundry globals) so the same code runs in the browser and in tools/.

export const MODULE_ID = "pasion-de-las-pasiones";

// Keys in the pbta sheet config whose string values are player-facing text.
export const CONFIG_TEXT_KEYS = ["label", "description"];

/** Localization key for a piece of sheet-config text: PASION.cfg.<slug>. */
export function configKey(text) {
  const base = text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (base.length <= 48) return `PASION.cfg.${base}`;
  let h = 5381;
  for (const ch of text) h = ((h * 33) ^ ch.codePointAt(0)) >>> 0;
  return `PASION.cfg.${base.slice(0, 40).replace(/-+$/, "")}-${h.toString(36)}`;
}

/** Calls fn(text, setter) for every translatable string in a sheet config. */
export function walkConfigText(node, fn) {
  if (Array.isArray(node)) return node.forEach(n => walkConfigText(n, fn));
  if (!node || typeof node !== "object") return;
  for (const [k, v] of Object.entries(node)) {
    if (CONFIG_TEXT_KEYS.includes(k) && typeof v === "string" && v.trim()) {
      fn(v, t => { node[k] = t; });
    } else {
      walkConfigText(v, fn);
    }
  }
}

/**
 * Returns a copy of the (English) sheet config with every label/description
 * passed through `lookup(key, english)`.
 */
export function localizeConfig(config, lookup) {
  const copy = structuredClone(config);
  walkConfigText(copy, (text, set) => set(lookup(configKey(text), text)));
  return copy;
}
