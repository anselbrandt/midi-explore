import fs from "fs/promises";
import path from "path";
import * as midiManager from "midi-file";

import { saveFile, mkdirs, overwriteFixes } from "./lib/utils";
import { cleanTracks, programChanges } from "./lib/clean";

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
  // const files = ["Blackbird(GM).mid"];

  for (const file of files) {
    if (file === ".DS_Store") continue;
    const inpath = path.join(dataDir, file);
    const input = await fs.readFile(inpath);
    const parsed = midiManager.parseMidi(input);

    const header = parsed.header;
    const tracks = cleanTracks(parsed.tracks);

    const newHeader = {
      format: header.format,
      numTracks: tracks.length,
      ticksPerBeat: header.ticksPerBeat,
    };

    for (const track of tracks) {
      const changes = programChanges(track);
      if (changes.length) {
        if (changes.some((change) => change.programNumber !== 0)) {
          console.log(file, changes);
          await saveFile(file, newHeader, tracks);
        }
      }
    }
  }

  // await overwriteFixes();
}

main().catch((error) => console.log(error));
