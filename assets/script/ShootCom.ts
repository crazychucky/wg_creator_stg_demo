
import { _decorator, Component, Prefab, Node,instantiate, CCFloat,CCInteger  } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = ShootCom
 * DateTime = Wed Dec 15 2021 17:46:25 GMT+0800 (中国标准时间)
 * Author = crazychucky
 * FileBasename = ShootCom.ts
 * FileBasenameNoExtension = ShootCom
 * URL = db://assets/script/ShootCom.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
 
let BULLET_VY = 240
@ccclass('ShootCom')
export class ShootCom extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property({type:Prefab})
    private bullet: Prefab = null

    @property({type:CCFloat})
    private fireInterval = 1.0

    @property({type:CCFloat})
    private _fireTimeCount = 0

    @property({type:CCInteger})
    private fireDir = 0

    @property({type:CCInteger})
    private fireOffset = 30

    start () {
      this.fireInterval = 1.0
      this._fireTimeCount = 0
    }

    shoot () {
      let parent = this.node.parent
      let node = instantiate(this.bullet);
      parent.addChild(node)

      let pos = this.node.getPosition()
      pos.y = pos.y + this.fireOffset
      node.setPosition(pos)

      let vy = this.fireDir == 0? BULLET_VY : -BULLET_VY
      let bs = node.getComponent("Bullet")
      bs.setVelocity(0,vy)
      //   node.parent = scene;
      //   // [3]
    }

    update (deltaTime: number) {
      this._fireTimeCount += deltaTime
      if(this._fireTimeCount>=this.fireInterval){
        this._fireTimeCount = 0
        this.shoot()
      }
        // [4]
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/zh/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/zh/scripting/life-cycle-callbacks.html
 */
