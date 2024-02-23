import fs from "fs/promises";
import path from "path";
import * as midiManager from "midi-file";
import {
  isMetaTrack,
  programChanges,
  trackChannels,
  isMuxed,
} from "./lib/clean";
import { mkdirs } from "./lib/utils";

/*
  const input = await fs.readFile("in.mid");
  const parsed = midiManager.parseMidi(input);
  const output = midiManager.writeMidi(parsed);
  const outputBuffer = Buffer.from(output);
  await fs.writeFile("out.mid", outputBuffer);
*/

async function main() {
  await mkdirs(["./out"]);
  const dataDir = "./temp";
  const files = await fs.readdir(dataDir);

  const filesData = [];

  const set = new Set();

  for (const file of files) {
    if (file === ".DS_Store") continue;
    if (file.includes(".json")) continue;
    const inpath = path.join(dataDir, file);
    const input = await fs.readFile(inpath);
    const parsed = midiManager.parseMidi(input);
    const tracks = parsed.tracks;
    const tracksData = [];
    for (const i in tracks) {
      const track = tracks[i];
      const isMeta = isMetaTrack(track);
      const muxed = isMuxed(track);
      const length = track.length;
      const channels = trackChannels(track);
      const changes = programChanges(track).map((event) => ({
        channel: event.channel,
        programNumber: event.programNumber,
      }));

      for (const change of changes) {
        set.add(change.programNumber);
      }

      if (channels.length || changes.length)
        console.log(file, channels, changes);

      tracksData.push({
        i,
        isMeta,
        isMuxed: muxed,
        length,
        channels,
        changes,
      });
    }
    filesData.push({
      file,
      format: parsed.header.format,
      trackCount: tracksData.length,
      tracks: tracksData,
    });
  }
  await fs.writeFile("./out/fileStats.json", JSON.stringify(filesData));
  console.log([...set]);
}

main().catch((error) => console.log(error));
