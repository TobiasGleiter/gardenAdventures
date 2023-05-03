import * as me from 'melonjs';

class MoleEnemyEntity extends me.Entity {
  private health: number = 6;
  //private shootCooldown: number = 1000; // Time in ms between shots
  //private lastShotTime: number = 0; // Timestamp of last shot

  constructor(x: number, y: number, settings: any) {
    // define this here instead of tiled
    //settings.image = 'moleEnemy'
    settings.image = 'enemies2';

    // adjust the size setting information to match the sprite size
    // so that the entity object is created with the right size
    settings.framewidth = settings.width = 80;
    settings.frameheight = settings.height = 80;
    settings.anchorPoint = new me.Vector2d(0.5, 1);
    
    // call the parent constructor
    super(x, y, settings);

    this.renderable.addAnimation('idle', [80]);
    this.renderable.addAnimation('attack', [100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113]);
    this.renderable.addAnimation('disappear', [120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135]);
    this.renderable.addAnimation('appear', [135, 134, 133, 132, 131, 130, 129, 128, 127, 126, 125, 124, 123, 122, 121, 120]);
    this.renderable.addAnimation('dead', [139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156]);
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
        if (response.b.name == "playerAttack") {
          if (this.health > 0) {
            this.health = this.health - 1;
          } else if(this.health <= 0) {
            this.alive = false;
            if (!this.alive) {
            //Death-animation and remove of object
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

export default MoleEnemyEntity;
