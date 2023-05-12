import * as me from 'melonjs';
import {  setLevel } from 'js/stage/globals.ts';

class SnailEnemyEntity extends me.Entity {
  private health: number = 3;
  private shootCooldown: number = 2000; // Time in ms between shots
  private lastShotTime: number = 0; // Timestamp of last shot

  constructor(x: number, y: number, settings: any) {
    // define this here instead of tiled
    //settings.image = 'snailEnemy';
    settings.image = 'enemies1';

    let width = settings.width;

    // adjust the size setting information to match the sprite size
    // so that the entity object is created with the right size
    settings.framewidth = settings.width = 24;
    settings.frameheight = settings.height = 24;
    settings.anchorPoint = new me.Vector2d(0.5, 1);

    // call the parent constructor
    super(x, y, settings);

    // define a walking animation
    this.renderable.addAnimation('walk', [0, 1, 2, 3, 4, 5]);
    // define a dieing animation
    this.renderable.addAnimation('dead', [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47]);

    this.renderable.setCurrentAnimation('walk');

    // add a physic body
    const body = new me.Body(this);
    // add a default collision shape
    body.addShape(new me.Rect(0, 0, this.width, this.height));
    body.collisionType = me.collision.types.ENEMY_OBJECT;

    // init force, max velo and friction
    body.force.set(0, 0);
    body.maxVel.set(1, 1);
    this.body.setFriction(0.4, 0);

    // enable physic collision (off by default for basic me.Renderable)
    this.isKinematic = false;

    // set start/end position based on the initial area size
    x = this.pos.x;
    this.startX = x;
    this.pos.x = this.endX = x + width - this.width;

    // to remember which side we were walking
    this.walkLeft = false;

    // make it "alive"
    this.alive = true;

    // Add the body component to the entity
    this.body = body;
    
    // Add name to entity as a handler
    this.name = "SnailEnemy";
  }

  update(dt: any) {
    if (this.alive) {
      // Get Distance from Player
      var player;
      var dx;
      var dy;
      var distance;
      // try-catch in case player leaves the stage
      try {
        player = me.game.world.getChildByName("PlayerEntity")[0];
        dx = player.pos.x - this.pos.x;
        dy = player.pos.y - this.pos.y;
      } catch(e) {
        dx = 1000;
        dy = 1000;
      }
      distance = Math.sqrt(dx * dx + dy * dy);
      var pitch = 0;
      
      // Manage the enemy movement
      // Holds position
      if(distance > 150) {
        if (this.walkLeft === true) {
          if (this.pos.x <= this.startX) {
            this.facingLeft = false;
            this.walkLeft = false;
            this.renderable.flipX(!this.walkLeft);
          } else {
            this.body.force.x = -this.body.maxVel.x;
          }
        }

        if (this.walkLeft === false) {
          if (this.pos.x >= this.endX) {
            // if reach the end position
            this.facingLeft = true;
            this.walkLeft = true;
            this.renderable.flipX(!this.walkLeft);
          } else {
            this.body.force.x = this.body.maxVel.x;
          }
        }
        
        // Approach Player
      } else {
        var speed = 0.25;
        var vx = (dx / distance) * speed;
        var vy = (dy / distance) * speed;
        this.body.vel.x = vx;
        this.body.vel.y = vy;
          
        // Change walk-direction depending on distance
        if(dx > 0) {
          this.facingLeft = false;
          this.walkLeft = false;
          this.renderable.flipX(!this.walkLeft)
        } else {
          this.facingLeft = true;
          this.walkLeft = true;
          this.renderable.flipX(!this.walkLeft)
        }
        this.body.update(dt);
      }
      // Shoot-Controll
      if (distance < 150 && me.timer.getTime() - this.lastShotTime >= this.shootCooldown){

        let x_val = 10;
        if(!this.facingLeft) {
          x_val = -20;
        }
          // Reset lastShotTime
          this.lastShotTime = me.timer.getTime();

          // Spawn a new bullet entity
          const bullet = me.pool.pull(
            'SlimeAttack',
            this.pos.x - x_val,
            this.pos.y + 10,
            // Settings for bullet entity
            { facingLeft: this.facingLeft, bulletVel: 8, bulletDistance: 100 },
            pitch
          ) as me.Renderable;
          me.game.world.addChild(bullet, 10);
        // TODO: 
      }
    }

    // return true if we moved or if the renderable was updated
    return (super.update(dt) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
  }
  /**
   * Collision Handler
   *
   * @returns {boolean}
   */
  onCollision(response: any): any {
    switch (response.b.body.collisionType) {
      case me.collision.types.PROJECTILE_OBJECT:
        // Respond only to PlayerAttacks, to avoid friendly fire
        if (response.b.name == "playerAttack") {
          if (this.health > 0) {
            this.health = this.health - 1;
          } else if(this.health <= 0) {
            this.alive = false;
            if (!this.alive) {
            //Death-animation and remove of object
              try {
                setLevel('Lvl3-3');
                me.state.change(me.state.PLAY, false);
              } catch(e) {
                console.log(e)
              }
              this.renderable.setCurrentAnimation('dead', () => {
                me.game.world.removeChild(this);           
              });


            }
          }
        } 
        break;
      case me.collision.types.PLAYER_OBJECT:
        // Set the overlapV to 0 to prevent separating the entities
        response.overlapV.set(0, 0);
        // Set the overlapN to a random value to prevent separating the entities
        response.overlapN.set(0, 0);
        break;
      case me.collision.types.ENEMY_OBJECT:
        // Set the overlapV to 0 to prevent separating the entities
        response.overlapV.set(0, 0);
        // Set the overlapN to a random value to prevent separating the entities
        response.overlapN.set(0, 0);
        break;
    }
  }
}

export default SnailEnemyEntity;
