import fs from "fs/promises";
import path from "path";
import * as midiManager from "midi-file";

import { saveFile, mkdirs, totalRunningTime } from "./lib/utils";
import { cleanTracks } from "./lib/clean";

/*
  const input = await fs.readFile("in.mid");
  const parsed = midiManager.parseMidi(input);
  const output = midiManager.writeMidi(parsed);
  const outputBuffer = Buffer.from(output);
  await fs.writeFile("out.mid", outputBuffer);
*/

async function main() {
  await mkdirs(["./temp"]);
  const dataDir = "./data";
  const files = await fs.readdir(dataDir);

  for (const file of files) {
    if (file === ".DS_Store") continue;
    const inpath = path.join(dataDir, file);
    const input = await fs.readFile(inpath);
    const parsed = midiManager.parseMidi(input);

    const header = parsed.header;
    const tracks = cleanTracks(parsed.tracks);

    const totalLength = totalRunningTime(parsed);

    const newHeader = {
      format: header.format,
      numTracks: tracks.length,
      ticksPerBeat: header.ticksPerBeat,
    };

    console.log(file, totalLength);

    await saveFile(file, newHeader, tracks);
  }
}

main().catch((error) => console.log(error));
