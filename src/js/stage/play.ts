import * as me from 'melonjs';
import game from '../../game';
import UIContainer from '../UI/HUD';

class PlayScreen extends me.Stage {
  private HUD: any;
  /**
   *  action to perform on state change
   */
  onResetEvent() {
    // load a level
    me.level.load('enemies');

    // reset the score
    game.data.score = 0;
    game.data.health = 5;

    this.HUD = new UIContainer();
    me.game.world.addChild(this.HUD);
  }
  // Run on game resources loaded.

  onDestroyEvent(): void {
    me.game.world.removeChild(this.HUD);
  }
}

export default PlayScreen;
