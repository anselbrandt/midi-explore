import * as midiManager from "midi-file";

// channels
// [0,8,7,3,1,9,15,2,5,4,6,10,11,12,13,14]

export const cleanMidi = (midi: midiManager.MidiData) => {
  const tracks = cleanTracks(midi.tracks);
  const header = {
    format: midi.header.format,
    numTracks: tracks.length,
    ticksPerBeat: midi.header.ticksPerBeat,
  };
  return { header, tracks };
};

export const cleanTracks = (tracks: midiManager.MidiEvent[][]) =>
  tracks
    .map((track) => cleanTrack(track))
    .filter((track) => isInstrumentOrMeta(track))
    .filter((track) => !isBassTrack(track))
    .filter((track) => isChannelZero(track));

export const cleanTrack = (track: midiManager.MidiEvent[]) => {
  const clean = track
    .filter(
      (event) =>
        event.type !== "sequencerSpecific" &&
        event.type !== "marker" &&
        event.type !== "portPrefix"
    )
    .filter((event) => !(event.channel === 9));

  return isMuxed(clean) ? demuxed(clean) : clean;
};

export const trackChannels = (track: midiManager.MidiEvent[]) => {
  const channels = track
    .map((event) => {
      if (event.channel === 0 || event.channel > 0) return event.channel;
      return null;
    })
    .filter((val) => val !== null);
  return [...new Set(channels)];
};

export const isMuxed = (track: midiManager.MidiEvent[]) =>
  trackChannels(track).length > 1;

export const demuxed = (track: midiManager.MidiEvent[]) => {
  if (!isMuxed(track)) return track;
  const changes = programChanges(track);

  if (
    changes.length === 0 ||
    (changes.length === 1 && changes[0].programNumber === 0) ||
    changes.every((event) => event.programNumber === 0) ||
    (changes.length === 1 && changes[0].programNumber === 4) ||
    (changes.length === 1 && changes[0].programNumber === 5) ||
    (changes.length === 1 && changes[0].programNumber === 11) ||
    (changes.length === 1 && changes[0].programNumber === 12) ||
    (changes.length === 1 && changes[0].programNumber === 24) ||
    (changes.length === 1 && changes[0].programNumber === 71) ||
    (changes.length === 1 && changes[0].programNumber === 75)
  )
    return remapped(track);

  return track;
};

export const remapped = (track: midiManager.MidiEvent[]) =>
  track.map((event) => {
    if (event.type && event.type === "programChange")
      return { ...event, channel: 0, programNumber: 0 };
    return event.channel === 0 || event.channel
      ? { ...event, channel: 0 }
      : event;
  });

export const eventsEntries = (track: midiManager.MidiEvent[]) => {
  const map = new Map();
  for (const event of track) {
    if (event.type === "programChange") continue;
    const channel =
      event.channel === 0 || event.channel ? event.channel : "meta";
    const exists = map.has(channel);
    if (exists) {
      const prev = map.get(channel);
      const payload = [...prev, event];
      map.set(channel, payload);
    } else {
      map.set(channel, [event]);
    }
  }
  return [...map];
};

export const programChanges = (track: midiManager.MidiEvent[]) =>
  track.filter((event) => event.type === "programChange");

export const programChangesList = (track: midiManager.MidiEvent[]) =>
  programChanges(track).map(
    (event) => event.type === "programChange" && event.programNumber
  );
export const changesMap = (track: midiManager.MidiEvent[]) => {
  const changes = programChanges(track);

  const map = new Map();

  for (const event of changes) {
    const channel =
      event.channel === 0 || event.channel > 0 ? event.channel : "meta";
    const exists = map.has(channel);
    if (exists) {
      const prev = map.get(channel);
      const payload = [...prev, event.programNumber];
      map.set(channel, payload);
    } else {
      map.set(channel, [event.programNumber]);
    }
  }

  return Object.fromEntries([...map]);
};

export const isMetaTrack = (track: midiManager.MidiEvent[]) =>
  track.every((event) =>
    [
      "copyrightNotice",
      "cuePoint",
      "endOfTrack",
      "keySignature",
      "lyrics",
      "marker",
      "portPrefix",
      "sequencerSpecific",
      "setTempo",
      "smpteOffset",
      "sysEx",
      "text",
      "timeSignature",
      "trackName",
    ].includes(event.type)
  );

export const isDrumTrack = (track: midiManager.MidiEvent[]) =>
  track
    .filter((event) => event.type === "noteOn")
    .every((event) => event.type === "noteOn" && event.channel === 9);

export const isBassTrack = (track: midiManager.MidiEvent[]) => {
  const changes = programChangesList(track) as number[];
  if ([32, 33, 34, 35, 36, 37, 38, 43].includes(changes[0])) return true;
  return false;
};

export const containsBass = (track: midiManager.MidiEvent[]) => {
  const changes = programChangesList(track) as number[];
  if (
    changes.some((change) => [32, 33, 34, 35, 36, 37, 38, 43].includes(change))
  )
    return false;
};

export const isInstrumentOrMeta = (track: midiManager.MidiEvent[]) =>
  track.some((event) => event?.type === "noteOn" || event?.type === "setTempo");

export const isChannelZero = (track: midiManager.MidiEvent[]) => {
  const channels = trackChannels(track);
  if (channels.length === 1 && channels[0] !== 0) return false;
  return true;
};
