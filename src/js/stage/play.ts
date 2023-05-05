import * as me from 'melonjs';
import game from '../../game';
import UIContainer from '../UI/HUD';
import network from "../../multiplayer/network";



class PlayScreen extends me.Stage {
  private HUD: any;
  /**
   *  action to perform on state change
   */
  update(dt: number): boolean {
    const pause = new me.BitmapText (me.game.viewport.width/2, me.game.viewport.height/2, {
      font: 'PressStart2P',
      text: 'Pause',
      textAlign: 'center',
      size: 0.8,
    });
    pause.name = 'pausenname';

    if (me.input.isKeyPressed("pause")) {

      if(me.game.world.getChildByName('pausenname').length == 0){
        me.game.world.addChild(pause);
      }

      me.timer.setTimeout(() => {
        me.state.pause();
      }, 1);

    }else if (me.state.isPaused() && me.input.isKeyPressed("resume")){

      const pauseChild = me.game.world.getChildByName('pausenname')[0];
      if (pauseChild && pauseChild.inViewport){
        me.game.world.removeChild(pauseChild);
      }
      me.state.resume();
    }
    return super.update(dt);
  }

  onResetEvent() {
    // GET SCOREBOARD
    const temp = network.getScoreboard();
    console.log(temp);

    /*const player = me.pool.pull(
        'mainPlayer',
        100, 100
    ) as me.Renderable;*/



    // load a level
    me.level.load('Lvl1-1');

    // reset the score
    game.data.score = 0;
    game.data.health = 5;

    this.HUD = new UIContainer();
    me.game.world.addChild(this.HUD);
    //me.game.world.addChild(player,20);
  }
  // Run on game resources loaded.
  onDestroyEvent(): void {
    // SEND SCORE TO SERVER IF FINISHED
    let isFinished = true;
    if(isFinished) {
      const res = {
        player: network.getPlayerId() as string, //"123"
        score: game.data.score as number,
        level: me.level.getCurrentLevel().name as string
      }
      // Send score to server
      network.sendScore(res);
    }

    me.game.world.removeChild(this.HUD);
  }
}

export default PlayScreen;
