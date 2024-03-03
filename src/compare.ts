import fs from "fs/promises";
import path from "path";
import * as midiManager from "midi-file";

import { mkdirs, totalRunningTime } from "./lib/utils";

/*
  const input = await fs.readFile("in.mid");
  const parsed = midiManager.parseMidi(input);
  const output = midiManager.writeMidi(parsed);
  const outputBuffer = Buffer.from(output);
  await fs.writeFile("out.mid", outputBuffer);
*/

async function main() {
  await mkdirs(["./out"]);
  const originalDir = "./data";
  const dataDir = "./temp";
  const files = await fs.readdir(dataDir);

  for (const file of files) {
    if (file === ".DS_Store") continue;
    if (file.includes(".json")) continue;
    const inpath = path.join(dataDir, file);
    const originalPath = path.join(originalDir, file);
    const input = await fs.readFile(inpath);
    const originalInput = await fs.readFile(originalPath);
    const parsed = midiManager.parseMidi(input);
    const originalParsed = midiManager.parseMidi(originalInput);

    const original = totalRunningTime(originalParsed);
    const clean = totalRunningTime(parsed);
    if (JSON.stringify(original) !== JSON.stringify(clean))
      console.log({ file, original, "clean ": clean });
  }
}

main().catch((error) => console.log(error));
