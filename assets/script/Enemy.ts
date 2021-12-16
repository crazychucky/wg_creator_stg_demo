
import { _decorator, Component, Node, find  } from 'cc';
import { Collider2D,Contact2DType,IPhysics2DContact  } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Enemy
 * DateTime = Tue Dec 14 2021 09:18:38 GMT+0800 (中国标准时间)
 * Author = crazychucky
 * FileBasename = Enemy.ts
 * FileBasenameNoExtension = Enemy
 * URL = db://assets/script/Enemy.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
 
@ccclass('Enemy')
export class Enemy extends Component {
    @property({type:Node})
    private gameController = null
    // [1]
    // dummy = '';
    onLoad () {
    }

    onDestroy () {
      this.gameController.onRemoveEnemy()
    }

    // [2]
    // @property
    // serializableDummy = 0;

    start () {
      let n:Node = find("Canvas/ControllerNode")
      this.gameController = n.getComponent("GameController")
      this.gameController.onAddEnemy()

      let collider = this.getComponent(Collider2D);
      if (collider) {
        collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
      }
        // [3]
    }

    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
      this.node.destroy()
    }
    // update (deltaTime: number) {
    // }
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
