<template>
<!-- TODO 预览的时候要预览当前图片，也就是说form.view的序号需要时打开的那个序号 -->
  <div class="pictureViewer">
    <div class="methods">
      <div class="controlBar" v-if="options.inline">
        <a-input-group>
          <a-button
            type="primary"
            @click="toggleInline(false)"
            :class="{ ' is-active': !options.inline }"
            >Modal</a-button
          >
          <a-button
            type="primary"
            @click="toggleInline(true)"
            :class="{ ' is-active': options.inline }"
            >Inline</a-button
          >
        </a-input-group>
        <a-input-group>
          <a-button @click="add" :disabled="images.length === 9">Add</a-button>
          <a-button @click="remove" :disabled="images.length === 1"
            >Remove</a-button
          >
        </a-input-group>
        <a-input-group>
          <a-button @click="view">View</a-button>
          <a-input v-model.number="form.view"></a-input>
        </a-input-group>
        <a-input-group>
          <a-button @click="zoom()">Zoom</a-button>
          <a-input v-model.number="form.zoom"></a-input>
        </a-input-group>
        <a-input-group>
          <a-button @click="zoomTo">ZoomTo</a-button>
          <a-input v-model.number="form.zoomTo"></a-input>
        </a-input-group>
        <a-input-group>
          <a-button @click="rotate()">Rotate</a-button>
          <a-input v-model.number="form.rotate"></a-input>
        </a-input-group>
        <a-input-group>
          <a-button @click="rotateTo">TotateTo</a-button>
          <a-input v-model.number="form.rotateTo"></a-input>
        </a-input-group>
        <a-input-group>
          <a-button @click="zoom(0.5)">Zoom In</a-button>
          <a-button @click="zoom(-0.5)">Zoom Out</a-button>
        </a-input-group>
        <a-input-group>
          <a-button @click="rotate(-90)">Rotate Left</a-button>
          <a-button @click="rotate(90)">Rotate Right</a-button>
        </a-input-group>
        <a-input-group>
          <a-button @click="scaleX()">Flip Horizontal</a-button>
          <a-button @click="scaleY()">Flip Vertical</a-button>
        </a-input-group>
        <a-input-group>
          <a-button @click="move(-10, 0)">Left</a-button>
          <a-button @click="move(10, 0)">Right</a-button>
          <a-button @click="move(0, -10)">Up</a-button>
          <a-button @click="move(0, 10)">Down</a-button>
        </a-input-group>
        <a-input-group>
          <a-button @click="prev">Prev</a-button>
          <a-button @click="next">Next</a-button>
          <a-button @click="play">Play</a-button>
          <a-button @click="stop">Stop</a-button>
        </a-input-group>
        <a-input-group>
          <a-button @click="full">Full</a-button>
          <a-button @click="tooltip">Tooltip</a-button>
          <a-button @click="reset">Reset</a-button>
        </a-input-group>
      </div>
      <div v-else>
        <a-button @click="show">Show</a-button>
      </div>
    </div>
    <div class="content">
      <div class="options">
        <div class="options-header">
          Options
        </div>
        <ul class="options-body">
          <li v-for="item in toggleOptions" :key="item">
            <label>
              <input type="checkbox" v-model="options[item]" />
              {{ item }}
            </label>
          </li>
        </ul>
      </div>
      <div class="viewer-wrapper">
        <viewer
          :options="options"
          :images="images"
          @inited="inited"
          class="viewer"
          ref="viewer"
        >
          <template slot-scope="scope">
            <figure class="images">
              <div
                class="image-wrapper"
                v-for="{ source, thumbnail } in scope.images"
                :key="source"
              >
                <img
                  class="image"
                  :src="thumbnail"
                  :data-source="source"
                  :alt="source.split('?image=').pop()"
                />
              </div>
            </figure>
            <p><strong>Options: </strong>{{ scope.options }}</p>
          </template>
        </viewer>
      </div>
    </div>
  </div>
</template>

