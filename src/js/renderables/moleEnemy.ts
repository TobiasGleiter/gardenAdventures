import * as me from 'melonjs';

class MoleEnemyEntity extends me.Entity {
  private health: number = 10;
  private shootCooldown: number = 1000; // Time in ms between shots
  private lastShotTime: number = 0; // Timestamp of last shot

  constructor(x: number, y: number, settings: any) {
    // define this here instead of tiled
    settings.image = 'enemies2';

    // adjust the size setting information to match the sprite size
    // so that the entity object is created with the right size
    settings.framewidth = 80 
    settings.frameheight = 80;
    settings.width = 80;
    settings.height = 80;
    settings.anchorPoint = new me.Vector2d(0.5, 1);
    
    // call the parent constructor
    super(x, y, settings);

    this.renderable.addAnimation('idle', [80]);
    this.renderable.addAnimation('hidden', [81]);
    this.renderable.addAnimation('attack', [{name:100, delay:1000}, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110]);
    this.renderable.addAnimation('disappear', [120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135]);
    this.renderable.addAnimation('appear', [135, 134, 133, 132, 131, 130, 129, 128, 127, 126, 125, 124, 123, 122, 121, 120]);
    this.renderable.addAnimation('appearAndAttack', [{name:135, delay:1000}, 134, 133, 132, 131, 130, 129, 128, 127, 126, 125, 124, 123, 122, 121, 120, {name:100, delay:1000}, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 135, 134, 133, 132, 131, 130, 129, 128, 127, 126, 125, 124, 123, 122, 121, 120 ]);
    this.renderable.addAnimation('dead', [139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156]);
    this.renderable.setCurrentAnimation('hidden');


    // add a physic body
    const body = new me.Body(this);
    // add a default collision shape
    body.addShape(new me.Rect(0, 0, this.width, this.height));
    body.collisionType = me.collision.types.ENEMY_OBJECT;

    // init force, max velo and friction
    body.force.set(0, 0);
    body.maxVel.set(0, 0);
    body.ignoreGravity = false;

    // enable physic collision (off by default for basic me.Renderable)
    this.isKinematic = false;

    // make it "alive"
    this.alive = true;

    // Add the body component to the entity
    this.body = body;
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

      if(dx > 0) {
        this.facingLeft = false;
      } else {
        this.facingLeft = true;
      }

      // Shoot-Controll
      if (distance < 250 && (me.timer.getTime() - this.lastShotTime) >= this.shootCooldown) {

        // Reset lastShotTime
        this.lastShotTime = me.timer.getTime();

        // Spawn a new bullet entity
        this.renderable.flipX(!this.facingLeft);
        this.renderable.setCurrentAnimation('attack', () => {const bullet = me.pool.pull(
          'MoleAttack',
          (!this.facingLeft)?this.pos.x + 80: this.pos.x - 30,
          this.pos.y + 55,
          // Settings for bullet entity
          { facingLeft: this.facingLeft, bulletVel: 8, bulletDistance: 100 },
          pitch
        ) as me.Renderable;
        me.game.world.addChild(bullet, 10);
        });
        
      } else if(distance >= 250 && this.facingLeft || distance >= 200 && !this.facingLeft) {
        this.renderable.setCurrentAnimation('idle')
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
              // death-animation and remove of object
              this.renderable.setCurrentAnimation('dead', () => {
                me.game.world.removeChild(this);
              });


                me.state.change(me.state.GAME_END, true);

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

export default MoleEnemyEntity;
