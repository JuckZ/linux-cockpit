<template>
  <div>
    <div class="container">
      <div class="div1" v-drag></div>
      <div class="div1" v-drag></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      dragAble : false 
    }
  },
  directives: {
    //拖拽&&缩放指令
    drag: {
      bind: (el, binding) => {
        console.info(binding)
        console.log(el);
        console.log(binding.value);
        //绑定默认样式
        el.style.zIndex = 9;
        el.style.backgroundColor = 'rgba(0,0,0,1)';
        //如果为编辑状态
        if (binding.value || binding.value === undefined) {
          //定义该元素的 top left width height
          let x, y, w, h;
          //鼠标的起始和结束坐标
          let cxStart, cyStart, cxEnd, cyEnd;
          //判断鼠标样式
          el.onmousemove = e => {
            //获取鼠标当前位置
            const cxNow = e.clientX;
            const cyNow = e.clientY;
            //获取div右下角相对浏览器的位置
            const {
              top: elTop,
              left: elLeft,
              width: elWidth,
              height: elHeight
            } = el.getBoundingClientRect();
            const elBottomHeight = elTop + elHeight;
            const elRightWidth = elLeft + elWidth;
            //判断鼠标是否在div下边界
            const mouseInBottom =
              cyNow <= elBottomHeight + 5 && cyNow >= elBottomHeight - 5;
            //判断鼠标是否在div右边界
            const mouseInRight =
              cxNow <= elRightWidth + 5 && cxNow >= elRightWidth - 5;
            if (mouseInBottom && mouseInRight) {
              el.style.cursor = 'se-resize';
            } else if (mouseInRight) {
              el.style.cursor = 'e-resize';
            } else if (mouseInBottom) {
              el.style.cursor = 's-resize';
            } else {
              el.style.cursor = 'move';
            }
          };
          el.onmousedown = e => {
            const mouse = el.style.cursor;
            //更改默认样式
            el.style.backgroundColor = 'rgba(0,0,0,.5)';
            el.style.zIndex = 99;
            //对象解构赋值
            const { left: elX, top: elY, width: elW, height: elH } = window.getComputedStyle(el);
            x = elX;
            y = elY;
            w = elW;
            h = elH;
            console.log(x,y,w,h)
            cxStart = e.clientX;
            cyStart = e.clientY;
            //绑定移动事件
            /**
             * 操作DOM位置和大小方法
             * @param direct 方向
             * @param pos 尺寸/坐标
             * @param move 拖动距离
             * @param limit 限定范围
             */
            function handleDiv(direct, pos, move, limit) {
              for (let i = 0; i < direct.length; i++) {
                let val = parseInt(pos[i]) + move[i];
                val = val <= limit ? limit : val;
                el.style[direct[i]] = val + 'px';
              }
            }
            document.onmousemove = e => {
              cxEnd = e.clientX;
              cyEnd = e.clientY;
              //默认左下方向配置
              const xMove = cxEnd - cxStart;
              const yMove = cyEnd - cyStart;
              let direct = ['width', 'height'];
              let pos = [w, h];
              let move = [xMove, yMove];
              let limit = 50;
              //判断鼠标的类型进行对应的操作
              switch (mouse) {
                case 'e-resize':
                  direct = ['width'];
                  pos = [w];
                  move = [xMove];
                  break;
                case 's-resize':
                  direct = ['height'];
                  pos = [h];
                  move = [yMove];
                  break;
                case 'move':
                  direct = ['left', 'top'];
                  pos = [x, y];
                  limit = 0;
                  break;
              }
              handleDiv(direct, pos, move, limit);
            };
            //取消移动事件
            document.onmouseup = e => {
              //还原默认样式
              el.style.zIndex = 9;
              el.style.backgroundColor = 'rgba(0,0,0,1)';
              document.onmousemove = null;
            };
          };
        } else {
          el.style.cursor = 'default';
          //移除点击事件
          el.onmousedown = null;
          el.onmousemove = null;
        }
      }
    }
  }
};
</script>