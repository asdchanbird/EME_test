<script setup>
let dragged;
onMounted(()=> {
    /* events fired on the draggable target */
    const source = document.getElementById("draggable");
    const source2 = document.getElementById("drag");
    console.log(source2)
    source2.addEventListener("drag", (event) => {
        console.log("dragging");
    });
    
    source2.addEventListener("dragstart", (event) => {
        // store a ref. on the dragged elem
        dragged = event.target;
        console.log(dragged)
        // make it half transparent
        event.target.classList.add("dragging");
        console.log("draggStart");
    });
    
    source2.addEventListener("dragend", (event) => {
        // reset the transparency
        event.target.classList.remove("dragging");
        console.log("dragend");
    });
    
    /* events fired on the drop targets */
    const target = document.getElementById("droptarget");
    target.addEventListener("dragover", (event) => {
        // prevent default to allow drop
        event.preventDefault();
        console.log("dragover");
    }, false);
    
    target.addEventListener("dragenter", (event) => {
        // highlight potential drop target when the draggable element enters it
        if (event.target.classList.contains("dropzone")) {
            event.target.classList.add("dragover");
            console.log("dragenter");            
        }
    });
    
    target.addEventListener("dragleave", (event) => {
        // reset background of potential drop target when the draggable element leaves it
        if (event.target.classList.contains("dropzone")) {
            event.target.classList.remove("dragover");
            console.log("dragleave");
        }
    });
    
    target.addEventListener("drop", (event) => {
        // prevent default action (open as link for some elements)
        event.preventDefault();
        // move dragged element to the selected drop target
        if (event.target.classList.contains("dropzone")) {
            event.target.classList.remove("dragover");
            // dragged.parentNode.removeChild(dragged);
            // event.target.appendChild(dragged);
            console.log()
            sessionStorage.setItem('mouse', JSON.stringify({ x: event.clientX, y: event.clientY }))
            addCustomComponent(event)
        }
    });
    
})

const componentInfoList = ref([]);
const init = ref(0)
// 在按下按鈕時，動態添加一個自訂組件的訊息到陣列中
const addCustomComponent = (event) => {
    console.log('event = ',event)
    console.log(componentInfoList.value)
    componentInfoList.value.push({
        component: () => import("~/components/drag/index.client.vue"),
        props: {
            id: String(init.value + 1),
            title: "自訂標題1",
            content: "這是第一個動態新增的自訂組件。",
            x: event.offsetX,
            y: event.offsetY
        },
    });
    init.value += 1

    // 可以再添加更多組件的訊息...
    // componentInfoList.value.push({
    //   component: () => import("~/components/CustomComponent2.vue"),
    //   props: {
    //     title: "自訂標題2",
    //     content: "這是第二個動態新增的自訂組件。",
    //   },
    // });
};
onUnmounted(()=> {
    sessionStorage.clear()
})
</script>
<template>
    <div class="flex flex-col items-center">
        <div class=" border-red-300 bg-red-200 p-4">
            <h1 class="font-bold text-3xl">組件庫</h1>
            <div class="flex flex-wrap">
                <component />
                <!-- <component />
                <component />
                <component />
                <component />
                <component />
                <component /> -->
            </div>
        </div>
        <button @click="addCustomComponent">新增自訂組件</button>
        <div class="m-10 bg-zinc-200 dsd dropzone relative" id="droptarget">
            <!-- <drag title="2114" content="124124"/> -->
            <!-- <drag /> -->
            <div v-for="(componentInfo, index) in componentInfoList" :key="index">
                <component :is="defineAsyncComponent(componentInfo.component)" :props="componentInfo.props" />
            </div>
        </div>
    </div>
    <!-- <div class="dropzone">
      <div id="draggable" draggable="true">
        这个 div 可以拖动
      </div>
    </div> -->
    <!-- <div class="dropzone" id="droptarget"></div> -->
</template>

<style>
.dsd {
    width: 1200px;
    height: 2000px;
}

#draggable {
  text-align: center;
  background: white;
}

/* .dropzone {
  width: 200px;
  height: 200px;
  background: blueviolet;
  margin: 10px;
  padding: 10px;
} */


.dragging {
  opacity: .5;
}
</style>