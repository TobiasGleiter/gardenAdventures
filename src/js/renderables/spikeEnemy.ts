import * as me from 'melonjs';

class SpikeEnemyEntity extends me.Entity {
  constructor(x: number, y: number, settings: any) {

    // adjust the size setting information to match the sprite size
    // so that the entity object is created with the right size
    settings.framewidth = settings.width = 16;
    settings.frameheight = settings.height = 16;

    // call the parent constructor
    super(x, y, settings);

    // add a physic body
    const body = new me.Body(this);
    // add a default collision shape
    body.addShape(new me.Rect(0, 0, this.width, this.height));
    body.collisionType = me.collision.types.ENEMY_OBJECT;

    // make it "alive"
        this.alive = true;

    // enable physic collision (off by default for basic me.Renderable)
    this.isKinematic = false;

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
      case me.collision.types.PLAYER_OBJECT:
                // Set the overlapV to 0 to prevent separating the entities
                response.overlapV.set(0, 0);
                // Set the overlapN to a random value to prevent separating the entities
                response.overlapN.set(0, 0);
                break;
    }
  }
}

export default SpikeEnemyEntity;
