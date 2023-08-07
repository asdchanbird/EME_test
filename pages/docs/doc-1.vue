<script setup lang="ts">
import { ref } from 'vue'
import { useDraggable } from '@vueuse/core'

const el = ref<HTMLElement | null>(null)

// `style` will be a helper computed for `left: ?px; top: ?px;`
// const { x, y, style } = useDraggable(el, {
//     initialValue: { x: 40, y: 40 },
// })

</script>
<template>
    <div class="flex flex-col items-center w-full h-full bg-slate-200">
        <p class="my-8 text-3xl text-blue-500">這是我的第一份文件</p>
    </div>

    <!-- <UseDraggable :initialValue="{ x: 10, y: 10 }" v-slot="{ x, y }">
      Drag me! I am at {{ x }}, {{ y }}
    </UseDraggable> -->

</template>