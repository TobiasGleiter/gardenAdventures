import * as me from 'melonjs';
import game from '../../game';
import UIContainer from '../UI/HUD';



class PlayScreen extends me.Stage {
  private HUD: any;
  /**
   *  action to perform on state change
   */
  onResetEvent() {
    const player = me.pool.pull(
        'mainPlayer',
        100, 100
    ) as me.Renderable;


    // load a level
    me.level.load('Lvl1-1');

    // reset the score
    game.data.score = 0;
    game.data.health = 5;

    this.HUD = new UIContainer();
    me.game.world.addChild(this.HUD);
    me.game.world.addChild(player, 20);
  }
  // Run on game resources loaded.
  onDestroyEvent(): void {
    me.game.world.removeChild(this.HUD);
  }
}

export default PlayScreen;
