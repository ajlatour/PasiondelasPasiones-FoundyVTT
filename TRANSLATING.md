# Translating the module

English is the base language. Every other language is a set of JSON files layered on top of it at
runtime, so adding a language never touches the compendiums themselves.

| What | Where | How it is applied |
| --- | --- | --- |
| Module UI + character-sheet labels | `lang/<code>.json` | Foundry's own localization (`languages` in `module.json`) |
| Compendium content (names, moves, playbooks, journals, NPCs) | `translations/<code>/pasion-de-las-pasiones.<pack>.json` | [Babele](https://foundryvtt.com/packages/babele), chosen by each user's Foundry language setting |

Anything that is missing from a translation falls back to English, so a partial translation is safe
to ship.

## Add a language

```sh
npm install                 # once
npm run lang:new -- es      # any language code, e.g. es, de, pt-BR
```

This creates `lang/es.json` and `translations/es/*.json`, registers the language in `module.json`,
and fills every string in English. Then translate the values in those files:

- `lang/es.json`: keep the keys, translate the values. This includes the compendium titles
  (`PASION.packs.*`) and the character-sheet labels (`PASION.cfg.*`).
- `translations/es/*.json`: for each entry in `entries`, translate `name`, `system.*` and (journals)
  `pages.<id>.name` / `pages.<id>.text`. `_name` is the English name for reference; leave it alone.
  Keep HTML tags and `@UUID[...]` links intact. `folders` renames the folders inside the pack.
- Delete a line to fall back to English for that string.

Re-run `npm run lang:new -- es` whenever the English text grows. It only adds what is new and never
overwrites your translations.

## Check your work

```sh
npm run lang:check          # all languages (or: npm run lang:check -- es)
```

Errors (non-zero exit) mean a translation points at something that no longer exists in English.
Warnings show strings that still fall back to English.

## Changing the English text

Edit the source JSON in `src/packs/<pack>/` (or `scripts/sheet-config.js` for sheet labels), then:

```sh
npm run build               # regenerate lang/en.json, rebuild packs/, validate translations
```

`src/packs/` is the source of truth; `packs/` is the compiled LevelDB that Foundry reads. To pull
edits made inside Foundry back into `src/`, use `npm run unpack`.

## Players' side

Players only need to set their Foundry language (Configure Settings → Core → Language) and install
the recommended Babele module (and its libWrapper dependency) on the world. English needs neither.
