// Translation tooling. English is the base language.
//
//   npm run lang:extract         regenerate lang/en.json (sheet-config strings)
//   npm run lang:new -- <code>   create/update lang/<code>.json + translations/<code>/*.json
//                                (existing translations are kept, new strings are added in English)
//   npm run lang:check [-- <code>]   validate translations against the English base
import fs from "node:fs";
import path from "node:path";
import {
  ROOT, BASE_LANG, MODULE_ID, manifest, manifestPath, packs, loadPack, baseEntry,
  translationFile, langFile, readJson, writeJson,
} from "./lib.mjs";
import { configKey, walkConfigText } from "../scripts/config.js";
import { sheetConfig } from "../scripts/sheet-config.js";

const ITEM_MAPPING = { system: { path: "system", converter: "pasionSystem" } };

// ---------------------------------------------------------------- lang/*.json

const flatten = (obj, prefix = "") =>
  Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === "object" ? flatten(v, `${prefix}${k}.`) : [[`${prefix}${k}`, v]]);

const expand = flat => {
  const out = {};
  for (const [key, value] of flat) {
    const parts = key.split(".");
    const last = parts.pop();
    parts.reduce((o, k) => (o[k] ??= {}), out)[last] = value;
  }
  return out;
};

/** Compendium titles (from module.json) keyed by their localization key. */
function packTitles() {
  return new Map(manifest().packs.map(p => [`PASION.packs.${p.name}`, p.label]));
}

/** Sheet-config strings keyed by their localization key. */
function configStrings() {
  const strings = new Map();
  walkConfigText(structuredClone(sheetConfig), text => {
    const key = configKey(text);
    if (strings.has(key) && strings.get(key) !== text) {
      throw new Error(`Localization key collision for "${key}":\n  ${strings.get(key)}\n  ${text}`);
    }
    strings.set(key, text);
  });
  return strings;
}

function extract() {
  const file = langFile(BASE_LANG);
  const existing = fs.existsSync(file) ? flatten(readJson(file)) : [];
  const hand = existing.filter(([k]) => !k.startsWith("PASION.cfg.") && !k.startsWith("PASION.packs."));
  const packs = [...packTitles()];
  const cfg = [...configStrings()];
  writeJson(file, expand([...hand, ...packs, ...cfg]));
  console.log(`lang/${BASE_LANG}.json: ${hand.length} UI strings, ${packs.length} compendium titles, ${cfg.length} sheet-config strings`);
}

// ----------------------------------------------------------------- translations

function packTemplate(pack) {
  const { docs, folders } = loadPack(pack);
  return {
    ...(pack.type === "JournalEntry" ? {} : { mapping: ITEM_MAPPING }),
    folders: Object.fromEntries(folders.map(f => [f.name, f.name])),
    entries: Object.fromEntries(docs.map(d => [d._id, baseEntry(pack, d)])),
  };
}

/** Keeps `existing` values where present, filling anything missing from `base`. */
function fill(base, existing) {
  if (existing === undefined) return base;
  if (base && typeof base === "object" && existing && typeof existing === "object") {
    const out = {};
    for (const k of Object.keys(base)) out[k] = k === "_name" ? base[k] : fill(base[k], existing[k]);
    return out;
  }
  return existing;
}

function sync(lang) {
  if (!lang || lang === BASE_LANG) throw new Error(`usage: lang:new -- <language code other than "${BASE_LANG}">`);

  // lang/<code>.json
  const baseFlat = flatten(readJson(langFile(BASE_LANG)));
  const file = langFile(lang);
  const have = new Map(fs.existsSync(file) ? flatten(readJson(file)) : []);
  writeJson(file, expand(baseFlat.map(([k, v]) => [k, have.get(k) ?? v])));

  // translations/<code>/<module>.<pack>.json
  for (const pack of packs()) {
    const template = packTemplate(pack);
    const tf = translationFile(lang, pack);
    const old = fs.existsSync(tf) ? readJson(tf) : {};
    writeJson(tf, {
      ...(template.mapping ? { mapping: template.mapping } : {}),
      folders: fill(template.folders, old.folders),
      entries: Object.fromEntries(
        Object.entries(template.entries).map(([id, e]) => [id, fill(e, old.entries?.[id])])),
    });
  }

  // register in module.json
  const m = manifest();
  m.languages ??= [];
  if (!m.languages.some(l => l.lang === lang)) {
    const name = new Intl.DisplayNames([lang], { type: "language" }).of(lang);
    m.languages.push({ lang, name: name[0].toLocaleUpperCase(lang) + name.slice(1), path: `lang/${lang}.json` });
    writeJson(manifestPath, m);
  }
  console.log(`${lang}: updated lang/${lang}.json and translations/${lang}/ (new strings added in English)`);
  check([lang]);
}

