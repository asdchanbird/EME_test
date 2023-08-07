<template>
      <codemirror
        v-model="code"
        placeholder="Code goes here..."
        :style="{ height: '400px' }"
        :autofocus="true"
        :tab-size="1"
        :extensions="extensions"
        @ready="handleReady"

      />
      <div>
        121241
      </div>
      <codemirror
            v-model="codes"
            placeholder="Code goes here..."
            :style="{ height: '400px' }"
            :autofocus="true"
            :tab-size="1"
            :extensions="extensions"
            @ready="handleReady"

          />




</template>

<script setup>
import { ref, shallowRef} from 'vue'
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
const code = ref(`console.log('Hello, world!')`)
const codes = ref(`console.log('Hello, worldssss!')`)
const view = shallowRef()
const extensions = [javascript(),]
const handleReady = (payload) => {
    view.value = payload.view
}
console.log(view.value)
const getCodemirrorStates = () => {
    const state = view.value.state
    const ranges = state.selection.ranges
    const selected = ranges.reduce((r, range) => r + range.to - range.from, 0)
    const cursor = ranges[0].anchor
    const length = state.doc.length
    const lines = state.doc.lines
    // more state info ...
    // return ...
}
// const result = getCodemirrorStates()
// console.log(result)
watch(code, ()=> {
  console.log(code.value)
  console.log()
})
</script>