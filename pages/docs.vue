<script setup lang="ts">
import { ref } from "vue";
// if(process.client) {

// }
const state = ref<boolean>(true)
function clicks():void {
    // $('.test').animate({
    //     translateX: '-200px',
    // })
    console.log(state.value)
    const result = state.value === true ? false : true  
    state.value = result
    $('.test').removeClass('close')
    $('.test').removeClass('open')
    if (result) {
        $('.test').addClass('open')
    }else {
        $('.test').addClass('close')
    }
    // setTimeout()
}
function routes(num: any) {
    const router = useRouter()
    router.push(`/docs/${num}`)
}
</script>
<template>
    <div class="bg-white overflow-hidden">
        <div class="my-6 flex flex-col items-center">
            <h1 class="text-3xl font-semibold text-gray-800">這裡是 Docs</h1>
            <div class="my-4 flex space-x-4">
                <NuxtLink to="/docs/doc-1">前往 Doc 1</NuxtLink>
                <NuxtLink to="/docs/doc-2">前往 Doc 2</NuxtLink>
                <div @click="routes(1)" class="bg-blue-200 p-1 rounded-md border cursor-pointer">
                    分頁
                </div>
                <div @click="clicks()" class="bg-blue-200 p-1 rounded-md border cursor-pointer">
                    開關
                </div>
            </div>
        </div>
        <div class="border-b-2 border-gray-100" />
        <div class="flex items-top">
            <div class="h-screen w-1/12 test">
                <!-- <Menu /> -->
                <div class="w-full bg-slate-700 h-full text-white">
                    123
                </div>
            </div>
            <div>
                <div class=" border-red-300 bg-red-200 p-4">
                    <h1 class="font-bold text-3xl">組件庫</h1>
                    <div class="flex flex-wrap">
                        <component />
                        <component />
                        <component />
                        <component />
                        <component />
                        <component />
                        <component />
                    </div>
                </div>
                <NuxtPage />
            </div>
            <div class="w-2/12">
                <div >
                    <Set />
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.close {
    transition: all .5s;
    transform: translate(-200px,0);
    width: 0;
}
.wrapper {
    transition: all 0.5s ease-in-out;
}
.open {
    transition: all 0.5s ease-in-out;
    transform: translate(0px,0);
    width: 16.666%;
}
</style>