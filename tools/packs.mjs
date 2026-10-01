// npm run pack    : src/packs/<name>/*.json  -> packs/<name> (LevelDB)
// npm run unpack  : packs/<name> (LevelDB)   -> src/packs/<name>/*.json
import fs from "node:fs";
import { compilePack, extractPack } from "@foundryvtt/foundryvtt-cli";
import { packs, MODULE_ID } from "./lib.mjs";

const mode = process.argv[2];
if (!["pack", "unpack"].includes(mode)) {
  console.error("usage: packs.mjs pack|unpack");
  process.exit(1);
}

for (const p of packs()) {
  if (mode === "pack") {
    fs.rmSync(p.out, { recursive: true, force: true });
    await compilePack(p.src, p.out, { log: false });
    console.log(`packed   ${p.name}`);
  } else {
    fs.rmSync(p.src, { recursive: true, force: true });
    await extractPack(p.out, p.src, {
      log: false,
      documentType: p.type,
      packName: p.name,
      moduleId: MODULE_ID,
    });
    console.log(`unpacked ${p.name}`);
  }
}
