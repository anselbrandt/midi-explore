// http://midi.teragonaudio.com/tech/midispec/bank.htm
interface Controller {
  url: string;
  name: string;
}

export const controllers: Record<number, Controller> = {
  0: { url: "bank.htm", name: "Bank Select (coarse)" },
  1: { url: "mod.htm", name: "Modulation Wheel (coarse)" },
  2: { url: "wind.htm", name: "Breath controller (coarse)" },
  4: { url: "foot.htm", name: "Foot Pedal (coarse)" },
  5: { url: "ptime.htm", name: "Portamento Time (coarse)" },
  6: { url: "dslider.htm", name: "Data Entry (coarse)" },
  7: { url: "vol.htm", name: "Volume (coarse)" },
  8: { url: "balance.htm", name: "Balance (coarse)" },
  10: { url: "pan.htm", name: "Pan position (coarse)" },
  11: { url: "exp.htm", name: "Expression (coarse)" },
  12: { url: "eff1.htm", name: "Effect Control 1 (coarse)" },
  13: { url: "eff2.htm", name: "Effect Control 2 (coarse)" },
  16: { url: "gens.htm", name: "General Purpose Slider 1" },
  17: { url: "gens.htm", name: "General Purpose Slider 2" },
  18: { url: "gens.htm", name: "General Purpose Slider 3" },
  19: { url: "gens.htm", name: "General Purpose Slider 4" },
  32: { url: "bank.htm", name: "Bank Select (fine)" },
  33: { url: "mod.htm", name: "Modulation Wheel (fine)" },
  34: { url: "wind.htm", name: "Breath controller (fine)" },
  36: { url: "foot.htm", name: "Foot Pedal (fine)" },
  37: { url: "ptime.htm", name: "Portamento Time (fine)" },
  38: { url: "dslider.htm", name: "Data Entry (fine)" },
  39: { url: "vol.htm", name: "Volume (fine)" },
  40: { url: "balance.htm", name: "Balance (fine)" },
  42: { url: "pan.htm", name: "Pan position (fine)" },
  43: { url: "exp.htm", name: "Expression (fine)" },
  44: { url: "eff1.htm", name: "Effect Control 1 (fine)" },
  45: { url: "eff2.htm", name: "Effect Control 2 (fine)" },
  64: { url: "hold.htm", name: "Hold Pedal (on/off)" },
  65: { url: "port.htm", name: "Portamento (on/off)" },
  66: { url: "sus.htm", name: "Sustenuto Pedal (on/off)" },
  67: { url: "soft.htm", name: "Soft Pedal (on/off)" },
  68: { url: "leg.htm", name: "Legato Pedal (on/off)" },
  69: { url: "hold2.htm", name: "Hold 2 Pedal (on/off)" },
  70: { url: "sndvar.htm", name: "Sound Variation" },
  71: { url: "sndtim.htm", name: "Sound Timbre" },
  72: { url: "sndrel.htm", name: "Sound Release Time" },
  73: { url: "sndatt.htm", name: "Sound Attack Time" },
  74: { url: "sndbri.htm", name: "Sound Brightness" },
  75: { url: "sndctl.htm", name: "Sound Control 6" },
  76: { url: "sndctl.htm", name: "Sound Control 7" },
  77: { url: "sndctl.htm", name: "Sound Control 8" },
  78: { url: "sndctl.htm", name: "Sound Control 9" },
  79: { url: "sndctl.htm", name: "Sound Control 10" },
  80: { url: "genb.htm", name: "General Purpose Button 1 (on/off)" },
  81: { url: "genb.htm", name: "General Purpose Button 2 (on/off)" },
  82: { url: "genb.htm", name: "General Purpose Button 3 (on/off)" },
  83: { url: "genb.htm", name: "General Purpose Button 4 (on/off)" },
  91: { url: "eff.htm", name: "Effects Level" },
  92: { url: "trem.htm", name: "Tremulo Level" },
  93: { url: "cho.htm", name: "Chorus Level" },
  94: { url: "cel.htm", name: "Celeste Level" },
  95: { url: "pha.htm", name: "Phaser Level" },
  96: { url: "dinc.htm", name: "Data Button increment" },
  97: { url: "ddec.htm", name: "Data Button decrement" },
  98: { url: "nrpn.htm", name: "Non-registered Parameter (fine)" },
  99: { url: "nrpn.htm", name: "Non-registered Parameter (coarse)" },
  100: { url: "rpn.htm", name: "Registered Parameter (fine)" },
  101: { url: "rpn.htm", name: "Registered Parameter (coarse)" },
  120: { url: "sndoff.htm", name: "All Sound Off" },
  121: { url: "ctloff.htm", name: "All Controllers Off" },
  122: { url: "local.htm", name: "Local Keyboard (on/off)" },
  123: { url: "ntnoff.htm", name: "All Notes Off" },
  124: { url: "omoff.htm", name: "Omni Mode Off" },
  125: { url: "omon.htm", name: "Omni Mode On" },
  126: { url: "mono.htm", name: "Mono Operation" },
  127: { url: "poly.htm", name: "Poly Operation" },
};
