import * as me from 'melonjs';

class PlayerEntity extends me.Entity {
  /**
   *
   * @param x
   * @param y
   * @param settings
   */
  constructor(x: number, y: number, settings: any) {
    super(x, y, settings);

    // Create a new body component
    const body = new me.Body(this);

    // Remove current shape
    //body.removeShape(body.getShape(0));
    // add a rectangle shape
    body.addShape(new me.Rect(0, 0, 64, 32));

    // set a "player object" type
    body.collisionType = me.collision.types.PLAYER_OBJECT;

    // init force, max velo and friction
    body.force.set(1, 0);
    body.setMaxVelocity(4, 15);
    body.setFriction(0.4, 0);
    body.mass = 1;

    // set the display to follow our position on both axis
    me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH, 0.4);

    // ensure the player is updated even when outside of the viewport
    this.alwaysUpdate = true;

    // define a basic walking animation (using all frames)
    this.renderable.addAnimation('run', [5]); // 1-4 geht nicht mehr?!

    // define a standing animation (using the first frame)
    this.renderable.addAnimation('idle', [5, 5, 5, 5, 5, 5, 6, 6]);

    this.renderable.addAnimation('jump', [5]); // 10-13 geht nicht mehr?!

    // set the standing animation as default
    this.renderable.setCurrentAnimation('idle');

    // Add the body component to the entity
    this.body = body;
  }

  /**
   * Update the Entity
   *
   * @param dt
   * @returns {any|boolean}
   */
  update(dt: any) {
    if (me.input.isKeyPressed('left')) {
      console.log('left');

      let collisionBox = this.body.getShape(0);
      collisionBox.pos.x = -64;

      // update the default force
      this.body.force.x = -this.body.maxVel.x;
      // flip the sprite on horizontal axis
      this.renderable.flipX(true);

      // change to the walking animation
      if (!this.renderable.isCurrentAnimation('run')) {
        this.renderable.setCurrentAnimation('run');
      }
    } else if (me.input.isKeyPressed('right')) {
      console.log('right');

      let collisionBox = this.body.getShape(0);
      collisionBox.pos.x = 0;

      // unflip the sprite
      this.renderable.flipX(false);
      // update the entity velocity
      this.body.force.x = this.body.maxVel.x;
      // change to the walking animation
      if (!this.renderable.isCurrentAnimation('run')) {
        this.renderable.setCurrentAnimation('run');
      }
    } else {
      // change to the standing animation
      this.renderable.setCurrentAnimation('idle');
    }

    if (me.input.isKeyPressed('jump')) {
      if (!this.body.jumping && !this.body.falling) {
        // set current vel to the maximum defined value
        // gravity will then do the rest
        this.body.force.y = -this.body.maxVel.y;
      }
    } else {
      this.body.force.y = 0;
    }

    if (this.body.jumping || this.body.falling) {
      if (!this.renderable.isCurrentAnimation('jump')) {
        this.renderable.setCurrentAnimation('jump');
      }
    }

    return super.update(dt) || this.body.vel.x !== 0 || this.body.vel.y !== 0;
  }

  /**
   * Collision Handler
   *
   * @returns {boolean}
   */
  onCollision() {
    return true;
  }
}

export default PlayerEntity;
