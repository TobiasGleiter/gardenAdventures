import * as me from 'melonjs';
import game from '../../game';

class PlayerEntity extends me.Entity {
  /**
   *
   * @param x
   * @param y
   * @param settings
   */

  private shootCooldown: number = 400; // Time in ms between shots
  private lastShotTime: number = 0; // Timestamp of last shot
  private facingLeft: boolean = false;
  private sneakingSpeed: number = 1;
  private jumpCounter: number = 0;
  private idleCooldown: number = 1000;
  private lastIdleTime: number = 0;
  private healthCooldown: number = 3000;
  private lastHealthTime: number = 0;
  private isImmune: boolean = false;

  private health: number = game.data.health;

  constructor(x: number, y: number) {
    super(x, y, {
      frameheight: 16,
      framewidth: 16,
      width: 16,
      height: 8,
      image: 'mainPlayerImage',
      anchorPoint: new me.Vector2d(0.5, 1),
    });

    // Create a new body component
    const body = new me.Body(this);
    // add a rectangle shape
    body.addShape(new me.Rect(0, 0, 16, 8));

    // set a "player object" type
    body.collisionType = me.collision.types.PLAYER_OBJECT;

    // init force, max velo and friction
    body.force.set(1, 0);
    body.setMaxVelocity(2.5, 8);
    body.setFriction(0.4, 0);
    body.mass = 1;
    body.gravityScale = 0.6;

    // set the display to follow our position on both axis
    me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH, 1);

    // ensure the player is updated even when outside of the viewport
    this.alwaysUpdate = true;

    // define a basic walking animation (using all frames)
    this.renderable.addAnimation('run', [0, 1], 200); // 0, 1

    this.renderable.addAnimation('sneak', [2, 3], 500);

    // define a standing animation (using the first frame)
    this.renderable.addAnimation('idle', [4, 5, 6, 7, 6, 5], 200);

    this.renderable.addAnimation('jump', [8]);

    this.renderable.addAnimation('damage', [12, 13]);

    this.renderable.addAnimation('dead', [14]);
    this.renderable.addAnimation('shoot', [15]);

    // set the standing animation as default
    this.renderable.setCurrentAnimation('idle');

    this.alive = true;
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
    if (this.alive) {
      // PLAYER RUN
      if (me.input.isKeyPressed('left')) {
        this.facingLeft = true;
        //let collisionBox = this.body.getShape(0);
        //collisionBox.pos.x = -64;

        // PLAYER SNEAK
        if (me.input.isKeyPressed('sneak')) {
          console.log('sneak');
          // update the entity velocity
          this.body.vel.x = -this.sneakingSpeed;
          // flip the sprite on horizontal axis
          this.renderable.flipX(true);
          if (!this.renderable.isCurrentAnimation('sneak')) {
            this.renderable.setCurrentAnimation('sneak');
          }
        } else {
          console.log('run');
          // update the entity velocity
          this.body.vel.x = -this.body.maxVel.x;
          // flip the sprite on horizontal axis
          this.renderable.flipX(true);
          // change to the walking animation
          if (!this.renderable.isCurrentAnimation('run')) {
            this.renderable.setCurrentAnimation('run');
          }
        }
      } else if (me.input.isKeyPressed('right')) {
        this.facingLeft = false;
        //let collisionBox = this.body.getShape(0);
        //collisionBox.pos.x = 0;

        // PLAYER SNEAK
        if (me.input.isKeyPressed('sneak')) {
          console.log('sneak');
          // update the entity velocity
          this.body.vel.x = this.sneakingSpeed;
          if (!this.renderable.isCurrentAnimation('sneak')) {
            this.renderable.setCurrentAnimation('sneak');
          }
        } else {
          console.log('run');
          // update the entity velocity
          this.body.vel.x = this.body.maxVel.x;
          // change to the walking animation
          if (!this.renderable.isCurrentAnimation('run')) {
            this.renderable.setCurrentAnimation('run');
          }
        }
        // unflip the sprite
        this.renderable.flipX(false);
      } else if (me.timer.getTime() - this.lastIdleTime >= this.idleCooldown) {
        this.lastIdleTime = me.timer.getTime();
        // change to the standing animation
        this.renderable.setCurrentAnimation('idle');
      }

      // PLAYER JUMP
      if (me.input.isKeyPressed('jump')) {
        if (this.jumpCounter < 2) {
          // set current vel to the maximum defined value
          // gravity will then do the rest
          if (this.body.force.y < 1) {
            this.body.force.y = -this.body.maxVel.y * 2;
          } else {
            this.body.force.y = -this.body.maxVel.y;
          }
          this.jumpCounter += 1;
        }
      }

      if (this.body.jumping || this.body.falling) {
        if (!this.renderable.isCurrentAnimation('jump')) {
          this.renderable.setCurrentAnimation('jump');
        }
      }

      // PLAYER SHOOT CHEEEEESE!
      // Check if the player fires a bullet and if the time is up to shoot
      if (
        me.input.isKeyPressed('shoot') &&
        me.timer.getTime() - this.lastShotTime >= this.shootCooldown
      ) {
        // Reset lastShotTime
        this.lastShotTime = me.timer.getTime();
        // Spawn a new bullet entity
        const bullet = me.pool.pull(
          'mainPlayerAttack',
          this.pos.x + 10,
          this.pos.y + 5,
          // Settings for bullet entity
          { facingLeft: this.facingLeft, bulletVel: 3, bulletDistance: 100 }
        ) as me.Renderable;
        me.game.world.addChild(bullet, 10);

        // animation stuff
        if (!this.renderable.isCurrentAnimation('shoot')) {
          this.renderable.setCurrentAnimation('shoot');
        }
      }
    }

    return super.update(dt) || this.body.vel.x !== 0 || this.body.vel.y !== 0;
  }

  /**
   * Collision Handler
   *
   * @returns {boolean}
   */
  onCollision(response: any): any {
    this.jumpCounter = 0;
    switch (response.b.body.collisionType) {
      case me.collision.types.ENEMY_OBJECT:
        this.hurt();

        // Set the overlapV to 0 to prevent separating the entities
        response.overlapV.set(0, 0);
        // Set the overlapN to a random value to prevent separating the entities
        response.overlapN.set(0, 0);
    }
  }

  //
  hurt() {
    var sprite = this.renderable;
    // check if immune
    if (!this.isImmune) {
      // reduce health
      game.data.health--;
      // set immune to true
      this.isImmune = true;
    }

    // timer to reset immune
    me.timer.setTimeout(() => {
      me.timer.reset();
      this.isImmune = false;
    }, 750);

    // Gameover after 3 hits
    if (game.data.health < 1) {
      game.data.health = 0;
      this.alive = false;
      // Start the game.
      if (!this.renderable.isCurrentAnimation('dead')) {
        this.renderable.setCurrentAnimation('dead');

        sprite.flicker(0);
      }
      // timer to reset immune
      me.timer.setTimeout(() => {
        me.timer.reset();
        me.state.change(me.state.MENU, false);
      }, 750);
    } else {
      // set animation damage
      // tint to red and flicker
      sprite.tint.setColor(255, 0, 0);
      sprite.flicker(750, () => {
        // clear the tint once the flickering effect is over
        sprite.tint.setColor(255, 255, 255);
      });
    }
  }
}

export default PlayerEntity;
