import {ColorLayer, game, Stage, UITextButton} from 'melonjs';
import UIContainer from "../entities/menu/UIContainer";

class TitleScreen extends Stage {
  /**
   *  action to perform on state change
   */
  onResetEvent() {
    // TODO
    // add a gray background to the default Stage
    game.world.addChild(new ColorLayer('background', '#202020'));

    const panel = new UIContainer(20, 30, 450, 325);

    panel.addChild(new UITextButton(0, 0, {
      font: 'PressStart2P', text: "hallo"}));

    game.world.addChild(panel, 1);

  }

  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent() {
    // TODO
  }
}

export default TitleScreen;
