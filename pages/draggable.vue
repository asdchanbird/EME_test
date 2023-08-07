<script setup lang="ts">
import DraggablePanel from 'draggable-panel'
const canvasWidth = ref(1200)
const canvasHeight = ref(800)
const chartList = ref<any[]>([])
const offset = reactive({ x: 0, y: 0 })
let chartId = ref(0)

// $(async function () {    
// });
const { data, pending, error, refresh } = await useFetch('/panelData', {
    method: 'GET',
    baseURL: 'http://localhost:3000/api'
})
console.log(data.value)
chartList.value = data.value.data


function dragstartOutDP(event: { offsetX: number; offsetY: number }) {
    offset.x = event.offsetX
    offset.y = event.offsetY
    console.log(offset)
    // offsets = {
    //     x: event.offsetX,
    //     y: event.offsetY,
    // }
}
function dropInCanvas(event: any, position: { x: number; y: number }) {
    console.info('[Event]', 'canvas-drop', event, position)

    chartId.value = Number((Math.random() * 10 ** 4).toFixed(0))
    console.log(chartId.value)
    chartList.value.push({
        id: chartId.value,
        width: 300,
        height: 200,
        x: position.x - offset.x,
        y: position.y - offset.y,
    })
    console.log(chartList.value)
}
function canvasScale(scale: any) {
    console.info('[Event]', 'canvas-scale', scale)
}
function chartMove(item: any) {
    console.info('[Event]', 'chart-move', item)
}
function chartScale(item: any) {
    console.info('[Event]', 'chart-scale', item)
}
definePageMeta({
    pageTransition: {
        name: 'rotate'
    }
})
</script>
<template>
    <div class="page">
        <draggable-panel 
            :canvas-style="{ background: '#FFFFFF' }"
            :chart-style="{ background: '#1976D255' }"
            :width="canvasWidth"
            :height="canvasHeight"
            :padding="32"
            :data="chartList"
            :chart-min-width="100"
            :chart-min-height="100"
            :scale-min="0.5"
            :scale-max="10"
            :lock="false"
            :chartId='chartId'
            @canvas-scale="canvasScale"
            @canvas-drop="dropInCanvas"
            @chart-move="chartMove"
            @chart-scale="chartScale">
            <template #chart="{ chart, index }">
                <div style="padding: 16px">
                    ID: {{ chart }} (default)
                </div>
            </template>

            <template #chart-8888="{ chart, index }">
                <div style="padding: 16px; color: #FF0000">
                    <strong>ID: {{ chart.id }} (slot with id)</strong>
                    <div style="margin: 8px 0">Hotkey:</div>
                    <ul>
                        <li>move: space + drag</li>
                        <li>scale: ctrl + mousewheel</li>
                        <li>scale +: ctrl + =</li>
                        <li>scale -: ctrl + -</li>
                        <li>reset -: ctrl + 0</li>
                        <li>real size: ctrl + enter</li>
                    </ul>
                </div>
            </template>
        </draggable-panel>

        <div class="side">
            <div class="box"
                draggable="true"
                @dragstart="dragstartOutDP">
                Drag me to the canvas
            </div>
            <div class="box mt-6"
                draggable="true"
                @dragstart="dragstartOutDP">
                Drag me to the canvas
            </div>
        </div>
    </div>

</template>
<style lang="scss">
@import 'draggable-panel/dist/style.css';

// .parent {
//   width: 200px;
//   height: 200px;
//   position: absolute;
//   top: 100px;
//   left: 100px;
//   border: 1px solid #000;
//   user-select: none;
//   background-color: aquamarine;
// }
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