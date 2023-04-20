import * as me from 'melonjs';
import game from '../../game';
import { MSettingsBullet } from '../../types/dataModel';

class BulletEntity extends me.Entity {
  private facingLeft: boolean;
  private bulletVel: number;
  private bulletDistance: number;

  constructor(x: number, y: number, settings: MSettingsBullet) {
    super(x, y, {
      frameheight: 16,
      framewidth: 16,
      width: 4,
      height: 4,
      image: 'mainPlayerAttack',
      anchorPoint: new me.Vector2d(1, 1),
    });

    const body = this.body as me.Body;

    body.setMaxVelocity(100, 0);
    body.collisionType = me.collision.types.PROJECTILE_OBJECT;
    body.collisionMask = me.collision.types.ENEMY_OBJECT;

    body.setMaxVelocity(2, 0);
    body.ignoreGravity;

    this.isKinematic = false;
    // settings
    this.facingLeft = settings.facingLeft;
    this.bulletVel = settings.bulletVel;
    this.bulletDistance = settings.bulletDistance;

    this.renderable.addAnimation('shoot', [1, 2, 1]);
    this.renderable.setCurrentAnimation('shoot');

    this.alive = true;

    this.alwaysUpdate = true;
    // Add the body component to the entity
    this.body = body;
  }

  update(dt: any): boolean {
    let vel = this.bulletVel;
    if (this.facingLeft) {
      this.pos.x -= vel;
    } else if (!this.facingLeft) {
      this.pos.x += vel;
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

  /**
   * Collision Handler
   *
   * @returns {boolean}
   */
  onCollision(response: any): any {
    switch (response.b.body.collisionType) {
      case me.collision.types.ENEMY_OBJECT:
        this.alive = false;
        if (!this.alive) {
          me.game.world.removeChild(this as any);
          console.log('shot an enmey');
          game.data.score++;
        }
        break;
    }
  }
}

export default BulletEntity;
