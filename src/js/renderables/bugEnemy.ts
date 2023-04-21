import * as me from 'melonjs';

class BugEnemyEntity extends me.Entity {
  constructor(x: number, y: number, settings: any) {
    // define this here instead of tiled
    settings.image = 'bugEnemy';

    // adjust the size setting information to match the sprite size
    // so that the entity object is created with the right size
    settings.framewidth = settings.width = 20;
    settings.frameheight = settings.height = 20;

    // call the parent constructor
    super(x, y, settings);

    this.renderable.addAnimation('idle', [0, 1]);
    this.renderable.setCurrentAnimation('idle');

    // add a physic body
    const body = new me.Body(this);
    // add a default collision shape
    body.addShape(new me.Rect(0, 0, this.width, this.height));
    body.collisionType = me.collision.types.ENEMY_OBJECT;

    // init force, max velo and friction
    body.force.set(0, 0);
    body.maxVel.set(0, 0);
    body.ignoreGravity;

    // enable physic collision (off by default for basic me.Renderable)
    this.isKinematic = false;

    // make it "alive"
    this.alive = true;

    // Add the body component to the entity
    this.body = body;
  }

  /**
   * Collision Handler
   *
   * @returns {boolean}
   */
  onCollision(response: any): any {
    switch (response.b.body.collisionType) {
      case me.collision.types.PROJECTILE_OBJECT:
        this.alive = false;
        if (!this.alive) {
          me.game.world.removeChild(this as any);
          console.log('IAM dead!');
        }
        break;
    }
  }
}

export default BugEnemyEntity;
