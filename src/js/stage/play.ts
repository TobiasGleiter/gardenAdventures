//@ts-nocheck
// ts no check because game.world.addChild throws an error.
import { BitmapText, ColorLayer, game, Stage } from 'melonjs';

class PlayScreen extends Stage {
  /**
   *  action to perform on state change
   */
  onResetEvent() {
    // add a gray background to the default Stage
    game.world.addChild(new ColorLayer('background', '#202020'));

    // add a font text display object
    game.world.addChild(
      new BitmapText(game.viewport.width / 2, game.viewport.height / 2, {
        font: 'PressStart2P',
        size: 2.0,
        textBaseline: 'middle',
        textAlign: 'center',
        text: 'Garden Adventures',
      })
    );
  }
}

export default PlayScreen;
