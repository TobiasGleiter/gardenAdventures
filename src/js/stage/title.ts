// ts no check because game.world.addChild throws an error.
import { ColorLayer, game, Stage } from 'melonjs';

class TitleScreen extends Stage {
  /**
   *  action to perform on state change
   */
  onResetEvent() {
    // TODO
    // add a gray background to the default Stage
    game.world.addChild(new ColorLayer('background', '#202020'));
  }

  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent() {
    // TODO
  }
}

export default TitleScreen;
