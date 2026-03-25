// Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project.
class PlatformHeroGameObject extends GameObject {
  constructor() {
    super("PlatformHeroGameObject")
    this.addComponent(new Polygon(), { points: [new Vector2(-10, -20), new Vector2(10, -20), new Vector2(10, 20), new Vector2(-10, 20)], fillStyle: "blue" })
    this.addComponent(new Collider())
    this.addComponent(new RigidBody(), { gravity: new Vector2(0, 32) })
    this.addComponent(new HeroController())
  }
}

class HeroController extends Component {
  jumpTimer = 1000
  isGrounded = false
  start() {
    this.rigidBody = this.gameObject.getComponent(RigidBody)
    this.isGrounded = false
    this.doubleJump = false
    this.lastJump = -1000
  }
  onCollisionStay(other, mtv) {
    if (this.rigidBody.velocity.y > 0 && mtv.y < 0) {
      this.rigidBody.velocity.y = 0
      this.isGrounded = true
    }
    if(this.rigidBody.velocity.y < 0 && mtv.y > 0){
      this.rigidBody.velocity.y = 0
    }
    // const result = Collisions.isCollisionGameObjectGameObject(this.gameObject, other)
    // if (!result)
    //   return
    // if (result.x == 0) {
    //   if(Math.sign(result.y) != Math.sign(this.gameObject.getComponent(RigidBody).velocity.y))
    //     this.gameObject.getComponent(RigidBody).velocity.y = 0
    //   if(result.y < 0)
    //       this.isGrounded = true
    // }
  }
  fixedUpdate() {
    let direction = new Vector2(0, 0)
    const speed = 100


    if (Input.keysDown.includes("ArrowLeft")) direction = direction.add(new Vector2(-speed * Time.deltaTime, 0))
    if (Input.keysDown.includes("ArrowRight")) direction = direction.add(new Vector2(speed * Time.deltaTime, 0))
    this.transform.position = this.transform.position.add(direction)
    this.isGrounded = false
  }
  update() {


    if (Input.keysDownThisFrame.includes("Space") && (this.isGrounded || this.doubleJump)) {
      this.rigidBody.velocity.y = -100
      this.doubleJump = !this.doubleJump
      this.lastJump = Time.time
    }
    else if(Time.time - this.lastJump < .01) {
      this.rigidBody.velocity.y = -100
    }
    else if(Input.keysDown.includes("Space") && Time.time-this.lastJump < 6.4){
      this.rigidBody.velocity.y = -100
    }

    // const jumpPower = 150
    // const maxJumpTime = .3
    // const minJumpTime = .1

    // this.jumpTimer+=Time.deltaTime

    // if (Input.keysDownThisFrame.includes("Space") && this.isGrounded) {
    //   this.gameObject.getComponent(RigidBody).velocity.y = -jumpPower
    //   this.jumpTimer = 0
    //   this.isGrounded = false
    // }

    // if (Input.keysDown.includes("Space") && this.jumpTimer < maxJumpTime || this.jumpTimer < minJumpTime) {
    //   this.gameObject.getComponent(RigidBody).velocity.y = -jumpPower
    // }

    // if (Input.keysUpThisFrame.includes("Space")) {
    //   this.jumpTimer = maxJumpTime
    // }
  }

}