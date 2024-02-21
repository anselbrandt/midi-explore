import fs from "fs/promises";
import path from "path";
import * as midiManager from "midi-file";

import { cleanMidi } from "./lib/clean";
import { saveFile, mkdirs } from "./lib/utils";

/*
  const input = await fs.readFile("in.mid");
  const parsed = midiManager.parseMidi(input);
  const output = midiManager.writeMidi(parsed);
  const outputBuffer = Buffer.from(output);
  await fs.writeFile("out.mid", outputBuffer);
*/

async function main() {
  await mkdirs(["./temp"]);
  const file = "A_Nightingale_Sang.mid";
  const inpath = path.join("./data", file);
  const input = await fs.readFile(inpath);
  const parsed = midiManager.parseMidi(input);
  const clean = cleanMidi(parsed);

  const header = parsed.header;
  const tracks = clean.tracks;

  const newHeader = {
    format: header.format,
    numTracks: tracks.length,
    ticksPerBeat: header.ticksPerBeat,
  };

  await saveFile(file, newHeader, tracks);
}

main().catch((error) => console.log(error));
