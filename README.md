# MIDI Explore

Exploring MIDI dataset features with [`midi-file`](https://github.com/carter-thaxton/midi-file)

BPM = 60,000,000 / microsecondsperbeat

https://stackoverflow.com/questions/34166367/how-to-correctly-convert-midi-ticks-to-milliseconds/34174936#34174936

https://music.stackexchange.com/questions/99362/time-in-midi-files

https://majicdesigns.github.io/MD_MIDIFile/page_timing.html#:~:text=Sequencing%20Time&text=If%20the%20MIDI%20time%20division,from%20the%20correctly%20synchronized%20time.

http://midi.teragonaudio.com/tech/midifile/ppqn.htm

```
header: {
    "ticksPerBeat": 120
    }
```

`ticksPerBeat`: ticks per quarter note

```
  {
    "deltaTime": 0,
    "meta": true,
    "type": "setTempo",
    "microsecondsPerBeat": 1000000
  },
  {
    "deltaTime": 0,
    "meta": true,
    "type": "timeSignature",
    "numerator": 4,
    "denominator": 4,
    "metronome": 24,
    "thirtyseconds": 8
  }
```

`microsecondsPerBeat`: microseconds per quarter note

`metronome`: MIDI clock ticks per click

Assuming 24 MIDI clocks per quarter note, for a value of 24, the metronome will click every quarter notes. For a value of 48, the metronome will click every two quarter notes,

`thirtyseconds`: 32nd notes per beat

This value is usually 8 as there is usually one quarter note per beat and one quarter note contains eight 32nd notes

`BPM` = 60,000,000 / microsecondsperbeat