<script>
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import Vue from 'vue'
Vue.use(Viewer)
import { mapState } from 'vuex'
// Viewer.setDefaults({
//   zIndexInline: 2017,
// })

export default {
  data() {
    return {
      form: {
        view: 2,
        zoom: -0.1,
        zoomTo: 0.8,
        rotate: 90,
        rotateTo: 180,
        scaleX: 1,
        scaleY: 1,
      },
      toggleOptions: [
        'button',
        'navbar',
        'title',
        'toolbar',
        'tooltip',
        'movable',
        'zoomable',
        'rotatable',
        'scalable',
        'transition',
        'fullscreen',
        'keyboard',
      ],
      options: {
        inline: true,
        button: true,
        navbar: true,
        title: true,
        toolbar: true,
        tooltip: true,
        movable: true,
        zoomable: true,
        rotatable: true,
        scalable: true,
        transition: true,
        fullscreen: true,
        keyboard: true,
        url: 'data-source',
      },
    }
  },

  computed: {
    ...mapState('pictureViewer', {
      pictures: 'pictures',
    }),
    sourceImages: function() {
      return this.pictures.map((img) => {
        return {
          thumbnail: img,
          source: img,
        }
      })
    },
    images: function() {
      return [...this.sourceImages].splice(0, 5)
    }
  },

  methods: {
    inited(viewer) {
      this.$viewer = viewer
    },
    add() {
      this.images.push(this.sourceImages[this.images.length])
    },
    remove() {
      this.images.pop()
    },
    view() {
      if (this.form.view >= 0 && this.form.view < this.images.length) {
        this.$viewer.view(this.form.view)
      }
    },
    zoom(value) {
      this.$viewer.zoom(value || this.form.zoom)
    },
    zoomTo() {
      this.$viewer.zoomTo(this.form.zoomTo)
    },
    rotate(value) {
      this.$viewer.rotate(value || this.form.rotate)
    },
    rotateTo() {
      this.$viewer.rotateTo(this.form.rotateTo)
    },
    scaleX(value) {
      if (value) {
        this.$viewer.scaleX(value)
      } else {
        this.form.scaleX = -this.form.scaleX
        this.$viewer.scaleX(this.form.scaleX)
      }
    },
    scaleY(value) {
      if (value) {
        this.$viewer.scaleY(value)
      } else {
        this.form.scaleY = -this.form.scaleY
        this.$viewer.scaleY(this.form.scaleY)
      }
    },
    move(x, y) {
      this.$viewer.move(x, y)
    },
    prev() {
      this.$viewer.prev()
    },
    next() {
      this.$viewer.next()
    },
    play() {
      this.$viewer.play()
    },
    stop() {
      this.$viewer.stop()
    },
    show() {
      this.$viewer.show()
    },
    full() {
      this.$viewer.full()
    },
    tooltip() {
      this.$viewer.tooltip()
    },
    reset() {
      this.$viewer.reset()
    },
    toggleInline(inline) {
      this.options.inline = inline
    },
  },
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.pictureViewer {
  min-width: 80%;
}
.controlBar {
  display: flex;
  flex-wrap: wrap;
  span {
    width: auto;
    margin-right: 20px;
  }
  input {
    max-width: 50px;
  }
}
.content {
  display: flex;
  margin-top: 10px;
  .options {
    margin: 0 10px;
    
    .options-header {
      padding: 4px 8px;
      background: #1890ff;
      border-radius: 0.5em 0.5em 0 0;
    }
    .options-body {
      li {
        width: 100px;
        padding: 2px 8px;
        border-top: 1px solid black;
        background: white;
      }
    }
  }
  .viewer-wrapper {
    background: #333;
  }
}

.viewer {
  height: 100%;
  .images {
    height: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding: 5px;

    .image-wrapper {
      display: inline-block;
      width: calc(33% - 20px);
      margin: 5px 5px 0 5px;

      .image {
        width: 100%;
        cursor: pointer;
        display: inline-block;
      }
    }
  }
}
</style>
