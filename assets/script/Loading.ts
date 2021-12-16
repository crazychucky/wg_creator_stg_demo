
import { _decorator, Component, Label, CCInteger } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Loading
 * DateTime = Thu Dec 16 2021 13:59:19 GMT+0800 (中国标准时间)
 * Author = crazychucky
 * FileBasename = Loading.ts
 * FileBasenameNoExtension = Loading
 * URL = db://assets/script/Loading.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
 
let LOADING_DES = [
  "Loading    ",
  "Loading.   ",
  "Loading..  ",
  "Loading... ",
]
let TOTAL_STATE = 4
let STATE_GAP = 0.6
@ccclass('Loading')
export class Loading extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property({type:Label})
    private loadingTxt: Label = null

    @property({type:CCInteger})
    private _timeCounter: number = 0

    @property({type:CCInteger})
    private _tipState: number = 0

    start(){
      this._timeCounter = 0
      this._tipState = 0
    }

    update (deltaTime: number) {
      this._timeCounter += deltaTime
      if(this._timeCounter > STATE_GAP){
        this._timeCounter = 0
        this._tipState++
        if(this._tipState>=TOTAL_STATE){
          this._tipState = 0
        }
        this.loadingTxt.string = LOADING_DES[this._tipState]
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
