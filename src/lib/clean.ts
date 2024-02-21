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
    .map((track) =>
      track
        .filter(
          (event) =>
            event.type !== "sequencerSpecific" &&
            event.type !== "marker" &&
            event.type !== "portPrefix"
        )
        .filter((event) => !(event.channel === 9))
    )
    .filter((track) =>
      track.some(
        (event) => event.type === "noteOn" || event.type === "setTempo"
      )
    )
    .filter((track) => !isBassTrack(track))
    .filter((track) => {
      const channels = trackChannels(track);
      if (channels.length === 1 && channels[0] !== 0) return false;
      return true;
    });

export const isDrumTrack = (track: midiManager.MidiEvent[]) =>
  track
    .filter((event) => event.type === "noteOn")
    .every((event) => event.type === "noteOn" && event.channel === 9);

export const isBassTrack = (track: midiManager.MidiEvent[]) => {
  const changes = programChangesList(track) as number[];
  if ([32, 33, 34, 35, 36, 37, 38, 43].includes(changes[0])) return true;
  return false;
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

export const programChangesList = (track: midiManager.MidiEvent[]) =>
  programChanges(track).map(
    (event) => event.type === "programChange" && event.programNumber
  );

export const programChanges = (track: midiManager.MidiEvent[]) =>
  track.filter((event) => event.type === "programChange");

export const isMuxed = (track: midiManager.MidiEvent[]) =>
  trackChannels(track).length > 1;

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
