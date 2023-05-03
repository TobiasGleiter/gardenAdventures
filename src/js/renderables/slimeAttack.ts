import * as me from 'melonjs';
import { MSettingsBullet } from '../../types/dataModel';

class SlimeAttack extends me.Entity {
  private facingLeft: boolean;
  private bulletVel: number;
  private bulletDistance: number;
  
  constructor(x: number, y: number, settings: MSettingsBullet, pitch: number) {
    super(x, y, {
      frameheight: 12,
      framewidth: 12,
      width: 12,
      height: 12,
      image: 'attacks1',
      anchorPoint: new me.Vector2d(1, 1),
    });

    const body = this.body as me.Body;

    body.collisionType = me.collision.types.PROJECTILE_OBJECT;

    body.setMaxVelocity(4, pitch);
    body.ignoreGravity;

    this.isKinematic = false;
    // settings
    this.facingLeft = settings.facingLeft;
    this.bulletVel = settings.bulletVel;
    this.bulletDistance = settings.bulletDistance;

    this.renderable.addAnimation('slime_Attack', [0, 1, 2, 3, 4]);
    this.renderable.setCurrentAnimation('slime_Attack');
    this.renderable.scale(0.6,0.6);

    this.alive = true;

    this.alwaysUpdate = true;

    // Add the body component to the entity
    this.body = body;
    
    this.name = "enemyAttack";
  }

  update(dt: any): boolean {
    let vel = this.bulletVel;
    if (this.facingLeft) {
      this.pos.x -= vel;
      this.renderable.flipX(!this.facingLeft)
    } else if (!this.facingLeft) {
      this.pos.x += vel;
      this.renderable.flipX(!this.facingLeft)
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
  onCollision(response: any): any {
    switch (response.b.body.collisionType) {
      case me.collision.types.ENEMY_OBJECT:
        // Set the overlapV to 0 to prevent separating the entities
        response.overlapV.set(0, 0);
        // Set the overlapN to a random value to prevent separating the entities
        response.overlapN.set(0, 0);
        break;
     case me.collision.types.PLAYER_OBJECT:
        this.alive = false;
        if (!this.alive) {
          me.game.world.removeChild(this as any);
        }
        break;
      case me.collision.types.WORLD_SHAPE:
        me.game.world.removeChild(this as any);

    }
  }
}

export default SlimeAttack;