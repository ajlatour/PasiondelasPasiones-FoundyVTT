import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const manifestPath = path.join(ROOT, "module.json");
export const readJson = p => JSON.parse(fs.readFileSync(p, "utf8"));
export const writeJson = (p, data) => {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + "\n");
};

export const manifest = () => readJson(manifestPath);
export const MODULE_ID = manifest().id;
export const BASE_LANG = "en";

/** Packs declared in module.json, with their source/build directories. */
export function packs() {
  return manifest().packs.map(p => ({
    name: p.name,
    type: p.type,
    src: path.join(ROOT, "src/packs", p.name),
    out: path.join(ROOT, p.path),
    collection: `${MODULE_ID}.${p.name}`,
  }));
}

/** All source documents of a pack, split into folders and documents. */
export function loadPack(pack) {
  const docs = [], folders = [];
  for (const f of fs.readdirSync(pack.src).filter(f => f.endsWith(".json")).sort()) {
    const doc = readJson(path.join(pack.src, f));
    (doc._key?.startsWith("!folders!") ? folders : docs).push(doc);
  }
  return { docs, folders };
}

// System fields (inside `system`) holding player-facing text.
const SYSTEM_TEXT_KEYS = new Set(["description", "label", "value", "title", "desc"]);

/**
 * Flattens the translatable strings of an Item/Actor into
 * { "system.attributes.foo.options.2.label": "text", ... }.
 */
export function translatableSystem(doc) {
  const out = {};
  const walk = (node, p) => {
    if (typeof node === "string") {
      if (node.trim() && SYSTEM_TEXT_KEYS.has(p.at(-1))) out[p.join(".")] = node;
    } else if (Array.isArray(node)) {
      node.forEach((n, i) => walk(n, [...p, i]));
    } else if (node && typeof node === "object") {
      for (const [k, v] of Object.entries(node)) walk(v, [...p, k]);
    }
  };
  walk(doc.system ?? {}, ["system"]);
  return out;
}

/** Translatable strings of a journal: { name, pages: { id: { name, text } } }. */
export function translatableJournal(doc) {
  const pages = {};
  for (const pg of doc.pages ?? []) {
    const e = { _name: pg.name, name: pg.name };
    if (pg.text?.content) e.text = pg.text.content;
    pages[pg._id] = e;
  }
  return { name: doc.name, pages };
}

/** The Babele entry (base-language) for a document. */
export function baseEntry(pack, doc) {
  if (pack.type === "JournalEntry") return { _name: doc.name, ...translatableJournal(doc) };
  return { _name: doc.name, name: doc.name, ...translatableSystem(doc) };
}

export const translationFile = (lang, pack) =>
  path.join(ROOT, "translations", lang, `${pack.collection}.json`);
export const langFile = lang => path.join(ROOT, "lang", `${lang}.json`);
