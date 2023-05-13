import * as me from 'melonjs';

class BirdEnemyEntity extends me.Entity {
  private health: number = 8;
  private shootCooldown: number = 1000; // Time in ms between shots
  private lastShotTime: number = 0; // Timestamp of last shot

  constructor(x: number, y: number, settings: any) {
    // define this here instead of tiled
    //settings.image = 'birdEnemy';
    settings.image = 'enemies2';

    // adjust the size setting information to match the sprite size
    // so that the entity object is created with the right size
    settings.framewidth = settings.width = 50;
    settings.frameheight = settings.height = 50;
    settings.anchorPoint = new me.Vector2d(0.5, 1);
    
    // call the parent constructor
    super(x, y, settings);

    this.renderable.addAnimation('idle', [32]);
    this.renderable.addAnimation('attack', [{name:64, delay:1000}, 65, 66, 67, 68]);
    this.renderable.addAnimation('defense', [96, 97, 98, 99, 96, 97]);
    this.renderable.addAnimation('dead', [127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145]);
    this.renderable.setCurrentAnimation('idle');

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
      if (distance < 300 && me.timer.getTime() - this.lastShotTime >= this.shootCooldown){
        // Reset lastShotTime
        this.lastShotTime = me.timer.getTime();
//
        // Spawn a new bullet entity and set animation for attack
        this.renderable.setCurrentAnimation('attack', () => {const bullet1 = me.pool.pull(
          'BirdAttack',
          this.pos.x - 30,
          this.pos.y + 35,
          // Settings for bullet entity
          { facingLeft: true, bulletVel: 8, bulletDistance: 100 },
          pitch
        ) as me.Renderable;
        const bullet2 = me.pool.pull(
          'BirdAttack',
          this.pos.x + 50,
          this.pos.y + 35,
          // Settings for bullet entity
          { facingLeft: false, bulletVel: 8, bulletDistance: 100 },
          pitch
        ) as me.Renderable;
        me.game.world.addChild(bullet1, 10);
        me.game.world.addChild(bullet2, 10);
        });
      } else if(distance >= 300 && this.facingLeft || distance >= 200 && !this.facingLeft) {
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
            //Death-animation and remove of object
              this.renderable.setCurrentAnimation('dead', () => {
                try {
                  me.state.change(me.state.GAME_END, true);
                } catch(e) {
                  console.log(e)
                }
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

export default BirdEnemyEntity;
