
import { _decorator, Component, CCInteger,Vec3 } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Bullet
 * DateTime = Tue Dec 14 2021 15:48:41 GMT+0800 (中国标准时间)
 * Author = crazychucky
 * FileBasename = Bullet.ts
 * FileBasenameNoExtension = Bullet
 * URL = db://assets/script/Bullet.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
 
@ccclass('Bullet')
export class Bullet extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property({ type: CCInteger })
    private _vx = 0

    @property({ type: CCInteger })
    private _vy = 480

    //TODO:
    //设置角度 速度
    //update能移动
    //碰撞组
    //碰撞后消失
    //生命时间 倒计时结束也消失
    start () {
      this._vx = 0
      this._vy = 0
    }
    setVelocity (vx:number,vy:number ) {
      this._vx = vx
      this._vy = vy
    }

    update (deltaTime: number) {
        let x = this.node.position.x
        let y = this.node.position.y
        let moved = false
        if(this._vx != 0){
            let add = this._vx*deltaTime
            x+=add
            moved = true
        }
        if(this._vy != 0){
            let add = this._vy*deltaTime
            y+=add
            moved = true
        }
        if(moved){
          this.node.setPosition(new Vec3(x,y,0))
        }
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
