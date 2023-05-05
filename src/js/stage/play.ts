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
    me.level.load('Lvl1-2');

    // reset the score
    game.data.score = 0;
    game.data.health = 1;

    this.HUD = new UIContainer();
    me.game.world.addChild(this.HUD);


    //Test
     const backgroundImage = new me.Sprite(
          0,0,
          {
            image: me.loader.getImage('Background_2'),
          }
        );

        // scale to fit with the viewport size
        backgroundImage.scale(
          me.game.viewport.width,
          me.game.viewport.height
        );

        // add to the world container
        me.game.world.addChild(backgroundImage, -3);
  }
  // Run on game resources loaded.

  onDestroyEvent(): void {
    me.game.world.removeChild(this.HUD);
  }


}

export default PlayScreen;