// ------------------------------------------------------------------------ check

function check(langs) {
  let errors = 0;
  const err = msg => { errors++; console.error(`  ERROR ${msg}`); };
  const warn = msg => console.warn(`  warn  ${msg}`);

  // lang/en.json must match the sheet config
  const enFlat = new Map(flatten(readJson(langFile(BASE_LANG))));
  for (const [k, v] of [...packTitles(), ...configStrings()]) {
    if (enFlat.get(k) !== v) err(`lang/${BASE_LANG}.json is out of date (${k}); run npm run lang:extract`);
  }

  const dir = path.join(ROOT, "translations");
  const found = new Set([
    ...(fs.existsSync(dir) ? fs.readdirSync(dir) : []),
    ...fs.readdirSync(path.join(ROOT, "lang")).map(f => f.replace(/\.json$/, "")),
  ]);
  found.delete(BASE_LANG);
  const targets = langs?.length ? langs : [...found].sort();
  const declared = new Set((manifest().languages ?? []).map(l => l.lang));

  const base = new Map(packs().map(p => {
    const { docs, folders } = loadPack(p);
    return [p.name, { pack: p, docs, folders, entries: new Map(docs.map(d => [d._id, baseEntry(p, d)])) }];
  }));

  for (const lang of targets) {
    console.log(`\n[${lang}]`);
    if (!declared.has(lang)) err(`not listed in module.json "languages"`);

    const lf = langFile(lang);
    if (!fs.existsSync(lf)) warn(`lang/${lang}.json missing`);
    else {
      const have = new Map(flatten(readJson(lf)));
      for (const k of have.keys()) if (!enFlat.has(k)) err(`lang/${lang}.json: unknown key ${k}`);
      const missing = [...enFlat.keys()].filter(k => !have.has(k));
      if (missing.length) warn(`lang/${lang}.json: ${missing.length} strings fall back to English`);
    }

    for (const [name, b] of base) {
      const tf = translationFile(lang, b.pack);
      if (!fs.existsSync(tf)) { warn(`${name}: no translation file (pack stays English)`); continue; }
      const t = readJson(tf);
      let missing = 0, same = 0, total = 0;
      for (const id of Object.keys(t.entries ?? {})) {
        if (!b.entries.has(id)) { err(`${name}: entry ${id} (${t.entries[id]._name}) no longer exists`); continue; }
      }
      for (const [id, be] of b.entries) {
        const te = t.entries?.[id];
        if (!te) { missing++; continue; }
        const flat = Object.fromEntries(flatten(be).filter(([k]) => !k.endsWith("_name")));
        const tflat = Object.fromEntries(flatten(te).filter(([k]) => !k.endsWith("_name")));
        for (const k of Object.keys(tflat)) if (!(k in flat)) err(`${name}: ${id} (${be._name}): unknown field ${k}`);
        for (const [k, v] of Object.entries(flat)) {
          total++;
          if (!(k in tflat)) missing++;
          else if (tflat[k] === v) same++;
        }
      }
      for (const f of b.folders) if (!(f.name in (t.folders ?? {}))) warn(`${name}: folder "${f.name}" not translated`);
      console.log(`  ${name}: ${total} strings, ${missing} missing (English fallback), ${same} identical to English`);
    }
  }
  if (errors) { console.error(`\n${errors} error(s)`); process.exitCode = 1; }
  else console.log("\nOK");
}

// -------------------------------------------------------------------------- cli

const [cmd, ...args] = process.argv.slice(2);
if (cmd === "extract") extract();
else if (cmd === "sync") sync(args[0]);
else if (cmd === "check") check(args);
else { console.error("usage: i18n.mjs extract | sync <lang> | check [lang...]"); process.exit(1); }
