import * as me from 'melonjs';

class BulletEntity extends me.Entity {
  constructor(x: number, y: number) {
    super(x, y, { width: 16, height: 16, image: 'mainPlayerAttack' });

    const body = this.body as me.Body;
    body.setMaxVelocity(500, 0);
    body.collisionType = me.collision.types.PROJECTILE_OBJECT;
    body.setCollisionMask(me.collision.types.ENEMY_OBJECT);
    body.ignoreGravity;

    this.renderable.anchorPoint;
    this.renderable.addAnimation('shoot', [0, 1, 2, 1]);
    this.renderable.setCurrentAnimation('shoot');
  }

  update(dt: any): boolean {
    this.renderable.pos.x += 2;

    // Muss noch geändert werden
    if (this.renderable.pos.x > this.pos.x + 20) {
      me.game.world.removeChild(this);
    }

    return super.update(dt);
  }
}

export default BulletEntity;
