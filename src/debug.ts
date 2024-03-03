import fs from "fs/promises";
import path from "path";
import * as midiManager from "midi-file";

import { mkdirs, saveFile } from "./lib/utils";
import { cleanTracks } from "./lib/clean";

/*
  const input = await fs.readFile("in.mid");
  const parsed = midiManager.parseMidi(input);
  const output = midiManager.writeMidi(parsed);
  const outputBuffer = Buffer.from(output);
  await fs.writeFile("out.mid", outputBuffer);
*/

async function main() {
  const fixesDir = "./manualfixes";
  const manualFixes = (await fs.readdir(fixesDir)).filter((file) =>
    file.includes(".mid")
  );
  await mkdirs(["./temp"]);
  const dataDir = "./data";
  const files = await fs.readdir(dataDir);
  // const files = ["Blackbird(GM).mid"];

  for (const file of files) {
    if (file === ".DS_Store") continue;
    const inpath = manualFixes.includes(file)
      ? path.join(fixesDir, file)
      : path.join(dataDir, file);
    const input = await fs.readFile(inpath);
    const parsed = midiManager.parseMidi(input);

    const header = parsed.header;

    const tracks = cleanTracks(parsed.tracks);

    const newHeader = {
      format: header.format,
      numTracks: tracks.length,
      ticksPerBeat: header.ticksPerBeat,
    };

    await saveFile(file, newHeader, tracks);
  }
}

main().catch((error) => console.log(error));
