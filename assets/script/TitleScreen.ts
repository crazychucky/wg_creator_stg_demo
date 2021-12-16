
import { _decorator, Component, director,CCBoolean,Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = TitleScreen
 * DateTime = Thu Dec 16 2021 13:49:14 GMT+0800 (中国标准时间)
 * Author = crazychucky
 * FileBasename = TitleScreen.ts
 * FileBasenameNoExtension = TitleScreen
 * URL = db://assets/script/TitleScreen.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
 
let GAME_SCENE = "game_scene"
@ccclass('TitleScreen')
export class TitleScreen extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property({type:CCBoolean})
    private _sceneReadyFlag:Boolean = false

    @property({type:CCBoolean})
    private _waitForStartFlag:Boolean = false

    @property({type:Node})
    private loadingNode:Node = null

    @property({type:Node})
    private titleNode:Node = null

    @property({type:Node})
    private endingNode:Node = null

    onEnable () {
      let lastResult = 0
      if(window.Global != undefined){
        lastResult = window.Global.lastResult 
        window.Global.lastResult = 0
      }
      if(0!=lastResult){
        let str = lastResult > 0 ? "Success!" : "Fail"
        this.showResult(str)
        return
      }
      this.reset()
    }

    reset () {
      this._sceneReadyFlag = false
      this._waitForStartFlag = false

      this.loadingNode.active = false
      this.endingNode.active = false
      this.titleNode.active = true

      director.preloadScene(GAME_SCENE, ()=> {
        console.log('game_scene scene preloaded')
        this._sceneReadyFlag = true
        if(this._waitForStartFlag){
          this._gotoGameScene()
        }
      })
    }
    showResult (str:string) {
      this.loadingNode.active = false
      this.endingNode.active = true
      this.titleNode.active = false

      let sn = this.endingNode.getChildByName("title")
      let titleLb = sn.getComponent("cc.Label")
      titleLb.string = str

      let cn = this.endingNode.getChildByName("ContinueNode")
      cn.active = false
      this.scheduleOnce(function() {
        cn.active = true
      }, 1);
    }

    onStartGame () {
      this.titleNode.active = false
      if(this._sceneReadyFlag){
        this._gotoGameScene()
      }else{
        this._waitForStartFlag = true
        this.loadingNode.active = true
      }
    }
    _gotoGameScene () {
      this.loadingNode.active = false
      director.loadScene(GAME_SCENE)
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
