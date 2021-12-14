
import { _decorator, Component, Node,systemEvent,SystemEvent,EventKeyboard,KeyCode,Vec3,CCInteger, CCBoolean,view  } from 'cc';
import { PLAYER_SPEED,EDGE_OFFSET } from './Config';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Player
 * DateTime = Tue Dec 14 2021 09:18:38 GMT+0800 (中国标准时间)
 * Author = crazychucky
 * FileBasename = Player.ts
 * FileBasenameNoExtension = Player
 * URL = db://assets/script/Player.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
 
@ccclass('Player')
export class Player extends Component {
    // [1]
    // dummy = '';
    @property({ type: CCBoolean })
    private _leftFlag = false

    @property({ type: CCBoolean })
    private _rightFlag = false

    @property({ type: CCInteger })
    private _speed = PLAYER_SPEED

    @property({ type: CCInteger })
    private _minX = -480

    @property({ type: CCInteger })
    private _maxX = 480

    onLoad () {
        this._speed = PLAYER_SPEED
        systemEvent.on(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        systemEvent.on(SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        let si = view.getDesignResolutionSize()
        console.log(si)
        let width = si.width
        this._minX = width*-0.5 + EDGE_OFFSET
        this._maxX = width*0.5 - EDGE_OFFSET
    }

    onDestroy () {
        systemEvent.off(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        systemEvent.off(SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    onKeyDown (event: EventKeyboard) {
        switch(event.keyCode) {
            case KeyCode.ARROW_LEFT:
            case KeyCode.KEY_A:
                this._leftFlag = true
                break;
            case KeyCode.KEY_D:
            case KeyCode.ARROW_RIGHT:
                this._rightFlag = true
                break;
        }
    }

    onKeyUp (event: EventKeyboard) {
        switch(event.keyCode) {
            case KeyCode.ARROW_LEFT:
            case KeyCode.KEY_A:
                this._leftFlag = false
                break;
            case KeyCode.KEY_D:
            case KeyCode.ARROW_RIGHT:
                this._rightFlag = false
                break;
        }
    }

    // [2]
    // @property
    // serializableDummy = 0;

    start () {
        // [3]
    }

    update (deltaTime: number) {
        // [4]
        if(this._leftFlag && !this._rightFlag){
          let add = this._speed*deltaTime
          let x = this.node.position.x
          let y = this.node.position.y
          x-=add
          if(x<this._minX){
            x = this._minX
          }
          this.node.setPosition(new Vec3(x,y,0))
          console.log(x)
        }
        else if(!this._leftFlag && this._rightFlag){
          let add = this._speed*deltaTime
          let x = this.node.position.x
          let y = this.node.position.y
          x+=add
          if(x>this._maxX){
            x = this._maxX
          }
          console.log(x)
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
