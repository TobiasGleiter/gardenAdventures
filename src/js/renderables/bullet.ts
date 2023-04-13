import * as me from 'melonjs';

class BulletEntity extends me.Entity {
  private facingLeft: boolean;
  private bulletVel: number;
  private bulletDistance: number;

  constructor(x: number, y: number, settings: any) {
    super(x, y, {
      width: 16,
      height: 16,
      image: 'mainPlayerAttack',
      anchorPoint: new me.Vector2d(0.5, 0.5),
    });

    const body = this.body as me.Body;
    body.setMaxVelocity(100, 0);
    body.collisionType = me.collision.types.PROJECTILE_OBJECT;
    body.setCollisionMask(me.collision.types.ENEMY_OBJECT);
    body.ignoreGravity;

    // settings
    this.facingLeft = settings.facingLeft;
    this.bulletVel = settings.bulletVel;
    this.bulletDistance = settings.bulletDistance;

    this.renderable.addAnimation('shoot', [1, 2, 1]);
    this.renderable.setCurrentAnimation('shoot');
  }

  update(dt: any): boolean {
    if (this.facingLeft) {
      this.renderable.pos.x -= this.bulletVel;
    } else if (!this.facingLeft) {
      this.renderable.pos.x += this.bulletVel;
    }
    // Remove this bullet if too far away
    if (!this.facingLeft && this.renderable.pos.x > this.bulletDistance) {
      me.game.world.removeChild(this);
    } else if (
      this.facingLeft &&
      this.renderable.pos.x < -this.bulletDistance
    ) {
      me.game.world.removeChild(this);
    }

    return super.update(dt);
  }
}

export default BulletEntity;
