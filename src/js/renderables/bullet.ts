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
    //body.collisionMask = me.collision.types.ALL_OBJECT;

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
    this.name = "playerAttack";
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
      me.game.world.removeChild(this as any);
    } else if (
      this.facingLeft &&
      this.renderable.pos.x < -this.bulletDistance
    ) {
      me.game.world.removeChild(this as any);
    }

    // check if we fell into a hole
    if (!this.inViewport && this.pos.x > me.video.renderer.getWidth()){
      // if yes reset the game
      me.game.world.removeChild(this as any);

      return true;
    }

    return super.update(dt);
  }

  /**
   * Collision Handler
   *
   * @returns {boolean}
   */
  onCollision(response: any, other: any): any {
    switch (response.b.body.collisionType) {
      case me.collision.types.ENEMY_OBJECT:
        // eslint-disable-next-line no-case-declarations

        this.alive = false;
        if (!this.alive) {
          me.game.world.removeChild(this as any);
          if (!other.alive){
            other.body.collisionMask = me.collision.types.WORLD_SHAPE;
            game.data.score++;
          }

        }
        break;
        case me.collision.types.PLAYER_OBJECT:
          // Set the overlapV to 0 to prevent separating the entities
          response.overlapV.set(0, 0);
          // Set the overlapN to a random value to prevent separating the entities
          response.overlapN.set(0, 0);
          break;
        case me.collision.types.WORLD_SHAPE:
          me.game.world.removeChild(this as any);

    }
  }
}

export default BulletEntity;
