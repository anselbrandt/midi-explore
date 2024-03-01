import fs from "fs/promises";
import path from "path";
import * as midiManager from "midi-file";

import { saveFile, mkdirs, totalRunningTime, msToTimecode } from "./lib/utils";

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
  // const files = await fs.readdir(dataDir);
  const files = ["A_Nightingale_Sang.mid"];

  for (const file of files) {
    if (file === ".DS_Store") continue;
    const inpath = path.join(dataDir, file);
    const input = await fs.readFile(inpath);
    const parsed = midiManager.parseMidi(input);

    const header = parsed.header;
    const tracks = parsed.tracks.map((track) =>
      track.filter((event) => !(event.type === "smpteOffset"))
    );

    const totalLength = totalRunningTime(parsed);

    console.log(file, totalLength);

    const newHeader = {
      format: header.format,
      numTracks: tracks.length,
      ticksPerBeat: header.ticksPerBeat,
    };

    await saveFile(file, newHeader, tracks);
  }
}

main().catch((error) => console.log(error));
