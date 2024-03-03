import fs from "fs/promises";
import path from "path";

import { jsonToMidi, mkdirs, totalRunningTime } from "./lib/utils";

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
    if (file.includes(".mid")) continue;
    const inpath = path.join(dataDir, file);
    const input = await fs.readFile(inpath, "utf-8");
    const parsed = JSON.parse(input);

    const header = parsed.header;
    const tracks = parsed.tracks;

    const runningTime = totalRunningTime(parsed);
    console.log(file, runningTime);

    await jsonToMidi(file, header, tracks);
  }
}

main().catch((error) => console.log(error));
