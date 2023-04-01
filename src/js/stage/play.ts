import * as me from 'melonjs';
import UIContainer from '../entities/menu/UIContainer';

class PlayScreen extends me.Stage {
  /**
   *  action to perform on state change
   */
  onResetEvent() {
    // add a gray background to the default Stage
    me.game.world.addChild(new me.ColorLayer('background', '#202020'));

    // add the UI elements
    const panel = new UIContainer(200, 200, 450, 325);

    panel.addChild(
      new me.Text(0, 0, {
        font: 'Arial',
        size: 20,
        fillStyle: 'white',
        textAlign: 'center',
        text: 'PlayScreen (Panel)',
      })
    );

    // add the panel to word (root) container
    me.game.world.addChild(panel, 1);
  }
}

export default PlayScreen;
