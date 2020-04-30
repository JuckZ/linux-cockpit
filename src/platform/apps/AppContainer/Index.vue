<!--
 * @Author: Juck
 * @Date: 2020-04-10 13:13:40
 * @LastEditTime: 2020-04-30 08:09:09
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\AppContainer\Index.vue
 * @Juck is coding...
 -->
<template>
  <div
    :class="{
      appContainer: true,
      isFocused: currentApp.status.focus == true,
      fullscreen: currentApp.status.window == 'fullscreen',
      minimize: currentApp.status.window == 'minimize',
    }"
    :style="{
      'left': currentApp.positionWithUnit.left,
      'top': currentApp.positionWithUnit.top,
      width: currentApp.positionWithUnit.width,
      height: currentApp.positionWithUnit.height,
      cursor: cursor,
    }"
    @mousemove="setCurrentSituation($event, currentApp)"
    @mousedown="setCurrentOperation($event, currentApp)"
  >
    <!-- app组件本身 -->
    <div class="appContent">
      <div class="appTitleBar">
        <span>
          <!-- 标题文字 -->
          <slot name="titleText" />
        </span>
      </div>
      <slot name="appComponent" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.fullscreen {
  top: 0 !important;
  left: 0 !important;
  bottom: 0 !important;
  right: 0 !important;
  width: 100% !important;
  height: 100% !important;
}
.minimize {
  display: none;
}
.isFocused {
  z-index: 999;
  background: rgba(255, 255, 255, 0.9)!important;
}
.appContainer {
  position: fixed;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.7);
  .appTitleBar {
    width: 100%;
    text-align: end;
    border-bottom: 2px solid rgba(255, 255, 255, 1);
    // TAG
    height: 28px;
    // a-icon的样式
    img {
      height: 20px;
      color: blue;
      :hover {
        cursor: pointer;
        background: rgba($color: #000000, $alpha: 0.5);
      }
    }
  }
}
.appContent {
  padding: 5px;
}
</style>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'appContainer',
  components: {},
  props: ['currentApp'],
  data() {
    return {
      //
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      cursor: 'auto',
      operation: 'changeCursor',
      appPosition: {},
      // 当前元素
      odiv: null,
      // 鼠标按下时位置信息
      pointerPositionWhenDown: {
        disX: 0,
        disY: 0,
        clientX: 0,
        clientY: 0,
      },
    }
  },
  computed: {
    ...mapState('config', {
      apps: 'apps',
    }),
  },
  methods: {
    ...mapActions({
      toggleMenu: 'menu/toggleMenu',
      setAppDefault: 'config/setAppDefault',
      setAppStatusPosition: 'config/setAppStatusPosition',
      setAppStatusFocus: 'config/setAppStatusFocus',
      closeMenu: 'menu/closeMenu'
    }),
    // 按下鼠标触发(不用弹起)
    setCurrentOperation(e, app) {
      // 将当前元素focus
      this.setAppStatusFocus({
        app: app
      })
      // 将菜单栏收起
      this.closeMenu()
      //获取目标元素
      this.odiv = e.currentTarget
      //算出鼠标相对元素的位置
      this.pointerPositionWhenDown = {
        disX: e.clientX - this.odiv.offsetLeft,
        disY: e.clientY - this.odiv.offsetTop,
        clientX: e.clientX,
        clientY: e.clientY
      }
      // 设置当前准备执行的操作  拖动元素位置或者改变尺寸
      switch (this.cursor) {
        case 'auto':
          console.log('no operation')
          break
        case 'move':
          // 将预期的操作修改为移动move
          this.operation = 'move'
          console.log('move')
          break
        case 'e-resize':
        case 'ne-resize':
        case 'nw-resize':
        case 'n-resize':
        case 'se-resize':
        case 'sw-resize':
        case 's-resize':
        case 'w-resize':
          // 将预期的操作修改为resize
          this.operation = 'resize'
          console.log('resize')
          break
        default:
          console.log('default')
          break
      }
    },
    // 完成当前操作，并修改鼠标
    finishCurrentOperation(app, options) {
      document.onmouseup = null
      console.log('finish')
      // if(this.operation == 'move' || this.operation == 'resize') {
      //   // 修改app的位置坐标
      //   this.setAppStatusPosition({
      //     app,
      //     options
      //   })
      // }
      // 恢复到changeCursor状态
      this.operation = 'changeCursor'
    },
    setCurrentSituation(e, app) {
      // 移动鼠标默认操作是修改鼠标样式
      if (this.operation == 'changeCursor') {
        // 保存当前app的位置信息
        const appPosition = this.apps[app.id].status.position
        // 设置生效宽度
        const validRange = 10
        // 设置标题栏尺寸
        const appTitleBarSize = {
          width: appPosition.width,
          // TAG
          height: 28,
        }
        // 当鼠标在窗口边框附近时，修改指针样式（不同位置指针可能不同）
        // TAG layerX pageX clientX offsetX screenX
        if (
          e.pageX > appPosition.left &&
          e.pageX < appPosition.left + validRange
        ) {
          // 左边框情况
          if (
            e.pageY > appPosition.top &&
            e.pageY < appPosition.top + validRange
          ) {
            // 左上
            this.cursor = 'nw-resize'
          } else if (
            e.pageY > appPosition.top + appPosition.height - validRange &&
            e.pageY < appPosition.top + appPosition.height
          ) {
            // 左下
            this.cursor = 'sw-resize'
          } else {
            // 左
            this.cursor = 'w-resize'
          }
        } else if (
          e.pageX > appPosition.left + appPosition.width - validRange &&
          e.pageX < appPosition.left + appPosition.width
        ) {
          // 右边框情况
          if (
            e.pageY > appPosition.top &&
            e.pageY < appPosition.top + validRange
          ) {
            // 右上
            this.cursor = 'ne-resize'
          } else if (
            e.pageY > appPosition.top + appPosition.height - validRange &&
            e.pageY < appPosition.top + appPosition.height
          ) {
            // 右下
            this.cursor = 'se-resize'
          } else {
            // 右
            this.cursor = 'e-resize'
          }
        } else if (
          e.pageY > appPosition.top &&
          e.pageY < appPosition.top + validRange
        ) {
          // 上边框
          this.cursor = 'n-resize'
        } else if (
          e.pageY > appPosition.top + appPosition.height - validRange &&
          e.pageY < appPosition.top + appPosition.height
        ) {
          // 下边框
          this.cursor = 's-resize'
        } else if (
          e.pageY > appPosition.top + validRange &&
          e.pageY < appPosition.top + appTitleBarSize.height
        ) {
          // 标题栏
          // FIXME 其他元素可能由于定位情况，会影响e的值，从而影响layerX的值
          this.cursor = 'move'
        } else {
          this.cursor = 'auto'
        }
      } else if (this.operation == 'move' || this.operation == 'resize') {
        const left = app.status.position.left
        const top = app.status.position.top
        const width = app.status.position.width
        const height = app.status.position.height
        // let width = parseInt(this.odiv.style.width.split(/px/)[0])
        // let height = parseInt(this.odiv.style.height.split(/px/)[0])
        const widthIncrement = e.clientX - this.pointerPositionWhenDown.clientX
        const heightIncrement = e.clientY - this.pointerPositionWhenDown.clientY
        this.pointerPositionWhenDown.clientX = e.clientX
        this.pointerPositionWhenDown.clientY = e.clientY
        switch (this.cursor) {
          case 'move':
            this.setAppStatusPosition({
              app,
              options: {
                position: {
                  left: left + widthIncrement,
                  top: top + heightIncrement,
                  width,
                  height,
                },
              },
            })
            break
          case 'e-resize':
            this.setAppStatusPosition({
              app,
              options: {
                position: {
                  left,
                  top,
                  width: width + widthIncrement,
                  height,
                },
              },
            })
            break
          case 'w-resize':
            this.setAppStatusPosition({
              app,
              options: {
                position: {
                  left: left + widthIncrement,
                  top,
                  width: width - widthIncrement,
                  height,
                },
              },
            })
            break
          case 'n-resize':
            this.setAppStatusPosition({
              app,
              options: {
                position: {
                  left,
                  top: top + heightIncrement,
                  width,
                  height: height - heightIncrement,
                },
              },
            })
            break
          case 's-resize':
            this.setAppStatusPosition({
              app,
              options: {
                position: {
                  left,
                  top,
                  width,
                  height: height + heightIncrement,
                },
              },
            })
            break
          case 'ne-resize':
            this.setAppStatusPosition({
              app,
              options: {
                position: {
                  left,
                  top: top + heightIncrement,
                  width: width + widthIncrement,
                  height: height - heightIncrement,
                },
              },
            })
            break
          case 'se-resize':
            this.setAppStatusPosition({
              app,
              options: {
                position: {
                  left,
                  top,
                  width: width + widthIncrement,
                  height: height + heightIncrement,
                },
              },
            })
            break
          case 'nw-resize':
            this.setAppStatusPosition({
              app,
              options: {
                position: {
                  left: left + widthIncrement,
                  top: top + heightIncrement,
                  width: width - widthIncrement,
                  height: height - heightIncrement,
                },
              },
            })
            break
          case 'sw-resize':
            this.setAppStatusPosition({
              app,
              options: {
                position: {
                  left: left + widthIncrement,
                  top,
                  width: width - widthIncrement,
                  height: height + heightIncrement,
                },
              },
            })
            break
          default:
            console.log('nothing to do ')
        }
        // 动态修改当前元素大小和尺寸
        this.odiv.style.width = width + 'px'
        this.odiv.style.height = height + 'px'
        this.odiv.style.left = left + 'px'
        this.odiv.style.top = top + 'px'
        document.onmouseup = (e) => {
          const options = {
            position: {
              left,
              top,
              width,
              height,
            },
          }
          this.finishCurrentOperation(app, options)
        }
      }
    },
  },
}
</script>
