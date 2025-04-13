import WebMidi from 'webmidi';

class MIDIService {
  constructor() {
    this.inputs = [];
    this.outputs = [];
    this.selectedInput = null;
    this.selectedOutput = null;
    this.listeners = new Set();
  }

  async initialize() {
    try {
      await WebMidi.enable();
      this.updatePorts();
      
      // Listen for port changes
      WebMidi.addListener('portsChanged', () => this.updatePorts());
      
      return true;
    } catch (err) {
      console.error('WebMidi could not be enabled:', err);
      return false;
    }
  }

  updatePorts() {
    this.inputs = WebMidi.inputs;
    this.outputs = WebMidi.outputs;
    
    // Notify listeners of port changes
    this.notifyListeners('portsChanged', {
      inputs: this.inputs.map(input => input.name),
      outputs: this.outputs.map(output => output.name)
    });
  }

  selectInput(portName) {
    if (this.selectedInput) {
      this.selectedInput.removeListener('noteon');
      this.selectedInput.removeListener('noteoff');
    }

    this.selectedInput = WebMidi.getInputByName(portName);
    
    if (this.selectedInput) {
      this.selectedInput.addListener('noteon', (e) => {
        this.notifyListeners('noteon', {
          note: e.note.number,
          velocity: e.velocity,
          channel: e.channel
        });
      });

      this.selectedInput.addListener('noteoff', (e) => {
        this.notifyListeners('noteoff', {
          note: e.note.number,
          channel: e.channel
        });
      });
    }
  }

  selectOutput(portName) {
    this.selectedOutput = WebMidi.getOutputByName(portName);
  }

  addListener(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notifyListeners(event, data) {
    this.listeners.forEach(listener => listener(event, data));
  }

  sendNoteOn(note, velocity = 127, channel = 1) {
    if (this.selectedOutput) {
      this.selectedOutput.playNote(note, channel, { velocity });
    }
  }

  sendNoteOff(note, channel = 1) {
    if (this.selectedOutput) {
      this.selectedOutput.stopNote(note, channel);
    }
  }
}

export const midiService = new MIDIService(); 