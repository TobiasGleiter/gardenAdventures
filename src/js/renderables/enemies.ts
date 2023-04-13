import * as me from 'melonjs';

class EnemyEntity extends me.Entity {
  constructor(x: number, y: number, settings: any) {
    super(x, y, settings);

    // Add the enemy to the collision detection system
    this.body.setCollisionMask(me.collision.types.ENEMY_OBJECT);
    // Set the enemy's collision shape
    this.body.addShape(new me.Rect(0, 0, 64, 64));

    //me.game.world.addChild(new EnemyEntity(100, 100, {}));
  }
}

export default EnemyEntity;
