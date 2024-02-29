import fs from "fs/promises";
import path from "path";
import * as midiManager from "midi-file";

import { mkdirs } from "./lib/utils";

/*
  const input = await fs.readFile("in.mid");
  const parsed = midiManager.parseMidi(input);
  const output = midiManager.writeMidi(parsed);
  const outputBuffer = Buffer.from(output);
  await fs.writeFile("out.mid", outputBuffer);
*/

async function main() {
  await mkdirs(["./temp"]);
  const dataDir = "./out";
  const files = await fs.readdir(dataDir);

  for (const file of files) {
    if (file === ".DS_Store") continue;
    if (file.includes(".json")) continue;
    const inpath = path.join(dataDir, file);
    const input = await fs.readFile(inpath);
    const parsed = midiManager.parseMidi(input);

    const outpath = path.join("./temp", file.replace(".mid", ".json"));
    await fs.writeFile(outpath, JSON.stringify(parsed));
  }
}

main().catch((error) => console.log(error));
