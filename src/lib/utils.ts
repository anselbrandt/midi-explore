import fs from "fs/promises";
import path from "path";
import * as midiManager from "midi-file";

import { instruments } from "./instruments";
import { controllers } from "./controllers";

export const mkdirs = async (dirs: string[]) => {
  for (const dir of dirs) {
    try {
      await fs.mkdir(dir, { recursive: true });
      console.log("creating ", dir);
    } catch (error: any) {
      if (error.code === "EEXIST") console.log(`${dir} already exists`);
      if (error.code !== "EEXIST") console.log(error);
    }
  }
};

export const getInstrument = (num: number) => {
  return instruments[num];
};

export const getController = (num: number) => {
  return controllers[num];
};

interface Header {
  format: 0 | 1 | 2;
  numTracks: number;
  ticksPerBeat: number | undefined;
}

export const saveFile = async (
  file: string,
  header: Header,
  tracks: midiManager.MidiEvent[][]
) => {
  const midipath = path.join("./temp", file);
  const jsonpath = path.join("./temp", file.replace(".mid", ".json"));
  const output = midiManager.writeMidi({
    header,
    tracks,
  });
  const outputBuffer = Buffer.from(output);
  await fs.writeFile(midipath, outputBuffer);
  await fs.writeFile(
    jsonpath,
    JSON.stringify({
      header,
      tracks,
    })
  );
};

export const jsonToMidi = async (
  file: string,
  header: Header,
  tracks: midiManager.MidiEvent[][]
) => {
  const midipath = path.join("./temp", file.replace(".json", ".mid"));
  const output = midiManager.writeMidi({
    header,
    tracks,
  });
  const outputBuffer = Buffer.from(output);
  await fs.writeFile(midipath, outputBuffer);
};

export const tracksWithAbsTime = (
  tracks: midiManager.MidiEvent[][]
): MidiEventWithAbsTime[][] => tracks.map((track) => withAbsTime(track));

export const withAbsTime = (
  track: midiManager.MidiEvent[]
): MidiEventWithAbsTime[] => {
  let time = 0;
  return track.map((event) => {
    time = time + event.deltaTime;
    return { ...event, absTime: time };
  });
};

type MidiEventWithAbsTime = midiManager.MidiEvent & {
  absTime: number;
};

export const tracksToRelTime = (
  tracks: MidiEventWithAbsTime[][]
): midiManager.MidiEvent[][] => tracks.map((track) => toRelTime(track));

export const toRelTime = (
  track: MidiEventWithAbsTime[]
): midiManager.MidiEvent[] => {
  let prev = 0;
  return track.map((event) => {
    const { absTime, ...rest } = event;
    const relTime = absTime - prev;
    prev = absTime;
    return {
      ...rest,
      deltaTime: relTime,
    };
  });
};

export const totalRunningMs = (midi: midiManager.MidiData) => {
  const header = midi.header;
  const tracks = midi.tracks;

  const absTimeMerged = tracksWithAbsTime(tracks)
    .flat()
    .sort((a, b) => a.absTime - b.absTime);

  const relTimeMerged = toRelTime(absTimeMerged);

  const ticksPerBeat = header.ticksPerBeat;

  let microsecondsPerBeat = 0;
  let totalMs = 0;

  let numerator = 4;
  let beatCount = 0;

  for (const event of relTimeMerged) {
    if (event.type === "setTempo")
      microsecondsPerBeat = event.microsecondsPerBeat;
    if (event.type === "timeSignature") numerator = event.numerator;
    const ticks = event.deltaTime;
    const beats = ticks / ticksPerBeat!;
    beatCount = beatCount + beats;
    const elapsedMs = microsecondsPerBeat * beats;
    totalMs = totalMs + elapsedMs;
  }

  const roundedBeatCount = Math.ceil(beatCount / numerator) * numerator;
  const beatPadding = roundedBeatCount - beatCount;
  const msPadding = microsecondsPerBeat * beatPadding;

  return totalMs + msPadding;
};

export const msToTimecode = (ms: number) => {
  const fps = 30;
  let frames = (((ms / 1000000) * fps) % fps).toFixed(2);
  let seconds = Math.floor((ms / 1000000) % 60);
  let minutes = Math.floor((ms / (1000000 * 60)) % 60);
  let hours = Math.floor((ms / (1000000 * 60 * 60)) % 24);

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`;
};

export const pad = (num: number | string) => (+num < 10 ? `0${num}` : num);
