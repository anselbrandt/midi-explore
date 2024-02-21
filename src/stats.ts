import fs from "fs/promises";
import path from "path";
import * as midiManager from "midi-file";
import { isMetaTrack, programChanges, trackChannels } from "./lib/clean";
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
      const length = track.length;
      const channels = trackChannels(track);
      const changes = programChanges(track).map((event) => ({
        channel: event.channel,
        programNumber: event.programNumber,
      }));

      if (channels.length || changes.length)
        console.log(file, channels, changes);

      tracksData.push({
        i,
        isMeta,
        length,
        channels,
        changes,
      });
    }
    filesData.push({
      file,
      trackCount: tracksData.length,
      tracks: tracksData,
    });
  }
  await fs.writeFile("./out/fileStats.json", JSON.stringify(filesData));
}

main().catch((error) => console.log(error));
