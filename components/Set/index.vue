<script lang="ts" setup>
import { ref } from 'vue'

const activeNames = ref(['1'])
const handleChange = (val: string[]) => {
    console.log(val)
}
</script>
<template>
    <div class="demo-collapse p-2">
        <h2 class="py-4 font-bold text-2xl">系統基礎設定</h2>
        <el-collapse v-model="activeNames">
            <el-collapse-item title="基礎設定" name="1">
                <div class="font-bold">
                    Consistent with real life: in line with the process and logic of real
                    life, and comply with languages and habits that the users are used to;
                </div>
                <div class="font-bold">
                    Consistent within interface: all elements should be consistent, such
                    as: design style, icons and texts, position of elements, etc.
                </div>
            </el-collapse-item>
            <el-collapse-item title="進階設定" name="2">
                <div class="font-bold">
                    Operation feedback: enable the users to clearly perceive their
                    operations by style updates and interactive effects;
                </div>
                <div class="font-bold">
                    Visual feedback: reflect current state by updating or rearranging
                    elements of the page.
                </div>
            </el-collapse-item>
            <el-collapse-item title="Vue設定" name="3">
                <div class="font-bold">
                    Simplify the process: keep operating process simple and intuitive;
                </div>
                <div class="font-bold">
                    Definite and clear: enunciate your intentions clearly so that the
                    users can quickly understand and make decisions;
                </div>
                <div class="font-bold">
                    Easy to identify: the interface should be straightforward, which helps
                    the users to identify and frees them from memorizing and recalling.
                </div>
            </el-collapse-item>
            <el-collapse-item title="Typescript設定" name="4">
                <div class="font-bold">
                    Decision making: giving advices about operations is acceptable, but do
                    not make decisions for the users;
                </div>
                <div class="font-bold">
                    Controlled consequences: users should be granted the freedom to
                    operate, including canceling, aborting or terminating current
                    operation.
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

