interface Instrument {
  desc: string;
  category: string;
}
export const instruments: Record<number, Instrument> = {
  0: { desc: "Acoustic Grand Piano or Piano 1", category: "Piano" },
  1: { desc: "Bright Acoustic Piano or Piano 2", category: "Piano" },
  2: {
    desc: "Electric Grand Piano or Piano 3 (usually modeled after Yamaha CP-70)",
    category: "Piano",
  },
  3: { desc: "Honky-tonk Piano", category: "Piano" },
  4: {
    desc: "Electric Piano 1 (usually a Rhodes or Wurlitzer piano)",
    category: "Piano",
  },
  5: {
    desc: "Electric Piano 2 (usually an FM piano patch, often chorused)",
    category: "Piano",
  },
  6: {
    desc: "Harpsichord (often with a fixed velocity level)",
    category: "Piano",
  },
  7: { desc: "Clavinet", category: "Piano" },
  8: { desc: "Celesta", category: "Chromatic Percussion" },
  9: { desc: "Glockenspiel", category: "Chromatic Percussion" },
  10: { desc: "Music Box", category: "Chromatic Percussion" },
  11: { desc: "Vibraphone", category: "Chromatic Percussion" },
  12: { desc: "Marimba", category: "Chromatic Percussion" },
  13: { desc: "Xylophone", category: "Chromatic Percussion" },
  14: { desc: "Tubular Bells", category: "Chromatic Percussion" },
  15: { desc: "Dulcimer or Santoor", category: "Chromatic Percussion" },
  16: { desc: "Drawbar Organ or Organ 1", category: "Organ" },
  17: { desc: "Percussive Organ or Organ 2", category: "Organ" },
  18: { desc: "Rock Organ or Organ 3", category: "Organ" },
  19: { desc: "Church Organ", category: "Organ" },
  20: { desc: "Reed Organ", category: "Organ" },
  21: { desc: "Accordion", category: "Organ" },
  22: { desc: "Harmonica", category: "Organ" },
  23: { desc: "Bandoneon or Tango Accordion", category: "Organ" },
  24: { desc: "Acoustic Guitar (nylon)", category: "Guitar" },
  25: { desc: "Acoustic Guitar (steel)", category: "Guitar" },
  26: { desc: "Electric Guitar (jazz)", category: "Guitar" },
  27: {
    desc: "Electric Guitar (clean, often chorused, resembling a Stratocaster ran through a Roland Jazz Chorus amplifier)",
    category: "Guitar",
  },
  28: { desc: "Electric Guitar (muted)", category: "Guitar" },
  29: { desc: "Electric Guitar (overdrive)", category: "Guitar" },
  30: { desc: "Electric Guitar (distortion)", category: "Guitar" },
  31: { desc: "Electric Guitar (harmonics)", category: "Guitar" },
  32: { desc: "Acoustic Bass", category: "Bass" },
  33: { desc: "Electric Bass (finger)", category: "Bass" },
  34: { desc: "Electric Bass (picked)", category: "Bass" },
  35: { desc: "Electric Bass (fretless)", category: "Bass" },
  36: { desc: "Slap Bass 1", category: "Bass" },
  37: { desc: "Slap Bass 2", category: "Bass" },
  38: { desc: "Synth Bass 1", category: "Bass" },
  39: { desc: "Synth Bass 2", category: "Bass" },
  40: { desc: "Violin", category: "Strings" },
  41: { desc: "Viola", category: "Strings" },
  42: { desc: "Cello", category: "Strings" },
  43: { desc: "Contrabass", category: "Strings" },
  44: { desc: "Tremolo Strings", category: "Strings" },
  45: { desc: "Pizzicato Strings", category: "Strings" },
  46: { desc: "Orchestral Harp", category: "Strings" },
  47: { desc: "Timpani", category: "Strings" },
  48: {
    desc: "String Ensemble 1 (often in marcato)",
    category: "Ensemble",
  },
  49: {
    desc: "String Ensemble 2 (slower attack than String Ensemble 1)",
    category: "Ensemble",
  },
  50: { desc: "Synth Strings 1", category: "Ensemble" },
  51: { desc: "Synth Strings 2", category: "Ensemble" },
  52: { desc: "Choir Aahs", category: "Ensemble" },
  53: { desc: "Voice Oohs (or Doos)", category: "Ensemble" },
  54: { desc: "Synth Voice or Synth Choir", category: "Ensemble" },
  55: { desc: "Orchestra Hit", category: "Ensemble" },
  56: { desc: "Trumpet", category: "Brass" },
  57: { desc: "Trombone", category: "Brass" },
  58: { desc: "Tuba", category: "Brass" },
  59: { desc: "Muted Trumpet", category: "Brass" },
  60: { desc: "French Horn", category: "Brass" },
  61: { desc: "Brass Section", category: "Brass" },
  62: { desc: "Synth Brass 1", category: "Brass" },
  63: { desc: "Synth Brass 2", category: "Brass" },
  64: { desc: "Soprano Sax", category: "Reed" },
  65: { desc: "Alto Sax", category: "Reed" },
  66: { desc: "Tenor Sax", category: "Reed" },
  67: { desc: "Baritone Sax", category: "Reed" },
  68: { desc: "Oboe", category: "Reed" },
  69: { desc: "English Horn", category: "Reed" },
  70: { desc: "Bassoon", category: "Reed" },
  71: { desc: "Clarinet", category: "Reed" },
  72: { desc: "Piccolo", category: "Pipe" },
  73: { desc: "Flute", category: "Pipe" },
  74: { desc: "Recorder", category: "Pipe" },
  75: { desc: "Pan Flute", category: "Pipe" },
  76: { desc: "Blown bottle", category: "Pipe" },
  77: { desc: "Shakuhachi", category: "Pipe" },
  78: { desc: "Whistle", category: "Pipe" },
  79: { desc: "Ocarina", category: "Pipe" },
  80: { desc: "Lead 1 (square, often chorused)", category: "Synth Lead" },
  81: {
    desc: "Lead 2 (sawtooth or saw, often chorused)",
    category: "Synth Lead",
  },
  82: {
    desc: "Lead 3 (calliope, usually resembling a woodwind)",
    category: "Synth Lead",
  },
  83: { desc: "Lead 4 (chiff)", category: "Synth Lead" },
  84: {
    desc: "Lead 5 (charang, a guitar-like lead)",
    category: "Synth Lead",
  },
  85: {
    desc: "Lead 6 (voice, derived from 'synth voice' with faster attack)",
    category: "Synth Lead",
  },
  86: { desc: "Lead 7 (fifths)", category: "Synth Lead" },
  87: {
    desc: "Lead 8 (bass and lead or solo lead)",
    category: "Synth Lead",
  },
  88: {
    desc: "Pad 1 (new age, pad stacked with a bell, often derived from 'Fantasia' patch from Roland D-50)",
    category: "Synth Pad",
  },
  89: {
    desc: "Pad 2 (warm, a mellower pad with slow attack)",
    category: "Synth Pad",
  },
  90: {
    desc: "Pad 3 (polysynth or poly, a saw-like percussive pad resembling an early 1980s polyphonic synthesizer)",
    category: "Synth Pad",
  },
  91: {
    desc: "Pad 4 (choir, identical to 'synth voice' with longer decay)",
    category: "Synth Pad",
  },
  92: {
    desc: "Pad 5 (bowed glass or bowed, a sound resembling a glass harmonica)",
    category: "Synth Pad",
  },
  93: {
    desc: "Pad 6 (metallic, often created from a piano or guitar sample played with the attack removed)",
    category: "Synth Pad",
  },
  94: {
    desc: "Pad 7 (halo, choir-like pad, often with a filter effect)",
    category: "Synth Pad",
  },
  95: {
    desc: "Pad 8 (sweep, pad with a pronounced 'wah' filter effect)",
    category: "Synth Pad",
  },
  96: {
    desc: "FX 1 (rain, a bright pluck with echoing pulses that decreases in pitch)",
    category: "Synth Effects",
  },
  97: {
    desc: "FX 2 (soundtrack, a bright perfect fifth pad)",
    category: "Synth Effects",
  },
  98: {
    desc: "FX (crystal, a synthesized bell sound)",
    category: "Synth Effects",
  },
  99: {
    desc: "FX 4 (atmosphere, usually a classical guitar-like sound)",
    category: "Synth Effects",
  },
  100: {
    desc: "FX 5 (brightness, bright pad stacked with choir or bell)",
    category: "Synth Effects",
  },
  101: {
    desc: "FX 6 (goblins, a slow-attack pad with chirping or murmuring sounds)",
    category: "Synth Effects",
  },
  102: {
    desc: "FX 7 (echoes or echo drops, similar to 'rain')",
    category: "Synth Effects",
  },
  103: {
    desc: "FX 8 (sci-fi or star theme, usually an electric guitar-like pad)",
    category: "Synth Effects",
  },
  104: { desc: "Sitar", category: "Ethnic" },
  105: { desc: "Banjo", category: "Ethnic" },
  106: { desc: "Shamisen", category: "Ethnic" },
  107: { desc: "Koto", category: "Ethnic" },
  108: { desc: "Kalimba", category: "Ethnic" },
  109: { desc: "Bag pipe", category: "Ethnic" },
  110: { desc: "Fiddle", category: "Ethnic" },
  111: { desc: "Shanai", category: "Ethnic" },
  112: { desc: "Tinkle Bell", category: "Percussive" },
  113: { desc: "Agogô or cowbell", category: "Percussive" },
  114: { desc: "Steel Drums", category: "Percussive" },
  115: { desc: "Woodblock", category: "Percussive" },
  116: { desc: "Taiko Drum or Surdo", category: "Percussive" },
  117: { desc: "Melodic Tom", category: "Percussive" },
  118: {
    desc: "Synth Drum (a synthesized tom-tom derived from Simmons electronic drum)",
    category: "Percussive",
  },
  119: { desc: "Reverse Cymbal", category: "Percussive" },
  120: { desc: "Guitar Fret Noise", category: "Sound Effects" },
  121: { desc: "Breath Noise", category: "Sound Effects" },
  122: { desc: "Seashore", category: "Sound Effects" },
  123: { desc: "Bird Tweet", category: "Sound Effects" },
  124: { desc: "Telephone Ring", category: "Sound Effects" },
  125: { desc: "Helicopter", category: "Sound Effects" },
  126: { desc: "Applause", category: "Sound Effects" },
  127: { desc: "Gunshot", category: "Sound Effects" },
};