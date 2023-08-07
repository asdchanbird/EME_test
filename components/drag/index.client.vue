<script setup lang="ts">
import { ref } from 'vue'
import { Position, onKeyStroke, useDraggable, useMouseInElement, useStorage, useLocalStorage, useSessionStorage } from '@vueuse/core'
import { UseDraggable as Draggable} from '@vueuse/components'
// import VueResizable from 'vue-resizable'
import Vue3DraggableResizable from 'vue3-draggable-resizable'
import DraggablePanel from 'draggable-panel'
const xx = ref(100)
const yy = ref(100)
const hh = ref(100)
const ww = ref(100)
const active = ref(true)
// defineProps<{
//     props?: any
//     title?: string
//     content?: string
// }>()
onMounted(()=> {
    
    // console.log($('.dsd').offset())
    // console.log($('.dsd').height())
})
const props = defineProps(["props","title"])
console.log(props)
const el = ref<HTMLElement | null>(null)
const target = ref<HTMLElement | null>(null)

// 畫板的起始位置
const offset = $('.dsd').offset()
// 畫板的高度
const height = $('.dsd').height()
// 畫板的寬度
const width = $('.dsd').width()
const mouse: string | null = sessionStorage.getItem('mouse')
const setup: any = JSON.parse(mouse!)
// setting.value.x = defineProps.props?.pageX
// `style` will be a helper computed for `left: ?px; top: ?px;`
const position: any = JSON.parse(useSessionStorage('drag'+ props.props.id, null).value!)
const answer = position !== null ? position : setup 
console.log(answer)
const { x, y, style } = useDraggable(el, {
    initialValue: { x: props.props.x + offset.left , y: props.props.y + offset.top },
    onMove: (position: Position) => {
        if (position.x > width + Math.round(offset.left) - $('.drag').outerWidth()) {
            console.log('動作')
            position.x = width + Math.round(offset.left) - $('.drag').outerWidth()
        }else {
            console.log(123)
        }
        if (position.x < offset.left) {
            position.x = offset.left
        }
        if (position.y > height + Math.round(offset.top) - $('.drag').outerHeight()) {
            position.y = height + Math.round(offset.top) - $('.drag').outerHeight()
        }
        if (position.y < offset.top) {
            position.y = offset.top
        }
    }
})

// const disabledX = ref(false)
// function onMove(x: number, y: number): void {
//     console.log(position)
//     console.log(x)
//     console.log(width + Math.round(offset.left) - $('.dragg').outerWidth())
//     if (x > width + Math.round(offset.left) - $('.dragg').outerWidth()) {
//         console.log('動作')
//         // xx.value = width + Math.round(offset.left) - $('.dragg').outerWidth()
//         disabledX.value = true
//         console.log(disabledX.value)
//     } else {
//         disabledX.value = false
//         // console.log(123)
//     }
//     if (x < offset.left) {
//         xx.value = offset.left
//     }
//     if (y > height + Math.round(offset.top) - $('.dragg').outerHeight()) {
//         yy.value = height + Math.round(offset.top) - $('.dragg').outerHeight()
//     }
//     if (y < offset.top) {
//         yy.value = offset.top
//     }


// }
</script>
<template>
    <div ref="el" :style="style" class="drag border-solid border-2 border-sky-500 rounded-md cursor-move" style="position: absolute"   >
    </div>
    <!-- <Draggable
        v-slot="{ x, y }"
        p="x-4 y-2"
        border="~ gray-400/30 rounded"
        shadow="~ hover:lg"
        class="drag absolute bg-$vp-c-bg select-none cursor-move z-24 bg-blue-200 p-4 rounded-md border-solid border-2 border-purple-400"
        :initial-value="{ x: answer.x, y: answer.y }"
        :prevent-default="true"
        :storage-key="`drag${props.props.id}`"
        storage-type="session"
    >
        Renderless component
        <div class="text-xs opacity-50" ref="target">
        Position persisted in sessionStorage
        </div>
        <div class="text-sm opacity-50">
        {{ Math.round(x) }}, {{ Math.round(y) }}
        </div>
    </Draggable> -->
    <!-- <div class="parent"> -->
        <!-- <Vue3DraggableResizable
        class="dragg"
        :parent="true"
        :initW="110"
        :initH="120"
        v-model:x="xx"
        v-model:y="yy"
        v-model:w="ww"
        v-model:h="hh"
        v-model:active="active"
        :draggable="true"
        :resizable="true"
        :parentLimitation="true"
        @activated="console.log('activated')"
        @deactivated="console.log('deactivated')"
        @drag-start="onMove(xx, yy)"
        @resize-start="console.log('resize-start')"
        @dragging="onMove(xx, yy)"
        @resizing="console.log('resizing')"
        @drag-end="onMove(xx, yy)"
        @resize-end="console.log('resize-end')"
        >
        {{ props.props.title }} {{ props.props.content }}
        </Vue3DraggableResizable> -->
    <!-- </div> -->
</template>
<style lang="scss">
.parent {
  width: 200px;
  height: 200px;
  position: absolute;
  top: 100px;
  left: 100px;
  border: 1px solid #000;
  user-select: none;
  background-color: aquamarine;
}
.dragg {
    background-color: aquamarine;
    padding: 20px;
    overflow: hidden;
}
    .page {
        height: 100vh;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        .draggable-panel {
            width: 100%;
            height: 100%;
        }

        .side {
            min-width: 260px;
            height: 100%;
            border-left: 1px solid #DDDDDD;
            background: #FFFFFF;
            padding: 16px;
            box-sizing: border-box;

            .box {
                height: 100px;
                background: #EEEEEE;
                border-radius: 4px;
                padding: 8px;
                border: 1px solid #DDDDDD;
                display: flex;
                justify-content: center;
                align-items: center;
                box-shadow: 0 5px 20px rgba(#333333, .1);

                &:hover {
                    filter: brightness(.9);

                }
            }
        }
    }

</style>