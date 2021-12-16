
import { _decorator, Component, CCInteger, director,CCBoolean } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = GameController
 * DateTime = Thu Dec 16 2021 11:37:38 GMT+0800 (中国标准时间)
 * Author = crazychucky
 * FileBasename = GameController.ts
 * FileBasenameNoExtension = GameController
 * URL = db://assets/script/GameController.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
 
let TITLE_SCENE = "title_scene"
@ccclass('GameController')
export class GameController extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property({type:CCInteger})
    private _enemyCount = 0

    @property({type:CCBoolean})
    private _gameEnd = false

    start () {
      this._gameEnd = false
    }

    onAddEnemy () {
      this._enemyCount++
    }

    onRemoveEnemy () {
      this._enemyCount--
      if(this._enemyCount <= 0){
        this.onSuccess()
      }
    }

    onSuccess () {
      if(this._gameEnd){
        return
      }
      this._gameEnd = true
      if(window.Global == undefined){
        window.Global = {}
      }
      window.Global.lastResult = 1
      this._gotoTitleScene()
    }

    onFail () {
      if(this._gameEnd){
        return
      }
      this._gameEnd = true
      if(window.Global == undefined){
        window.Global = {}
      }
      window.Global.lastResult = -1
      this._gotoTitleScene()
    }

    _gotoTitleScene () {
      director.loadScene(TITLE_SCENE)
    }

    // update (deltaTime: number) {
    //     // [4]
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
