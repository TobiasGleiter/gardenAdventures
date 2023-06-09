import * as me from 'melonjs';
import game from '../../game';

/**
 * a basic HUD item to display score
 */
class ScoreItem extends me.BitmapText {
  private score: number;
  //private score2: String;
  /**
   * constructor
   */
  constructor(x: number, y: number) {
    // call the super constructor
    super(x, y, {
      font: 'PressStart2P',
      text: '-',
      textAlign: 'center',
      size: 0.5,
    });

    this.score = -1;

  }

  /**
   * update function
   */
  update(dt: any) {
    if (this.score !== game.data.score) {
      this.score = game.data.score;
      this.setText(this.score);
    }
    return super.update(dt);
  }
}

class HealthItems extends me.Container {
  private health: number;
  /**
   * constructor
   */
  constructor(x: number, y: number) {
    // call the super constructor
    super();

    // create a list of images
    let healthImages = createHealthImages(x, y, game.data.health);
    //
    healthImages.forEach((item: me.Sprite) => {
      item.name = 'health';
      this.addChild(item, 1);
    });
    // add to the world container

    this.health = game.data.health;
  }

  /**
   * update function
   */
  update(dt: any) {
    let healthImages = me.game.world.getChildByName('health');
    if (this.health > game.data.health) {
      this.health = game.data.health;
      //this.setText(this.health);
      // set animation damage
      // tint to red and flicker
      healthImages[this.health].tint.setColor(255, 0, 0);

      healthImages[this.health].flicker(250, () => {
        // clear the tint once the flickering effect is over
        healthImages[this.health].tint.setColor(255, 255, 255);
        this.removeChild(healthImages[this.health]);
      });

    }else if (this.health < game.data.health){
      this.health = game.data.health;

      // create new sprite and add it to the container
      const newHealthImage = new me.Sprite(
          healthImages[healthImages.length-1].pos.x - 10,
          this.pos.y +20,
          { image: me.loader.getImage('health') }
      );
      newHealthImage.name = 'health';
      this.addChild(newHealthImage, 1);
    }

    return super.update(dt);
  }
}

function createHealthImages(x: number, y: number, health: number): me.Sprite[] {
  let healthImages: me.Sprite[] = [];
  let posHealth = 0;
  for (let i = 0; i < health; i++) {
    const healthImage = new me.Sprite(x - posHealth, y, {
      image: me.loader.getImage('health'),
    });
    healthImages.push(healthImage);
    posHealth += 10;
  }

  return healthImages;
}


class UIContainer extends me.Container {
  constructor() {
    super();

    this.name = 'HUD';

    // persistent across level change
    this.isPersistent = true;

    // Use screen coordinates
    this.floating = true;

    this.addChild(
      new ScoreItem(me.game.viewport.width / 12, me.game.viewport.height / 12)
    );

    this.addChild(
      new HealthItems(me.game.viewport.width - 20, me.game.viewport.height / 12)
    );
  }
}

export default UIContainer;
