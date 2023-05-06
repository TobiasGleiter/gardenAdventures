import * as me from 'melonjs';
import game from '../../game';
import network from '../../multiplayer/network';
import UIContainer from '../UI/HUD';
//const serverUrl = 'http://localhost:3000';

class PlayScreen extends me.Stage {
  private HUD: any;
  private name: any;

  constructor() {
    super();
    this.name = 'play';
  }

  /**
   *  action to perform on state change
   */
  update(dt: number): boolean {
    const pause = new me.BitmapText(
      me.game.viewport.width / 2,
      me.game.viewport.height / 2,
      {
        font: 'PressStart2P',
        text: 'Pause',
        textAlign: 'center',
        size: 0.8,
      }
    );
    pause.name = 'pausenname';

    if (me.input.isKeyPressed('pause')) {
      if (me.game.world.getChildByName('pausenname').length == 0) {
        me.game.world.addChild(pause);
      }

      me.timer.setTimeout(() => {
        me.state.pause();
      }, 1);
    } else if (me.state.isPaused() && me.input.isKeyPressed('resume')) {
      const pauseChild = me.game.world.getChildByName('pausenname')[0];
      if (pauseChild && pauseChild.inViewport) {
        me.game.world.removeChild(pauseChild);
      }
      me.state.resume();
    }
    return super.update(dt);
  }

  onResetEvent() {
    //if(me.state.isCurrent() === )
    //network.init(serverUrl);
    // load a level
    me.level.load('Lvl1-1');

    // reset the score
    game.data.score = 0;
    game.data.health = 5;

    this.HUD = new UIContainer();
    me.game.world.addChild(this.HUD);

    //Test
    /*
    const backgroundImage = new me.Sprite(0, 0, {
      image: me.loader.getImage('Background_1'),
    });

    // scale to fit with the viewport size
    backgroundImage.scale(me.game.viewport.width, me.game.viewport.height);
      // scale to fit with the viewport size
      backgroundImage.scale(
        me.game.viewport.width,
        me.game.viewport.height
      );

    // add to the world container
    me.game.world.addChild(backgroundImage, -3);
    */
  }
  // Run on game resources loaded.
  onDestroyEvent(): void {
    // SEND SCORE TO SERVER IF FINISHED
    let isFinished = false;
    if (isFinished) {
      const res = {
        player: network.getPlayerId() as string, //"123"
        score: game.data.score as number,
        level: me.level.getCurrentLevel().name as string,
      };
      // Send score to server
      network.sendScore(res);
    }

    me.game.world.removeChild(this.HUD);
  }
}

export default PlayScreen;
