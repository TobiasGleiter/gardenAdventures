import * as me from 'melonjs';

class PlayScreen extends me.Stage {
  /**
   *  action to perform on state change
   */
  onResetEvent() {
    // load a level
    me.level.load('Lvl1-2');
  }
  // Run on game resources loaded.
}

export default PlayScreen;
